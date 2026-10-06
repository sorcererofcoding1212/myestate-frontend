import { cn } from "@/lib/utils";

export const FormButton = ({
  disabled,
  btnText,
}: {
  disabled: boolean;
  btnText: string;
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        "bg-green-500 text-white w-72 lg:w-116 py-2 lg:py-3 rounded-md montserrat-medium cursor-pointer",
        disabled && "bg-green-300",
      )}
    >
      {btnText}
    </button>
  );
};
