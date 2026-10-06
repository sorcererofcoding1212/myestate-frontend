import { CardForm } from "@/components/CardForm";
import { ErrorMessageDisplayer } from "@/components/ErrorMessageDisplayer";
import { FormButton } from "@/components/FormButton";
import { LabelledInput } from "@/components/LabelledInput";
import { Seperator } from "@/components/Seperator";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BaseLayout } from "@/layouts/BaseLayout";
import axios from "@/lib/axios";
import { HOME, LOGIN } from "@/lib/constants";
import {
  verifyOTPSchema,
  type VerifyOTPForm,
} from "@/schemas/accounts/register";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOTP = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPForm>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(verifyOTPSchema),
  });

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const email = sessionStorage.getItem("email");

  if (!email) return <Navigate to={LOGIN} replace={true} />;

  const submitAccountVerificationForm = async (values: VerifyOTPForm) => {
    try {
      if (loading) return;
      setLoading(true);

      const response = await axios.post("/accounts/verify-otp/", {
        email: email,
        otp: Number.parseInt(values.otp),
      });

      toast.success("Account registered");
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setUser(response.data.user);
      navigate(HOME);
    } catch (error: any) {
      setErrorMsg(error.response.data.detail ?? "Some error occured ");
    } finally {
      setLoading(false);
      reset();
      sessionStorage.removeItem("email");
    }
  };

  return (
    <BaseLayout>
      <Card className="mt-14 lg:mt-20">
        <CardTitle className="montserrat-semibold text-2xl lg:text-3xl text-center">
          Verify your account
        </CardTitle>
        <CardDescription className="text-xs lg:text-sm text-center">
          Enter the OTP sent to your email address
        </CardDescription>
        <Seperator className="w-72 lg:w-116" />
        <CardContent>
          <CardForm
            onSubmitHandler={handleSubmit(submitAccountVerificationForm)}
          >
            <LabelledInput
              type="number"
              placeholder="Enter OTP"
              register={{ ...register("otp") }}
              required={true}
              disabled={loading}
              id="otp"
              label="OTP"
              errors={errors["otp"]?.message}
            />
            <FormButton disabled={loading} btnText="Verify" />
          </CardForm>
        </CardContent>
        {errorMsg && <ErrorMessageDisplayer errorMsg={errorMsg} />}
      </Card>
    </BaseLayout>
  );
};

export default VerifyOTP;
