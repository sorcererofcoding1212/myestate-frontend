import { useFormContext } from "react-hook-form";
import { WizardHeader } from "./WizardHeader";
import { WizardInput } from "./WizardInput";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { useWizard } from "@/hooks/useWizard";

export const PropertyInformation = () => {
  const { register, watch } = useFormContext<ListPropertyForm>();
  const { loading } = useWizard();

  const property_type = watch("property_type").toLowerCase();

  return (
    <div>
      <WizardHeader
        heading="Property Information"
        subheading="Tell us a little about your property"
      />
      <div className="flex flex-col lg:flex-row gap-y-3 pt-6 lg:pt-10 gap-x-3 items-center">
        <WizardInput
          type="number"
          id="area"
          label="Area"
          placeholder="Enter the area in sq. m."
          required={true}
          disabled={loading}
          register={register}
        />

        <>
          <WizardInput
            type="number"
            id="bedrooms"
            label="Bedrooms"
            placeholder="Enter number of bedrooms"
            required={true}
            disabled={loading}
            register={register}
          />
          <WizardInput
            type="number"
            id="bathrooms"
            label="Bathrooms"
            placeholder="Enter number of bathrooms"
            required={true}
            disabled={loading}
            register={register}
          />
        </>
      </div>

      <div className="pt-3 gap-y-3 lg:gap-x-3 lg:pt-6 flex flex-col lg:flex-row items-center">
        <WizardInput
          type="number"
          id="parking_spaces"
          label="Parking Spaces"
          placeholder="Enter number of parking spaces"
          register={register}
          required={true}
          disabled={loading}
        />
        {property_type === "house" || property_type === "villa" ? (
          <WizardInput
            type="number"
            id="total_floors"
            label="Total Floors"
            placeholder="Enter number of floors"
            register={register}
            required={true}
            disabled={loading}
          />
        ) : (
          <WizardInput
            type="number"
            id="floor_number"
            label="Floor Number"
            placeholder="Enter the floor number"
            register={register}
            required={true}
            disabled={loading}
          />
        )}
        <WizardInput
          type="number"
          id="balconies"
          label="Balconies"
          placeholder="Enter number of balconies"
          register={register}
          required={true}
          disabled={loading}
        />
      </div>
    </div>
  );
};
