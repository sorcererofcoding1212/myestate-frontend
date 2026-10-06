import { PropertyCarouselCard } from "@/components/PropertyCarouselCard";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionSubheading } from "@/components/SectionSubheading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainLayout } from "@/layouts/MainLayout";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

interface Favorite {
  created_at: string;
  property: {
    address: string;
    area: string;
    bathrooms: number;
    bedrooms: number;
    city: string;
    id: number;
    img: {
      image: string;
    };
    listing_type: "SALE" | "RENT";
    postal_code: string;
    price: string;
    property_type: string;
    state: string;
  };
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/favorites");
      console.log(response.data);
      if (response.status === 200) setFavorites(response.data);
    } catch (error: any) {
      console.log(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);
  return (
    <MainLayout className="h-[calc(100dvh-3.5rem)]" loading={loading}>
      <div className="h-full flex flex-col overflow-hidden min-h-0">
        <Section>
          <SectionHeading heading="Favorite properties" />
          <SectionSubheading subheading="View the properties you have saved as favorites, explore their details, or remove them from your favorites." />
        </Section>
        <ScrollArea className="flex-1 min-h-0">
          {favorites.length > 0 ? (
            <div className="py-4 flex flex-col gap-y-4 lg:grid lg:grid-cols-3 lg:gap-4 px-3 lg:px-6">
              {[...favorites]
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .map((f, index) => (
                  <PropertyCarouselCard
                    imgHeight="h-44 lg:h-56"
                    key={index}
                    picture_url={f.property.img.image}
                    price={f.property.price}
                    bedrooms={f.property.bedrooms}
                    bathrooms={f.property.bathrooms}
                    area={f.property.area}
                    listing_type={f.property.listing_type}
                    city={f.property.city}
                    address={f.property.address}
                    zip={f.property.postal_code}
                    id={f.property.id}
                  />
                ))}
            </div>
          ) : (
            <div className="text-sm lg:text-base w-fit mx-auto mt-8 text-primary-light rounded-md bg-primary-muted-background lg:px-6 px-5 py-2.5 lg:py-3 text-center montserrat-semibold">
              No available data
            </div>
          )}
        </ScrollArea>
      </div>
    </MainLayout>
  );
};

export default Favorites;
