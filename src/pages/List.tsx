import { ActionCard } from "@/components/ActionCard";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionSubheading } from "@/components/SectionSubheading";
import { MainLayout } from "@/layouts/MainLayout";
import { CREATE_LISTING } from "@/lib/constants";

const List = () => {
  return (
    <MainLayout>
      <Section>
        <SectionHeading heading="List your property" />
        <SectionSubheading
          subheading="Start listing your property on MyEstate. Choose whether you would like to
          sell your property or rent it out."
        />
      </Section>
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-6">
          <ActionCard
            path={`${CREATE_LISTING}?sale`}
            image="sell-yourself.svg"
            action="Sell your property"
            label="Sell property"
            description="Create a listing for sale or rent and connect with thousands of potential customers."
          />
          <ActionCard
            path={`${CREATE_LISTING}?rent`}
            image="rent-out.svg"
            action="Rent out your property"
            label="Rent property"
            description="Create a rental listing and start receiving inquiries from potential tenants."
          />
        </div>
      </Section>
    </MainLayout>
  );
};

export default List;
