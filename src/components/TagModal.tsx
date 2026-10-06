import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

interface TagModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  uploadImageFunction: (img: File, tag: string) => void;
  selectedImage: File | null;
}

export const TagModal = ({
  open,
  setOpen,
  uploadImageFunction,
  selectedImage,
}: TagModalProps) => {
  const tags = [
    "living room",
    "bedroom",
    "bathroom",
    "kitchen",
    "balcony",
    "terrace",
    "outdoors",
    "lawn",
    "parking",
    "other",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Select an image tag</DialogHeader>
        <div className="grid grid-cols-3 lg:grid-cols-4 items-center gap-2 lg:gap-3 lg:pt-2 lg:w-[90%] mx-auto">
          {tags.map((tag, index) => (
            <div
              onClick={() => {
                if (!selectedImage) return;
                uploadImageFunction(selectedImage, tag);
              }}
              key={index}
              className="px-2 lg:px-3 py-2 text-xs lg:text-sm text-center montserrat-semibold lg:hover:cursor-pointer bg-primary-muted text-primary-light rounded"
            >
              {tag}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
