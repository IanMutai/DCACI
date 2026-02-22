"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, MessageSquare, Clock, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Submission {
  id: string
  projectName: string
  proponentName: string
  type: "PCN" | "PDD" | "Authorization"
  submittedDate: string
  status: "pending" | "under-review" | "approved" | "rejected" | "correction-requested"
  documents: { name: string; size: string }[]
}

export default function CommitteeReviewDashboard() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [reviewComment, setReviewComment] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "request-correction" | null>(null)

  const submissions: Submission[] = [
    {
      id: "1",
      projectName: "Kilifi Solar Project",
      proponentName: "Naima Salim",
      type: "PCN",
      submittedDate: "Jan 10, 2025",
      status: "under-review",
      documents: [{ name: "Kilifi_Solar_Project_PCN.pdf", size: "2.4 MB" }],
    },
    {
      id: "2",
      projectName: "Mombasa Wind Farm",
      proponentName: "David Omondi",
      type: "PDD",
      submittedDate: "Jan 8, 2025",
      status: "pending",
      documents: [{ name: "Mombasa_Wind_Farm_PDD.pdf", size: "3.1 MB" }],
    },
  ]

  const handleReview = (action: "approve" | "reject" | "request-correction") => {
    setReviewAction(action)
    // This would submit the review to backend
    console.log(`[v0] Review submitted: ${action}`, { submission: selectedSubmission, comment: reviewComment })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Committee Review Dashboard</h1>
        <p className="text-muted-foreground mt-2">Review and approve project submissions</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Submissions List */}
        <div className="col-span-5 space-y-4">
          <div className="bg-card rounded-2xl border border-border/50 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Pending Reviews
            </h2>
            <div className="space-y-3">
              {submissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedSubmission?.id === submission.id
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-foreground">{submission.projectName}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {submission.proponentName} • {submission.submittedDate}
                      </div>
                    </div>
                    <Badge
                      variant={submission.status === "pending" ? "secondary" : "default"}
                      className="text-xs capitalize"
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="w-3 h-3" />
                    {submission.type}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Review Details */}
        <div className="col-span-7">
          {selectedSubmission ? (
            <div className="bg-card rounded-2xl border border-border/50 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground">{selectedSubmission.projectName}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedSubmission.proponentName}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Submitted {selectedSubmission.submittedDate}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Submitted Documents</h3>
                {selectedSubmission.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">{doc.size}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>

              {/* Review Comment */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Review Comments
                </h3>
                <Textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Add your review comments here..."
                  className="min-h-[120px] rounded-xl"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleReview("approve")}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleReview("reject")}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl font-semibold border-red-500 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border/50 p-8 flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a submission to review</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
