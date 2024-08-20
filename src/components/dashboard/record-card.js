"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import * as Icons from "react-icons/fa6";
export const RecordCard = ({ record }) => {
  const [category, setCategory] = useState({});
  useEffect(() => {
    const getIdByAccount = async (id) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3030/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getIdByAccount(record.categoryId);
  }, [record.categoryId]);
  const parsedDate = new Date(record.updatedAt);
  const formattedDate = format(parsedDate, "MM/dd/yyyy HH:mm:ss");
  const FaIcons = category.icon_name
    ? Icons[category.icon_name]
    : Icons["FaHouse"];
  return (
    <div className="mx-6 py-5 flex justify-between items-center border-b-2">
      <div className="flex gap-4">
        <div
          style={{ backgroundColor: category.color }}
          className="w-10 h-10 flex items-center justify-center rounded-full"
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
    </div>
  );
};
