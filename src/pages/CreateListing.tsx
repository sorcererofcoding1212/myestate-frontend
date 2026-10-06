import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionSubheading } from "@/components/SectionSubheading";
import { ListWizard } from "@/components/ListWizard";
import { MainLayout } from "@/layouts/MainLayout";
import { useLocation } from "react-router-dom";

const CreateListing = () => {
  const { search } = useLocation();
  const listing_type = search.slice(1).toUpperCase();
  return (
    <MainLayout>
      <Section>
        <SectionHeading heading="List your property" />
        <SectionSubheading subheading="Complete a few simple steps to list your property for sale or rent on MyEstate." />
      </Section>
      <Section className="pt-4 lg:pt-6 pb-0 lg:pb-0">
        <ListWizard listing_type={listing_type} />
      </Section>
    </MainLayout>
  );
};

export default CreateListing;
