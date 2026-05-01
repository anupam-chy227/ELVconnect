import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardLandingGuard from "@/components/Dashboard/DashboardLandingGuard";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLandingGuard />
      {children}
    </ProtectedRoute>
  );
}
