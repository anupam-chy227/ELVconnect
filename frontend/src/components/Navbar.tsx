"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, LogOut, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleAuthButton } from "@/components/Auth/GoogleAuthButton";
import HeaderExperienceControls from "@/components/HeaderExperienceControls";
import ThemeToggle from "@/components/ThemeToggle";
import { useExperiencePreferences } from "@/hooks/useExperiencePreferences";
import { markDashboardNavigationIntent } from "@/components/Dashboard/DashboardLandingGuard";

const navLinks = [
  { href: "/jobs", label: "Find Work", icon: BriefcaseBusiness },
  { href: "/engineers", label: "Hire Engineers", icon: UsersRound },
  { href: "/trust-safety", label: "Trust", icon: ShieldCheck },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { t } = useExperiencePreferences();

  if (pathname?.startsWith("/admin") || pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/70 bg-white/82 shadow-sm backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/82">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-ring"
        >
          <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md border border-white/70 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <Image src="/ELVLOGO-HQ.png" alt="ELV Connect" width={88} height={88} className="h-9 w-auto object-contain" priority />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-sm font-black text-foreground">ELV Connect</span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-primary">
              <Sparkles className="h-3 w-3" />
              Security marketplace
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-border-subtle bg-surface-raised p-1 shadow-sm backdrop-blur-xl lg:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-bold transition ${
                  active ? "bg-primary text-on-primary shadow-sm" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center justify-end gap-2">
          <HeaderExperienceControls />
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                onClick={markDashboardNavigationIntent}
                className="hidden min-h-10 items-center rounded-md border border-primary/20 bg-primary-subtle px-3 text-xs font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:inline-flex dark:hover:bg-slate-900"
              >
                Dashboard
              </Link>
              <Link href="/dashboard/profile" onClick={markDashboardNavigationIntent} aria-label="Open profile">
                {user.profile.avatar ? (
                  <Image
                    src={user.profile.avatar}
                    alt={user.profile.fullName || "User"}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 rounded-full border border-white object-cover shadow-sm ring-2 ring-primary/10 transition hover:ring-primary/30 dark:border-slate-800"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-white shadow-sm ring-2 ring-primary/10">
                    {user.profile.fullName?.charAt(0) || "U"}
                  </span>
                )}
              </Link>
              <button
                onClick={() => void logout()}
                className="hidden h-10 items-center gap-2 rounded-md border border-border-subtle bg-surface px-3 text-xs font-bold text-muted-foreground shadow-sm transition hover:border-danger/25 hover:bg-danger-subtle hover:text-danger md:inline-flex"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <GoogleAuthButton
              label={t("getStarted")}
              className="ml-1 flex min-h-10 items-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary-container px-4 py-2 text-sm font-bold text-on-primary shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-floating disabled:opacity-60"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
