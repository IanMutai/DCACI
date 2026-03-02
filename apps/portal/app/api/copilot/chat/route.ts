import OpenAI from "openai";
import { NextRequest } from "next/server";
import { getDocumentType, type DocType } from "@/lib/copilot/document-types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemPrompt(
  docType: DocType,
  sectionId: string,
  country: string,
  completedSections: Record<string, string>,
  county?: string
): string {
  const schema = getDocumentType(docType);
  const section = schema.sections.find((s) => s.id === sectionId);
  const completedSummary = Object.entries(completedSections)
    .filter(([, content]) => content.trim().length > 0)
    .map(([id, content]) => {
      const s = schema.sections.find((sec) => sec.id === id);
      return `### ${s?.title ?? id}\n${content.slice(0, 400)}${content.length > 400 ? "..." : ""}`;
    })
    .join("\n\n");

  const jurisdiction = county ? `${county} County, Kenya` : country;
  const jurisdictionLabel = county ? `${county} County` : country;

  return `You are a senior climate policy specialist with 20+ years of experience drafting NDCs, BTRs, national and county climate action plans. You are helping a climate change officer draft an official ${schema.title} (${schema.subtitle}) for ${jurisdiction}.
${county ? `\nThis is a COUNTY-LEVEL document under Kenya's Climate Change Act 2016 (Section 13). Write content specific to ${county} County — its geography, economy, livelihoods, specific climate hazards, county government institutional structure, and the Kenya Climate Change Fund. Reference the Kenya National Climate Change Action Plan (NCCAP) 2023–2027 and Kenya's Second NDC (2031–2035) for alignment.` : ""}
## YOUR ROLE
You are a DOCUMENT AUTHOR, not a general assistant. Your sole job is to help draft formal, policy-grade content section by section. You combine deep technical knowledge of climate policy with clear, precise government document language.

## CURRENT TASK
Document Type: ${schema.title} (${schema.subtitle})
Jurisdiction: ${jurisdiction}
Current Section: ${section?.title ?? sectionId}
Section Description: ${section?.description ?? ""}
UNFCCC Reference: ${section?.unfcccRef ?? "Paris Agreement / UNFCCC guidelines"}

## DOCUMENT CONTEXT (Sections already drafted)
${completedSummary || "This is the first section being drafted."}

## HOW TO RESPOND
1. If the user hasn't provided enough information, ask 2–3 targeted, specific questions to gather what you need. Focus on numbers, years, sector specifics, and policy details.
2. Once you have enough information, draft the full section in formal government document language — use complete paragraphs, precise figures, and proper UNFCCC framework references.
3. Use language appropriate for official UNFCCC submissions: formal, active where appropriate, specific, and evidence-based.
4. When drafting content, structure it with clear subsections using markdown headers (##, ###).
5. CRITICAL: After completing the draft, you MUST end your response with a special JSON marker on a new line in this EXACT format:
__SECTION_CONTENT__{"content": "## Section Title\\n\\nFull section content here in markdown..."}

## DRAFTING STANDARDS
- Use formal policy language (e.g. "${county ? `The ${county} County Government commits to...` : `The Government of ${country} commits to...`}" not "We will...")
- Always include specific figures when provided (targets, years, MtCO2e, USD amounts)
- Reference relevant UNFCCC decisions, Paris Agreement articles, and IPCC guidelines
- Align terminology with UNFCCC Enhanced Transparency Framework (ETF) requirements
- Flag where country-specific data is still needed with [PLACEHOLDER: description]
- Keep sections comprehensive but focused — avoid repetition with other sections

## QUALITY STANDARDS
This document will be submitted officially. Every claim must be verifiable. Every target must be specific. Every commitment must be actionable. Write as if you are a government minister signing this document.`;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, docType, currentSection, country, county, completedSections } =
      await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    if (!docType || !currentSection || !country) {
      return Response.json({ error: "Missing required fields: docType, currentSection, country" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(
      docType as DocType,
      currentSection,
      country,
      completedSections ?? {},
      county
    );

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 4000,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Copilot chat error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
