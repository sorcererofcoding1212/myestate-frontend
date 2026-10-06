import { AmenityDisplayItem } from "@/components/AmenityDisplayItem";
import { ContactSellerModal } from "@/components/ContactSellerModal";
import { ImageCollectionModal } from "@/components/ImageCollectionModal";
import { MobileBottomCollapsible } from "@/components/MobileBottomCollapsible";
import { NetworkError } from "@/components/NetworkError";
import { PropertyDescriptionModal } from "@/components/PropertyDescriptionModal";
import { PropertyDisplayItem } from "@/components/PropertyDisplayItem";
import { GridImage } from "@/components/PropertyImage";
import { Card } from "@/components/ui/card";
import { ViewingSelectionModal } from "@/components/ViewingSelectionModal";
import { MainLayout } from "@/layouts/MainLayout";
import axios from "@/lib/axios";
import { LOGIN } from "@/lib/constants";
import type { PropertyImage } from "@/lib/types";
import {
  capitalizeFirstLetter,
  formatDescription,
  formatIndianDenomination,
} from "@/lib/utils";
import { useUserStore } from "@/store/user";
import {
  Images,
  LucideBath,
  LucideBed,
  LucideBuilding,
  LucideDoorOpen,
  LucideHeart,
  LucideHeartPlus,
  LucideLandPlot,
  LucideMapPin,
  LucideParkingSquare,
  LucideRulerDimensionLine,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface Listing {
  address: string;
  area: string;
  bathrooms: number;
  bedrooms: number;
  city: string;
  id: number;
  banner: {
    image: string;
    tag: string;
  };
  images: PropertyImage[];
  listing_type: string;
  postal_code: string;
  price: string;
  property_type: string;
  state: string;
  latitude: number;
  longitude: number;
  total_floors?: number;
  floor_number?: number;
  parking_spaces: number;
  balconies: number;
  seller: {
    id: number;
    first_name: string;
    last_name?: string;
    email: string;
  };
  furnishing_status: string;
  description: string;
  favorite_id: number | null;
}

const Property = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<Listing | null>(null);
  const isMarkedFavorite = listing?.favorite_id !== null;

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectOnLogin = () => {
    const redirectPath = location.pathname + location.search;
    if (!user)
      navigate(`${LOGIN}?redirect=${encodeURIComponent(redirectPath)}`);
  };

  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [openViewingSelectionModal, setOpenViewingSelectionModal] =
    useState(false);
  const [openContactSellerModal, setOpenContactSellerModal] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/properties/${id}`);
      if (response.status === 200) setListing(response.data);
    } catch (error: any) {
      console.error(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
    }
  };

  const markFavorite = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/favorites/", {
        property: id,
      });

      if (response.status === 201) {
        setListing((prev) =>
          prev ? { ...prev, favorite_id: response.data.id } : prev,
        );
        toast.success("Marked as favorite");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail ?? "Some error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorite = async () => {
    if (!listing?.favorite_id) return;

    try {
      setLoading(true);

      const response = await axios.delete(
        `/favorites/delete/${listing.favorite_id}/`,
      );

      if (response.status === 204) {
        setListing((prev) => (prev ? { ...prev, favorite_id: null } : prev));
        toast.success("Removed as favorite");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail ?? "Some error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    console.log(listing?.favorite_id);
    if (!user) {
      redirectOnLogin();
      return;
    }

    if (listing?.favorite_id) {
      deleteFavorite();
    } else {
      markFavorite();
    }
  };

  const { description, limitReached } = formatDescription(
    listing?.description ?? "",
  );

  useEffect(() => {
    fetchProperty();

    return () => {
      setOpenImagesModal(false);
      setOpenViewingSelectionModal(false);
      setListing(null);
    };
  }, [id]);
  return (
    <MainLayout loading={loading}>
      {listing ? (
        <div className="gap-x-4 lg:grid lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col items-center w-full mt-3 lg:mt-4 px-2 lg:px-8">
            <Card className="px-4 lg:px-6 rounded-md">
              <div className="lg:grid lg:grid-cols-2 gap-x-2">
                <div
                  onClick={() => setOpenImagesModal(true)}
                  className="lg:col-span-1 relative rounded-sm overflow-hidden"
                >
                  <img
                    src={listing.banner.image}
                    alt="banner"
                    className="w-full h-40 lg:h-72 object-cover"
                  />
                  <span className="absolute bottom-0 bg-linear-to-b from-black/10 via-black/60 to-black/80 px-2 lg:px-3 montserrat-medium w-full text-white text-[10px] lg:text-xs items-center py-1 lg:py-2 flex justify-between">
                    <div className="cursor-pointer lg:hover:underline">
                      See all photos
                    </div>
                    <div className="flex gap-x-1 lg:gap-x-2 items-center">
                      <Images className="size-3 lg:size-4" />
                      <div>{listing.images.length}</div>
                    </div>
                  </span>
                </div>
                <div className="mt-2 lg:mt-0 grid grid-cols-2 lg:col-span-1 lg:flex lg:flex-col gap-x-2 lg:gap-x-0 lg:gap-y-2">
                  {listing.images
                    .filter((i) => i.tag !== "cover")
                    .slice(0, 2)
                    .map((i, index) => (
                      <GridImage image={i} key={index} />
                    ))}
                </div>
              </div>
            </Card>
            <div className="w-full mt-4 flex flex-col gap-y-2 lg:gap-y-4 px-2 lg:px-0">
              <div className="flex gap-x-3 lg:gap-x-6">
                <div className="px-3 lg:px-4 rounded w-fit items-center gap-x-2 bg-primary-muted-background py-2 flex">
                  <div className="bg-amber-500 size-2 lg:mb-px rounded-full"></div>
                  <div className="text-primary text-xs lg:text-sm montserrat-medium">
                    For {capitalizeFirstLetter(listing.listing_type)}
                  </div>
                </div>
                <div
                  onClick={toggleFavorite}
                  role="button
              "
                  className="cursor-pointer ring-1 ring-primary-muted/50 shadow-md py-2 px-3 lg:px-4 rounded text-primary-light text-xs lg:text-sm montserrat-medium transition-all active:scale-95 select-none flex gap-x-2 items-center"
                >
                  {isMarkedFavorite ? (
                    <LucideHeart className="size-4" />
                  ) : (
                    <LucideHeartPlus className="size-4" />
                  )}
                  <span>
                    {isMarkedFavorite
                      ? "Remove as Favorite"
                      : "Mark as Favorite"}
                  </span>
                </div>
              </div>
              <div className="w-full mt-2 lg:flex lg:justify-between lg:items-center">
                <div className="flex flex-col gap-y-1 w-full">
                  <div className="text-xl lg:text-3xl montserrat-semibold text-primary">
                    ₹{formatIndianDenomination(listing.price)}{" "}
                    {listing.listing_type === "RENT" && (
                      <span className="text-primary-light text-xs lg:text-base">
                        p.m.
                      </span>
                    )}
                  </div>
                  <div className="text-xs lg:text-base text-primary-light max-w-[80%] lg:max-w-[60%]">
                    {`${listing.address}, ${listing.city}, ${listing.state}, ${listing.postal_code}`}
                  </div>
                </div>
                <div className="flex lg:shadow-md lg:ring-1 lg:rounded-md lg:ring-foreground/5 gap-x-6 lg:px-4 lg:py-2 mt-2 lg:mt-0">
                  <PropertyDisplayItem
                    Icon={LucideBed}
                    item="Beds"
                    value={listing.bedrooms}
                  />
                  <PropertyDisplayItem
                    Icon={LucideBath}
                    item="Baths"
                    value={listing.bathrooms}
                  />
                  <PropertyDisplayItem
                    Icon={LucideRulerDimensionLine}
                    item="Sqft"
                    value={formatIndianDenomination(
                      Number.parseInt(listing.area),
                    )}
                  />
                </div>
              </div>
              <div className="h-px bg-primary-muted-background"></div>
              <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                <AmenityDisplayItem
                  Icon={LucideParkingSquare}
                  value={listing.parking_spaces}
                  label="Parking Spaces"
                />
                <AmenityDisplayItem
                  Icon={LucideBuilding}
                  value={
                    listing.listing_type === "apartment"
                      ? listing.floor_number!
                      : listing.total_floors!
                  }
                  label={
                    listing.listing_type === "apartment"
                      ? "Floor Number"
                      : "Total Floors"
                  }
                />
                <AmenityDisplayItem
                  Icon={LucideDoorOpen}
                  value={listing.balconies}
                  label="Balcony Spaces"
                />
                <AmenityDisplayItem
                  Icon={LucideLandPlot}
                  value={capitalizeFirstLetter(listing.furnishing_status)}
                />
              </div>
              <div className="hidden lg:block h-px bg-primary-muted-background"></div>
              <div
                role="button
              "
                className="hidden mx-auto ring-1 ring-primary-muted/50 cursor-pointer shadow-md py-2 px-6 rounded-md text-primary-light montserrat-medium transition-all active:scale-95 select-none lg:flex gap-x-2 items-center"
              >
                <LucideMapPin className="size-4" />
                <span>View on map</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-primary-muted-background lg:hidden w-[90%] my-4 mx-auto"></div>
          <div className="col-span-1 mt-4 pb-2 lg:pb-0">
            <div className="flex flex-col lg:px-4 items-center">
              <div className="w-full px-8 py-3 gap-y-2 shadow-md ring-1 ring-foreground/5 rounded-md hidden lg:flex flex-col items-center">
                <div className="text-sm text-primary-light">Listed by</div>
                <div className="size-10 lg:size-14 flex items-center justify-center rounded-full bg-primary-muted-background">
                  <div className="text-lg lg:text-2xl montserrat-medium text-primary-light">
                    M
                  </div>
                </div>
                <div className="text-primary text-sm lg:text-base montserrat-medium">
                  {listing.seller.first_name} {listing.seller.last_name}
                </div>
                <div
                  onClick={() => setOpenContactSellerModal(true)}
                  role="button"
                  className="w-full cursor-pointer active:scale-95 transition-all text-xs lg:text-sm montserrat-medium text-center outline outline-blue-500 text-blue-500 py-2 rounded-md select-none"
                >
                  Contact {listing.seller.first_name}
                </div>
                <div
                  onClick={() => {
                    redirectOnLogin();
                    setOpenViewingSelectionModal(true);
                  }}
                  role="button"
                  className="bg-blue-500 mt-1 transition-all active:scale-95 select-none cursor-pointer text-xs lg:text-sm w-full py-2 rounded-md outline outline-blue-500 text-white montserrat-medium text-center"
                >
                  Request a viewing
                </div>
              </div>
              <div className="mt-3 pb-3 lg:mt-8 w-[90%] lg:w-full flex flex-col items-center">
                <div className="text-xl text-primary montserrat-medium">
                  About this property
                </div>
                <div className="mt-2 lg:mt-3 leading-4.5 text-center lg:text-left lg:leading-5 lg:px-4 text-primary-light text-xs lg:text-sm montserrat-regular">
                  {description}
                  {limitReached && (
                    <span>
                      <span>{"..."} </span>
                      <span
                        onClick={() => setOpenDescriptionModal(true)}
                        className="montserrat-medium text-blue-500 cursor-pointer underline"
                      >
                        view more
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ImageCollectionModal
            open={openImagesModal}
            setOpen={setOpenImagesModal}
            images={listing.images}
          />
          <MobileBottomCollapsible
            visibleOnFirstLoad={true}
            Icon={FaUserCircle}
          >
            <div className="w-full px-8 py-3 gap-y-2 flex flex-col items-center">
              <div className="text-sm text-primary-light">Listed by</div>
              <div className="size-10 lg:size-14 flex items-center justify-center rounded-full bg-primary-muted-background">
                <div className="text-lg lg:text-2xl montserrat-medium text-primary-light">
                  M
                </div>
              </div>
              <div className="text-primary text-sm lg:text-base montserrat-medium">
                {listing.seller.first_name} {listing.seller.last_name}
              </div>
              <div
                onClick={() => setOpenContactSellerModal(true)}
                role="button"
                className="w-full cursor-pointer active:scale-95 transition-all text-xs lg:text-sm montserrat-medium text-center outline outline-blue-500 text-blue-500 py-2 rounded-md select-none"
              >
                Contact {listing.seller.first_name}
              </div>
              <div
                onClick={() => {
                  redirectOnLogin();
                  setOpenViewingSelectionModal(true);
                }}
                role="button"
                className="bg-blue-500 mt-1 transition-all active:scale-95 select-none cursor-pointer text-xs lg:text-sm w-full py-2 rounded-md outline outline-blue-500 text-white montserrat-medium text-center"
              >
                Request a viewing
              </div>
            </div>
          </MobileBottomCollapsible>
          <ContactSellerModal
            propertyId={id}
            open={openContactSellerModal}
            setOpen={setOpenContactSellerModal}
            seller={listing.seller.first_name}
          />
          <ViewingSelectionModal
            propertyId={id}
            open={openViewingSelectionModal}
            setOpen={setOpenViewingSelectionModal}
          />
          <PropertyDescriptionModal
            open={openDescriptionModal}
            setOpen={setOpenDescriptionModal}
            description={listing.description}
          />
        </div>
      ) : (
        <NetworkError />
      )}
    </MainLayout>
  );
};

export default Property;
