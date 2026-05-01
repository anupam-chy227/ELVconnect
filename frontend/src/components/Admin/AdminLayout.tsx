"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { MaterialSymbol } from "@/components/MaterialSymbol";

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Jobs", href: "/admin/jobs", icon: "work" },
  { label: "Engineers", href: "/admin/engineers", icon: "engineering" },
  { label: "Payments", href: "/admin/payments", icon: "payments" },
  { label: "SLA Status", href: "/admin/sla", icon: "verified_user" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];

function AdminSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-surface-container-low border-r border-outline-variant flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-outline-variant flex flex-col items-start gap-3">
          <Image
            src="/ELVLOGO-HQ.png"
            alt="ELV Connect Logo"
            width={260}
            height={70}
            className="h-20 w-auto object-contain"
            style={{ width: "auto" }}
          />
        </div>

        {/* Main Nav */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center px-6 py-3 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary-container/10 text-primary border-r-4 border-primary font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container hover:pl-8"
                    }`}
                  >
                    <MaterialSymbol
                      name={item.icon}
                      className={`mr-3 ${isActive ? "text-primary" : ""}`}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-outline-variant space-y-4">
          <button className="w-full bg-primary-container text-on-primary text-label-md font-label-md py-2.5 rounded-lg shadow-[0_4px_14px_0_rgba(107,70,193,0.39)] hover:shadow-[0_6px_20px_rgba(107,70,193,0.23)] hover:bg-primary transition-all duration-200">
            Post New Job
          </button>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/support"
                className="flex items-center px-2 py-2 text-on-surface-variant hover:bg-surface-container hover:pl-4 transition-all duration-200 cursor-pointer rounded"
              >
                <MaterialSymbol name="help" className="mr-3 text-sm" />
                Support
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-2 py-2 text-on-surface-variant hover:bg-surface-container hover:pl-4 transition-all duration-200 cursor-pointer rounded text-left"
              >
                <MaterialSymbol name="logout" className="mr-3 text-sm" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

function AdminHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user } = useAuth();

  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-xl text-primary font-sans text-sm font-medium tracking-tight sticky top-0 z-30 border-b border-outline-variant/50 shadow-sm shadow-primary/10 flex justify-between items-center w-full px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          aria-label="Open menu"
          className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
        >
          <MaterialSymbol name="menu" />
        </button>
        <div className="relative hidden md:block">
          <MaterialSymbol
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-full text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64 transition-all"
            placeholder="Search engineers, jobs, UPI..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-surface-container rounded-full p-1 border border-outline-variant">
          <button className="px-3 py-1 bg-surface-container-lowest rounded-full shadow-sm text-on-surface text-xs font-semibold">
            EN
          </button>
          <button className="px-3 py-1 text-on-surface-variant hover:text-on-surface text-xs font-semibold transition-colors">
            HI
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="text-on-surface-variant hover:bg-surface-container transition-all duration-300 p-2 rounded-full relative">
            <MaterialSymbol name="notifications" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button aria-label="Translate" className="text-on-surface-variant hover:bg-surface-container transition-all duration-300 p-2 rounded-full">
            <MaterialSymbol name="translate" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-on-surface">
              {user?.profile.fullName || "Admin User"}
            </p>
            <p className="text-xs text-on-surface-variant capitalize">
              {user?.role.replace("_", " ") || "Super Admin"}
            </p>
          </div>
          {user?.profile.avatar ? (
            <img
              src={user.profile.avatar}
              alt={user.profile.fullName}
              className="w-9 h-9 rounded-full object-cover border border-outline-variant"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm border border-outline-variant">
              {user?.profile.fullName?.charAt(0) || "A"}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md text-body-md">
      <AdminSidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className="flex-1 md:ml-0 min-h-screen flex flex-col">
        <AdminHeader onMenuToggle={() => setMobileMenuOpen((prev) => !prev)} />
        <div className="flex-1 p-gutter max-w-7xl mx-auto w-full space-y-gutter">
          {children}
        </div>
      </main>
    </div>
  );
}

