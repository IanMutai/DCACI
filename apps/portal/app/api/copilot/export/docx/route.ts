import { NextRequest } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  PageNumber,
  NumberFormat,
  Header,
  Footer,
  SectionType,
  TableOfContents,
  StyleLevel,
} from "docx";
import { getDocumentType, type DocType, type SectionState } from "@/lib/copilot/document-types";

function markdownToDocxParagraphs(content: string): Paragraph[] {
  const lines = content.split("\n");
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      paragraphs.push(new Paragraph({ text: "", spacing: { after: 80 } }));
      continue;
    }

    if (line.startsWith("## ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace("## ", ""),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        })
      );
    } else if (line.startsWith("### ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace("### ", ""),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        })
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^[-*] /, ""),
          bullet: { level: 0 },
          spacing: { after: 60 },
        })
      );
    } else if (line.startsWith("[PLACEHOLDER:")) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              color: "CC0000",
              italics: true,
              highlight: "yellow",
            }),
          ],
          spacing: { after: 80 },
        })
      );
    } else {
      // Handle inline bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const runs = parts.map((part) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return new TextRun({ text: part.slice(2, -2), bold: true });
        }
        return new TextRun({ text: part });
      });
      paragraphs.push(
        new Paragraph({
          children: runs,
          spacing: { after: 100 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    }
  }

  return paragraphs;
}

export async function POST(request: NextRequest) {
  try {
    const { docType, title, country, sections } = await request.json() as {
      docType: DocType;
      title: string;
      country: string;
      sections: Record<string, SectionState>;
    };

    const schema = getDocumentType(docType);
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

    const docSections = schema.sections.flatMap((sectionSchema, idx) => {
      const sectionState = sections[sectionSchema.id];
      const hasContent = sectionState?.content && sectionState.content.trim().length > 0;

      const sectionParagraphs: Paragraph[] = [
        new Paragraph({
          text: `Section ${idx + 1}: ${sectionSchema.title}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          pageBreakBefore: idx > 0,
        }),
      ];

      if (hasContent) {
        sectionParagraphs.push(...markdownToDocxParagraphs(sectionState.content));
      } else {
        sectionParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "[This section has not yet been drafted. Use the Climate Document Copilot to generate content.]",
                italics: true,
                color: "9CA3AF",
              }),
            ],
            spacing: { after: 200 },
          })
        );
      }

      return sectionParagraphs;
    });

    const doc = new Document({
      title,
      subject: schema.title,
      creator: `Government of ${country} — DCACI Climate Document Copilot`,
      description: `${schema.title} for ${country}, generated ${dateStr}`,
      styles: {
        default: {
          document: {
            run: { font: "Calibri", size: 22 },
          },
        },
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            run: { font: "Calibri", size: 22, color: "374151" },
            paragraph: { spacing: { line: 276 } },
          },
        ],
      },
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS,
            page: {
              margin: { top: 1440, bottom: 1440, left: 1260, right: 1260 },
              pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: `Government of ${country}  ·  `, color: "6B7280", size: 16 }),
                    new TextRun({ text: title, bold: true, color: "0F172A", size: 16 }),
                  ],
                  alignment: AlignmentType.RIGHT,
                  border: {
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: "0D9488" },
                  },
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${schema.subtitle}  ·  ${country}  ·  ${dateStr}    `, color: "9CA3AF", size: 16 }),
                    new TextRun({ children: [PageNumber.CURRENT], color: "6B7280", size: 16 }),
                    new TextRun({ text: " / ", color: "9CA3AF", size: 16 }),
                    new TextRun({ children: [PageNumber.TOTAL_PAGES], color: "6B7280", size: 16 }),
                  ],
                  alignment: AlignmentType.CENTER,
                  border: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" },
                  },
                }),
              ],
            }),
          },
          children: [
            // Cover
            new Paragraph({
              children: [
                new TextRun({ text: `Government of ${country}`, color: "6B7280", size: 20 }),
              ],
              spacing: { before: 2880 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: title, bold: true, color: "0F172A", size: 52 }),
              ],
              spacing: { before: 200, after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${schema.subtitle}  ·  ${dateStr}  ·  Draft`, color: "0D9488", size: 20 }),
              ],
              spacing: { after: 80 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: schema.unfcccFramework, color: "9CA3AF", size: 18, italics: true }),
              ],
              spacing: { after: 2880 },
            }),
            // Content
            ...docSections,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);
    const filename = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${country.toLowerCase()}.docx`;

    return new Response(uint8, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("DOCX export error:", error);
    return Response.json({ error: "Word document generation failed" }, { status: 500 });
  }
}
