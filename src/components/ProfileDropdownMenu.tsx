import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "@/lib/constants";

export const ProfileDropdownMenu = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    if (loading) return;
    navigate(route);
  };

  const logout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        await axios.post("/accounts/logout/", { refresh });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail ?? "Some error occured");
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
      setLoading(false);
      navigate(LOGIN);
    }
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <FaUserCircle className="text-white cursor-pointer size-6 lg:size-7" />
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuGroup>
          {!user ? (
            <>
              <DropdownMenuLabel>Login / Register</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleNavigation(LOGIN)}>
                Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation(REGISTER)}>
                Register
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
