"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react"

interface UploadedDocument {
  id: string
  name: string
  type: string
  size: string
  status: "uploading" | "processing" | "ready"
  extractedInfo?: string[]
}

interface DocumentUploadProps {
  onDocumentsReady: (docs: UploadedDocument[]) => void
}

export default function DocumentUpload({ onDocumentsReady }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }, [])

  const processFiles = (files: File[]) => {
    const newDocs: UploadedDocument[] = files.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      type: file.type || "application/pdf",
      size: formatFileSize(file.size),
      status: "uploading",
    }))

    setDocuments((prev) => [...prev, ...newDocs])

    // Simulate upload and processing
    newDocs.forEach((doc, index) => {
      setTimeout(
        () => {
          setDocuments((prev) => prev.map((d) => (d.id === doc.id ? { ...d, status: "processing" } : d)))
        },
        500 + index * 200,
      )

      setTimeout(
        () => {
          setDocuments((prev) =>
            prev.map((d) =>
              d.id === doc.id
                ? {
                    ...d,
                    status: "ready",
                    extractedInfo: getExtractedInfo(doc.name),
                  }
                : d,
            ),
          )
        },
        1500 + index * 300,
      )
    })
  }

  const getExtractedInfo = (name: string): string[] => {
    const lower = name.toLowerCase()
    if (lower.includes("regulation") || lower.includes("act")) {
      return ["Project lifecycle stages", "Registration requirements", "Fee schedules"]
    }
    if (lower.includes("article") || lower.includes("6")) {
      return ["ITMO provisions", "Authorization process", "CA requirements"]
    }
    if (lower.includes("guideline") || lower.includes("cycle")) {
      return ["PDD templates", "Validation criteria", "Monitoring protocols"]
    }
    return ["Policy provisions", "Institutional framework"]
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  const allReady = documents.length > 0 && documents.every((d) => d.status === "ready")

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50"
        }`}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
        />
        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isDragging ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <Upload size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">Drop regulatory documents here</p>
            <p className="text-sm text-muted-foreground mt-1">PDF, DOC, DOCX or TXT files</p>
          </div>
        </div>
      </div>

      {/* Uploaded documents */}
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                doc.status === "ready" ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.status === "ready" ? "bg-primary" : "bg-muted"
                }`}
              >
                {doc.status === "ready" ? (
                  <CheckCircle size={18} className="text-white" />
                ) : doc.status === "processing" ? (
                  <Loader2 size={18} className="text-primary animate-spin" />
                ) : (
                  <FileText size={18} className="text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm text-foreground truncate">{doc.name}</p>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="p-1 text-muted-foreground hover:text-foreground rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{doc.size}</p>

                {doc.status === "processing" && (
                  <p className="text-xs text-primary mt-1 animate-pulse">Extracting key concepts...</p>
                )}

                {doc.extractedInfo && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.extractedInfo.map((info, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        {info}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue button */}
      {allReady && (
        <button
          onClick={() => onDocumentsReady(documents)}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle size={18} />
          Continue with {documents.length} document{documents.length > 1 ? "s" : ""}
        </button>
      )}
    </div>
  )
}
