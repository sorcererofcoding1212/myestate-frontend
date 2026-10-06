import { useFormContext } from "react-hook-form";
import { WizardHeader } from "./WizardHeader";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { useWizard } from "@/hooks/useWizard";

export const PropertyTypeSelector = () => {
  const { register } = useFormContext<ListPropertyForm>();
  const { loading } = useWizard();

  const propertyOptions = [
    {
      id: "HOUSE",
      label: "House",
    },
    {
      id: "APARTMENT",
      label: "Apartment",
    },
    {
      id: "VILLA",
      label: "Villa",
    },
  ];

  return (
    <div>
      <WizardHeader
        heading="Listing Information"
        subheading="Tell us what type of property are you listing"
      />
      <div className="pt-6 lg:pt-10 flex flex-col gap-y-4">
        {propertyOptions.map((i) => (
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
              {...register("property_type")}
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
