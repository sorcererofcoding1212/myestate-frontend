import { PropertyCarouselCard } from "@/components/PropertyCarouselCard";
import { CarouselSection } from "@/components/CarouselSection";
import { SearchInput } from "@/components/SearchInput";
import { Section } from "@/components/Section";
import { MainLayout } from "@/layouts/MainLayout";
import { type Property } from "@/sample/properties";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { CityCarouselCard } from "@/components/CityCarouselCard";
import { ActionCard } from "@/components/ActionCard";
import { BUY, CITY_DATA, LIST, RENT } from "@/lib/constants";
import axios from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";

const Home = () => {
  const location = useUserStore((state) => state.location);
  const [propertiesData, setPropertiesData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/properties", {
        params: {
          location: JSON.stringify({
            city: location?.city,
            state: location?.state,
          }),
        },
      });

      if (response.status === 200) setPropertiesData(response.data);
    } catch (error: any) {
      console.log(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [location]);

  return (
    <MainLayout>
      <div className="flex flex-col h-full overflow-y-hidden">
        <ScrollArea className="flex-1 min-h-0">
          <div className="relative h-[30vh] lg:h-[60vh] bg-[url('/hero.png')] bg-cover">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 lg:from-black/50 via-black/50 lg:via-black/40 to-black/40 lg:to-black/30" />
            <div className="flex flex-col absolute gap-y-4 lg:gap-y-6 items-center lg:items-start justify-center h-full px-6 lg:pl-20 w-full">
              <div className="text-3xl lg:text-6xl montserrat-bold text-white lg:text-left text-center lg:w-[35%]">
                Find Your Perfect Home
              </div>
              <div className="w-full lg:w-[40%]">
                <SearchInput />
              </div>
            </div>
          </div>
          <Section className="lg:select-none">
            <CarouselSection
              path={BUY}
              loading={loading}
              heading={
                location
                  ? "Browse Properties Near You"
                  : "Browse Properties In Top Cities"
              }
              subheading={
                location
                  ? `Featured properties near ${location.city}, ${location.state}`
                  : "Featured properties across top Indian cities"
              }
              data={propertiesData}
            >
              {propertiesData.length > 0 ? (
                propertiesData.map((p) => (
                  <PropertyCarouselCard
                    key={p.id}
                    price={p.price}
                    bedrooms={p.bedrooms}
                    bathrooms={p.bathrooms}
                    area={p.area}
                    listing_type={p.listing_type}
                    picture_url={p.img.image}
                    city={p.city}
                    zip={p.postal_code}
                    address={p.address}
                    id={p.id}
                  />
                ))
              ) : (
                <div className="text-sm lg:text-base w-fit mx-auto lg:mx-0 text-primary-light rounded-md bg-primary-muted-background lg:px-6 px-5 py-2.5 lg:py-3 text-center montserrat-semibold">
                  No available data
                </div>
              )}
            </CarouselSection>
          </Section>
          <Section className="lg:select-none">
            <CarouselSection
              data={CITY_DATA}
              heading="Popular Cities"
              subheading="Featured properties in top Indian cities"
            >
              {CITY_DATA.map((c) => (
                <CityCarouselCard
                  key={c.name}
                  picture_url={c.image}
                  name={c.name}
                  description={c.description}
                />
              ))}
            </CarouselSection>
          </Section>
          <Section>
            <div className="text-primary text-xl lg:text-2xl montserrat-semibold">
              Recommended Actions
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-y-0 lg:gap-x-6 mt-4 lg:mt-5">
              <ActionCard
                label="Browse properties"
                path={BUY}
                image="buy-card.svg"
                description="Browse verified homes from trusted owners and agents across your favorite locations."
                action="Buy a home"
              />
              <ActionCard
                label="Explore rentals"
                path={RENT}
                image="rent-card.svg"
                description="Search apartments, houses, and villas with transparent pricing and easy contact options."
                action="Rent a home"
              />
              <ActionCard
                label="Start listing"
                path={LIST}
                image="sell-card.svg"
                description="Reach thousands of potential buyers by listing your property in just a few minutes."
                action="List a home"
              />
            </div>
          </Section>
          <div className="w-full bg-primary-light py-3 lg:py-4 text-white flex flex-col items-center justify-center mt-8 lg:mt-10">
            <div className="montserrat-semibold-italic text-base lg:text-lg">
              MyEstate
            </div>
            <div className="mt-1 text-xs lg:text-sm">
              © 2026 MyEstate. All rights reserved.
            </div>
          </div>
        </ScrollArea>
      </div>
    </MainLayout>
  );
};

export default Home;
