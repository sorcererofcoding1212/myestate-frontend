import { cn } from "cn";

export const AccordionItem = ({
  item,
  selected,
  onToggle,
}: {
  item: string;
  onToggle: () => void;
  selected: boolean;
}) => {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "py-1 cursor-pointer px-3 lg:px-4 rounded montserrat-medium text-center text-xs lg:text-sm text-primary-light/80 border lg:border-2 border-primary-muted/50",
        selected && "border-primary/50 text-primary/80",
      )}
    >
      {item}
    </div>
  );
};
