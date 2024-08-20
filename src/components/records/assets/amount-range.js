"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const maxValue = 10000;
const minValue = 0;
const valueStep = 1000;

export const AmountRange = () => {
  const [rangeValue, setRangeValue] = useState([minValue, maxValue]);
  return (
    <>
      <h2 className="text-base font-semibold">Amount Range</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder={rangeValue[0]}
          onChange={(e) =>
            setRangeValue([
              e.target.value % valueStep === 0 &&
                e.target.value < rangeValue[1] &&
                e.target.value >= minValue
                ? e.target.value
                : minValue,
              rangeValue[1],
            ])
          }
        />
        <Input
          type="text"
          placeholder={rangeValue[1]}
          onChange={(e) =>
            setRangeValue([
              rangeValue[0],
              e.target.value % valueStep === 0 &&
                e.target.value > rangeValue[0] &&
                e.target.value <= maxValue
                ? e.target.value
                : maxValue,
            ])
          }
        />
      </div>
      <Slider
        value={rangeValue}
        onValueChange={(newValue) => setRangeValue(newValue)}
        min={minValue}
        max={maxValue}
        step={valueStep}
      />
    </>
  );
};
