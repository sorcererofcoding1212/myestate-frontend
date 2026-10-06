import { CITY_DATA } from "@/lib/constants";
import { Search, XIcon } from "lucide-react";
import { AccordionItem } from "./AccordionItem";
import { FilterAccordion } from "./FilterAccordion";
import { Accordion } from "./ui/accordion";
import { useFormContext } from "react-hook-form";
import type { FilterForm } from "@/schemas/filters/filters";
import { AccordionInput } from "./AccordionInput";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

type SearchRecommendation = {
  display: string;
  city: string;
};

export const PropertyFilters = () => {
  const { setValue, watch } = useFormContext<FilterForm>();

  const property_type = watch("property_type");
  const furnishing_status = watch("furnishing_status");
  const city = watch("city");
  const bedrooms = watch("bedrooms");

  const propertyTypes = [
    { label: "House", value: "HOUSE" },
    { label: "Apartment", value: "APARTMENT" },
    { label: "Villa", value: "VILLA" },
  ];

  const furnishingStatuses = [
    { label: "Furnished", value: "FURNISHED" },
    { label: "Semi Furnished", value: "SEMI_FURNISHED" },
    { label: "Unfurnished", value: "UNFURNISHED" },
  ];

  const bedroomOptions = [
    { label: "1 BHK", value: 1 },
    { label: "2 BHK", value: 2 },
    { label: "3 BHK", value: 3 },
    { label: "4 BHK", value: 4 },
    { label: "5 BHK", value: 5 },
    { label: "6 BHK", value: 6 },
    { label: "6+ BHK", value: 7 },
  ];

  const [cityInputValue, setCityInputValue] = useState("");
  const [citySearchResults, setCitySearchResults] = useState<
    SearchRecommendation[]
  >([]);
  const [cityInputSelected, setCityInputSelected] = useState(false);

  const fetchCitySearchRecommendations = async () => {
    try {
      if (cityInputValue.length < 2) return;

      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${cityInputValue}&type=city&filter=countrycode:in&limit=3&apiKey=5dc2fcd106404043a26efba45914ec92`,
      );

      const results = response.data.features.map((res: any) => {
        return {
          city: res.properties.city ?? res.properties.name,
          display: `${res.properties.city ?? res.properties.name}, ${res.properties.state}`,
        };
      });

      setCitySearchResults(results);
    } catch (error) {
      console.log("Some error occured");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchCitySearchRecommendations, 500);

    return () => {
      clearTimeout(timeoutId);
      setCitySearchResults([]);
    };
  }, [cityInputValue]);

  return (
    <form className="px-4 lg:px-8 lg:h-full flex flex-col py-3 lg:py-6 lg:border-r">
      <div className="flex flex-col">
        <div className="text-primary text-lg montserrat-medium">
          Filter Properties
        </div>
        <div className="text-xs lg:text-sm lg:mt-1 text-primary-light">
          Find your ideal property
        </div>
      </div>
      <div className="h-px bg-primary-muted mt-4"></div>
      <Accordion className="flex w-full h-full flex-col">
        <FilterAccordion trigger="Type of Property">
          <div className="mt-4 flex flex-wrap gap-3">
            {propertyTypes.map((p, index) => {
              const selected = property_type.includes(p.value);
              return (
                <AccordionItem
                  selected={selected}
                  key={index}
                  item={p.label}
                  onToggle={() => {
                    if (!selected)
                      setValue("property_type", [...property_type, p.value]);
                    else
                      setValue(
                        "property_type",
                        property_type.filter((value) => value !== p.value),
                      );
                  }}
                />
              );
            })}
          </div>
        </FilterAccordion>
        <FilterAccordion trigger="Furnishing Status">
          <div className="mt-4 flex flex-wrap gap-3">
            {furnishingStatuses.map((f, index) => {
              const selected = furnishing_status.includes(f.value);
              return (
                <AccordionItem
                  selected={selected}
                  key={index}
                  item={f.label}
                  onToggle={() => {
                    if (!selected)
                      setValue("furnishing_status", [
                        ...furnishing_status,
                        f.value,
                      ]);
                    else
                      setValue(
                        "furnishing_status",
                        furnishing_status.filter((value) => value !== f.value),
                      );
                  }}
                />
              );
            })}
          </div>
        </FilterAccordion>
        <FilterAccordion trigger="Location of Property">
          <div className="mt-4 flex flex-col gap-y-6">
            <div className="relative flex items-center w-full lg:w-[90%] border-primary-muted/50 border lg:border-2 px-4 py-2 rounded-md">
              <input
                disabled={cityInputSelected}
                onChange={(e) => setCityInputValue(e.target.value)}
                value={cityInputValue}
                type="text"
                placeholder="Enter a city"
                className="text-sm w-[90%] truncate placeholder:text-primary-light outline-none"
              />
              {!cityInputSelected &&
                citySearchResults &&
                citySearchResults.length > 0 && (
                  <div className="w-full absolute top-full mt-1 left-0 right-0 rounded-xl bg-white border overflow-y-auto z-50">
                    <div className="w-full max-h-24 lg:max-h-32">
                      {citySearchResults.map((r, index) => (
                        <div
                          onClick={() => {
                            setValue("city", [...city, r.city]);
                            setCityInputValue(r.city);
                            setCityInputSelected(true);
                          }}
                          className="text-xs lg:text-sm py-3 lg:cursor-pointer lg:hover:bg-primary-muted-background px-3 lg:px-4 lg:py-4 border-b"
                          key={index}
                        >
                          {r.display}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              {cityInputSelected ? (
                <XIcon
                  onClick={() => {
                    setValue(
                      "city",
                      city.filter((value) => value !== cityInputValue),
                    );
                    setCityInputValue("");
                    setCitySearchResults([]);
                    setCityInputSelected(false);
                  }}
                  className="text-primary-light cursor-pointer size-4 absolute right-3"
                />
              ) : (
                <Search className="text-primary-light size-4 absolute right-3" />
              )}
            </div>
            <div>
              <div className="text-sm text-primary">Popular cities</div>
              <div className="mt-3 flex flex-wrap w-full gap-3">
                {CITY_DATA.map((c, index) => {
                  const selected = city.includes(c.name);
                  return (
                    <AccordionItem
                      selected={selected}
                      key={index}
                      item={c.name}
                      onToggle={() => {
                        if (!selected) setValue("city", [...city, c.name]);
                        else
                          setValue(
                            "city",
                            city.filter((value) => value !== c.name),
                          );
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </FilterAccordion>
        <FilterAccordion trigger="Budget">
          <div className="mt-4 flex flex-col lg:flex-row gap-2 lg:gap-4">
            <AccordionInput
              placeholder="Min budget"
              onChange={(e) => {
                setValue("min_price", Number.parseInt(e.target.value));
              }}
            />
            <AccordionInput
              placeholder="Max budget"
              onChange={(e) => {
                setValue("max_price", Number.parseInt(e.target.value));
              }}
            />
          </div>
        </FilterAccordion>
        <FilterAccordion trigger="Area in sqft">
          <div className="mt-4 flex flex-col lg:flex-row gap-2 lg:gap-4">
            <AccordionInput
              placeholder="Min area (sqft)"
              onChange={(e) => {
                setValue("min_area", Number.parseInt(e.target.value));
              }}
            />
            <AccordionInput
              placeholder="Max area (sqft)"
              onChange={(e) => {
                setValue("max_area", Number.parseInt(e.target.value));
              }}
            />
          </div>
        </FilterAccordion>
        <FilterAccordion trigger="Number of Bedrooms">
          <div className="mt-4 flex gap-3 flex-wrap">
            {bedroomOptions.map((b, index) => {
              const selected = bedrooms.includes(b.value);
              return (
                <AccordionItem
                  selected={selected}
                  key={index}
                  item={b.label}
                  onToggle={() => {
                    if (!selected) setValue("bedrooms", [...bedrooms, b.value]);
                    else
                      setValue(
                        "bedrooms",
                        bedrooms.filter((value) => value !== b.value),
                      );
                  }}
                />
              );
            })}
          </div>
        </FilterAccordion>
      </Accordion>
    </form>
  );
};
