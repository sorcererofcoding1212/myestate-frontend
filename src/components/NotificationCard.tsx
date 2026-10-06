import type { Notification } from "@/lib/types";
import { formatNotificationDate } from "@/lib/utils";
import { LuHousePlus, LuMessageCirclePlus } from "react-icons/lu";

export const NotificationCard = ({
  onClickHandler,
  notification,
}: {
  notification: Notification;
  onClickHandler: () => void;
}) => {
  return (
    <div
      onClick={onClickHandler}
      className="grid lg:hover:bg-primary-muted-background cursor-pointer lg:hover:scale-101 transition-all grid-cols-[auto_1fr_auto] items-center gap-x-3 lg:gap-x-8 py-4 px-4 lg:px-8 shadow-xs"
    >
      <div className="flex gap-x-3 lg:gap-x-6 items-center">
        {notification.message_type === "VIEWING_REQUEST" ? (
          <LuHousePlus className="size-4 lg:size-5 shrink-0 text-primary-light" />
        ) : (
          <LuMessageCirclePlus className="size-4 lg:size-5 shrink-0 text-primary-light" />
        )}

        <div className="text-primary text-xs lg:text-base montserrat-medium whitespace-nowrap">
          {notification.sender.first_name} {notification.sender.last_name}
        </div>
      </div>
      <div className="min-w-0 text-left text-xs lg:text-base text-primary-light truncate">
        {notification.content}
      </div>
      <div className="text-[10px] lg:text-xs whitespace-nowrap text-primary-light montserrat-medium">
        {formatNotificationDate(notification.created_at)}
      </div>
    </div>
  );
};
