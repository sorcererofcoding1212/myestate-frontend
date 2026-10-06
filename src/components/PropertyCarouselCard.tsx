import { VIEW_LISTING } from "@/lib/constants";
import { formatIndianDenomination } from "@/lib/utils";
import { cn } from "cn";
import { useNavigate } from "react-router-dom";

interface PropertyCarouselCardProps {
  picture_url: string | undefined;
  price: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: string;
  listing_type: string;
  city: string;
  address: string;
  zip: string;
  id: number;
  imgHeight?: string;
}

export const PropertyCarouselCard = ({
  picture_url,
  price,
  bedrooms,
  bathrooms,
  area,
  listing_type,
  city,
  zip,
  address,
  id,
  imgHeight,
}: PropertyCarouselCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${VIEW_LISTING}/${id}`)}
      className="group snap-start rounded-xl border border-foreground/5 pb-3 cursor-pointer bg-card shadow-md overflow-hidden"
    >
      <img
        className={cn(
          "h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105",
          imgHeight ? imgHeight : "h-44",
        )}
        src={picture_url}
        alt={address}
      />
      <div className="pt-2 flex flex-col gap-y-1 px-3">
        <div className="lg:text-lg montserrat-semibold text-primary">{`₹${formatIndianDenomination(price)}`}</div>
        <div className="flex gap-x-1 text-primary text-xs lg:text-sm">
          <span className="montserrat-semibold">{bedrooms}</span> bds |{" "}
          <span className="montserrat-semibold">{bathrooms}</span> ba |{" "}
          <span className="montserrat-semibold">{area}</span> sqft |
          <span className="montserrat-semibold">{listing_type}</span>
        </div>
        <div className="text-xs lg:text-sm text-primary truncate">
          {address}, {zip}, {city}
        </div>
      </div>
    </div>
  );
};
