import { cn } from "@/lib/utils";

export const SuccessMessageDisplayer = ({
  successMsg,
  className,
}: {
  successMsg: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("text-blue-500 text-center text-xs lg:text-sm", className)}
    >
      {successMsg}
    </div>
  );
};
