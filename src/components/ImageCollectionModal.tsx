import type { PropertyImage } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ImageCollectionModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  images: PropertyImage[];
}

export const ImageCollectionModal = ({
  open,
  setOpen,
  images,
}: ImageCollectionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Viewing all images</DialogHeader>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 lg:pt-4 lg:w-[90%] mx-auto">
          {images.map((i, index) => (
            <div key={index} className="relative rounded-sm overflow-hidden">
              <img
                src={i.image}
                alt={i.tag}
                className="h-28 lg:h-32 object-cover w-full"
              />
              <span className="absolute bottom-0 bg-linear-to-b from-black/10 via-black/60 to-black/80 montserrat-medium py-1 lg:py-1.5 text-white text-[10px] lg:text-xs w-full px-2">
                {capitalizeFirstLetter(i.tag)}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
