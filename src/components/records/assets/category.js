"use client";
import { useEffect, useMemo, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdArrowRight } from "react-icons/md";
import { useContexts } from "@/components/utils/context";
import { Plus } from "lucide-react";
import { AddCategory } from "../add-category";
import { api } from "@/lib/axios";
export const Category = () => {
  const { categories, setCategories, chooseCategories, setChooseCategories } =
    useContexts();
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  const handleChoose = (item) => {
    chooseCategories.find((el) => el === item.id)
      ? setChooseCategories([
        ...chooseCategories.filter((el) => el !== item.id),
      ])
      : setChooseCategories([...chooseCategories, item.id]);
  };
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-base font-semibold">Category</h2>
        <div
          onClick={() => setChooseCategories([])}
          className="text-gray-300 cursor-pointer"
        >
          Clear
        </div>
      </div>
      <ul className="space-y-2 text-base">
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => handleChoose(item)}
            className="flex items-center justify-between hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-2 px-3 py-1">
              {chooseCategories.find((cat) => cat == item.id) ? (
                <BsEyeFill className=" w-5 h-5 text-gray-400" />
              ) : (
                <BsEyeSlashFill className=" w-5 h-5 text-gray-400" />
              )}
              {item.name}
            </div>
            <MdArrowRight className="w-5 h-5" />
          </li>
        ))}
        <li className="hover:bg-gray-100 rounded-lg flex items-center px-3 gap-2">
          <Plus className="w-5 h-5 text-blue-500" />
          <AddCategory />
        </li>
      </ul>
    </>
  );
};
