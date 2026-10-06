import { cn } from "cn";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useForm, useWatch } from "react-hook-form";
import {
  contactSellerSchema,
  type ContactSellerForm,
} from "@/schemas/chat/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/axios";

export const ContactSellerModal = ({
  open,
  setOpen,
  seller,
  propertyId,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  propertyId: string | undefined;
  seller: string;
}) => {
  const { control, reset } = useForm<ContactSellerForm>({
    resolver: zodResolver(contactSellerSchema),
  });

  const formState = useWatch({ control });

  const [activeState, setActiveState] = useState(false);

  useEffect(() => {
    setActiveState(
      !!formState.content &&
        formState.content.length <= 250 &&
        !!formState.phone_number &&
        formState.phone_number.length === 10,
    );
  }, [formState]);

  const messageCharacterCount = formState.content?.length ?? 0;

  const [loading, setLoading] = useState(false);

  const maxCharacterLimit = 250;

  const submitContactSellerForm = async (values: ContactSellerForm) => {
    console.log("Control reached here");
    try {
      setLoading(false);
      const response = await axios.post(`/chats/${propertyId}/create/`, {
        message_type: "CONTACT_MESSAGE",
        ...values,
      });
      if (response.status === 201) {
        toast.success("Message sent successfully");
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
        setOpen(val);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="montserrat-semibold text-2xl text-primary">
            Contact {seller}
          </div>
        </DialogHeader>
        <form onSubmit={control.handleSubmit(submitContactSellerForm)}>
          <div className="flex flex-col gap-y-1 lg:gap-y-2 w-full lg:w-[90%] mt-4 lg:mt-5 mx-auto">
            <label
              htmlFor="phone_number"
              className="text-primary text-xs lg:text-sm montserrat-medium"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...control.register("phone_number")}
              disabled={loading}
              type="text"
              id="phone_number"
              placeholder="Enter your phone number"
              className="w-full mx-auto py-2.5 text-xs lg:text-sm lg:py-3 rounded-md px-3 lg:px-4 bg-primary-muted-background"
            />
          </div>
          <div className="flex flex-col relative gap-y-1 lg:gap-y-2 w-full lg:w-[90%] mt-4 lg:mt-5 mx-auto">
            <label
              htmlFor="message"
              className="text-primary text-xs lg:text-sm montserrat-medium"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...control.register("content")}
              disabled={loading}
              id="message"
              placeholder="Type your message"
              rows={6}
              className="w-full mx-auto py-2.5 resize-none text-xs lg:text-sm lg:py-3 rounded-md px-3 lg:px-4 bg-primary-muted-background"
            />
            <div
              className={cn(
                "text-primary-light absolute bottom-0 text-[10px] lg:text-xs z-20 right-0 p-1",
                messageCharacterCount > maxCharacterLimit && "text-red-500",
              )}
            >
              {messageCharacterCount}/{maxCharacterLimit}
            </div>
          </div>
          <div className="flex justify-center mt-3 lg:mt-4">
            <button
              disabled={loading}
              className={cn(
                "w-full lg:w-[90%] bg-green-400 py-2 lg:py-2.5 cursor-pointer rounded-md text-white montserrat-semibold text-xs lg:text-sm",
                activeState && "bg-green-500",
              )}
            >
              Confirm
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
