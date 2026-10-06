import { useWizard } from "@/hooks/useWizard";
import axios from "@/lib/axios";
import { cn, normalizeAddress } from "@/lib/utils";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { LucideMapPin } from "lucide-react";
import { type RefObject } from "react";
import { useFormContext, type UseFormRegister } from "react-hook-form";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

interface WizardInputWithDropdownProps {
  disabled: boolean;
  register: UseFormRegister<ListPropertyForm>;
  results: any[];
  setResults: (val: any) => void;
  skipNextSearch: RefObject<boolean>;
}

export const AddressSelectorInput = ({
  disabled,
  register,
  results,
  setResults,
  skipNextSearch,
}: WizardInputWithDropdownProps) => {
  const { setValues } = useFormContext<ListPropertyForm>();
  const { setLoading, loading } = useWizard();

  const getCurrentAddress = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&zoom-18&addressdetails=1&format=jsonv2`,
          );

          const { city, state, address, postal_code, lat, lon } =
            normalizeAddress(response.data);

          setResults([]);
          skipNextSearch.current = true;

          setValues({
            city: city,
            state: state,
            postal_code: postal_code,
            address: address,
            latitude: Number.parseInt(lat),
            longitude: Number.parseInt(lon),
          });
        } catch {
          toast.error("Some error occurred");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        toast.error(err.message ?? "Some error occurred");
      },
    );
  };

  return (
    <div className="flex flex-col gap-y-1 lg:gap-y-2 w-full relative">
      <label
        htmlFor="address"
        className="text-primary-light montserrat-medium text-xs lg:text-sm"
      >
        Address <span className="text-red-500">*</span>
      </label>
      <div className="flex-col flex lg:flex-row lg:justify-between w-full lg:items-center">
        <input
          disabled={disabled}
          id="address"
          className="border border-primary-muted placeholder:text-primary-light text-xs lg:text-sm px-4 py-3 w-full mb-2 lg:mb-0 lg:w-[70%] rounded-md truncate"
          placeholder={"Enter your address"}
          {...register("address")}
        />
        <div
          onClick={getCurrentAddress}
          className={cn(
            "px-4 lg:hover:cursor-pointer w-fit active:scale-95 transition-all flex gap-x-1 items-center py-2 border rounded-md text-primary-light shadow border-primary-muted text-xs lg:text-sm",
            loading && "animate-pulse",
          )}
        >
          <LucideMapPin className="size-3 lg:size-5" />
          <div>Set current location</div>
        </div>
      </div>
      {results && results.length > 0 && (
        <div className="w-full absolute top-full mt-1 left-0 right-0 rounded-xl bg-white border overscroll-y-contain z-50">
          <ScrollArea className="w-full min-h-0 h-28 lg:h-32 overflow-y-auto">
            {results.map((r: any, index) => (
              <div
                onClick={() => {
                  setResults([]);
                  skipNextSearch.current = true;

                  const { city, state, address, postal_code, lat, lon } =
                    normalizeAddress(r);

                  setValues({
                    address: address,
                    city: city,
                    state: state,
                    postal_code: postal_code,
                    latitude: Number.parseInt(lat),
                    longitude: Number.parseInt(lon),
                  });
                }}
                className="text-xs lg:text-sm py-2 lg:cursor-pointer lg:hover:bg-primary-muted-background px-3 lg:px-4 lg:py-4 border-b"
                key={index}
              >
                {r.display_name}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
