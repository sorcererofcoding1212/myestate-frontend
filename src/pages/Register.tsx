import { LabelledInput } from "@/components/LabelledInput";
import { Seperator } from "@/components/Seperator";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  registerSchema,
  type RegisterForm,
} from "@/schemas/accounts/register";
import { BaseLayout } from "@/layouts/BaseLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { LOGIN, VERIFY_OTP } from "@/lib/constants";
import { FormButton } from "@/components/FormButton";
import { ErrorMessageDisplayer } from "@/components/ErrorMessageDisplayer";
import { CardForm } from "@/components/CardForm";

const Register = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitRegisterForm = async (values: RegisterForm) => {
    try {
      setLoading(true);
      await axios.post("/accounts/register/", values);
      sessionStorage.setItem("email", values.email);
      navigate(VERIFY_OTP);
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.detail ??
          error.response?.data?.email?.[0] ??
          "Some error occured",
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  const navigate = useNavigate();
  return (
    <BaseLayout>
      <Card className="mt-14 lg:mt-20 lg:w-fit mx-auto">
        <CardTitle className="montserrat-semibold text-2xl lg:text-3xl text-center">
          Create a new account
        </CardTitle>
        <Seperator className="w-72 lg:w-116" />
        <CardContent>
          <CardForm onSubmitHandler={handleSubmit(submitRegisterForm)}>
            <LabelledInput
              id="email"
              label="Email"
              placeholder="Enter your email"
              disabled={loading}
              required={true}
              register={{ ...register("email") }}
              errors={errors["email"]?.message}
            />
            <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 justify-between">
              <LabelledInput
                id="first_name"
                label="First Name"
                placeholder="Enter your first name"
                disabled={loading}
                required={true}
                size="sm"
                register={{ ...register("first_name") }}
                errors={errors["first_name"]?.message}
              />
              <LabelledInput
                id="last_name"
                label="Last Name"
                placeholder="Enter your last name"
                disabled={loading}
                required={false}
                size="sm"
                register={{ ...register("last_name") }}
                errors={errors["last_name"]?.message}
              />
            </div>
            <LabelledInput
              id="password"
              label="Password"
              type="password"
              placeholder="Create a password"
              disabled={loading}
              required={true}
              register={{ ...register("password") }}
              errors={errors["password"]?.message}
            />
            <FormButton btnText="Register" disabled={loading} />
          </CardForm>
        </CardContent>
        <Seperator className="w-72 lg:w-116" />
        <div className="text-center text-primary-light">
          Already have an account?{" "}
          <span
            onClick={() => navigate(LOGIN)}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </div>
        {errorMsg && <ErrorMessageDisplayer errorMsg={errorMsg} />}
      </Card>
    </BaseLayout>
  );
};

export default Register;
