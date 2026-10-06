import { NotificationCard } from "@/components/NotificationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainLayout } from "@/layouts/MainLayout";
import axios from "@/lib/axios";
import type { Notification } from "@/lib/types";
import { useUserStore } from "@/store/user";
import { Search, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LuArrowUpRight, LuChevronLeft, LuMail, LuPhone } from "react-icons/lu";
import { toast } from "sonner";

const Inbox = () => {
  const socket = useUserStore((state) => state.socket);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/chats");
      if (response.status === 200) {
        setNotifications(response.data);
        removeFilterNotifications();
      }
    } catch (error: any) {
      console.log(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
    }
  };

  const [activeNotificationId, setActiveNotificationId] = useState<
    number | null
  >(null);

  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  const resetActiveNotification = () => {
    setActiveNotification(null);
    setActiveNotificationId(null);
  };

  const [notificationFilter, setNotificationFilter] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [filterNotificationError, setFilterNotificationError] = useState(false);

  const filterNotifications = () => {
    if (!notificationFilter) return;
    const query = notificationFilter.toLowerCase();
    const filteredNotifications = notifications.filter(
      (n) =>
        n.content.toLowerCase().includes(query) ||
        n.sender.first_name.toLowerCase().includes(query) ||
        n.sender.last_name.toLowerCase().includes(query),
    );

    setFilterNotificationError(filteredNotifications.length === 0);
    setFilteredNotifications(filteredNotifications);
  };

  const removeFilterNotifications = () => {
    setFilteredNotifications([]);
    setNotificationFilter("");
    setFilterNotificationError(false);
  };

  useEffect(() => {
    fetchNotifications();

    return () => {
      setNotifications([]);
      resetActiveNotification();
    };
  }, []);

  const handleInboxEvent = (event: MessageEvent) => {
    const parsedEvent = JSON.parse(event.data);
    if (parsedEvent.type === "INBOX")
      toast.info("New notification recieved", {
        position: "top-center",
        action: {
          onClick: fetchNotifications,
          label: "View notification",
        },
        className: "montserrat-medium rounded-md",
        duration: 10000,
      });
  };

  const fetchActiveNotification = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/chats/${activeNotificationId}`);
      if (response.status === 200) setActiveNotification(response.data);
    } catch (error: any) {
      console.log(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener("message", handleInboxEvent);

    return () => {
      socket.removeEventListener("message", handleInboxEvent);
    };
  }, [socket]);

  useEffect(() => {
    if (!activeNotificationId) return;
    fetchActiveNotification();
  }, [activeNotificationId]);

  return (
    <MainLayout className="h-[calc(100dvh-3.5rem)]" loading={loading}>
      <div className="h-full flex flex-col overflow-hidden min-h-0">
        <div className="w-full flex bg-background flex-col justify-center items-center shadow-xs py-6 lg:py-10">
          <div className="text-3xl lg:text-5xl text-primary montserrat-semibold">
            Notification centre
          </div>
          <div className="mt-4 lg:mt-5 w-full flex justify-center">
            <div className="w-[90%] relative lg:w-[40%] flex items-center">
              <input
                type="text"
                value={notificationFilter}
                onChange={(e) => setNotificationFilter(e.target.value)}
                placeholder="Search notifications"
                className="w-full rounded-md py-1.5 lg:py-2 placeholder:text-primary-light text-xs lg:text-sm px-4 border border-primary-muted-background bg-primary-muted-background"
              />
              {filteredNotifications.length > 0 || filterNotificationError ? (
                <XIcon
                  onClick={removeFilterNotifications}
                  className="cursor-pointer active:scale-95 transition-all text-primary-light size-4 lg:size-5 absolute right-2 lg:right-3"
                />
              ) : (
                <Search
                  onClick={filterNotifications}
                  className="cursor-pointer active:scale-95 transition-all text-primary-light size-4 lg:size-5 absolute right-2 lg:right-3"
                />
              )}
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          {activeNotification ? (
            <div className="flex flex-col mt-8 lg:mt-10 items-center">
              <div className="py-4 relative flex flex-col w-[90%] lg:w-[40%] items-center justify-center shadow-md border border-foreground/5 rounded-md">
                <div className="size-10 lg:size-12 rounded-full bg-primary-muted-background flex justify-center items-center text-primary-light montserrat-semibold text-lg">
                  M
                </div>
                <div className="text-primary mt-3 montserrat-medium lg:text-lg">
                  {activeNotification.sender.first_name}{" "}
                  {activeNotification.sender.last_name}
                </div>
                <div className="mt-4 flex flex-col gap-y-2 lg:gap-y-3">
                  <div className="flex gap-x-4 text-sm lg:text-base text-primary-light lg:gap-x-6 items-center">
                    <LuPhone />
                    <div>{activeNotification.phone_number}</div>
                  </div>
                  <div className="flex gap-x-4 text-sm lg:text-base text-primary-light lg:gap-x-6 items-center">
                    <LuMail />
                    <div>urbanmanvir27@gmail.com</div>
                  </div>
                </div>
                <div
                  // to-do apply navigation to listing here
                  className="flex cursor-pointer text-xs lg:text-sm mt-4 text-blue-500 lg:hover:text-blue-700 underline underline-offset-2"
                >
                  <div>View listing</div>
                  <LuArrowUpRight />
                </div>
                <div className="mt-4 w-[90%] lg:w-[80%] py-2 px-4 bg-primary-muted-background shadow rounded-md text-sm lg:text-base text-primary">
                  {activeNotification.content}
                </div>
                <div
                  onClick={resetActiveNotification}
                  className="absolute top-4 left-2"
                >
                  <LuChevronLeft
                    role="button"
                    className="text-primary-extralight cursor-pointer active:scale-90 transition-all size-5 lg:size-6"
                  />
                </div>
              </div>
            </div>
          ) : notificationFilter.length > 0 &&
            filteredNotifications.length > 0 ? (
            <div className="flex flex-col mb-2">
              {[...filteredNotifications]
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .map((n) => (
                  <NotificationCard
                    key={n.id}
                    notification={n}
                    onClickHandler={() => setActiveNotificationId(n.id)}
                  />
                ))}
            </div>
          ) : filterNotificationError ? (
            <div className="text-sm lg:text-base w-fit mx-auto mt-8 text-primary-light rounded-md bg-primary-muted-background lg:px-6 px-5 py-2.5 lg:py-3 text-center montserrat-semibold">
              No notification matches the search
            </div>
          ) : (
            <div className="flex flex-col mb-2">
              {notifications.length > 0 ? (
                [...notifications]
                  .sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime(),
                  )
                  .map((n) => (
                    <NotificationCard
                      key={n.id}
                      notification={n}
                      onClickHandler={() => setActiveNotificationId(n.id)}
                    />
                  ))
              ) : (
                <div className="text-sm lg:text-base w-fit mx-auto mt-8 text-primary-light rounded-md bg-primary-muted-background lg:px-6 px-5 py-2.5 lg:py-3 text-center montserrat-semibold">
                  No new notifications
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </MainLayout>
  );
};

export default Inbox;
