import { useNotification } from "@/hooks/useNotification";
import type { RouteCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const MobileRouteCard = ({ path, label, Icon }: RouteCardProps) => {
  const navigate = useNavigate();
  const { isInboxRoute, notificationReceived, setNotificationReceived } =
    useNotification(path);
  return (
    <div
      onClick={() => {
        if (isInboxRoute) setNotificationReceived(false);
        navigate(path);
      }}
      className="w-full border-b-2 border-primary-light px-4 flex gap-x-3 relative items-center py-5 text-white"
    >
      {isInboxRoute && notificationReceived && (
        <div
          className={cn(
            "bg-orange-400 size-2 rounded-full absolute bottom-1/2",
          )}
        />
      )}
      <Icon size={18} />
      <div className="montserrat-medium text-sm">{label}</div>
    </div>
  );
};
