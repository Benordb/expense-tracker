"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../utils/authProvider";

export const LoginForm = ({ setIsSignUp }) => {
  const { login } = useAuth()
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  const showError = (field) =>
    loginForm.submitCount > 0 &&
    loginForm.errors[field] &&
    loginForm.touched[field];
  return (
    <div className="flex-1 m-auto">
      <form
        className="m-auto w-[384px] text-center space-y-10"
        onSubmit={loginForm.handleSubmit}
      >
        <div className="flex gap-2 text-xl font-bold w-fit m-auto">
          <Logo /> Geld
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-slate-700">
            Welcome back, Please enter your details
          </p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
          />
          {showError("email") ? (
            <Label className="text-red-600 text-left">
              {loginForm.errors.email}
            </Label>
          ) : null}
          <Input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
          />
          {showError("password") ? (
            <Label className="text-red-600 text-left">
              {loginForm.errors.password}
            </Label>
          ) : null}

          <Button
            type="submit"
            className="w-full rounded-3xl bg-blue-600 text-lg"
          >
            Log In
          </Button>
        </div>
        <Label>Don’t have an account?</Label>
        <button
          className="text-blue-600 px-3"
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
