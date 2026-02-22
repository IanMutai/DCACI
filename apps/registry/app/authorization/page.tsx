import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import AuthorizationDashboard from "@/components/authorization/authorization-dashboard"

export default function AuthorizationPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <AuthorizationDashboard />
        </main>
      </div>
    </div>
  )
}
