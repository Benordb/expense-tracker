import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
export const AddRecordPayee = ({ recordForm }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="payee">Payee</Label>
      <Select
        onValueChange={(value) => recordForm.setFieldValue("payee", value)}
        id="payee"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Write here" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggests</SelectLabel>
            <SelectItem value="card">card</SelectItem>
            <SelectItem value="cash">cash</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
