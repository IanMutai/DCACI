"use client"

import { X, Bell } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  progress?: number
}

interface NotificationsPanelProps {
  notifications: Notification[]
}

export default function NotificationsPanel({ notifications: initialNotifications }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-5 w-[300px] shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Bell className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-foreground font-semibold">Notifications</h3>
      </div>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-secondary/50 rounded-xl p-4 relative border border-border/30 hover:border-primary/20 transition-colors"
            >
              <button
                onClick={() => dismissNotification(notification.id)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
              <div className="text-primary text-xs font-semibold mb-1">{notification.title}</div>
              <div className="text-muted-foreground text-xs pr-4 leading-relaxed">{notification.message}</div>
              {notification.progress !== undefined && (
                <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${notification.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
