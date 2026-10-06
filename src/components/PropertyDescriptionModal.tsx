import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export const PropertyDescriptionModal = ({
  open,
  setOpen,
  description,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  description: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex gap-4 lg:gap-6 flex-col h-[60dvh] lg:h-[50dvh] min-h-0 overflow-y-hidden">
        <DialogHeader>About this property</DialogHeader>
        <ScrollArea className="flex-1 min-h-0 px-2 text-center lg:text-left lg:px-4 py-1 montserrat-regular text-sm text-primary">
          {description}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
