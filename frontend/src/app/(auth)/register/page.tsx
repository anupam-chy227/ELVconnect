import { RegisterForm } from "@/components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="premium-mesh relative flex min-h-screen items-center justify-center overflow-hidden p-4 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <RegisterForm />
    </div>
  );
}
