import { cn, indianStates } from "@/lib/utils";
import type { ListPropertyForm } from "@/schemas/properties/list";
import { useState } from "react";
import { useFormContext, type UseFormRegister } from "react-hook-form";

interface StateSelectorProps {
  disabled: boolean;
  required?: boolean;
  className?: string;
  register: UseFormRegister<ListPropertyForm>;
}

export const StateSelectorInput = ({
  disabled,
  required = false,
  className,
  register,
}: StateSelectorProps) => {
  const { setValue, watch } = useFormContext<ListPropertyForm>();

  const [open, setOpen] = useState(false);

  const state = watch("state");

  const filteredStates = indianStates.filter((item) =>
    item.toLowerCase().includes((state || "").toLowerCase()),
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-y-1 lg:gap-y-2 w-full relative",
        className,
      )}
    >
      <label
        htmlFor="state"
        className="text-primary-light montserrat-medium text-xs lg:text-sm"
      >
        State {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id="state"
        disabled={disabled}
        placeholder="Select your state"
        className="border border-primary-muted placeholder:text-primary-light text-xs lg:text-sm px-4 py-3 w-full rounded-md"
        {...register("state", {
          onChange: () => setOpen(true),
        })}
        onFocus={() => setOpen(true)}
      />

      {open && filteredStates.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 px-1 py-1 rounded-xl bg-white border shadow lg:shadow-md z-50">
          <div className="w-full max-h-20 lg:max-h-24 ">
            {filteredStates.map((item) => (
              <div
                key={item}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue("state", item);
                  setOpen(false);
                }}
                className="text-xs lg:text-sm py-3 lg:cursor-pointer lg:hover:bg-primary-muted-background rounded-md px-3 lg:px-4 lg:py-4 border-b"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
