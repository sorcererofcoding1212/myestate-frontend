export const WizardHeader = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div>
      <div className="text-primary lg:text-lg montserrat-semibold">{heading}</div>
      <div className="text-primary-light text-xs mt-1 montserrat-medium lg:text-sm">
        {subheading}
      </div>
    </div>
  );
};
