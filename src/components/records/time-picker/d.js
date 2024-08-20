"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { MainArticle } from "./main-article";
import { MainSection } from "./main-section";
import { useContext, useEffect, useState } from "react";
import { Context } from "../utils/context";
import {
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";
import { api } from "@/lib/axios";

export const BodyMain = () => {
  const { records, setRecords, recordType, chooseCategories } =
    useContext(Context);
  const [recordDateType, setRecordDateType] = useState("All");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await api.get("/records");
        setRecords(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch records");
      }
    };
    getRecords();
  }, [setRecords]);

  useEffect(() => {
    const filterRecords = () => {
      let filtered = records;

      switch (recordDateType) {
        case "Today":
          filtered = records.filter((record) => isToday(record.date));
          break;
        case "Yesterday":
          filtered = records.filter((record) => isYesterday(record.date));
          break;
        case "This Week":
          filtered = records.filter(
            (record) =>
              isThisWeek(record.date) &&
              !isToday(record.date) &&
              !isYesterday(record.date)
          );
          break;
        case "This Month":
          filtered = records.filter(
            (record) => isThisMonth(record.date) && !isThisWeek(record.date)
          );
          break;
        case "This Year":
          filtered = records.filter(
            (record) => isThisYear(record.date) && !isThisMonth(record.date)
          );
          break;
        case "Other Years":
          filtered = records.filter((record) => !isThisYear(record.date));
          break;
        default:
          filtered = records;
      }

      filtered = filtered.filter(
        (record) =>
          (recordType == "all" || recordType == record.status) &&
          (chooseCategories.length == 0 ||
            chooseCategories.find((el) => el == record.category_id))
      );

      setFilteredRecords(filtered);
    };

    filterRecords();
  }, [records, recordDateType, recordType, chooseCategories]);

  const renderRecords = () => {
    return filteredRecords.map((item, index) => (
      <>
        <div>Other Years</div>
        <MainSection record={item} key={index} />
      </>
    ));
  };

  return (
    <div className="w-[894px] py-6">
      <MainArticle setRecordDateType={setRecordDateType} />
      <div className="w-full rounded-lg bg-white my-6 flex justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="select-all" />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select all
          </label>
        </div>
        <div className="text-gray-400">- 35500₮</div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-3 h-[850px] overflow-y-scroll">
        {renderRecords()}
      </div>
    </div>
  );
};
