import type { IconType } from "react-icons/lib";

export const PropertyDisplayItem = ({
  item,
  value,
  Icon,
}: {
  item: string;
  value: number | string;
  Icon: IconType;
}) => {
  return (
    <div className="text-center flex items-baseline gap-x-1 lg:gap-x-0 lg:block">
      <Icon className="size-3 lg:hidden text-primary-light" />
      <div className="lg:text-2xl montserrat-semibold text-primary">{value}</div>
      <div className="text-primary-light text-xs montserrat-medium lg:mt-1">
        {item}
      </div>
    </div>
  );
};
