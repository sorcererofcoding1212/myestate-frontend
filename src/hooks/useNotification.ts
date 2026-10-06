import { INBOX } from "@/lib/constants";
import { useUserStore } from "@/store/user";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export const useNotification = (path: string) => {
  const isInboxRoute = path === INBOX;
  const { pathname } = useLocation();
  const [notificationReceived, setNotificationReceived] = useState(false);
  const socket = useUserStore((state) => state.socket);

  useEffect(() => {
    if (isInboxRoute && socket && pathname !== INBOX) {
      socket.onmessage = (event) => {
        const parsedEvent = JSON.parse(event.data);
        toast.info(parsedEvent.message);
        setNotificationReceived(true);
      };
    }
  }, [socket]);

  return { isInboxRoute, notificationReceived, setNotificationReceived };
};
