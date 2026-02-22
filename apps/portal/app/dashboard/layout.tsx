"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import { AppContextProvider } from "@/components/dashboard/context-provider";
import IntelligencePanel from "@/components/intelligence/intelligence-panel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <AppContextProvider>
      <div className="flex min-h-screen bg-[hsl(var(--background))]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader onToggleChat={() => setChatOpen((p) => !p)} chatOpen={chatOpen} />
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
      </div>

      {/* Floating Intelligence Chat */}
      {chatOpen && (
        <IntelligencePanel onClose={() => setChatOpen(false)} />
      )}

      {/* FAB - Floating Action Button for Intelligence */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-lg shadow-teal-900/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-teal-900/30 active:scale-95"
          title="Open Intelligence Chat"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}
    </AppContextProvider>
  );
}
