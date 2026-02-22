import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Book, MessageCircle, Mail, Phone, FileText, Video, ChevronRight, Search } from "lucide-react"

const faqs = [
  {
    question: "How do I register a new carbon project?",
    answer:
      "Navigate to Projects > Add Project and follow the step-by-step onboarding process. You'll need to provide project details, proponent information, and supporting documents.",
  },
  {
    question: "What is the PCN approval process?",
    answer:
      "The Project Concept Note (PCN) is reviewed by the NDA within 14 business days. Once approved, a Letter of No Objection is issued, and you can proceed to the PDD stage.",
  },
  {
    question: "How are carbon credits issued?",
    answer:
      "Credits are issued after successful verification of monitoring reports. The issuance process includes validation, verification, and final registry approval.",
  },
  {
    question: "What documents are required for Article 6 projects?",
    answer:
      "Article 6 projects require bilateral agreements, host country authorization, corresponding adjustments documentation, and environmental impact assessments.",
  },
]

export default function HelpPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-foreground">Help Center</h1>
            <p className="text-muted-foreground mt-1">Find answers and get support</p>
          </div>

          {/* Search */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4 text-center">How can we help you?</h2>
            <div className="max-w-xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Book size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">Comprehensive guides and API documentation</p>
              <div className="flex items-center text-sm text-primary font-medium">
                Browse Docs <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Video size={24} className="text-accent" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">Step-by-step video guides for common tasks</p>
              <div className="flex items-center text-sm text-primary font-medium">
                Watch Videos <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FileText size={24} className="text-green-600" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Templates</h3>
              <p className="text-sm text-muted-foreground mb-4">Download forms and document templates</p>
              <div className="flex items-center text-sm text-primary font-medium">
                Get Templates <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-secondary/50 rounded-xl">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <span className="font-medium text-foreground">{faq.question}</span>
                    <ChevronRight
                      size={18}
                      className="text-muted-foreground group-open:rotate-90 transition-transform"
                    />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-2">Available 24/7</p>
                  <button className="text-sm text-primary font-medium hover:underline">Start Chat</button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-2">Response within 24hrs</p>
                  <a
                    href="mailto:support@arc-registry.org"
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    support@arc-registry.org
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground mb-2">Mon-Fri, 9am-6pm EAT</p>
                  <a href="tel:+254700000000" className="text-sm text-primary font-medium hover:underline">
                    +254 700 000 000
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
