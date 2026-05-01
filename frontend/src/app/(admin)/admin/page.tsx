import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Eye,
  FileWarning,
  MessageSquareWarning,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { DataCard, StatusPill, WorkspaceShell } from "@/components/ELVConnect/WorkspaceShell";
import { projects, vendors } from "@/lib/elv-demo-data";

const approvalQueue = [
  {
    company: "Prime SecureTech",
    category: "CCTV",
    city: "Delhi NCR",
    documents: "GST, PAN, ISO 9001",
    risk: "low",
    submitted: "18 min ago",
  },
  {
    company: "Aegis Fire Systems",
    category: "Fire Safety",
    city: "Mumbai",
    documents: "Fire NOC, OEM letter",
    risk: "medium",
    submitted: "42 min ago",
  },
  {
    company: "MetroNet ELV Works",
    category: "Networking",
    city: "Bengaluru",
    documents: "Cisco, Fluke reports",
    risk: "low",
    submitted: "1 hr ago",
  },
];

const delayAlerts = [
  { project: "Fire NOC readiness", owner: "FireGrid Safety Works", reason: "Testing report overdue", age: "26 hrs", severity: "high" },
  { project: "Factory CCTV deployment", owner: "Secure Vision Systems", reason: "Material dispatch proof pending", age: "8 hrs", severity: "medium" },
  { project: "Office structured cabling", owner: "FiberLink Networks", reason: "Client sign-off awaiting", age: "5 hrs", severity: "low" },
];

const qaAudits = [
  { item: "Camera angle verification", project: "Factory CCTV deployment", score: "92%", status: "approved" },
  { item: "Fire panel loop test", project: "Fire NOC readiness", score: "68%", status: "high" },
  { item: "Fiber OTDR report", project: "Office structured cabling", score: "88%", status: "pending" },
];

const paymentReleases = [
  { vendor: "Secure Vision Systems", milestone: "Installation 60%", amount: "Rs 96,000", status: "pending" },
  { vendor: "FireGrid Safety Works", milestone: "Survey + BOQ", amount: "Rs 22,000", status: "approved" },
  { vendor: "FiberLink Networks", milestone: "Testing completed", amount: "Rs 54,000", status: "pending" },
];

const complaints = [
  { ticket: "ESC-1024", customer: "Northline Warehouse", issue: "Engineer missed visit window", priority: "high" },
  { ticket: "ESC-1025", customer: "Metro CoWorks", issue: "Quote revision not received", priority: "medium" },
  { ticket: "ESC-1026", customer: "Apex Auto Parts", issue: "Invoice document mismatch", priority: "medium" },
];

function OpsPanel({
  title,
  caption,
  icon: Icon,
  children,
}: {
  title: string;
  caption: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">{caption}</p>
        </div>
        <span className="rounded-md bg-primary-container/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      {children}
    </section>
  );
}

