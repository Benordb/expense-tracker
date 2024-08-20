import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { AddCategory } from "../add-category";
import { Plus } from "lucide-react";
import * as Icons from "react-icons/fa6";
import { Context } from "@/components/utils/context";
export const AddRecordCategory = ({ recordForm }) => {
  const { categories, setCategories } = useContext(Context);
  return (
    <Select
      onValueChange={(value) =>
        recordForm.setFieldValue(
          "categoryId",
          categories.find((c) => c.name === value).id
        )
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Find or choose category" />
      </SelectTrigger>
      <SelectContent>
        <div className="border-b py-2 px-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-white bg-black rounded-full" />
          <AddCategory setCategories={setCategories} categories={categories} />
        </div>
        <SelectGroup>
          {categories.map((item, index) => {
            const FaIcons = Icons[item.icon_name];
            return (
              <SelectItem
                key={index}
                value={item.name}
                className={`px-4 [&>span:first-child]:hidden`}
              >
                <div className="flex gap-3 font-normal text-lg items-center">
                  <div
                    style={{ backgroundColor: item.color }}
                    className="p-2 rounded-full"
                  >
                    <FaIcons className="w-4 h-4 text-white" />
                  </div>
                  {item.name}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
