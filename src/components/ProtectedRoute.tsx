
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuthState } from "../services/authService";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = getAuthState();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to access this page");
    }
  }, [isAuthenticated]);
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
