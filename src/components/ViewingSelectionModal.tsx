import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useForm, useWatch } from "react-hook-form";
import {
  viewingRequestSchema,
  type ViewingRequestForm,
} from "@/schemas/chat/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { cn } from "cn";
import axios from "@/lib/axios";
import { toast } from "sonner";

export const ViewingSelectionModal = ({
  open,
  setOpen,
  propertyId,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  propertyId: string | undefined;
}) => {
  const { setValue, reset, control } = useForm<ViewingRequestForm>({
    resolver: zodResolver(viewingRequestSchema),
    defaultValues: {
      date: "",
      time: "",
    },
  });

  const formState = useWatch({ control });

  const date = formState.date;
  const time = formState.time;
  const phone_number = formState.phone_number;

  const [activeState, setActiveState] = useState(false);

  useEffect(() => {
    setActiveState(
      !!date && !!time && !!phone_number && phone_number.length === 10,
    );
  }, [formState]);

  const viewingTimeSlots = [
    { value: "10:00:00", label: "10:00 AM - 10:30 AM" },
    { value: "10:30:00", label: "10:30 AM - 11:00 AM" },
    { value: "11:00:00", label: "11:00 AM - 11:30 AM" },
    { value: "11:30:00", label: "11:30 AM - 12:00 PM" },

    { value: "14:00:00", label: "2:00 PM - 2:30 PM" },
    { value: "14:30:00", label: "2:30 PM - 3:00 PM" },
    { value: "15:00:00", label: "3:00 PM - 3:30 PM" },
    { value: "15:30:00", label: "3:30 PM - 4:00 PM" },

    { value: "16:00:00", label: "4:00 PM - 4:30 PM" },
    { value: "16:30:00", label: "4:30 PM - 5:00 PM" },
    { value: "17:00:00", label: "5:00 PM - 5:30 PM" },
    { value: "17:30:00", label: "5:30 PM - 6:00 PM" },
  ];

  const availableTimeSlots = viewingTimeSlots.filter((slot) => {
    if (!date) return false;

    const today = new Date();
    const selectedDate = new Date(date);

    const isToday =
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate();

    if (!isToday) return true;

    const currentTime =
      today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();

    const [hours, minutes, seconds] = slot.value.split(":").map(Number);

    const slotTime = hours * 3600 + minutes * 60 + seconds;

    return slotTime > currentTime;
  });
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 15);

  const [showDateField, setShowDateField] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitViewingRequest = async () => {
    try {
      setLoading(true);

      if (!date || !time || !phone_number || phone_number.length !== 10) {
        toast.error("Invalid request");
        return;
      }

      const response = await axios.post(`/chats/${propertyId}/create/`, {
        date,
        time,
        message_type: "VIEWING_REQUEST",
        phone_number,
      });

      if (response.status === 201) {
        toast.success("Viewing request sent");
        reset();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.detail ?? "Some error occcured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        reset();
        setOpen(val);
      }}
    >
      <DialogContent>
        <DialogHeader className="w-[90%] text-center mx-auto mt-2 gap-1 flex flex-col">
          <div className="montserrat-semibold text-2xl text-primary">
            Request a viewing
          </div>
          <div className="text-xs lg:text-sm montserrat-medium text-primary-light">
            Select a date to book an appointment
          </div>
        </DialogHeader>
        <form className="animate-in fade-in slide-in-from-right-3 duration-300">
          {!showDateField ? (
            <div className="flex w-full myestate-calendar justify-center">
              <Calendar
                className="text-xs"
                minDate={currentDate}
                tileDisabled={({ date }) => date.getDay() === 0}
                showNeighboringMonth={false}
                maxDate={maxDate}
                onChange={(val) => {
                  if (!val || Array.isArray(val)) return;

                  const year = val.getFullYear();
                  const month = String(val.getMonth() + 1).padStart(2, "0");
                  const day = String(val.getDate()).padStart(2, "0");

                  setValue("date", `${year}-${month}-${day}`);
                  setShowDateField(true);
                }}
                value={date ? new Date(`${date}T00:00:00`) : null}
                defaultValue={currentDate}
              />
            </div>
          ) : (
            <div className="animate-in mx-auto fade-in slide-in-from-right-3 duration-300">
              <ChevronLeft
                className="cursor-pointer text-primary"
                onClick={() => setShowDateField(false)}
              />
              {availableTimeSlots.length > 0 ? (
                <div className="flex flex-col mt-4 lg:mt-6">
                  <div className="grid grid-cols-2 lg:grid-cols-3 w-full lg:w-[90%] mx-auto gap-2 lg:gap-3">
                    {availableTimeSlots.map((s) => {
                      const selected = s.value === time;
                      return (
                        <div
                          onClick={() => setValue("time", s.value)}
                          key={s.value}
                          className={cn(
                            "rounded bg-primary-muted text-xs lg:text-sm text-primary-light cursor-pointer lg:hover:scale-102 transition-all montserrat-semibold px-1 flex items-center justify-center py-2 lg:px-4",
                            selected && "outline-2 outline-primary-extralight",
                          )}
                        >
                          {s.label}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-y-1 lg:gap-y-2 w-full lg:w-[90%] mt-4 lg:mt-5 mx-auto">
                    <label
                      htmlFor="phone_number"
                      className="text-primary text-xs lg:text-sm montserrat-medium"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      onChange={(e) => setValue("phone_number", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full mx-auto py-2.5 text-xs lg:text-sm lg:py-3 rounded-md px-3 lg:px-4 bg-primary-muted-background"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="button"
                    onClick={submitViewingRequest}
                    className={cn(
                      "w-full lg:w-[90%] bg-green-400 mt-3 lg:mt-6 py-2 lg:py-2.5 cursor-pointer rounded-md text-white montserrat-semibold text-xs lg:text-sm mx-auto",
                      activeState && "bg-green-500",
                    )}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div className="text-xl text-primary montserrat-semibold text-center py-2 pb-4">
                  No slots are available for the selected date
                </div>
              )}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
