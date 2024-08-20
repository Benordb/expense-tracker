"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context, useContexts } from "../utils/context";
import { AddRecordCategory } from "./add-record/add-record-category";
import { AddRecordPayee } from "./add-record/add-record-payee";
import { AddRecordNote } from "./add-record/add-record-note";
import { DateTimePicker } from "./add-record/date-time-picker";
import { AddRecordType } from "./add-record/add-record-type";
import { api } from "@/lib/axios";
import { useAuth } from "../utils/authProvider";
export const AddRecord = ({ text }) => {
  const { records, setRecords } = useContexts()
  const { user } = useAuth();
  const [chooseType, setChooseType] = useState(true);
  const recordForm = useFormik({
    initialValues: {
      userId: user.id,
      categoryId: "",
      amount: "",
      payee: "",
      note: "",
      transaction_type: "",
      updatedAt: "",
    },
    validationSchema: yup.object({
      note: yup.string(),
    }),
    onSubmit: (values) => {
      console.log("Form data", values);
      createRecord(values);
    },
  });
  const createRecord = async (values) => {
    try {
      await api.post("/records", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRecords([...records, values]);
    } catch (error) {
      console.log(error);
    }
  };
  chooseType
    ? (recordForm.values.transaction_type = "expense")
    : (recordForm.values.transaction_type = "income");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-600 text-white rounded-3xl flex gap-1"
        >
          <Plus className="w-5 h-5" /> {text}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[792px]">
        <DialogHeader className="text-3xl">
          <DialogTitle>Add Record</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="border-t-[1px]"></div>
        <DialogFooter>
          <form
            onSubmit={recordForm.handleSubmit}
            className="w-full flex gap-11"
          >
            <div className="flex-1 space-y-6">
              <AddRecordType
                chooseType={chooseType}
                setChooseType={setChooseType}
              />
              <div>
                <Input
                  type="number"
                  placeholder="₮ 000.00"
                  id="amount"
                  onChange={recordForm.handleChange}
                  onBlur={recordForm.handleBlur}
                  value={recordForm.values.amount}
                />
              </div>
              <AddRecordCategory recordForm={recordForm} />
              <div className="flex gap-3">
                <DateTimePicker status={true} recordForm={recordForm} />
                <DateTimePicker status={false} recordForm={recordForm} />
              </div>
              <DialogClose className="w-full">
                <Button
                  className={`w-full rounded-3xl ${chooseType ? "bg-blue-600" : "bg-green-500"
                    }`}
                  type="submit"
                >
                  Add Record
                </Button>
              </DialogClose>
            </div>
            <div className="flex-1 space-y-6">
              <AddRecordPayee recordForm={recordForm} />
              <AddRecordNote recordForm={recordForm} />
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
