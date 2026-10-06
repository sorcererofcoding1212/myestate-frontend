import { useLocation, useNavigate } from "react-router-dom";
import { HOME, LOGIN, REGISTER } from "@/lib/constants";
import { LocationSelector } from "./LocationSelector";
import { MobileSidebar } from "./MobileSidebar";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

export const Navbar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  return (
    <div className="bg-primary select-none h-14 fixed shadow-md lg:h-15 top-0 w-full z-50 py-3 items-center flex justify-between px-3 lg:px-6">
      <div
        onClick={() => {
          navigate(HOME);
        }}
        className="montserrat-semibold-italic text-white text-base lg:text-lg cursor-pointer"
      >
        MyEstate
      </div>
      <div className="flex gap-x-4 lg:gap-x-8 items-center">
        {pathname !== LOGIN && pathname !== REGISTER && <LocationSelector />}
        <ProfileDropdownMenu />
        <MobileSidebar />
      </div>
    </div>
  );
};
