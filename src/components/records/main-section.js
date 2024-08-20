import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Context } from "../utils/context";
import { api } from "@/lib/axios";
export const MainSection = ({ record }) => {
  const [category, setCategory] = useState({});
  const { recordCheck, setRecordCheck } = useContext(Context);
  const parsedDate = new Date(record.updatedAt);
  const formattedDate = format(parsedDate, "MM/dd/yyyy HH:mm:ss");
  useEffect(() => {
    const getIdByAccount = async (id) => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(`/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getIdByAccount(record.categoryId);
  }, [record.category_id]);

  const FaIcons = category.icon_name
    ? Icons[category.icon_name]
    : Icons["FaHouse"];
  return (
    <Card className="flex">
      <CardContent className="py-3 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) =>
              checked
                ? setRecordCheck([...recordCheck, record.id])
                : setRecordCheck(
                  recordCheck.filter((el) => {
                    el !== record.id;
                  })
                )
            }
          />
          <div
            style={{ backgroundColor: category.color }}
            className="p-2 rounded-full"
          >
            <FaIcons className="text-white" />
          </div>
          <div>
            {category.name}
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>
        <div
          className={
            record.transaction_type == "income" ? "text-green-400" : "text-red-400"
          }
        >
          {record.transaction_type == "income"
            ? `${record.amount}₮`
            : `- ${record.amount}₮`}
        </div>
      </CardContent>
    </Card>
  );
};
