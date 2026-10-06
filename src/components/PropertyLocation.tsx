import { useFormContext } from "react-hook-form";
import { WizardHeader } from "./WizardHeader";
import { WizardInput } from "./WizardInput";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { useWizard } from "@/hooks/useWizard";
import { useEffect, useRef, useState } from "react";
import axios from "@/lib/axios";
import { AddressSelectorInput } from "./AddressSelectorInput";
import { StateSelectorInput } from "./StateSelectorInput";

export const PropertyLocation = () => {
  const { register, watch } = useFormContext<ListPropertyForm>();
  const { loading } = useWizard();
  const [searchResults, setSearchResults] = useState([]);
  const skipNextAddressSearch = useRef(false);

  const address = watch("address");

  const fetchAddressRecommendations = async () => {
    if (!address || address.length < 3) {
      setSearchResults([]);
      return;
    }

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address,
      )}&format=jsonv2&addressdetails=1&countrycodes=in&limit=5`,
    );

    setSearchResults(response.data);
  };

  useEffect(() => {
    if (skipNextAddressSearch.current) {
      skipNextAddressSearch.current = false;
      return;
    }

    const timeoutId = setTimeout(fetchAddressRecommendations, 500);

    return () => {
      clearTimeout(timeoutId);
      setSearchResults([]);
    };
  }, [address]);
  return (
    <div>
      <WizardHeader
        heading="Location Details"
        subheading="Tell us where this property is located"
      />
      <div className="pt-6 lg:pt-10 flex flex-col gap-y-3 lg:gap-y-4">
        <AddressSelectorInput
          disabled={loading}
          register={register}
          results={searchResults}
          setResults={setSearchResults}
          skipNextSearch={skipNextAddressSearch}
        />
        <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-3 items-center">
          <WizardInput
            id="city"
            label="City"
            disabled={loading}
            required={true}
            register={register}
            placeholder="Enter the city"
          />
          <StateSelectorInput disabled={loading} register={register} />
          <WizardInput
            id="postal_code"
            label="Postal Code"
            type="number"
            disabled={loading}
            required={true}
            register={register}
            placeholder="Enter the postal code"
          />
        </div>
      </div>
    </div>
  );
};
