import { useFormContext } from "react-hook-form";
import { WizardHeader } from "./WizardHeader";
import { WizardInput } from "./WizardInput";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { useWizard } from "@/hooks/useWizard";
import { cn } from "@/lib/utils";

export const PropertyDescription = () => {
  const { register, watch } = useFormContext<ListPropertyForm>();
  const { loading } = useWizard();

  const property_type = watch("property_type").toLocaleLowerCase();
  const listing_type = watch("listing_type");

  const descriptionCharacterCount = watch("description")?.length ?? 0;
  const maxCharacterLimit = 3000;

  const isListingTypeSale = listing_type === "SALE";

  return (
    <div>
      <WizardHeader
        heading="Review details"
        subheading={
          isListingTypeSale
            ? "Review the details and specify your asking price"
            : "Review the details and specify your monthly rent"
        }
      />
      <div className="flex flex-col gap-y-3 pt-6 lg:pt-10 gap-x-3 items-center">
        <WizardInput
          type="number"
          id="price"
          label={isListingTypeSale ? "Price" : "Monthly rent"}
          placeholder={
            isListingTypeSale
              ? "Enter your asking price"
              : "Enter your expected monthly rent"
          }
          register={register}
          required={true}
          disabled={loading}
        />
        <div className="flex flex-col gap-y-1 lg:gap-y-2 relative w-full">
          <label
            htmlFor={"description"}
            className="text-primary-light montserrat-medium text-xs lg:text-sm"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            disabled={loading}
            id="description"
            className="border h-24 resize-none border-primary-muted placeholder:text-primary-light text-xs lg:text-sm px-4 py-3 w-full rounded-md"
            placeholder={`Write a short description about your ${property_type === "commercial" ? "property" : property_type}`}
            {...register("description")}
          />
          <div
            className={cn(
              "text-primary-light absolute bottom-0 text-[10px] lg:text-xs z-20 right-0 p-1",
              descriptionCharacterCount > maxCharacterLimit && "text-red-500",
            )}
          >
            {descriptionCharacterCount}/{maxCharacterLimit}
          </div>
        </div>
      </div>
    </div>
  );
};
