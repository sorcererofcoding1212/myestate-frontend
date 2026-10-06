import type { WizardContextProps } from "@/lib/types";
import { createContext, useContext } from "react";

export const WizardContext = createContext<WizardContextProps | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);

  if (!context) throw new Error("Some error occured");

  return context;
};
