import { BUY } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

interface CityCarouselCardProps {
  picture_url: string;
  name: string;
  description: string;
}

export const CityCarouselCard = ({
  picture_url,
  name,
  description,
}: CityCarouselCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${BUY}?city=${name}`)}
      className="group snap-start rounded-xl pb-3 lg:py-4 border border-foreground/5 cursor-pointer bg-white shadow-md"
    >
      <img
        className="lg:rounded-full transition-transform duration-300 group-hover:scale-105 w-full h-44 lg:size-48 object-cover object-center mx-auto"
        src={picture_url}
        alt={name}
      />
      <div className="pt-3 lg:pt-4 text-center lg:text-lg montserrat-semibold text-primary">
        {description}
      </div>
    </div>
  );
};
