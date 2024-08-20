"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const days = [
  "All",
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "This Year",
  "Other Years",
];
export const MainArticle = ({ setRecordDateType }) => {
  const [day, setDay] = useState(0);
  setRecordDateType(days[day]);
  const handleNext = () => {
    day < days.length - 1 ? setDay(day + 1) : null;
  };
  const handlePrev = () => {
    day > 0 ? setDay(day - 1) : null;
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Button
          className="bg-gray-200"
          variant="outline"
          size="icon"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="w-24 text-center">{days[day]}</div>
        <Button
          className="bg-gray-200"
          variant="outline"
          size="icon"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <Select defaultValue="Newest first">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="select sort data" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sorts</SelectLabel>
            <SelectItem value="Newest first">Newest first</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
