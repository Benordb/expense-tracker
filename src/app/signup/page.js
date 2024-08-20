"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  StepBalance,
  StepCurrency,
  StepGoodJob,
  Steps,
} from "@/components/login";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [steps, setSteps] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user');
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router]);
  const signUpForm = useFormik({
    initialValues: {
      email: "",
      currency: "MNT",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      currency: yup.string().required("Currency is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data", values);
      setSteps(steps + 1);
    },
  });

  return (
    <>
      <form
        className="m-auto w-[384px] text-center py-10 space-y-36"
        onSubmit={signUpForm.handleSubmit}
      >
        <div className="space-y-12">
          <div className="flex gap-2 text-2xl font-bold w-fit m-auto">
            <Logo /> Geld
          </div>
          <Steps steps={steps} />
        </div>
        <div>
          {steps == 1 ? (
            <StepCurrency
              steps={steps}
              setSteps={setSteps}
              signUpForm={signUpForm}
            />
          ) : null}
          {steps == 2 ? <StepBalance signUpForm={signUpForm} /> : null}
          {steps == 3 ? <StepGoodJob /> : null}
        </div>
      </form>
    </>
  );
}
