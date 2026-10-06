import { CardForm } from "@/components/CardForm";
import { ErrorMessageDisplayer } from "@/components/ErrorMessageDisplayer";
import { FormButton } from "@/components/FormButton";
import { LabelledInput } from "@/components/LabelledInput";
import { Seperator } from "@/components/Seperator";
import { SuccessMessageDisplayer } from "@/components/SuccessMessageDisplayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { BaseLayout } from "@/layouts/BaseLayout";
import axios from "@/lib/axios";
import {
  forgotPasswordSchema,
  type ForgotPasswordForm,
} from "@/schemas/accounts/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitResetLinkForm = async (values: ForgotPasswordForm) => {
    try {
      if (loading) return;
      setLoading(true);
      const response = await axios.post(
        "/accounts/password-reset/link/",
        values,
      );
      if (response.status === 200) {
        setErrorMsg("");
        setSuccessMsg(response.data.detail);
      }
    } catch (error: any) {
      setErrorMsg(error.response.data.detail ?? "Some error occured");
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <BaseLayout>
      <Card className="mt-14 lg:mt-20">
        <CardTitle className="montserrat-semibold text-2xl lg:text-3xl text-center">
          Find your account
        </CardTitle>
        <CardDescription className="text-xs text-primary-light lg:text-sm text-center">
          Enter your registered email address to get a link
        </CardDescription>
        <Seperator className="w-72 lg:w-116" />
        <CardContent>
          <CardForm onSubmitHandler={handleSubmit(submitResetLinkForm)}>
            <LabelledInput
              type="email"
              placeholder="Enter your registered email"
              register={{ ...register("email") }}
              required={true}
              disabled={loading}
              id="email"
              label="Email"
              errors={errors["email"]?.message}
            />
            <FormButton disabled={loading} btnText="Continue" />
          </CardForm>
        </CardContent>
        {errorMsg && <ErrorMessageDisplayer errorMsg={errorMsg} />}
        {successMsg && <SuccessMessageDisplayer successMsg={successMsg} />}
      </Card>
    </BaseLayout>
  );
};

export default ForgotPassword;
