import { routes } from "@/lib/routes";
import { DesktopRouteCard } from "./DesktopRouteCard";

export const DesktopSidebar = () => {
  return (
    <div className="hidden lg:block fixed z-10 w-20 h-screen left-0 top-0 ring-2 ring-foreground/5 shadow-md">
      <div className="flex w-full flex-col h-full pt-20 items-center">
        {routes.map((r) => (
          <DesktopRouteCard
            key={r.label}
            Icon={r.icon}
            label={r.label}
            path={r.path}
          />
        ))}
      </div>
    </div>
  );
};
