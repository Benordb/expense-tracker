"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../utils/authProvider";
export const SignInForm = ({ setIsSignUp }) => {
  const { register } = useAuth()
  const signUpForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      re_password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      re_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Re-Password is required"),
    }),
    onSubmit: (values) => {
      register(values.email, values.name, values.password);
    },
  });
  const showError = (field) =>
    signUpForm.submitCount > 0 && signUpForm.errors[field];
  return (
    <div className="flex-1 m-auto">
      <form
        className="m-auto w-[384px] text-center space-y-10"
        onSubmit={signUpForm.handleSubmit}
      >
        <div className="flex gap-2 text-xl font-bold w-fit m-auto">
          <Logo /> Geld
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Create Geld account</h2>
          <p className="text-slate-700">
            Sign up below to create your Wallet account
          </p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Name"
            id="name"
            name="name"
            type="text"
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.name}
          />
          {showError("name") ? (
            <Label className="text-red-600">{signUpForm.errors.name}</Label>
          ) : null}
          <Input
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.email}
          />
          {showError("email") ? (
            <Label className="text-red-600">{signUpForm.errors.email}</Label>
          ) : null}
          <Input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.password}
          />
          {showError("password") ? (
            <Label className="text-red-600">{signUpForm.errors.password}</Label>
          ) : null}
          <Input
            placeholder="Re-Password"
            id="re_password"
            name="re_password"
            type="password"
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.re_password}
          />
          {showError("re_password") ? (
            <Label className="text-red-600">
              {signUpForm.errors.re_password}
            </Label>
          ) : null}
          <Button
            type="submit"
            className="w-full rounded-3xl bg-blue-600 text-lg"
          >
            Sign Up
          </Button>
        </div>
        <Label>Already have an account?</Label>
        <button
          className="text-blue-600 px-3"
          onClick={() => setIsSignUp(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};
