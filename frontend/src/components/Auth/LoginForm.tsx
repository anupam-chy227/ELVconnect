"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useToast } from "@/components/Toast";
import { AlertCircle, ArrowRight, CreditCard, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { markDashboardNavigationIntent } from "@/components/Dashboard/DashboardLandingGuard";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      const validatedData = loginSchema.parse(formData);

      // Call login
      await login(validatedData);

      // Redirect to dashboard
      markDashboardNavigationIntent();
      router.push("/dashboard");
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const formErrors: Partial<LoginFormData> = {};
        error.errors.forEach(
          (err: { path: (string | number)[]; message: string }) => {
            const field = err.path[0] as keyof LoginFormData;
            formErrors[field] = err.message as any;
          }
        );
        setErrors(formErrors);
      } else {
        // API error
        addToast("Login failed. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 w-full">
      <div className="rounded-md border border-white/70 bg-white/92 p-7 shadow-2xl shadow-indigo-950/18 backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-950/88">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-subtle px-3 py-1 text-[11px] font-black uppercase text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure ELV access
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-success-subtle px-3 py-1 text-[11px] font-black uppercase text-success">
            <Sparkles className="h-3.5 w-3.5" />
            Verified platform
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-black tracking-tight text-foreground">Welcome back</h1>
        <p className="mb-7 text-sm leading-6 text-muted-foreground">
          Continue to your secure command center for jobs, engineers, payments, and project follow-up.
        </p>

        <GoogleAuthButton
          label="Continue with Google"
          className="group flex w-full items-center justify-center gap-3 rounded-md border border-border-subtle bg-white px-4 py-3 text-sm font-black text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary-subtle hover:text-primary hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-900"
        />

        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-xs font-semibold text-muted-foreground dark:bg-slate-950">or sign in with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-black text-foreground">
              Email Address
            </label>
            <div className="group relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground transition group-focus-within:text-primary" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`min-h-12 w-full rounded-md border bg-surface py-3 pl-11 pr-4 text-foreground shadow-sm transition-all placeholder:text-muted-foreground hover:border-border-strong focus:border-primary focus:outline-none focus:shadow-focus ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-border-subtle"
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-black text-foreground">
              Password
            </label>
            <div className="group relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground transition group-focus-within:text-primary" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`min-h-12 w-full rounded-md border bg-surface py-3 pl-11 pr-4 text-foreground shadow-sm transition-all placeholder:text-muted-foreground hover:border-border-strong focus:border-primary focus:outline-none focus:shadow-focus ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-border-subtle"
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.password && (
              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary-container px-4 py-3 font-black text-on-primary shadow-glow transition duration-200 hover:-translate-y-0.5 hover:shadow-floating active:translate-y-0 disabled:bg-gray-400 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
            {!isSubmitting ? <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /> : null}
          </button>
        </form>

        <div className="relative mt-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-xs font-semibold text-muted-foreground dark:bg-slate-950">Need a manual account?</span>
          </div>
        </div>

        <p className="mt-6 text-center text-muted-foreground">
          <a
            href="/register"
            className="font-bold text-primary transition-colors hover:text-secondary"
          >
            Create an account
          </a>
        </p>
      </div>

      <div className="mt-5 rounded-md border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80">
        <p className="flex items-start gap-2 text-sm text-foreground">
          <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            <span className="font-semibold">Demo Credentials:</span>
            <br />
            Email: test@example.com
            <br />
            Password: Demo@12345 (if available)
          </span>
        </p>
      </div>
    </div>
  );
}
