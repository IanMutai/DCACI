"use client"

import { useState } from "react"
import PublicHeader from "@/components/public/public-header"
import PublicFooter from "@/components/public/public-footer"
import {
  Search,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Building2,
  User,
} from "lucide-react"

type VerificationResult = {
  valid: boolean
  documentType: string
  serialNumber: string
  projectName: string
  proponentName: string
  issuedDate: string
  expiryDate?: string
  status: string
  country?: string
} | null

export default function DocumentVerificationPage() {
  const [serialNumber, setSerialNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<VerificationResult>(null)
  const [searched, setSearched] = useState(false)

  const handleVerify = async () => {
    setIsSearching(true)
    setSearched(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const validDocuments: Record<string, VerificationResult> = {
      "LONO-2025-001234": {
        valid: true,
        documentType: "Letter of No Objection",
        serialNumber: "LONO-2025-001234",
        projectName: "Kilifi Solar Project",
        proponentName: "Naima Salim",
        issuedDate: "15/01/2025",
        status: "Active",
        country: "Kenya",
      },
      "LOA-2025-005678": {
        valid: true,
        documentType: "Letter of Approval",
        serialNumber: "LOA-2025-005678",
        projectName: "Lagos Waste-to-Energy",
        proponentName: "Adebayo Okonkwo",
        issuedDate: "20/02/2025",
        status: "Active",
        country: "Nigeria",
      },
      "AUTH-2025-009012": {
        valid: true,
        documentType: "Letter of Authorization",
        serialNumber: "AUTH-2025-009012",
        projectName: "Marrakech Wind Farm",
        proponentName: "Fatima El-Amin",
        issuedDate: "15/03/2025",
        expiryDate: "15/03/2030",
        status: "Active",
        country: "Morocco",
      },
    }

    const foundDocument = validDocuments[serialNumber.toUpperCase()]
    setResult(foundDocument || ({ valid: false } as VerificationResult))
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="h2 text-foreground mb-4">Document Verification</h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Verify the authenticity of documents issued through the ARC platform. Enter the serial number found on
              your document.
            </p>
          </div>

          {/* Search Box */}
          <div className="card-elevated p-8 mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">Document Serial Number</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="e.g., LONO-2025-001234"
                  className="input-field"
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={!serialNumber.trim() || isSearching}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Verify
                  </>
                )}
              </button>
            </div>

            {/* Example Serial Numbers */}
            <div className="mt-6 p-4 bg-secondary rounded-xl">
              <p className="text-xs text-muted-foreground mb-3">Example serial numbers to test:</p>
              <div className="flex flex-wrap gap-2">
                {["LONO-2025-001234", "LOA-2025-005678", "AUTH-2025-009012"].map((sn) => (
                  <button
                    key={sn}
                    onClick={() => setSerialNumber(sn)}
                    className="text-xs px-3 py-2 bg-card border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all font-mono"
                  >
                    {sn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {searched && !isSearching && (
            <div className="card-elevated overflow-hidden animate-fade-up">
              {result?.valid ? (
                <>
                  {/* Valid Document Header */}
                  <div className="bg-success/10 p-6 flex items-center gap-4 border-b border-success/20">
                    <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-success-foreground" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-success">Document Verified</h2>
                      <p className="text-sm text-muted-foreground">This document is authentic and valid</p>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Document Type</div>
                          <div className="text-sm font-medium text-foreground">{result.documentType}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Serial Number</div>
                          <div className="text-sm font-medium text-foreground font-mono">{result.serialNumber}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Project Name</div>
                          <div className="text-sm font-medium text-foreground">{result.projectName}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Proponent Name</div>
                          <div className="text-sm font-medium text-foreground">{result.proponentName}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Issue Date</div>
                          <div className="text-sm font-medium text-foreground">{result.issuedDate}</div>
                        </div>
                      </div>
                      {result.country && (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Country</div>
                            <div className="text-sm font-medium text-foreground">{result.country}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <span className="badge-success">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        {result.status}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Invalid Document Header */}
                  <div className="bg-destructive/10 p-6 flex items-center gap-4 border-b border-destructive/20">
                    <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-destructive-foreground" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-destructive">Document Not Found</h2>
                      <p className="text-sm text-muted-foreground">No document matches this serial number</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl border border-accent/20">
                      <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-2">What this means:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>The serial number may be incorrect</li>
                          <li>The document may not have been issued through ARC</li>
                          <li>The document may be fraudulent</li>
                        </ul>
                        <p className="mt-3">
                          If you believe this is an error, please contact your national registry administrator.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Document Types Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Letter of No Objection", desc: "Issued after PCN approval", format: "LONO-YYYY-XXXXXX" },
              { title: "Letter of Approval", desc: "Issued after PDD approval", format: "LOA-YYYY-XXXXXX" },
              { title: "Letter of Authorization", desc: "Issued after authorization", format: "AUTH-YYYY-XXXXXX" },
            ].map((doc, index) => (
              <div key={index} className="card-interactive p-5">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{doc.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {doc.desc}
                  <br />
                  <span className="font-mono text-primary/70">Format: {doc.format}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
