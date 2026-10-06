import { useWizard } from "@/hooks/useWizard";
import { cn } from "@/lib/utils";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { useFormContext, useWatch } from "react-hook-form";

export const WizardNavigationButton = () => {
  const { control } = useFormContext<ListPropertyForm>();
  const { currentStep, setCurrentStep, setCompletedSteps, loading } =
    useWizard();

  const formState = useWatch({ control });

  const property_type = formState.property_type?.toLowerCase();
  const isLastPage = currentStep === 6;

  let activeState = false;

  switch (currentStep) {
    case 1:
      activeState = !!formState.property_type;
      break;

    case 2:
      activeState = !!formState.furnishing_status;
      break;

    case 3:
      activeState =
        !!formState.address &&
        !!formState.city &&
        !!formState.state &&
        formState.postal_code?.toString().length === 6;
      break;

    case 4:
      if (property_type === "house" || property_type === "villa") {
        activeState =
          !!formState.area &&
          !!formState.parking_spaces &&
          !!formState.bedrooms &&
          !!formState.bathrooms &&
          !!formState.balconies &&
          !!formState.total_floors;
      } else if (property_type === "apartment") {
        activeState =
          !!formState.area &&
          !!formState.parking_spaces &&
          !!formState.bedrooms &&
          !!formState.bathrooms &&
          !!formState.balconies &&
          !!formState.floor_number;
      } else {
        activeState = !!formState.area;
      }
      break;

    case 5:
      activeState =
        !!formState.images &&
        formState.images.length >= 1 &&
        formState.images.length <= 10;
      break;

    case 6:
      activeState = !!formState.price && !!formState.description;
      break;
  }

  const handleClick = () => {
    if (!activeState || isLastPage) return;

    setCompletedSteps((steps) =>
      steps.includes(currentStep) ? steps : [...steps, currentStep],
    );

    setCurrentStep((step) => step + 1);
  };

  return (
    <div className="flex justify-end pt-3">
      <button
        type={isLastPage ? "submit" : "button"}
        disabled={!activeState || loading}
        onClick={handleClick}
        className={cn(
          "px-6 py-2 bg-primary-extralight text-sm lg:text-base text-background rounded-md cursor-pointer",
          activeState && !loading && "bg-primary",
        )}
      >
        {isLastPage ? "Submit" : "Next"}
      </button>
    </div>
  );
};
