import { LabelledInput } from "@/components/LabelledInput";
import { Seperator } from "@/components/Seperator";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { loginSchema, type LoginForm } from "@/schemas/accounts/login";
import { BaseLayout } from "@/layouts/BaseLayout";
import axios from "@/lib/axios";
import { FORGOT_PASSWORD, HOME, REGISTER } from "@/lib/constants";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { FormButton } from "@/components/FormButton";
import { ErrorMessageDisplayer } from "@/components/ErrorMessageDisplayer";
import { CardForm } from "@/components/CardForm";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const submitLoginForm = async (values: LoginForm) => {
    try {
      setLoading(true);
      const response = await axios.post("/accounts/login/", values);
      toast.success("Logged in");
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setUser(response.data.user);
      if (redirectUrl) navigate(redirectUrl);
      else navigate(HOME);
    } catch (error: any) {
      setErrorMsg(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <BaseLayout>
      <Card className="mt-14 lg:mt-20 lg:w-fit mx-auto">
        <CardTitle className="montserrat-semibold text-2xl lg:text-3xl text-center">
          Welcome back
        </CardTitle>
        <Seperator className="w-72 lg:w-116" />
        <CardContent>
          <CardForm onSubmitHandler={handleSubmit(submitLoginForm)}>
            <LabelledInput
              id="email"
              label="Email"
              placeholder="Enter your email"
              disabled={loading}
              required={true}
              register={{ ...register("email") }}
              errors={errors["email"]?.message}
            />
            <LabelledInput
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              disabled={loading}
              required={true}
              register={{ ...register("password") }}
              errors={errors["password"]?.message}
            />
            <FormButton disabled={loading} btnText="Login" />
          </CardForm>
          <div
            role="button"
            onClick={() => {
              if (loading) return;
              navigate(FORGOT_PASSWORD);
            }}
            className="text-primary-light mt-4 lg:mt-6 cursor-pointer hover:underline text-center"
          >
            Forgot password?
          </div>
        </CardContent>
        <Seperator className="w-72 lg:w-116" />
        <div className="text-center text-primary-light">
          Don't have an account?{" "}
          <span
            onClick={() => navigate(REGISTER)}
            className="underline cursor-pointer"
          >
            Register
          </span>
        </div>
        {errorMsg && <ErrorMessageDisplayer errorMsg={errorMsg} />}
      </Card>
    </BaseLayout>
  );
};

export default Login;
