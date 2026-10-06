import type {
  FormImage,
  ListPropertyForm,
} from "@/schemas/properties/list";
import { useFormContext } from "react-hook-form";
import { WizardHeader } from "./WizardHeader";
import { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { XIcon } from "lucide-react";
import { useWizard } from "@/hooks/useWizard";
import { cn } from "@/lib/utils";
import { TagModal } from "./TagModal";

export const ImageUploader = () => {
  const { setValue, watch } = useFormContext<ListPropertyForm>();
  const [errorMsg, setErrorMsg] = useState("");
  const { loading } = useWizard();
  const [openTagModal, setOpenTagModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const images = watch("images");

  const uploadImageWithTag = (image: File, tag: string) => {
    const imageData = {
      image: image,
      tag: tag,
    };

    const updatedFiles = [...images, imageData];

    setErrorMsg("");

    setValue("images", updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setSelectedImage(null);
    setOpenTagModal(false);
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const image = e.target.files[0];

    if (images.length >= 10) {
      setErrorMsg("Maximum 10 images are allowed");
      e.target.value = "";
      return;
    }

    if (images.length < 1) uploadImageWithTag(image, "cover");
    else {
      setSelectedImage(image);
      setOpenTagModal(true);
    }
  };

  const deleteFile = (file: FormImage) => {
    setValue(
      "images",
      images.filter((f) => f.image !== file.image),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    setErrorMsg("");
  };
  return (
    <div>
      <WizardHeader
        heading="Upload Images"
        subheading="Upload some photos that of your property"
      />
      <div className="pt-6 lg:pt-10">
        <input
          disabled={loading}
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImages}
          hidden
        />

        <div
          className="cursor-pointer selection:bg-transparent w-full px-6 lg:w-[60%] border-2 border-primary-muted rounded mx-auto flex flex-col items-center justify-center py-4 border-dashed"
          onClick={() => {
            if (imageInputRef.current) {
              imageInputRef.current.click();
            }
          }}
        >
          <LuImagePlus className="size-6 lg:size-8 text-primary-extralight" />
          <div className="pt-3 text-primary-light montserrat-medium text-xs text-center lg:text-base">
            Drop your images here, or browse
          </div>
          <div className="pt-0.5 lg:pt-1 text-[10px] lg:text-xs text-primary-extralight">
            Supports PNG, JPG, JPEG, and WEBP
          </div>
        </div>
        <p
          className={cn(
            "pt-2 lg:pt-3 text-center text-[10px] lg:text-xs text-primary-extralight",
            errorMsg.length > 0 && "text-red-500",
          )}
        >
          {errorMsg
            ? errorMsg
            : images.length >= 1
              ? "Upload at least five images of your property"
              : "The first image will be used as the cover photo"}
        </p>
        <div className="pt-2 grid grid-cols-4 lg:grid-cols-5 gap-y-2 w-full lg:w-[60%] mx-auto gap-x-2 lg:gap-x-3">
          {images?.slice(0, 5).map((file, index) => {
            const hiddenImagesCount =
              images.length > 5 && index === 4 ? images.length - 4 : 0;

            return (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file.image)}
                  alt={file.tag}
                  className="h-12 lg:h-14 w-24 border object-cover border-primary-muted rounded-md"
                />

                <span className="absolute bottom-0 left-0 text-[8px] lg:text-[10px] bg-primary text-white px-1 rounded">
                  {file.tag}
                </span>

                {hiddenImagesCount > 0 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-md">
                    <span className="text-white text-sm lg:text-base">
                      +{hiddenImagesCount}
                    </span>
                  </div>
                )}

                <div
                  onClick={() => deleteFile(file)}
                  className="absolute -top-1 cursor-pointer -right-1 p-1 bg-primary rounded-full"
                >
                  <XIcon className="size-2 lg:size-3 text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TagModal
        open={openTagModal}
        setOpen={setOpenTagModal}
        uploadImageFunction={uploadImageWithTag}
        selectedImage={selectedImage}
      />
    </div>
  );
};
