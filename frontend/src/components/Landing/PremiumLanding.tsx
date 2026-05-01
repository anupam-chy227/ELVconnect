"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  ClipboardList,
  CreditCard,
  DoorOpen,
  Flame,
  Languages,
  MapPin,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { markDashboardNavigationIntent } from "@/components/Dashboard/DashboardLandingGuard";

const categories = [
  { title: "CCTV", description: "IP cameras, NVR, analytics, monitoring, and handover.", href: "/categories/cctv-systems", icon: Camera },
  { title: "Fire Safety", description: "Panels, detectors, audits, AMC, and NOC readiness.", href: "/categories/fire-safety", icon: Flame },
  { title: "Access Control", description: "Biometrics, RFID, visitor flow, barriers, and attendance.", href: "/categories/access-control", icon: DoorOpen },
  { title: "Networking", description: "Cat6A, fiber, PoE, racks, switching, and documentation.", href: "/categories/networking", icon: Network },
];

const trustBar = [
  { label: "Verified engineers", icon: ShieldCheck },
  { label: "UPI-first payments", icon: CreditCard },
  { label: "Pan-India coverage", icon: MapPin },
  { label: "Hindi-ready", icon: Languages },
];

const heroStats = [
  { value: 4200, suffix: "+", label: "verified engineer network" },
  { value: 48, suffix: "h", label: "average shortlist window" },
  { value: 28, suffix: "", label: "active city clusters" },
];

const cityJobs = [
  ["Delhi NCR", "Fire NOC audit", "Rs 1.1L"],
  ["Mumbai", "Warehouse CCTV", "Rs 1.4L"],
  ["Bengaluru", "Access upgrade", "Rs 90k"],
  ["Pune", "Cat6A cabling", "Rs 1.2L"],
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 44;
    const interval = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setDisplayValue(Math.round(value * progress));
      if (frame >= totalFrames) window.clearInterval(interval);
    }, 26);

    return () => window.clearInterval(interval);
  }, [value]);

  return (
    <>
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-white/70 bg-white/80 p-3 shadow-md shadow-indigo-950/8 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70">
      <p className="text-xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs leading-4 text-muted-foreground">{label}</p>
    </div>
  );
}

