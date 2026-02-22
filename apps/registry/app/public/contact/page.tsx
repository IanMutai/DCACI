"use client"

import type React from "react"
import { useState } from "react"
import PublicHeader from "@/components/public/public-header"
import PublicFooter from "@/components/public/public-footer"
import { Mail, Send, Clock, Globe, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="h2 text-foreground mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have questions about the ARC platform? We're here to help you get started with carbon credit management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-elevated p-6">
                <h2 className="font-semibold text-foreground mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm mb-1">Platform</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        African Registry for Carbon
                        <br />
                        Digital Public Goods
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm mb-1">Email</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        support@arc-registry.org
                        <br />
                        info@arc-registry.org
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm mb-1">Support Hours</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        Monday - Friday
                        <br />
                        9:00 AM - 6:00 PM (GMT+3)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partners */}
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-foreground mb-4">Platform Partners</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>ARC is developed and maintained by:</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs">
                      GIZ
                    </div>
                    <span className="text-foreground">Deutsche Gesellschaft für Internationale Zusammenarbeit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs">
                      VC
                    </div>
                    <span className="text-foreground">Verst Carbon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-elevated p-8">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-success" />
                    </div>
                    <h2 className="text-xl font-serif font-medium text-foreground mb-3">Message Sent!</h2>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                      Thank you for contacting us. We'll get back to you within 2-3 business days.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: "", email: "", country: "", subject: "", message: "" })
                      }}
                      className="btn-primary"
                    >
                      Send Another Message
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-semibold text-foreground mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your name"
                            className="input-field"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            className="input-field"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="input-field"
                          required
                        >
                          <option value="">Select your country</option>
                          <option value="kenya">Kenya</option>
                          <option value="nigeria">Nigeria</option>
                          <option value="ethiopia">Ethiopia</option>
                          <option value="morocco">Morocco</option>
                          <option value="tanzania">Tanzania</option>
                          <option value="south_africa">South Africa</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="What is this regarding?"
                          className="input-field"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Write your message here..."
                          rows={5}
                          className="input-field resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
