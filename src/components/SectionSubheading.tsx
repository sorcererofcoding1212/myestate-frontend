export const SectionSubheading = ({ subheading }: { subheading: string }) => {
  return (
    <div className="mt-2 lg:mt-4 lg:leading-5 w-[70%] lg:w-[30%] text-center text-sm lg:text-base mx-auto text-primary-light">
      {subheading}
    </div>
  );
};
