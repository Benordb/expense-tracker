import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export const AddRecordNote = ({ recordForm }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="payee">Note</Label>
      <Textarea
        placeholder="Write here"
        id="note"
        name="note"
        onChange={recordForm.handleChange}
        onBlur={recordForm.handleBlur}
        value={recordForm.values.note}
      />
    </div>
  );
};
