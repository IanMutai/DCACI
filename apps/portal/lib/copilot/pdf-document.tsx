import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getDocumentType, type DocType, type SectionState } from "./document-types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    color: "#1a1a2e",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#0d9488",
    paddingBottom: 12,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  orgBlock: { flex: 1 },
  orgName: { fontSize: 8, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 },
  docBadge: { fontSize: 8, color: "#0d9488", fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 },
  unfcccRef: { fontSize: 7, color: "#9ca3af" },
  docTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0f172a", marginBottom: 4 },
  docMeta: { fontSize: 9, color: "#6b7280" },
  sectionContainer: { marginBottom: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  sectionNumber: { fontSize: 8, color: "#0d9488", fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  sectionTitle: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#0f172a", marginBottom: 10 },
  paragraph: { fontSize: 10, lineHeight: 1.6, color: "#374151", marginBottom: 8 },
  subHeading: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#1f2937", marginTop: 10, marginBottom: 6 },
  bulletItem: { fontSize: 10, lineHeight: 1.5, color: "#374151", marginBottom: 4, paddingLeft: 12 },
  placeholder: { fontSize: 10, color: "#ef4444", marginBottom: 6 },
  footer: {
    position: "absolute", bottom: 30, left: 60, right: 60,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 8,
  },
  footerText: { fontSize: 8, color: "#9ca3af" },
  pendingBox: { backgroundColor: "#f9fafb", padding: 12, borderWidth: 1, borderColor: "#e5e7eb" },
  pendingText: { fontSize: 10, color: "#9ca3af" },
});

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (!line.trim()) return null;
    if (line.startsWith("### ")) return <Text key={i} style={styles.subHeading}>{line.slice(4)}</Text>;
    if (line.startsWith("## ")) return <Text key={i} style={styles.sectionTitle}>{line.slice(3)}</Text>;
    if (line.startsWith("- ") || line.startsWith("* "))
      return <Text key={i} style={styles.bulletItem}>• {line.slice(2)}</Text>;
    if (line.startsWith("[PLACEHOLDER:"))
      return <Text key={i} style={styles.placeholder}>{line}</Text>;
    const cleaned = line.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
    return <Text key={i} style={styles.paragraph}>{cleaned}</Text>;
  });
}

export function createPdfDocument(
  docType: DocType,
  title: string,
  country: string,
  sections: Record<string, SectionState>,
  county?: string
) {
  const schema = getDocumentType(docType);
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const orgLine = county ? `${county} County Government, Kenya` : `Government of ${country}`;
  const metaLine = county ? `${county} County, Kenya · ${dateStr} · Draft Document` : `${country} · ${dateStr} · Draft Document`;

  return (
    <Document title={title} author={orgLine} subject={schema.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.orgBlock}>
              <Text style={styles.orgName}>{orgLine}</Text>
              <Text style={styles.docBadge}>{schema.subtitle}</Text>
            </View>
            <Text style={styles.unfcccRef}>{schema.unfcccFramework}</Text>
          </View>
          <Text style={styles.docTitle}>{title}</Text>
          <Text style={styles.docMeta}>{metaLine}</Text>
        </View>

        {schema.sections.map((sectionSchema, idx) => {
          const state = sections[sectionSchema.id];
          const hasContent = state?.content && state.content.trim().length > 0;
          return (
            <View key={sectionSchema.id} style={styles.sectionContainer} wrap={false}>
              <Text style={styles.sectionNumber}>Section {idx + 1}</Text>
              <Text style={styles.sectionTitle}>{sectionSchema.title}</Text>
              {hasContent
                ? renderContent(state.content)
                : (
                  <View style={styles.pendingBox}>
                    <Text style={styles.pendingText}>
                      [This section has not yet been drafted. Use the Climate Document Copilot to generate content.]
                    </Text>
                  </View>
                )
              }
            </View>
          );
        })}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{title} · {country}</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
