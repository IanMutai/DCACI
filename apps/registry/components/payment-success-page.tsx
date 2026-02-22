"use client"

import { CheckCircle2, Download, ArrowRight, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface PaymentSuccessPageProps {
  amount: string
  projectName: string
  transactionRef: string
  submissionType: "PCN" | "PDD" | "Authorization"
  onContinue?: () => void
}

export default function PaymentSuccessPage({
  amount,
  projectName,
  transactionRef,
  submissionType,
  onContinue,
}: PaymentSuccessPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/20 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-card rounded-3xl border border-border/50 p-12 shadow-2xl space-y-8">
          {/* Success Icon */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">Your submission has been received and is now under review</p>
          </div>

          {/* Amount Display */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-center border border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">Amount Paid</div>
            <div className="text-4xl font-bold text-primary mb-1">{amount}</div>
            <div className="text-xs text-muted-foreground">Transaction Ref: {transactionRef}</div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Project Name</div>
              <div className="font-semibold text-foreground">{projectName}</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Submission Type</div>
              <div className="font-semibold text-foreground">{submissionType}</div>
            </div>
          </div>

          {/* Next Steps Banner */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">What Happens Next?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our review committee will evaluate your submission within <strong>10-14 business days</strong>. You
                  will receive an in-app notification once the review is complete. The committee may:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Approve your submission and issue the relevant letter</li>
                  <li>Request corrections or additional information</li>
                  <li>Reject the submission with detailed feedback</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-secondary/50 border border-border/50 rounded-xl font-medium hover:bg-secondary transition-colors">
              <Download className="w-5 h-5" />
              Download Payment Receipt
            </button>

            <Link
              href="/projects"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Go to My Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Track your submission:</strong> You can monitor the review progress in
              your project dashboard. We'll send you email notifications at each stage of the review process.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
