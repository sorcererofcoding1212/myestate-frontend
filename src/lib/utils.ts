import type { FilterForm } from "@/schemas/filters/filters";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .split("_")
    .join(" ");
};

export const formatIndianDenomination = (value: string | number) => {
  return new Intl.NumberFormat("en-IN").format(Number(value));
};

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const normalizeAddress = ({
  address,
  lat,
  lon,
}: {
  address: any;
  lat: string;
  lon: string;
}) => {
  return {
    city:
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.hamlet,

    state: address.state,
    postal_code: address.postcode,

    address: [
      address.house_number || address.building,
      address.road,
      address.neighbourhood,
      address.residential,
      address.pedestrain,
      address.suburb,
    ]
      .filter(Boolean)
      .slice(0, 3)
      .join(", "),

    lat: lat,
    lon: lon,
  };
};

export const formatDescription = (description: string) => {
  const words = description.trim().split(/\s+/);

  const limitReached = words.length > 100;

  if (limitReached) {
    const description = words.slice(0, 100).join(" ");

    return {
      description,
      limitReached,
    };
  }

  return {
    description: words.join(" "),
    limitReached,
  };
};

export const calculateActiveFiltersCount = (formState: FilterForm) => {
  return [
    ...formState.city,
    ...formState.bedrooms,
    ...formState.furnishing_status,
    ...formState.property_type,
    formState.min_price,
    formState.max_price,
    formState.min_area,
    formState.max_area,
  ].filter(Boolean).length;
};

export const formatNotificationDate = (date: string) => {
  const parsedDate = new Date(date);
  const currentDate = new Date();

  const isToday =
    parsedDate.getFullYear() === currentDate.getFullYear() &&
    parsedDate.getMonth() === currentDate.getMonth() &&
    parsedDate.getDate() === currentDate.getDate();

  if (isToday)
    return parsedDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  const isYesterday =
    parsedDate.getFullYear() === yesterday.getFullYear() &&
    parsedDate.getMonth() === yesterday.getMonth() &&
    parsedDate.getDate() === yesterday.getDate();

  if (isYesterday) return "Yesterday";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};
