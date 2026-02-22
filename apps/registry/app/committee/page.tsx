import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import CommitteeReviewDashboard from "@/components/committee/committee-review-dashboard"

export default function CommitteePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <CommitteeReviewDashboard />
        </main>
      </div>
    </div>
  )
}
