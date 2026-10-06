import { cn } from "@/lib/utils";
import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface LabelledInputProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  size?: "default" | "sm";
  disabled: boolean;
  required: boolean;
  register: UseFormRegisterReturn;
  errors?: string;
}

export const LabelledInput = ({
  id,
  label,
  placeholder,
  disabled,
  required,
  errors,
  register,
  type = "text",
  size = "default",
}: LabelledInputProps) => {
  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-3">
      <label className="flex gap-x-1" htmlFor={id}>
        <div className="text-primary-light montserrat-medium text-sm lg:text-base">
          {label}
        </div>
        {required && <div className="text-red-500">*</div>}
      </label>
      <input
        disabled={disabled}
        required={required}
        type={type}
        placeholder={placeholder}
        className={cn(
          "bg-primary-muted py-2 lg:py-3 text-sm px-6 rounded-md",
          size === "default" ? "w-72 lg:w-116" : "w-72 lg:w-56",
        )}
        {...register}
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};
