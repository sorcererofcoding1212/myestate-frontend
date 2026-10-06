import type { PropertyImage } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";

export const GridImage = ({
  image: { image, tag },
}: {
  image: PropertyImage;
}) => {
  return (
    <div className="h-24 lg:h-35 w-full relative rounded-sm overflow-hidden">
      <img
        src={
          image ??
          "https://d9twfl9s6jzl9.cloudfront.net/wp-content/uploads/2021/03/18111937/property-default-image.jpg"
        }
        alt={tag}
        className="object-cover w-full h-full object-center"
      />
      <span className="absolute bottom-0 bg-linear-to-b from-black/10 via-black/60 to-black/80 px-2 lg:px-3 montserrat-medium w-full text-white text-[10px] lg:text-xs py-1 lg:py-2">
        {capitalizeFirstLetter(tag)}
      </span>
    </div>
  );
};
