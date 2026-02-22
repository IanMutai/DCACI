"use client"

import { useState } from "react"
import { Bell, CheckCircle2, AlertCircle, XCircle, FileText, X, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  type: "approval" | "rejection" | "correction-request" | "letter-issued" | "info"
  title: string
  message: string
  projectName: string
  timestamp: string
  read: boolean
  actionLink?: string
  actionLabel?: string
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "approval",
      title: "PCN Approved",
      message: "Your Project Concept Note has been approved. Letter of No Objection is now available.",
      projectName: "Kilifi Solar Project",
      timestamp: "2 hours ago",
      read: false,
      actionLink: "/pcn",
      actionLabel: "View Letter",
    },
    {
      id: "2",
      type: "correction-request",
      title: "Corrections Requested",
      message: "The committee has requested additional information for your PDD submission.",
      projectName: "Mombasa Wind Farm",
      timestamp: "1 day ago",
      read: false,
      actionLink: "/pdd",
      actionLabel: "View Details",
    },
    {
      id: "3",
      type: "info",
      title: "Review In Progress",
      message: "Your authorization request is currently under review by the committee.",
      projectName: "Nairobi Biogas Project",
      timestamp: "3 days ago",
      read: true,
      actionLink: "/authorization",
      actionLabel: "Check Status",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return <CheckCircle2 className="w-5 h-5 text-primary" />
      case "rejection":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "correction-request":
        return <AlertCircle className="w-5 h-5 text-amber-500" />
      case "letter-issued":
        return <FileText className="w-5 h-5 text-primary" />
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getBackgroundColor = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return "bg-primary/5 border-primary/20"
      case "rejection":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/30"
      case "correction-request":
        return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30"
      default:
        return "bg-secondary/50 border-border/50"
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-primary" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{unreadCount}</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-serif font-semibold text-lg text-foreground">Notifications</h2>
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`relative rounded-xl p-4 border transition-all ${getBackgroundColor(notification.type)} ${
                !notification.read ? "shadow-sm" : "opacity-60"
              }`}
            >
              {/* Unread Indicator */}
              {!notification.read && <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>}

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeNotification(notification.id)
                }}
                className="absolute top-2 right-2 p-1 hover:bg-background/50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                <div className="flex-1 pr-8">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{notification.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{notification.projectName}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{notification.message}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    {notification.actionLink && (
                      <Link
                        href={notification.actionLink}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        {notification.actionLabel}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
