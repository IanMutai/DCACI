import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import NotificationCenter from "@/components/notifications/notification-center"

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <NotificationCenter />
          </div>
        </main>
      </div>
    </div>
  )
}
