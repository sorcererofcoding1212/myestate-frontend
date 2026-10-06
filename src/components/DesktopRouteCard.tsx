import { useNotification } from "@/hooks/useNotification";
import type { RouteCardProps } from "@/lib/types";
import { cn } from "cn";
import { useNavigate } from "react-router-dom";

export const DesktopRouteCard = ({ label, path, Icon }: RouteCardProps) => {
  const navigate = useNavigate();
  const { isInboxRoute, setNotificationReceived, notificationReceived } =
    useNotification(path);

  return (
    <div
      onClick={() => {
        if (isInboxRoute) setNotificationReceived(false);
        navigate(path);
      }}
      className="flex text-primar relative cursor-pointer flex-col items-center gap-y-2 hover:bg-primary-light/20 w-full py-4 transition-all"
    >
      {isInboxRoute && notificationReceived && (
        <div
          className={cn("bg-orange-400 size-3 rounded-full absolute left-1/2")}
        />
      )}
      <Icon size={22} />
      <div className="font-medium text-xs">{label}</div>
    </div>
  );
};
