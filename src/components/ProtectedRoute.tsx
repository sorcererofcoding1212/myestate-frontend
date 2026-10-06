import { LOGIN } from "@/lib/constants";
import { useUserStore } from "@/store/user";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  if (!user) {
    const redirectPath = location.pathname + location.search;
    return (
      <Navigate
        to={`${LOGIN}?redirect=${encodeURIComponent(redirectPath)}`}
        replace={true}
      />
    );
  }
  return <>{children}</>;
};
