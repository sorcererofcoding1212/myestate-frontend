import type { IconType } from "react-icons/lib";

export const AmenityDisplayItem = ({
  Icon,
  label,
  value,
}: {
  Icon: IconType;
  label?: string;
  value: number | string;
}) => {
  return (
    <div className="rounded-md flex items-center py-2 gap-x-1 lg:gap-x-2 justify-center bg-primary-muted-background">
      <Icon className="size-4 lg:size-5 text-primary-light" />
      <div className="text-primary text-xs lg:text-sm montserrat-semibold">
        {value}
      </div>
      <div className="text-primary-light montserrat-medium text-xs lg:text-sm">
        {label}
      </div>
    </div>
  );
};
