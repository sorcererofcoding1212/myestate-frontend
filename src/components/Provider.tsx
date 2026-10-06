import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <Toaster />
      {children}
    </BrowserRouter>
  );
};
