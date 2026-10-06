import type { ReactNode } from "react";
import { useUserStore } from "@/store/user";
import { Navigate, useSearchParams } from "react-router-dom";
import { HOME } from "@/lib/constants";

export const AuthenticationRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get("redirect");

  if (user) {
    return <Navigate to={redirectUrl ?? HOME} replace />;
  }

  return <>{children}</>;
};
