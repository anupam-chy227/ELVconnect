"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileUp,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { WorkspaceShell } from "@/components/ELVConnect/WorkspaceShell";
import { Card, Stepper, type StepperStep } from "@/components/ui";
import { cn } from "@/components/ui/utils";

type FormData = {
  customerName: string;
  phone: string;
  email: string;
  projectType: string;
  elvCategory: string;
  siteType: string;
  location: string;
  budgetRange: string;
  urgency: string;
  description: string;
  files: File[];
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type FieldName = keyof FormData;

const initialFormData: FormData = {
  customerName: "",
  phone: "",
  email: "",
  projectType: "",
  elvCategory: "",
  siteType: "",
  location: "",
  budgetRange: "",
  urgency: "",
  description: "",
  files: [],
};

const steps = [
  {
    title: "Customer",
    description: "Contact and company details",
    fields: ["customerName", "phone", "email"] as const,
  },
  {
    title: "Project",
    description: "Scope, category, and site",
    fields: ["projectType", "elvCategory", "siteType", "location"] as const,
  },
  {
    title: "Budget",
    description: "Timeline, notes, and files",
    fields: ["budgetRange", "urgency", "description", "files"] as const,
  },
];

const projectTypes = ["New Installation", "Upgrade", "AMC / Maintenance", "Repair", "Compliance Audit"];
const elvCategories = ["CCTV", "Fire Safety", "Access Control", "Networking", "BMS", "PA System", "Intercom"];
const siteTypes = ["Factory", "Office", "Warehouse", "Residential Tower", "Retail", "School", "Hospital", "Other"];
const budgetRanges = ["Below Rs 50,000", "Rs 50,000 - Rs 1,50,000", "Rs 1,50,000 - Rs 5,00,000", "Above Rs 5,00,000", "Need Quote"];
const urgencyLevels = ["Immediate", "Within 7 days", "Within 30 days", "Planning stage"];

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value: string) {
  return /^[0-9+\-\s()]{8,16}$/.test(value);
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-danger">
      <AlertCircle className="h-3.5 w-3.5" />
      {error}
    </p>
  );
}

function FieldShell({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-black text-foreground">{label}</span>
        {hint ? <span className="text-[11px] font-semibold text-muted-foreground">{hint}</span> : null}
      </span>
      {children}
      <FieldError error={error} />
    </label>
  );
}

function fieldClass(error?: string) {
  return cn(
    "min-h-11 w-full rounded-md border bg-surface px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground hover:border-border-strong focus:border-primary focus:shadow-focus",
    error ? "border-danger focus:border-danger focus:ring-4 focus:ring-rose-500/10" : "border-border-subtle",
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-md border border-border-subtle bg-surface-muted p-3">
      <p className="text-[10px] font-black uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-foreground">{value || "Not added"}</p>
    </div>
  );
}

