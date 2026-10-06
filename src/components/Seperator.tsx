import { cn } from "@/lib/utils";

export const Seperator = ({ className }: { className?: string }) => {
  return (
    <hr
      className={cn(
        "w-96 h-1 mx-auto bg-primary-muted border-0 rounded-sm",
        className,
      )}
    ></hr>
  );
};
