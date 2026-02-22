"use client"

import Link from "next/link"
import { Search, Settings, ExternalLink, Command } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NotificationsDropdown from "./notifications-dropdown"

export default function Header() {
  return (
    <header className="h-20 bg-card/80 backdrop-blur-xl border-b border-border/60 flex items-center justify-between px-8 py-4 sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
          />
          <Command
            size={12}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hidden md:block"
          />
          <input
            type="text"
            placeholder="Search projects, documents, or press ⌘K..."
            className="w-full pl-11 pr-12 py-3 bg-secondary/50 hover:bg-secondary/80 focus:bg-card rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/50 focus:border-primary/30 transition-all placeholder:text-muted-foreground shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Link
          href="http://www.arc.verst.earth/"
          target="_blank"
          className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:text-primary/80 hover:bg-primary/5 rounded-xl transition-all font-medium group"
        >
          <ExternalLink
            size={15}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
          Public Portal
        </Link>

        <NotificationsDropdown />

        <div className="w-px h-10 bg-border/60" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-foreground">Hello, Ian</div>
            <div className="text-xs text-muted-foreground font-medium">Project Originator</div>
          </div>
          <Avatar className="w-11 h-11 border-2 border-primary/20 ring-2 ring-primary/5 hover:ring-primary/10 transition-all cursor-pointer">
            <AvatarImage src="/images/dsc-0640.jpg" className="object-cover object-[center_15%]" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-semibold">
              IM
            </AvatarFallback>
          </Avatar>
          <Link href="/settings" className="relative p-2.5 hover:bg-secondary/80 rounded-xl transition-all group">
            <Settings
              size={19}
              className="text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
