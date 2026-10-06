import { cn } from "@/lib/utils";
import type React from "react";

interface CardFormProps {
  onSubmitHandler: React.SubmitEventHandler<HTMLFormElement>;
  className?: string;
  children: React.ReactNode;
}

export const CardForm = ({
  onSubmitHandler,
  className,
  children,
}: CardFormProps) => {
  return (
    <form
      onSubmit={onSubmitHandler}
      className={cn("flex flex-col items-center gap-y-4 lg:gap-y-6", className)}
    >
      {children}
    </form>
  );
};
