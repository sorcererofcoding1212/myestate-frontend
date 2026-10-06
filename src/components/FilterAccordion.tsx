import type { ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const FilterAccordion = ({
  trigger,
  children,
}: {
  trigger: string;
  children: ReactNode;
}) => {
  return (
    <AccordionItem className="border-b py-4 border-primary-muted">
      <AccordionTrigger className="text-primary text-sm lg:text-base montserrat-medium">
        {trigger}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};
