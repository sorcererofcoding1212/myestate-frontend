export const SectionHeading = ({ heading }: { heading: string }) => {
  return (
    <div className="text-3xl lg:text-5xl text-center montserrat-semibold text-primary">
      {heading}
    </div>
  );
};
