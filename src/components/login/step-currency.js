import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Currency } from "@/components/logo";

export const StepCurrency = ({ steps, setSteps, signUpForm }) => {
  return (
    <div>
      <div className="w-fit m-auto">
        <Currency />
      </div>
      <h1 className="font-bold text-2xl mt-4 mb-6">Set up your cash Balance</h1>
      <Select
        onValueChange={(value) => signUpForm.setFieldValue("currency", value)}
        value={signUpForm.values.currency}
        id="currency"
        name="currency"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MNT">MNT - Mongolian Tugrik</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="SNY">SNY</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-slate-700 text-start mt-3 mb-8">
        Your base currency should be the one you use most often. All transaction
        in other currencies will be calculated based on this one
      </p>
      <Button
        type="submit"
        className="w-full rounded-3xl bg-blue-600 text-lg"
        onClick={() => setSteps(steps + 1)}
      >
        Confirm
      </Button>
    </div>
  );
};
