import type { IconType } from "react-icons/lib";

export interface User {
  email: string;
  id: string;
  first_name: string;
  last_name?: string;
}
export interface RouteCardProps {
  label: string;
  path: string;
  Icon: IconType;
}

export interface Notification {
  created_at: string;
  id: number;
  message_type: "CONTACT_MESSAGE" | "VIEWING_REQUEST";
  content: string;
  sender: {
    first_name: string;
    last_name: string;
    id: number;
  };
  phone_number: string;
  property: number;
}

export interface WizardContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  completedSteps: number[];
  setCompletedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PropertyImage {
  image: string;
  tag: string;
}

export interface City {
  name: string;
  path?: string;
  image: string;
  description: string;
}

export interface AdvancedSearchProps {
  id: number;
  img: {
    image: string;
    tag: string;
  };
  address: string;
  area: string;
  bathrooms: number;
  bedrooms: number;
  city: string;
  listing_type: "SALE" | "RENT";
  postal_code: string;
  price: string;
  property_type: string;
  state: string;
}
