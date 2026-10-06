import { useNavigate } from "react-router-dom";

interface ActionCardProps {
  label: string;
  description: string;
  action: string;
  path: string;
  image: string;
}

export const ActionCard = ({
  label,
  description,
  action,
  path,
  image,
}: ActionCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className="py-6 select-none lg:hover:scale-102 transition-all lg:py-6 bg-white gap-y-4 lg:hover:cursor-pointer lg:gap-y-6 shadow-md border border-foreground/5 rounded-xl flex flex-col items-center justify-center"
    >
      <img className="h-36 w-64" src={image} alt={label} />
      <div className="flex flex-col gap-y-2 items-center">
        <div className="montserrat-semibold text-primary text-xl lg:text-2xl">
          {action}
        </div>
        <div className="text-center w-[80%] text-primary text-sm lg:text-base">
          {description}
        </div>
      </div>
      <button className="bg-primary-light transition-all lg:hover:cursor-pointer px-6 py-3 text-sm lg:text-base mt-2 rounded-md cursor-pointer text-background">
        {label}
      </button>
    </div>
  );
};
