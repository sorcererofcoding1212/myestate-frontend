import type { ChangeEvent } from "react";

export const AccordionInput = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="border lg:border-2 border-primary-muted/50 placeholder:text-primary-light rounded-md max-w-[80%] lg:max-w-[40%] py-2 px-4 lg:px-3"
    />
  );
};
