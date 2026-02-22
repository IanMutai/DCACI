"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  FileText,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Users,
  X,
  ExternalLink,
  Clock,
  XCircle,
} from "lucide-react"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "approval",
    title: "PCN Approved - Letter Issued",
    message:
      "Your Project Concept Note for Kilifi Solar Project has been approved. Letter of No Objection (LONO-2025-001234) is now available.",
    time: "2 hours ago",
    read: false,
    link: "/pcn",
    actionLabel: "View Letter",
  },
  {
    id: 2,
    type: "correction",
    title: "PDD Corrections Requested",
    message: "The committee has requested additional information for your Mombasa Wind Farm PDD submission.",
    time: "5 hours ago",
    read: false,
    link: "/pdd",
    actionLabel: "View Feedback",
  },
  {
    id: 3,
    type: "review",
    title: "Authorization Under Review",
    message: "Your authorization request for Nairobi Biogas Project is currently being reviewed by the committee.",
    time: "1 day ago",
    read: false,
    link: "/authorization",
    actionLabel: "Check Status",
  },
  {
    id: 4,
    type: "credit",
    title: "Credits Issued",
    message: "25,123 carbon credits have been issued for Kilifi Solar Project.",
    time: "2 days ago",
    read: true,
    link: "/issuance",
    actionLabel: "Download Certificate",
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Confirmed",
    message: "Your admin fee payment of KES 150,000 has been successfully processed.",
    time: "3 days ago",
    read: true,
    link: "/pdd",
    actionLabel: "View Receipt",
  },
  {
    id: 6,
    type: "community",
    title: "Community Agreement Update",
    message: "The local community stakeholder group has signed the benefit-sharing agreement.",
    time: "4 days ago",
    read: true,
    link: "/community-development",
  },
  {
    id: 7,
    type: "alert",
    title: "Verification Due Soon",
    message: "Annual verification report is due in 7 days for Turkana Wind Power project.",
    time: "5 days ago",
    read: true,
    link: "/monitoring",
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "approval":
      return <CheckCircle2 size={18} className="text-primary" />
    case "correction":
      return <AlertCircle size={18} className="text-amber-600" />
    case "review":
      return <Clock size={18} className="text-blue-600" />
    case "rejection":
      return <XCircle size={18} className="text-red-600" />
    case "document":
      return <FileText size={18} className="text-blue-600" />
    case "credit":
      return <CreditCard size={18} className="text-purple-600" />
    case "payment":
      return <CheckCircle2 size={18} className="text-green-600" />
    case "community":
      return <Users size={18} className="text-amber-600" />
    case "alert":
      return <AlertCircle size={18} className="text-red-600" />
    default:
      return <Bell size={18} className="text-muted-foreground" />
  }
}

const getBackgroundColor = (type: string) => {
  switch (type) {
    case "approval":
      return "bg-primary/10"
    case "correction":
      return "bg-amber-50 dark:bg-amber-900/20"
    case "review":
      return "bg-blue-50 dark:bg-blue-900/20"
    case "rejection":
      return "bg-red-50 dark:bg-red-900/20"
    case "document":
      return "bg-blue-50 dark:bg-blue-900/20"
    case "credit":
      return "bg-purple-50 dark:bg-purple-900/20"
    case "payment":
      return "bg-green-50 dark:bg-green-900/20"
    case "community":
      return "bg-amber-50 dark:bg-amber-900/20"
    case "alert":
      return "bg-red-50 dark:bg-red-900/20"
    default:
      return "bg-secondary/50"
  }
}

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 hover:bg-secondary rounded-xl transition-colors"
      >
        <Bell size={20} className="text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[420px] bg-card rounded-2xl border border-border shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30">
            <div>
              <h3 className="font-serif font-semibold text-foreground">Notifications</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{unreadCount} unread messages</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-primary hover:underline font-medium">Mark all read</button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[500px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-0 ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getBackgroundColor(notification.type)}`}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{notification.title}</h4>
                      {!notification.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground/60">{notification.time}</span>
                      {notification.actionLabel && (
                        <Link
                          href={notification.link}
                          onClick={() => setIsOpen(false)}
                          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                        >
                          {notification.actionLabel}
                          <ExternalLink size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-secondary/30">
            <Link
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 text-sm text-primary font-semibold hover:underline py-2"
            >
              View all notifications
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
