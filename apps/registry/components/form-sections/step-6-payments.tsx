"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Info, CheckCircle, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface Step6PaymentsProps {
  onBack: () => void
}

export default function Step6Payments({ onBack }: Step6PaymentsProps) {
  const router = useRouter()
  const [citizenship, setCitizenship] = useState<string | undefined>()
  const [paymentMethod, setPaymentMethod] = useState<"ecitizen" | "ussd">("ussd")
  const [step, setStep] = useState<"citizenship" | "payment" | "instructions">("citizenship")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const isCitizen = citizenship === "citizen"
  const fee = isCitizen ? "10,000" : "100,000"

  const handleProceedToPayments = () => {
    setStep("instructions")
  }

  const handlePaymentConfirmed = async () => {
    setIsProcessing(true)

    // Simulate payment verification
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsConfirmed(true)

    // Wait a moment to show success, then navigate
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/projects?submitted=true")
  }

  const renderCitizenshipStep = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-primary mb-4">Carbon Project Application Fee</h2>

        <div className="space-y-6">
          <div>
            <Label className="text-sm text-foreground mb-2 block">Confirm citizenship to continue with payments</Label>
            <Select
              value={citizenship}
              onValueChange={(value) => {
                setCitizenship(value)
                setStep("payment")
              }}
            >
              <SelectTrigger className="bg-card border-primary h-12 rounded-xl">
                <SelectValue placeholder="Choose Citizenship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non-citizen" className="bg-primary/5">
                  Non-Citizen
                </SelectItem>
                <SelectItem value="citizen" className="bg-primary/5">
                  Citizen
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-foreground mb-2 block">
              {isCitizen ? "Please upload your ID" : "Please upload your passport"}
            </Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 bg-card hover:border-primary/30 transition-colors">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload size={24} className="text-muted-foreground mb-2" />
                <p className="text-sm text-foreground">
                  <span className="text-primary underline cursor-pointer font-medium">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX (max. 3MB)</p>
              </div>
            </div>
          </div>

          {isCitizen && (
            <div className="bg-secondary border border-border rounded-xl p-4 flex items-start gap-3">
              <Info size={18} className="text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Please note: (a) A body corporate shall be regarded as a citizen only if the body corporate is wholly
                owned by one or more citizens.
                <br />
                (b) a body corporate held in trust shall be regarded as being held by a citizen only if all of the
                beneficial interest of the trust is held by persons who are citizens.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-8 py-2 rounded-xl border-border text-muted-foreground hover:bg-secondary bg-transparent"
        >
          GO BACK
        </Button>
        <Button
          onClick={handleProceedToPayments}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl"
          disabled={!citizenship}
        >
          {step === "citizenship" ? "CONFIRM PAYMENTS" : "PROCEED TO PAYMENTS"}
        </Button>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-primary mb-4">Carbon Project Application Fee</h2>

        {/* Please Note */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-2">Please Note</p>
          <p className="text-sm text-muted-foreground">
            Before proceeding with the payment for the{" "}
            <span className="font-medium text-foreground">Kilifi Solar Project</span>, please note that A carbon project
            application for a {isCitizen ? "citizen" : "non-citizen"} is charged {isCitizen ? "10,000" : "100,000"}{" "}
            Kshs.
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-4">Payment Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Project Name</p>
              <p className="text-sm text-foreground">Kilifi Solar Project</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Project Type</p>
              <p className="text-sm text-foreground">Solar</p>
            </div>
          </div>
        </div>

        {/* Payment Description */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-2">Payment Description</p>
          <p className="text-sm text-muted-foreground">
            Payment of <span className="font-medium text-foreground">KES 150,000</span> for the{" "}
            <span className="font-medium text-foreground">Kilifi Solar Project</span>.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-4">Summary</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Project fee</p>
              <p className="text-sm text-foreground">KES {fee}</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Transaction Fee</p>
              <p className="text-sm text-foreground">KES 0</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
              <p className="text-sm text-foreground">KES {fee}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-4">Payment method</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Checkbox
                id="ecitizen"
                checked={paymentMethod === "ecitizen"}
                onCheckedChange={() => setPaymentMethod("ecitizen")}
                className="border-border"
              />
              <label htmlFor="ecitizen" className="text-sm text-muted-foreground">
                Pay via e-Citizen portal
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="ussd"
                checked={paymentMethod === "ussd"}
                onCheckedChange={() => setPaymentMethod("ussd")}
                className="border-primary data-[state=checked]:bg-primary"
              />
              <label htmlFor="ussd" className="text-sm text-muted-foreground">
                Pay via USSD
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-8 py-2 rounded-xl border-border text-muted-foreground hover:bg-secondary bg-transparent"
        >
          GO BACK
        </Button>
        <Button
          onClick={handleProceedToPayments}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl"
        >
          PROCEED TO PAYMENTS
        </Button>
      </div>
    </div>
  )

  const renderInstructionsStep = () => (
    <div className="space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
      <section>
        {/* Portal Notice */}
        <div className="bg-primary/5 rounded-xl p-3 mb-6 flex items-center gap-2 border border-primary/10">
          <Info size={16} className="text-primary flex-shrink-0" />
          <p className="text-sm text-foreground">
            To pay via the portal, please visit{" "}
            <a href="https://www.ecitizen.org" className="text-primary underline font-medium">
              www.ecitizen.org
            </a>
          </p>
        </div>

        <h2 className="text-lg font-semibold text-primary mb-6">Payment instructions</h2>

        <ol className="space-y-6 text-muted-foreground">
          <li>
            <p className="text-sm font-medium text-foreground">1. Dial the USSD Code:</p>
            <p className="text-sm ml-4 mt-1">On your phone, dial *123# and press the call button.</p>
          </li>
          <li>
            <p className="text-sm font-medium text-foreground">2. Select "Transfer Money" Option:</p>
            <p className="text-sm ml-4 mt-1">{'You\'ll see a menu. Choose option 1 for "Send Money" or "Transfer".'}</p>
          </li>
          <li>
            <p className="text-sm font-medium text-foreground">
              {"3. Enter Recipient's Phone Number or Bank Account:"}
            </p>
            <p className="text-sm ml-4 mt-1">Type in the mobile number or account number of the recipient.</p>
          </li>
          <li>
            <p className="text-sm font-medium text-foreground">4. Enter Amount:</p>
            <p className="text-sm ml-4 mt-1">Type the amount you want to send (e.g., 500).</p>
          </li>
          <li>
            <p className="text-sm font-medium text-foreground">5. Choose Payment Method:</p>
            <p className="text-sm ml-4 mt-1">
              {"Choose if it's a transfer to mobile wallet, same bank, or other bank (options vary)."}
            </p>
          </li>
          <li>
            <p className="text-sm font-medium text-foreground">6. Enter Your PIN:</p>
            <p className="text-sm ml-4 mt-1">Confirm the transaction with your secure 4-digit PIN.</p>
          </li>
          <li>
            <p className="text-sm font-medium text-foreground">7. Confirmation Message:</p>
            <p className="text-sm ml-4 mt-1">
              {"You'll receive a message confirming the successful transaction with a reference number."}
            </p>
          </li>
        </ol>
      </section>

      {isConfirmed ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3">
          <CheckCircle className="w-12 h-12 text-green-600" />
          <h3 className="text-lg font-semibold text-green-800">Payment Confirmed!</h3>
          <p className="text-sm text-green-700 text-center">
            Your project application has been submitted successfully. Redirecting to your projects...
          </p>
        </div>
      ) : (
        <div className="flex justify-end sticky bottom-0 bg-background pt-4">
          <Button
            onClick={handlePaymentConfirmed}
            disabled={isProcessing}
            className="px-8 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying Payment...
              </>
            ) : (
              "I Have Paid"
            )}
          </Button>
        </div>
      )}
    </div>
  )

  if (step === "instructions") {
    return renderInstructionsStep()
  }

  if (step === "payment" && citizenship) {
    return renderPaymentStep()
  }

  return renderCitizenshipStep()
}
