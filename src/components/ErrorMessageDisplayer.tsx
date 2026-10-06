import { capitalizeFirstLetter, cn } from "@/lib/utils";

export const ErrorMessageDisplayer = ({
  errorMsg,
  className,
}: {
  errorMsg: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("text-red-500 text-center text-xs lg:text-sm", className)}
    >
      {capitalizeFirstLetter(errorMsg)}
    </div>
  );
};