export default function AdminRootPage() {
  return (
    <WorkspaceShell
      title="Enterprise Ops Console"
      subtitle="Control vendor onboarding, project delivery, QA risk, payments, escalations, and platform health from one admin workspace."
      actions={
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary-container px-3 py-2 text-xs font-bold text-on-primary shadow-sm">
          <BarChart3 className="h-4 w-4" />
          Export Report
        </button>
      }
    >
      <section className="grid gap-3 md:grid-cols-5">
        <DataCard title="Leads" value="248" caption="This month" icon={UsersRound} />
        <DataCard title="Conversion" value="31%" caption="+4.2% vs last week" icon={TrendingUp} />
        <DataCard title="Active Projects" value="42" caption="Live delivery" icon={ClipboardList} />
        <DataCard title="Delayed Projects" value="3" caption="Escalation watch" icon={AlertTriangle} />
        <DataCard title="Revenue" value="Rs 18.6L" caption="GMV tracked" icon={Banknote} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <OpsPanel title="Vendor Approval Queue" caption="Review onboarding submissions, document readiness, and category fit." icon={Building2}>
          <div className="grid gap-3">
            {approvalQueue.map((vendor) => (
              <article key={vendor.company} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-950">{vendor.company}</h3>
                      <StatusPill status={vendor.risk} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{vendor.category} - {vendor.city}</p>
                    <p className="mt-2 text-xs font-semibold text-slate-600">Documents: {vendor.documents}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Submitted {vendor.submitted}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">Review</button>
                    <button className="rounded-md bg-primary-container px-3 py-2 text-xs font-bold text-on-primary">Approve</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </OpsPanel>

        <OpsPanel title="Project Monitoring Table" caption="Track project health, progress, delivery owner, and customer-facing status." icon={ClipboardList}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-3">Project</th>
                  <th className="py-2 pr-3">Category</th>
                  <th className="py-2 pr-3">Vendor</th>
                  <th className="py-2 pr-3">Progress</th>
                  <th className="py-2 pr-3">Risk</th>
                  <th className="py-2 pr-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="py-3 pr-3">
                      <p className="font-bold text-slate-950">{project.title}</p>
                      <p className="mt-1 text-slate-500">{project.location}</p>
                    </td>
                    <td className="py-3 pr-3 font-semibold">{project.category}</td>
                    <td className="py-3 pr-3">{project.vendor}</td>
                    <td className="py-3 pr-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-primary-container" style={{ width: `${project.progress}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] font-bold">{project.progress}%</p>
                    </td>
                    <td className="py-3 pr-3">
                      <StatusPill status={project.delayRisk} />
                    </td>
                    <td className="py-3 pr-3">
                      <Link href={`/project/${project.id}`} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 font-bold text-slate-700">
                        <Eye className="h-3.5 w-3.5" />
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OpsPanel>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <OpsPanel title="Delay Alerts" caption="SLA breaches and predicted project delay risks requiring intervention." icon={ShieldAlert}>
          <div className="grid gap-2">
            {delayAlerts.map((alert) => (
              <div key={`${alert.project}-${alert.reason}`} className="rounded-lg border border-rose-100 bg-rose-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-rose-950">{alert.project}</p>
                    <p className="mt-1 text-xs text-rose-700">{alert.reason}</p>
                    <p className="mt-1 text-[11px] text-rose-600">{alert.owner} - {alert.age}</p>
                  </div>
                  <StatusPill status={alert.severity} />
                </div>
              </div>
            ))}
          </div>
        </OpsPanel>

        <OpsPanel title="QA Audit Panel" caption="Quality checkpoints across survey, installation, testing, and handover." icon={ClipboardCheck}>
          <div className="grid gap-2">
            {qaAudits.map((audit) => (
              <div key={`${audit.item}-${audit.project}`} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold">{audit.item}</p>
                    <p className="mt-1 text-xs text-slate-500">{audit.project}</p>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold">{audit.score}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <StatusPill status={audit.status} />
                  <button className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-700">Audit</button>
                </div>
              </div>
            ))}
          </div>
        </OpsPanel>

        <OpsPanel title="Payment Release Panel" caption="Milestone payouts that need admin validation before release." icon={Banknote}>
          <div className="grid gap-2">
            {paymentReleases.map((payment) => (
              <div key={`${payment.vendor}-${payment.milestone}`} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold">{payment.vendor}</p>
                    <p className="mt-1 text-xs text-slate-500">{payment.milestone}</p>
                  </div>
                  <p className="text-xs font-bold text-primary">{payment.amount}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <StatusPill status={payment.status} />
                  <button className="rounded-md bg-primary-container px-2 py-1 text-[11px] font-bold text-on-primary">Release</button>
                </div>
              </div>
            ))}
          </div>
        </OpsPanel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <OpsPanel title="Complaint Escalation Panel" caption="Customer and vendor escalations requiring operations owner response." icon={MessageSquareWarning}>
          <div className="grid gap-3">
            {complaints.map((complaint) => (
              <article key={complaint.ticket} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold">{complaint.ticket}</p>
                      <StatusPill status={complaint.priority} />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-700">{complaint.customer}</p>
                    <p className="mt-1 text-xs text-slate-500">{complaint.issue}</p>
                  </div>
                  <button className="rounded-md border border-primary/25 px-3 py-2 text-xs font-bold text-primary">Assign Owner</button>
                </div>
              </article>
            ))}
          </div>
        </OpsPanel>

        <OpsPanel title="Network Health" caption="Vendor capacity, compliance posture, and operational readiness." icon={ShieldCheck}>
          <div className="grid gap-3 sm:grid-cols-2">
            {vendors.slice(0, 4).map((vendor) => (
              <div key={vendor.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold">{vendor.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{vendor.category} - {vendor.city}</p>
                  </div>
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-md bg-slate-50 p-2">
                    <p className="font-bold text-slate-950">{vendor.score}</p>
                    <p className="text-slate-500">Score</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-2">
                    <p className="font-bold text-slate-950">{vendor.rating}</p>
                    <p className="text-slate-500">Rating</p>
                  </div>
                  <div className="rounded-md bg-slate-50 p-2">
                    <p className="font-bold text-slate-950">{vendor.response}</p>
                    <p className="text-slate-500">Response</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </OpsPanel>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h3 className="mt-2 text-sm font-bold">Approval SLA</h3>
            <p className="mt-1 text-xs text-slate-500">82% vendor approvals completed within target window.</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <Clock3 className="h-5 w-5 text-primary" />
            <h3 className="mt-2 text-sm font-bold">Response Time</h3>
            <p className="mt-1 text-xs text-slate-500">Average lead response is 21 minutes across top vendors.</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <FileWarning className="h-5 w-5 text-amber-600" />
            <h3 className="mt-2 text-sm font-bold">Document Risk</h3>
            <p className="mt-1 text-xs text-slate-500">7 project vaults need warranty or testing uploads.</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <Banknote className="h-5 w-5 text-emerald-600" />
            <h3 className="mt-2 text-sm font-bold">Payment Control</h3>
            <p className="mt-1 text-xs text-slate-500">Rs 1.72L pending release after QA verification.</p>
          </div>
        </div>
      </section>
    </WorkspaceShell>
  );
}
