import type { ListPropertyForm } from "@/schemas/properties/list";
import { useFormContext } from "react-hook-form";
import { WizardHeader } from "./WizardHeader";
import { useWizard } from "@/hooks/useWizard";

export const FurnishingStatusSelector = () => {
  const { register } = useFormContext<ListPropertyForm>();
  const { loading } = useWizard();

  const furnisingOptions = [
    {
      id: "FURNISHED",
      label: "Fully furnished",
    },
    {
      id: "SEMI_FURNISHED",
      label: "Semi Furnished",
    },
    {
      id: "UNFURNISHED",
      label: "Unfurnished",
    },
  ];

  return (
    <div>
      <div>
        <WizardHeader
          heading="Furnishing Status"
          subheading="Select the furnishing status that best describes your property"
        />
      </div>
      <div className="pt-6 lg:pt-10 flex flex-col gap-y-4">
        {furnisingOptions.map((i) => (
          <div
            key={i.id}
            className="flex text-sm lg:text-base gap-x-3 lg:gap-x-4 items-center"
          >
            <input
              disabled={loading}
              className="lg:hover:cursor-pointer size-3"
              type="radio"
              id={i.id}
              value={i.id}
              {...register("furnishing_status")}
            />
            <label
              htmlFor={i.id}
              className="text-primary montserrat-medium lg:hover:cursor-pointer"
            >
              {i.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
