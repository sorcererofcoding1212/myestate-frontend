import { LucideLocateFixed, LucideMapPinPen } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { toast } from "sonner";
import axios from "axios";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export const LocationSelector = () => {
  const setLocation = useUserStore((state) => state.setLocation);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useUserStore((state) => state.location);

  const getLocationFromUser = async () => {
    if (loading) return;
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );

          const {
            address: { city, state, postcode },
            display_name,
            lat,
            lon,
          } = response.data;

          setLocation({
            city: city,
            state: state,
            address: display_name,
            latitude: lat,
            longitude: lon,
            postal_code: postcode,
          });
        } catch {
          toast.error("Some error occurred");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      },
      (err) => {
        toast.error(err.message ?? "Some error occurred");
        setLoading(false);
        setOpen(false);
      },
    );
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton={false}
        render={
          <div className="flex gap-x-2 text-background cursor-pointer items-center">
            <LucideMapPinPen className="size-6 lg:size-7" />
            {loading ? (
              <Skeleton className="w-16 lg:w-20 h-6" />
            ) : (
              <div className="text-xs lg:text-sm montserrat-medium lg:hover:underline lg:hover:underline-offset-2">
                {location?.city ?? "Select location"}
              </div>
            )}
          </div>
        }
      >
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <div
          className={cn(
            "flex gap-x-2 items-center text-primary-light",
            loading && "text-primary-extralight",
          )}
        >
          <LucideLocateFixed />
          <div
            onClick={getLocationFromUser}
            className="montserrat-medium cursor-pointer text-xs lg:text-sm"
          >
            Use current location
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
