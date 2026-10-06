import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/lib/routes";
import { LucideMenuSquare } from "lucide-react";
import { MobileRouteCard } from "./MobileRouteCard";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <LucideMenuSquare className="text-white size-6" />
      </SheetTrigger>
      <SheetContent className="bg-primary">
        <SheetHeader>
          <SheetTitle className="text-white montserrat-semibold-italic py-5 border-b-2 border-primary-light">
            MyEstate
          </SheetTitle>
          <div className="flex flex-col justify-center items-center">
            {routes.map((r) => (
              <MobileRouteCard
                key={r.label}
                label={r.label}
                path={r.path}
                Icon={r.icon}
              />
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
