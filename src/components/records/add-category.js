"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Icons from "react-icons/fa6";
import * as yup from "yup";
import { api } from "@/lib/axios";
import { useContexts } from "../utils/context";
const defaultIcons = [
  "FaHouse",
  "FaUtensils",
  "FaGift",
  "FaPiggyBank",
  "FaMoneyBillWave",
  "FaSchool",
  "FaUserPlus",
  "FaUserMinus",
  "FaUser",
  "FaLock",
  "FaKey",
  "FaEye",
  "FaEyeSlash",
  "FaPlus",
  "FaMinus",
  "FaTrash",
  "FaBars",
  "FaBook",
  "FaDollarSign",
  "FaFileInvoice",
  "FaFileExcel",
  "FaFileWord",
  "FaFilePdf",
  "FaFileImage",
];
const colors = [
  "#0166FF",
  "#01B3FF",
  "#41CC00",
  "#F9D100",
  "#FF7B01",
  "#AE01FF",
  "#FF0101",
];
export const AddCategory = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setCategories, categories } = useContexts()
  const [color, setColor] = useState("#0166FF");
  const categoryForm = useFormik({
    initialValues: {
      name: "",
      color: "#0166FF",
      icon_name: "FaHouse",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "Password must be at least 3 characters")
        .required("Category name is required"),
    }),
    onSubmit: (values) => {
      createCategory(values.name, values.color, values.icon_name);
      <DialogClose />;
      categoryForm.values.name = ""
    },
  });
  const showError = (field) =>
    categoryForm.submitCount > 0 && categoryForm.errors[field];
  const createCategory = async (name, color, icon_name) => {
    try {
      const response = await api.post("/categories", { name, color, icon_name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
      setCategories([...categories, response.data]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-base px-0 py-0 h-auto hover:bg-transparent"
        >
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[494px]">
        <DialogHeader className="text-3xl">
          <DialogTitle className="font-semibold text-xl">
            Add Category
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="border"></div>
        <DialogFooter className="block space-y-8">
          <form onSubmit={categoryForm.handleSubmit} className="space-y-4">
            <div className="flex gap-3 mt-4">
              <Select
                onValueChange={(value) =>
                  categoryForm.setFieldValue("icon_name", value)
                }
                defaultValue={defaultIcons[0]}
              >
                <SelectTrigger className="w-[84px]">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent className="p-6">
                  <div className="flex flex-wrap max-w-72">
                    {defaultIcons.map((icon, index) => {
                      const FaIcons = Icons[icon];
                      return (
                        <div key={index}>
                          <SelectItem
                            value={icon}
                            key={index}
                            className="[&>span:first-child]:hidden p-2"
                          >
                            {FaIcons ? (
                              <div
                                style={{ backgroundColor: color }}
                                className="p-2 rounded-full"
                              >
                                <FaIcons className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              ""
                            )}
                          </SelectItem>
                        </div>
                      );
                    })}
                  </div>
                  <div className="my-6 border"></div>
                  <div className="flex justify-between">
                    {colors.map((color, index) => (
                      <div key={index}>
                        <div
                          style={{ backgroundColor: color }}
                          className="p-2 w-6 h-6 rounded-full"
                          onClick={() => {
                            categoryForm.setFieldValue("color", color);
                            setColor(color);
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </SelectContent>
              </Select>
              <Input
                placeholder="Category name"
                id="name"
                onChange={categoryForm.handleChange}
                onBlur={categoryForm.handleBlur}
                value={categoryForm.values.name}
              />
            </div>
            {showError("name") ? (
              <Label className="text-red-600 ml-12">
                {categoryForm.errors.name}
              </Label>
            ) : null}
            <Button className="w-full rounded-3xl bg-blue-600" type="submit">
              Add Category
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
