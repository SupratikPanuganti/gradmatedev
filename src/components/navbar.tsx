"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Mail, User, Lightbulb } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Research Emails",
      href: "/research-emails",
      icon: Mail,
    },
    {
      name: "Essay Ideas",
      href: "/essay-ideas",
      icon: Lightbulb,
    },
    {
      name: "Essay Review",
      href: "/essay-review",
      icon: Book,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">GradMate</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80 ${
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:block">{item.name}</span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
