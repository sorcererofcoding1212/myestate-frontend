import { Navbar } from "@/components/Navbar";
import type { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="montserrat-regular select-none">
      <Navbar />
      <div className="pt-14 lg:pt-15">{children}</div>
    </div>
  );
};
