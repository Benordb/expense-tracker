"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Context } from "@/components/utils/context";
const types = ["all", "income", "expense"];

export const Types = () => {
  const [clickIndex, setClickIndex] = useState(0);
  const { recordType, setRecordType } = useContext(Context);
  const handleClick = (item, index) => {
    setClickIndex(index);
    setRecordType(item);
  };
  return (
    <>
      <h2 className="text-base font-semibold">Types</h2>
      <RadioGroup defaultValue="comfortable">
        {types.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item, index)}
            className="flex items-center hover:bg-gray-100 rounded-lg"
          >
            <RadioGroupItem
              className="mx-2"
              value={item}
              checked={clickIndex === index}
            />
            {item}
          </div>
        ))}
      </RadioGroup>
    </>
  );
};
//  className="hover:bg-gray-100 rounded-lg"
