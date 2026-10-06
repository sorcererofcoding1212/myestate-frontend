import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "@/components/reui/stepper";
import {
  listSchema,
  type FormImage,
  type ListPropertyForm,
} from "@/schemas/properties/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { PropertyTypeSelector } from "./PropertyTypeSelector";
import { useEffect, useState } from "react";
import { PropertyLocation } from "./PropertyLocation";
import { WizardNavigationButton } from "./WizardNavigationButton";
import { PropertyInformation } from "./PropertyInformation";
import { ImageUploader } from "./ImageUploader";
import { PropertyDescription } from "./PropertyDescription";
import { WizardProvider } from "./WizardProvider";
import { FurnishingStatusSelector } from "./FurnishingStatusSelector";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { HOME } from "@/lib/constants";

export const ListWizard = ({ listing_type }: { listing_type: string }) => {
  const steps = [
    {
      id: 1,
      component: <PropertyTypeSelector />,
    },
    {
      id: 2,
      component: <FurnishingStatusSelector />,
    },
    {
      id: 3,
      component: <PropertyLocation />,
    },
    {
      id: 4,
      component: <PropertyInformation />,
    },
    {
      id: 5,
      component: <ImageUploader />,
    },
    {
      id: 6,
      component: <PropertyDescription />,
    },
  ];

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const methods = useForm<ListPropertyForm>({
    defaultValues: {
      images: [],
      listing_type: listing_type,
    },

    resolver: zodResolver(listSchema),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      methods.reset();
    };
  }, []);

  const submitListForm = async (values: ListPropertyForm) => {
    try {
      setLoading(true);
      if (values.listing_type !== "SALE" && values.listing_type !== "RENT") {
        toast.error("Invalid listing type");
        return;
      }

      const formData = new FormData();
      for (const key of Object.keys(values)) {
        const value = values[key as keyof ListPropertyForm];

        if (key === "description") {
          const description = (value as string).split(/\s+/);
          if (description.length > 200) {
            toast.error("Description should be less than 200 words");
            return;
          }
          if (description.length < 100) {
            toast.error("Description should be at least 100 words");
            return;
          }
        }

        if (key === "images") {
          for (const propertyImage of value as FormImage[]) {
            formData.append("images", propertyImage.image);
            formData.append("tags", propertyImage.tag);
          }
        } else {
          if (value !== undefined && value !== null)
            formData.append(key, String(value));
        }
      }

      const response = await axios.post("/properties/create/", formData);

      if (response.status === 201) {
        toast.success(response.data.detail);
        navigate(HOME);
      }
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stepper
      value={currentStep}
      defaultValue={1}
      className="w-full lg:w-[80%] space-y-8 shadow-md bg-white pt-4 border mx-auto rounded-xl"
    >
      <StepperNav className="px-6">
        {steps.map((step) => (
          <StepperItem
            onClick={() => {
              const validStep = !!completedSteps.find((s) => s === step.id);
              if (validStep) setCurrentStep(step.id);
            }}
            key={step.id}
            step={step.id}
          >
            <StepperTrigger>
              <StepperIndicator className="data-[state=active]:bg-primary data-[state=active]:text-background data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=inactive]:text-gray-500">
                {step.id}
              </StepperIndicator>
            </StepperTrigger>
            {steps.length > step.id && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />
            )}
          </StepperItem>
        ))}
      </StepperNav>
      <StepperPanel>
        <WizardProvider
          loading={loading}
          setLoading={setLoading}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          completedSteps={completedSteps}
          setCompletedSteps={setCompletedSteps}
        >
          <FormProvider {...methods}>
            <form
              className="px-6"
              onSubmit={methods.handleSubmit(submitListForm)}
            >
              {steps.map(({ id, component }) => (
                <StepperContent
                  className="w-full animate-in fade-in slide-in-from-right-3 duration-300 pb-4"
                  key={id}
                  value={id}
                >
                  {component}
                  <WizardNavigationButton />
                </StepperContent>
              ))}
            </form>
          </FormProvider>
        </WizardProvider>
      </StepperPanel>
    </Stepper>
  );
};
