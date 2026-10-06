import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios, { IP } from "./lib/axios";
import { useUserStore } from "./store/user";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthenticationRoute } from "./components/AuthenticationRoute";
import {
  HOME,
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER,
  RESET_PASSWORD,
  VERIFY_OTP,
  LIST,
  CREATE_LISTING,
  VIEW_LISTING,
  BUY,
  RENT,
  INBOX,
  FAVORITES,
} from "./lib/constants";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { PageLoader } from "./components/PageLoader";
import VerifyOTP from "./pages/VerifyOTP";
import List from "./pages/List";
import CreateListing from "./pages/CreateListing";
import Property from "./pages/Property";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Inbox from "./pages/Inbox";
import Favorites from "./pages/Favorites";

const App = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const setSocket = useUserStore((state) => state.setSocket);

  const { pathname } = useLocation();

  const adjustWindowLocation = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    adjustWindowLocation();
  }, [pathname]);

  const fetchClientSession = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/accounts/me");
      setUser(response.data.user);
    } catch (error: any) {
      console.error(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientSession();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (!user || !access) return;
    const socket = new WebSocket(
      `ws://192.168.29.${IP}:8000/ws/realtime/?access=${access}`,
    );

    socket.onopen = () => {
      setSocket(socket);
    };

    socket.onclose = () => {
      setSocket(null);
    };

    return () => {
      socket.close();
    };
  }, [user]);
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LIST} element={<List />} />
          <Route path={BUY} element={<Buy />} />
          <Route path={RENT} element={<Rent />} />
          <Route
            path={FAVORITES}
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path={CREATE_LISTING}
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route
            path={INBOX}
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />
          <Route
            path={REGISTER}
            element={
              <AuthenticationRoute>
                <Register />
              </AuthenticationRoute>
            }
          />
          <Route
            path={VERIFY_OTP}
            element={
              <AuthenticationRoute>
                <VerifyOTP />
              </AuthenticationRoute>
            }
          />
          <Route
            path={LOGIN}
            element={
              <AuthenticationRoute>
                <Login />
              </AuthenticationRoute>
            }
          />
          <Route
            path={FORGOT_PASSWORD}
            element={
              <AuthenticationRoute>
                <ForgotPassword />
              </AuthenticationRoute>
            }
          />
          <Route
            path={RESET_PASSWORD}
            element={
              <AuthenticationRoute>
                <ResetPassword />
              </AuthenticationRoute>
            }
          />
          <Route path={`${VIEW_LISTING}/:id`} element={<Property />} />
        </Routes>
      )}
    </>
  );
};

export default App;
