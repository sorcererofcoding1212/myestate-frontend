import { PropertyCarouselCard } from "@/components/PropertyCarouselCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { MainLayout } from "@/layouts/MainLayout";
import axios from "@/lib/axios";
import type { AdvancedSearchProps } from "@/lib/types";
import { cn } from "cn";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { filterSchema, type FilterForm } from "@/schemas/filters/filters";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateActiveFiltersCount } from "@/lib/utils";
import { LucideFilter } from "lucide-react";
import { MobileBottomCollapsible } from "@/components/MobileBottomCollapsible";
import { useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";

const Buy = () => {
  const defaultFilters: FilterForm = {
    property_type: [],
    furnishing_status: [],
    bedrooms: [],
    city: [],
  };

  const [params] = useSearchParams();
  const city = params.get("city");

  const [results, setResults] = useState<AdvancedSearchProps[]>([]);
  const methods = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: defaultFilters,
  });

  const { control, reset } = methods;
  const formState = useWatch({ control }) as FilterForm;

  const activeFiltersCount = calculateActiveFiltersCount(formState);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterForm>(defaultFilters);
  const [activateFilters, setActivateFilters] = useState(false);

  const [loading, setLoading] = useState(false);

  const location = JSON.parse(sessionStorage.getItem("location") as string);

  const fetchResults = async (filters: FilterForm) => {
    try {
      setLoading(true);

      const searchParams = new URLSearchParams();
      searchParams.set("listing_type", "SALE");

      for (const key of Object.keys(filters)) {
        const value = filters[key as keyof FilterForm];

        if (key === "city" && Array.isArray(value) && value.length < 1) {
          if (city) searchParams.set(key, city);
          else if (location?.city) searchParams.set(key, location.city);
          continue;
        }

        if (Array.isArray(value)) searchParams.set(key, value.join(","));
        else if (value !== undefined && value !== null)
          searchParams.set(key, String(value));
      }

      const response = await axios.get("/properties/advanced-search", {
        params: searchParams,
      });

      setAppliedFilters(filters);
      setResults(response.data);
      return true;
    } catch (error: any) {
      console.log(error ?? "Some error occured");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    const success = await fetchResults(formState);
    if (success) setActivateFilters(true);
  };

  const resetFilters = async () => {
    reset(defaultFilters);
    const success = await fetchResults(defaultFilters);
    if (success) setActivateFilters(false);
  };

  const hasUnappliedFilters =
    JSON.stringify(formState) !== JSON.stringify(appliedFilters);

  useEffect(() => {
    fetchResults(defaultFilters);
  }, []);
  return (
    <MainLayout loading={loading} className="lg:grid lg:grid-cols-3 min-h-0">
      <div className="lg:col-span-1 hidden lg:block overflow-y-hidden">
        <FormProvider {...methods}>
          <PropertyFilters />
        </FormProvider>
      </div>
      <div className="lg:col-span-2 bg-background min-h-0 grid lg:grid-rows-[auto_minmax(0,1fr)]">
        <div className="fixed top-14 lg:top-15 lg:static px-3 lg:px-8 shadow-xs bg-background z-50 w-full">
          <div className="py-4 lg:py-6">
            <div className="flex items-center gap-x-4">
              <div
                onClick={() => {
                  if (!hasUnappliedFilters) return;
                  applyFilters();
                }}
                className={cn(
                  "flex cursor-pointer px-4 rounded-md text-primary py-2 ring-1 ring-primary-muted/50 shadow-md",
                  hasUnappliedFilters &&
                    "bg-primary text-white active:scale-95 transition-all",
                )}
              >
                <span className="flex gap-x-1 lg:gap-x-2 items-center">
                  {!hasUnappliedFilters && <LucideFilter className="size-3" />}
                  <span className="text-sm lg:text-base montserrat-medium">
                    {hasUnappliedFilters ? "Apply Filters" : "Filters"}
                  </span>
                  <span
                    className={cn(
                      "text-xs montserrat-semibold size-5 p-3 flex justify-center items-center rounded-full",
                      hasUnappliedFilters
                        ? "bg-white text-primary"
                        : "bg-primary text-white",
                    )}
                  >
                    {activeFiltersCount}
                  </span>
                </span>
              </div>
              <div
                onClick={resetFilters}
                className="cursor-pointer bg-red-500 lg:text-base montserrat-medium text-sm px-4 active:scale-95 transition-all rounded-md gap-x-1 lg:gap-x-2 text-white py-2 ring-1 ring-red-600 shadow-md"
              >
                Reset Filters
              </div>
            </div>
            <div className="mt-4 lg:mt-8 lg:text-xl">
              <div className="text-primary montserrat-semibold flex gap-x-2 lg:gap-x-3 items-center">
                <div>
                  {results.length} {results.length === 1 ? "Result" : "Results"}
                </div>
                <div>|</div>
                <div>
                  {activateFilters
                    ? "Showing filtered results"
                    : `Properties near ${city || "you"}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="min-h-0 mt-28 lg:mt-0 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-4 px-3 lg:px-6">
              {results.map((r, index) => (
                <PropertyCarouselCard
                  key={index}
                  address={r.address}
                  bedrooms={r.bedrooms}
                  bathrooms={r.bathrooms}
                  price={r.price}
                  city={r.city}
                  area={r.area}
                  picture_url={r.img.image}
                  listing_type={r.listing_type}
                  zip={r.postal_code}
                  id={r.id}
                  imgHeight="h-44 lg:h-56"
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center w-full h-full items-center">
              <div className="lg:text-xl mt-10 lg:mt-0 lg:mb-10 w-fit mx-auto lg:mx-0 text-primary-light rounded-md bg-primary-muted-background lg:px-6 px-5 py-2.5 lg:py-3 text-center montserrat-semibold">
                No available data
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      <MobileBottomCollapsible visibleOnFirstLoad={false} Icon={FaFilter}>
        <FormProvider {...methods}>
          <PropertyFilters />
        </FormProvider>
      </MobileBottomCollapsible>
    </MainLayout>
  );
};

export default Buy;
