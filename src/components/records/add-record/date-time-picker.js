"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import React, { useEffect, useState } from "react";
import { add, format } from "date-fns";
import { MdArrowDropDown } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});
export function DateTimePicker({ transaction_type, recordForm }) {
  const [date, setDate] = useState(new Date());

  const handleSelect = (newDay) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: date,
      note: "", // Initialize note value
    },
  });
  useEffect(() => {
    form.setValue("note", format(date, "yyyy-MM-dd HH:mm:ss"));
    recordForm.setFieldValue("updatedAt", date);
    // format(date, "yyyy-MM-dd HH:mm:ss.SSS"
  }, [date]);
  return (
    <Form {...form}>
      <FormItem className="flex flex-1 flex-col">
        <FormLabel>Date</FormLabel>
        <Popover>
          <PopoverTrigger className="bg-gray-100" asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {format(
                date,
                `${transaction_type ? "LLLL d, yyyy" : "HH:mm:ss"}`
              )}
              <MdArrowDropDown className="ml-auto h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => handleSelect(d)}
              initialFocus
            />
            <div className="p-3 border-t border-border">
              <TimePickerDemo setDate={setDate} date={date} />
            </div>
          </PopoverContent>
        </Popover>
      </FormItem>
    </Form>
  );
}
