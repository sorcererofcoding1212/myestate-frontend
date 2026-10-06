import type { ListPropertyForm } from "@/schemas/properties/list";
import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegister } from "react-hook-form";

interface WizardInputProps {
  disabled: boolean;
  required?: boolean;
  label: string;
  register: UseFormRegister<ListPropertyForm>;
  id: keyof ListPropertyForm;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
}

export const WizardInput = ({
  register,
  label,
  required,
  disabled,
  id,
  placeholder,
  type = "text",
}: WizardInputProps) => {
  return (
    <div className="flex flex-col gap-y-1 lg:gap-y-2 w-full">
      <label
        htmlFor={id}
        className="text-primary-light montserrat-medium text-xs lg:text-sm"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        onKeyDown={(e) => {
          if (type === "number" && ["e", "E", "+", "-"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        disabled={disabled}
        id={id}
        type={type}
        className="border border-primary-muted placeholder:text-primary-light text-xs lg:text-sm px-4 py-3 w-full rounded-md"
        placeholder={placeholder}
        {...register(id, {
          valueAsNumber: type === "number",
        })}
      />
    </div>
  );
};
