import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Balance } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const StepBalance = ({ signUpForm }) => {
  return (
    <>
      <div className="w-fit m-auto">
        <Balance />
      </div>
      <h1 className="font-bold text-2xl mt-4 mb-6">Set up your cash Balance</h1>
      <Input
        placeholder="Email"
        id="email"
        name="email"
        type="email"
        onChange={signUpForm.handleChange}
        onBlur={signUpForm.handleBlur}
        value={signUpForm.values.email}
      />
      {signUpForm.touched.email && signUpForm.errors.email ? (
        <Label className="text-red-600">{signUpForm.errors.email}</Label>
      ) : null}
      <p className="text-xs text-slate-700 text-start mt-3 mb-8">
        How much cash do you have in your wallet?
      </p>
      <Button type="submit" className="w-full rounded-3xl bg-blue-600 text-lg">
        Confirm
      </Button>
    </>
  );
};
