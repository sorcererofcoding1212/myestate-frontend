import { WizardContext } from "@/hooks/useWizard";
import type { WizardContextProps } from "@/lib/types";
import { type ReactNode } from "react";

type WizardProviderProps = WizardContextProps & {
  children: ReactNode;
};

export const WizardProvider = ({
  children,
  loading,
  currentStep,
  setCurrentStep,
  completedSteps,
  setCompletedSteps,
  setLoading
}: WizardProviderProps) => {
  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        completedSteps,
        setCompletedSteps,
        loading,
        setLoading
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
