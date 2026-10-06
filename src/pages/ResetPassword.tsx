import { CardForm } from "@/components/CardForm";
import { ErrorMessageDisplayer } from "@/components/ErrorMessageDisplayer";
import { FormButton } from "@/components/FormButton";
import { LabelledInput } from "@/components/LabelledInput";
import { Seperator } from "@/components/Seperator";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BaseLayout } from "@/layouts/BaseLayout";
import axiosInstance from "@/lib/axios";
import { LOGIN } from "@/lib/constants";
import {
  resetPasswordSchema,
  type ResetPasswordForm,
} from "@/schemas/accounts/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submitPasswordResetForm = async (values: ResetPasswordForm) => {
    try {
      if (loading) return;
      if (values.password !== values.confirm_password) {
        setErrorMsg("Passwords do not match");
        return;
      }

      const token = searchParams.get("t");
      if (!token) {
        setErrorMsg("Invalid request");
        return;
      }

      setLoading(true);
      const response = await axiosInstance.post(
        `/accounts/password-reset/?t=${token}`,
        { password: values.password },
      );
      toast.success(response.data.detail);
      navigate(LOGIN);
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.detail ??
          error.response?.data?.password?.[0] ??
          "Some error occured",
      );
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <BaseLayout>
      <Card className="mt-14 lg:mt-20">
        <CardTitle className="montserrat-semibold text-2xl lg:text-3xl text-center">
          Reset your password
        </CardTitle>
        <Seperator className="w-72 lg:w-116" />
        <CardContent>
          <CardForm onSubmitHandler={handleSubmit(submitPasswordResetForm)}>
            <LabelledInput
              type="password"
              placeholder="Create a new password"
              register={{ ...register("password") }}
              required={true}
              disabled={loading}
              id="password"
              label="Password"
              errors={errors["password"]?.message}
            />
            <LabelledInput
              type="password"
              placeholder="Confirm your password"
              register={{ ...register("confirm_password") }}
              required={true}
              disabled={loading}
              id="confirm_password"
              label="Confirm Password"
              errors={errors["confirm_password"]?.message}
            />
            <FormButton btnText="Reset Password" disabled={loading} />
          </CardForm>
        </CardContent>
        {errorMsg && <ErrorMessageDisplayer errorMsg={errorMsg} />}
      </Card>
    </BaseLayout>
  );
};

export default ResetPassword;