export default function PostRequirementPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedStep = steps[currentStep];
  const requiredFields = useMemo(() => selectedStep.fields, [selectedStep]);
  const completedFields = Object.entries(formData).filter(([, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value).trim().length > 0;
  }).length;
  const completionPercent = Math.round((completedFields / Object.keys(initialFormData).length) * 100);

  const stepperSteps: StepperStep[] = steps.map((step, index) => {
    const hasError = step.fields.some((field) => errors[field]);
    return {
      label: step.title,
      description: step.description,
      status: hasError ? "error" : index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming",
    };
  });

  const updateField = <K extends FieldName>(field: K, value: FormData[K]) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validateStep = () => {
    const nextErrors: FormErrors = {};

    for (const field of requiredFields) {
      const value = formData[field];

      if (field === "files") continue;
      if (typeof value === "string" && !value.trim()) {
        nextErrors[field] = "This field is required";
      }
    }

    if (currentStep === 0) {
      if (formData.email && !validateEmail(formData.email)) nextErrors.email = "Enter a valid email";
      if (formData.phone && !validatePhone(formData.phone)) nextErrors.phone = "Enter a valid phone number";
    }

    if (currentStep === 2 && formData.description.trim().length < 20) {
      nextErrors.description = "Add at least 20 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const previousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;
    setSubmitted(true);
  };

  return (
    <WorkspaceShell
      title="Post Requirement"
      subtitle="यह तुम्हारा core flow है — structured details भरो और verified ELV engineers से fast matching पाओ."
    >
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4">
          <Stepper steps={stepperSteps} progress={Math.round(((currentStep + 1) / steps.length) * 100)} />

          <form onSubmit={submitForm}>
            <Card variant="glass" padding="none" className="overflow-hidden">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 text-center"
                >
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-subtle text-success">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-foreground">Requirement submitted</h2>
                  <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                    Your project has been captured. Verified engineers can now be matched by category, location, budget, and urgency.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialFormData);
                      setErrors({});
                      setSubmitted(false);
                      setCurrentStep(0);
                    }}
                    className="mt-5 rounded-md bg-gradient-to-b from-primary to-primary-container px-5 py-3 text-sm font-black text-on-primary shadow-glow transition hover:-translate-y-0.5 hover:shadow-floating"
                  >
                    Post another requirement
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="border-b border-border-subtle bg-gradient-to-r from-white via-white to-primary-subtle/70 p-5 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
                    <p className="text-[11px] font-black uppercase text-primary">Step {currentStep + 1} of {steps.length}</p>
                    <h2 className="mt-2 text-2xl font-black text-foreground">{selectedStep.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{selectedStep.description}</p>
                  </div>

                  <div className="p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.22 }}
                      >
                        {currentStep === 0 ? (
                          <div className="grid gap-4 md:grid-cols-2">
                            <FieldShell label="Customer Name" error={errors.customerName}>
                              <input
                                value={formData.customerName}
                                onChange={(event) => updateField("customerName", event.target.value)}
                                className={fieldClass(errors.customerName)}
                                placeholder="Amit Sharma"
                              />
                            </FieldShell>
                            <FieldShell label="Phone" error={errors.phone} hint="WhatsApp preferred">
                              <input
                                value={formData.phone}
                                onChange={(event) => updateField("phone", event.target.value)}
                                className={fieldClass(errors.phone)}
                                placeholder="+91 98765 43210"
                              />
                            </FieldShell>
                            <FieldShell label="Email" error={errors.email} className="md:col-span-2">
                              <input
                                value={formData.email}
                                onChange={(event) => updateField("email", event.target.value)}
                                className={fieldClass(errors.email)}
                                placeholder="amit@company.com"
                              />
                            </FieldShell>
                          </div>
                        ) : null}

                        {currentStep === 1 ? (
                          <div className="grid gap-4 md:grid-cols-2">
                            <FieldShell label="Project Type" error={errors.projectType}>
                              <select value={formData.projectType} onChange={(event) => updateField("projectType", event.target.value)} className={fieldClass(errors.projectType)}>
                                <option value="">Select project type</option>
                                {projectTypes.map((item) => <option key={item}>{item}</option>)}
                              </select>
                            </FieldShell>
                            <FieldShell label="ELV Category" error={errors.elvCategory}>
                              <select value={formData.elvCategory} onChange={(event) => updateField("elvCategory", event.target.value)} className={fieldClass(errors.elvCategory)}>
                                <option value="">Select category</option>
                                {elvCategories.map((item) => <option key={item}>{item}</option>)}
                              </select>
                            </FieldShell>
                            <FieldShell label="Site Type" error={errors.siteType}>
                              <select value={formData.siteType} onChange={(event) => updateField("siteType", event.target.value)} className={fieldClass(errors.siteType)}>
                                <option value="">Select site type</option>
                                {siteTypes.map((item) => <option key={item}>{item}</option>)}
                              </select>
                            </FieldShell>
                            <FieldShell label="Location" error={errors.location}>
                              <input
                                value={formData.location}
                                onChange={(event) => updateField("location", event.target.value)}
                                className={fieldClass(errors.location)}
                                placeholder="Delhi NCR, Sector 62, Noida"
                              />
                            </FieldShell>
                            <div className="rounded-md border border-dashed border-primary/30 bg-primary-subtle p-4 md:col-span-2">
                              <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                                <div>
                                  <p className="text-sm font-black text-foreground">Location matching matters</p>
                                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Add city, area, landmark, or GPS context so nearby engineers can be shortlisted faster.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {currentStep === 2 ? (
                          <div className="grid gap-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <FieldShell label="Budget Range" error={errors.budgetRange}>
                                <select value={formData.budgetRange} onChange={(event) => updateField("budgetRange", event.target.value)} className={fieldClass(errors.budgetRange)}>
                                  <option value="">Select budget</option>
                                  {budgetRanges.map((item) => <option key={item}>{item}</option>)}
                                </select>
                              </FieldShell>
                              <FieldShell label="Urgency" error={errors.urgency}>
                                <select value={formData.urgency} onChange={(event) => updateField("urgency", event.target.value)} className={fieldClass(errors.urgency)}>
                                  <option value="">Select urgency</option>
                                  {urgencyLevels.map((item) => <option key={item}>{item}</option>)}
                                </select>
                              </FieldShell>
                            </div>
                            <FieldShell label="Description" error={errors.description} hint={`${formData.description.length}/20 min`}>
                              <textarea
                                value={formData.description}
                                onChange={(event) => updateField("description", event.target.value)}
                                className={cn(fieldClass(errors.description), "min-h-32 resize-y")}
                                placeholder="Example: Need CCTV for factory with 16 cameras, night vision, NVR, mobile view, and installation within 7 days."
                              />
                            </FieldShell>
                            <label className="block rounded-md border border-dashed border-primary/30 bg-primary-subtle p-5 text-center transition hover:border-primary/50 hover:bg-white dark:hover:bg-slate-900">
                              <FileUp className="mx-auto h-7 w-7 text-primary" />
                              <p className="mt-2 text-sm font-black text-foreground">Upload photos or drawings</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG, PDF supported</p>
                              <input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                className="sr-only"
                                onChange={(event) => updateField("files", Array.from(event.target.files || []))}
                              />
                              {formData.files.length > 0 ? (
                                <p className="mt-2 text-xs font-black text-primary">
                                  {formData.files.length} file{formData.files.length > 1 ? "s" : ""} selected
                                </p>
                              ) : null}
                            </label>
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-6 flex flex-col gap-2 border-t border-border-subtle pt-5 sm:flex-row sm:justify-between">
                      <button
                        type="button"
                        onClick={previousStep}
                        disabled={currentStep === 0}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface px-4 py-2 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      {currentStep < steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary-container px-5 py-2 text-sm font-black text-on-primary shadow-glow transition hover:-translate-y-0.5 hover:shadow-floating"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary-container px-5 py-2 text-sm font-black text-on-primary shadow-glow transition hover:-translate-y-0.5 hover:shadow-floating"
                        >
                          <Send className="h-4 w-4" />
                          Submit Requirement
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </form>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <Card variant="glass" title="Requirement summary" description="Live preview of the matching payload.">
            <div className="mb-4 flex items-center gap-3 rounded-md border border-primary/15 bg-primary-subtle p-3">
              <ClipboardList className="h-5 w-5 text-primary" />
              <div className="min-w-0">
                <p className="text-sm font-black text-foreground">{completionPercent}% complete</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/70 dark:bg-slate-950/50">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${completionPercent}%` }} />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <SummaryRow label="Customer" value={formData.customerName} />
              <SummaryRow label="Category" value={formData.elvCategory} />
              <SummaryRow label="Site" value={formData.siteType} />
              <SummaryRow label="Location" value={formData.location} />
              <SummaryRow label="Budget" value={formData.budgetRange} />
              <SummaryRow label="Urgency" value={formData.urgency} />
            </div>
          </Card>

          {[
            ["Validated scope", "Clear fields reduce matching calls and quote friction."],
            ["Verified engineer matching", "Category, site type, and location help shortlist better vendors."],
            ["Quote and milestone tracking", "Budget and urgency help build a cleaner delivery workflow."],
          ].map(([title, text], index) => (
            <Card key={title} variant="interactive" padding="sm">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-subtle text-primary">
                  {index === 0 ? <ShieldCheck className="h-4 w-4" /> : index === 1 ? <Sparkles className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                </span>
                <div>
                  <p className="text-sm font-black text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              </div>
            </Card>
          ))}
        </aside>
      </section>
    </WorkspaceShell>
  );
}
