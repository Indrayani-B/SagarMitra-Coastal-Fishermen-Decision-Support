import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProtectedRoute({ children }: any) {
  const { user } = useAuth();

  // ❌ Not logged in → go to login page
  if (!user) return <Navigate to="/login" replace />;

  // ✅ Logged in → show page
  return children;
}