function HeroConsole() {
  const steps = [
    { stage: "Site survey", status: "Done", progress: 100 },
    { stage: "Quote review", status: "Approved", progress: 100 },
    { stage: "Installation", status: "Live", progress: 68 },
    { stage: "Testing", status: "Queued", progress: 18 },
    { stage: "Handover", status: "Queued", progress: 0 },
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-500/18 via-sky-500/12 to-emerald-400/10 blur-3xl" />
      <div className="premium-glass relative overflow-hidden rounded-md p-5 shadow-floating">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 to-transparent dark:from-white/5" />
        <div className="relative flex items-center justify-between border-b border-border-subtle pb-4">
        <div>
          <p className="text-xs font-black uppercase text-primary">Project tracker</p>
          <p className="mt-1 text-lg font-black text-foreground">Factory CCTV + access rollout</p>
          <p className="text-xs text-muted-foreground">Manesar, Haryana - 5 milestone workflow</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-success-subtle px-3 py-1 text-[11px] font-black text-success shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Escrow-ready
        </span>
      </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
        <Metric value="12" label="matched engineers" />
        <Metric value="Rs 1.84L" label="best quote" />
        <Metric value="68%" label="install progress" />
      </div>

        <div className="relative mt-5 overflow-hidden rounded-md border border-border-subtle bg-surface/76 p-4 shadow-card">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-foreground">Milestone progress</p>
              <p className="text-xs text-muted-foreground">Survey to handover, payment protected</p>
            </div>
            <div className="rounded-md bg-primary-subtle px-3 py-2 text-right">
              <p className="font-mono text-lg font-black text-primary">68%</p>
              <p className="text-[10px] font-bold uppercase text-muted-foreground">live</p>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary via-secondary to-emerald-400 shadow-[0_0_24px_rgba(99,91,255,0.45)]" />
          </div>
        </div>

        <div className="relative mt-4 space-y-2.5">
          {steps.map((step, index) => (
          <div key={step.stage} className="flex items-center gap-3 rounded-md border border-border-subtle bg-surface/82 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <span className={`grid h-8 w-8 place-items-center rounded-md text-xs font-black ${step.progress >= 68 ? "bg-gradient-to-b from-primary to-primary-container text-white shadow-sm" : "bg-surface-muted text-muted-foreground"}`}>
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black text-foreground">{step.stage}</p>
                <p className={`text-[10px] font-black uppercase ${step.status === "Live" ? "text-primary" : "text-muted-foreground"}`}>{step.status}</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${step.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-sky-200 bg-sky-50/80 p-3 text-sky-800 shadow-sm dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200">
            <Radar className="h-4 w-4" />
            <p className="mt-2 text-xs font-black">4 engineers working now</p>
          </div>
          <div className="rounded-md border border-emerald-200 bg-success-subtle p-3 text-success shadow-sm">
            <CreditCard className="h-4 w-4" />
            <p className="mt-2 text-xs font-black">UPI payout guarded</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PremiumLanding() {
  const router = useRouter();

  const postRequirement = () => {
    markDashboardNavigationIntent();
    router.push("/post-requirement");
  };

  return (
    <main className="premium-shell text-foreground">
      <section className="relative overflow-hidden border-b border-border-subtle px-4 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(99,91,255,0.24),transparent_30rem),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.16),transparent_26rem),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,248,252,0.82))] dark:bg-[radial-gradient(circle_at_16%_8%,rgba(99,102,241,0.22),transparent_30rem),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.13),transparent_26rem),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(8,11,22,0.96))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/78 px-4 py-1.5 text-[11px] font-black uppercase text-primary shadow-sm backdrop-blur-xl dark:bg-slate-900/74">
              <Sparkles className="h-3.5 w-3.5" />
              Enterprise-grade ELV command network
            </div>
            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-tight text-foreground md:text-7xl">
              Build, secure, and manage every ELV project from one trusted marketplace.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Hire verified engineers, discover nearby work, track site milestones, and protect payments across CCTV, fire safety, access control, and networking projects.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={postRequirement}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary-container px-6 py-4 text-base font-black text-on-primary shadow-glow transition hover:-translate-y-1 hover:shadow-floating active:translate-y-0"
              >
                <ClipboardList className="h-4 w-4" />
                Post a Job
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/jobs"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-border-subtle bg-white/82 px-6 py-4 text-base font-black text-foreground shadow-md backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/35 hover:text-primary hover:shadow-lg dark:bg-slate-900/78"
              >
                <BriefcaseBusiness className="h-4 w-4 text-primary" />
                Find Work
              </Link>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustBar.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2 rounded-md border border-border-subtle bg-white/78 px-3 py-2.5 text-xs font-black text-foreground shadow-sm backdrop-blur-xl dark:bg-slate-900/72">
                    <Icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/70 bg-white/70 p-4 shadow-md shadow-indigo-950/8 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70">
                  <p className="font-mono text-3xl font-black tracking-tight text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-bold text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroConsole />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-primary">Core services</p>
              <h2 className="mt-2 text-3xl font-black text-foreground">Built for high-trust ELV delivery</h2>
            </div>
            <Link href="/city-directory" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
              Explore city coverage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.title} href={category.href} className="group rounded-md border border-border-subtle bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-subtle text-primary ring-1 ring-primary/10 transition group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-foreground">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-white/74 px-4 py-12 backdrop-blur-xl dark:bg-slate-950/60">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase text-primary">Location-first marketplace</p>
            <h2 className="mt-2 text-3xl font-black text-foreground">Jobs and engineers by city, area, and service radius.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Discovery starts with where the work happens: site visits, nearby engineers, city demand, and follow-up contacts stay visible.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cityJobs.map(([city, title, budget]) => (
              <div key={city} className="rounded-md border border-border-subtle bg-surface p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                    {city}
                  </span>
                  <span className="text-xs font-black text-success">{budget}</span>
                </div>
                <p className="mt-3 text-sm font-black text-foreground">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Verified client, UPI-ready, fast follow-up</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["For clients", "Post jobs, compare verified engineers, manage site visits, approve milestones, and pay securely."],
            ["For engineers", "Find nearby jobs, apply with quotes, track accepted work, build reputation, and receive payouts."],
            ["For operators", "Monitor verification, regions, payments, service quality, and live marketplace health."],
          ].map(([title, description]) => (
            <article key={title} className="premium-glass rounded-md p-5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-black text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-indigo-200">
              <BadgeCheck className="h-4 w-4" />
              Trusted security infrastructure network
            </p>
            <h2 className="mt-4 text-3xl font-black">Ready to move from calls and spreadsheets to one command center?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Bring hiring, work discovery, secure payment states, and operational follow-up into the same ELV workflow.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/post-requirement" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-black text-slate-950">
                Post Requirement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/engineers" className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-black text-white">
                Browse Engineers
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-3 flex items-center gap-1 text-amber-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-lg font-bold leading-7">
              "A cleaner way to coordinate CCTV, fire safety, access control, and networking vendors across multiple Indian cities."
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-indigo-500 text-sm font-black">EC</span>
              <div>
                <p className="text-sm font-black">Enterprise facilities team</p>
                <p className="text-xs text-slate-400">NCR, Mumbai, Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
