import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createPdfDocument } from "@/lib/copilot/pdf-document";
import { type DocType, type SectionState } from "@/lib/copilot/document-types";

export async function POST(request: NextRequest) {
  try {
    const { docType, title, country, county, sections } = await request.json() as {
      docType: DocType;
      title: string;
      country: string;
      county?: string;
      sections: Record<string, SectionState>;
    };

    const doc = createPdfDocument(docType, title, country, sections, county);
    const buffer = await renderToBuffer(doc);
    const slug = county ? `${county}-county`.replace(/[^a-z0-9]/gi, "-").toLowerCase() : country.toLowerCase();
    const filename = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${slug}.pdf`;
    const uint8 = new Uint8Array(buffer);

    return new Response(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return Response.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
