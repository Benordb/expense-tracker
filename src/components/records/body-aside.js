"use client";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AmountRange, Category, Types } from "./assets";
import { AddRecord } from "./add-record";
import { useRef } from "react";

export const BodyAside = () => {
  const searchRef = useRef();
  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-6">
        <CardTitle>Records</CardTitle>
        <AddRecord text="Add" />
        <Input
          ref={searchRef}
          onBlur={(e) => {
            alert(e.currentTarget.value);
          }}
          placeholder="Search"
        ></Input>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Types />
        <Category />
        <AmountRange />
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};
