"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { MainArticle } from "./main-article";
import { MainSection } from "./main-section";
import { useContext, useEffect, useState } from "react";
import { Context, useContexts } from "../utils/context";
import {
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import { LoadingForm } from "../loading";
import { api } from "@/lib/axios";
import { useAuth } from "../utils/authProvider";

export const BodyMain = () => {
  const { recordType, chooseCategories, setRecords, records } = useContext(Context);
  const { user } = useAuth();
  const [recordDateType, setRecordDateType] = useState("All");
  useEffect(() => {
    const getRecords = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(
          `/records/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        setRecords(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecords();
  }, []);
  const allCheckedAmount = () => {
    return 0;
  };
  const isTodayRecords = records.filter((record) => isToday(record.updatedAt));
  const showTodayRecords = () => {
    return (
      <>
        <div>Today</div>
        {isTodayRecords.map((item, index) =>
          (recordType === "all" || recordType === item.transaction_type) &&
            (chooseCategories.length === 0 ||
              chooseCategories.includes(item.categoryId)) ? (
            <MainSection record={item} key={index} />
          ) : null
        )}
      </>
    );
  };
  const isYesterdayRecords = records.filter((record) =>
    isYesterday(record.updatedAt)
  );
  const showYesterdayRecords = () => {
    return (
      <>
        <div>Yesterday</div>
        {isYesterdayRecords.map((item, index) =>
          (recordType == "all" || recordType == item.transaction_type) &&
            (chooseCategories.length == 0 ||
              chooseCategories.includes(item.categoryId)) ? (
            <MainSection record={item} key={index} />
          ) : null
        )}
      </>
    );
  };
  const isThisWeekRecords = records.filter(
    (record) =>
      isThisWeek(record.updatedAt) &&
      !isToday(record.updatedAt) &&
      !isYesterday(record.updatedAt) &&
      !isTomorrow(record.updatedAt)
  );
  const showThisWeekRecords = () => {
    return (
      <>
        <div>This Week</div>
        {isThisWeekRecords.map((item, index) =>
          (recordType == "all" || recordType == item.transaction_type) &&
            (chooseCategories.length == 0 ||
              chooseCategories.includes(item.categoryId)) ? (
            <MainSection record={item} key={index} />
          ) : null
        )}
      </>
    );
  };
  const isThisMonthRecords = records.filter(
    (record) => isThisMonth(record.updatedAt) && !isThisWeek(record.updatedAt)
  );
  const showThisMonthRecords = () => {
    return (
      <>
        <div>This Month</div>
        {isThisMonthRecords.map((item, index) =>
          (recordType == "all" || recordType == item.transaction_type) &&
            (chooseCategories.length == 0 ||
              chooseCategories.includes(item.categoryId)) ? (
            <MainSection record={item} key={index} />
          ) : null
        )}
      </>
    );
  };
  const isThisYearRecords = records.filter(
    (record) => isThisYear(record.updatedAt) && !isThisMonth(record.updatedAt)
  );
  const showThisYearRecords = () => {
    return (
      <>
        <div>This Year</div>
        {isThisYearRecords.map((item, index) =>
          (recordType == "all" || recordType == item.transaction_type) &&
            (chooseCategories.length == 0 ||
              chooseCategories.includes(item.categoryId)) ? (
            <MainSection record={item} key={index} />
          ) : null
        )}
      </>
    );
  };
  const isOtherYearsRecords = records.filter(
    (record) => isThisYear(record.updatedAt) === false
  );
  const showOtherYearsRecords = () => {
    return (
      <>
        <div>Other Years</div>
        {isOtherYearsRecords.map((item, index) =>
          (recordType == "all" || recordType == item.transaction_type) &&
            (chooseCategories.length == 0 ||
              chooseCategories.includes(item.categoryId)) ? (
            <MainSection record={item} key={index} />
          ) : null
        )}
      </>
    );
  };
  // if (records.length == 0) return <LoadingForm />;
  return (
    <div className="w-[894px] py-6">
      <MainArticle setRecordDateType={setRecordDateType} />
      <div className="w-full rounded-lg bg-white my-6 flex justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select all
          </label>
        </div>
        <div className="text-gray-400">{allCheckedAmount()}</div>
      </div>
      <div className="space-y-3 h-[850px] overflow-y-scroll">
        {isTodayRecords.length > 0 &&
          (recordDateType === "Today" || recordDateType === "All")
          ? showTodayRecords()
          : null}
        {isYesterdayRecords.length > 0 &&
          (recordDateType === "Yesterday" || recordDateType === "All")
          ? showYesterdayRecords()
          : null}
        {isThisWeekRecords.length > 0 &&
          (recordDateType === "This Week" || recordDateType === "All")
          ? showThisWeekRecords()
          : null}
        {isThisMonthRecords.length > 0 &&
          (recordDateType === "This Month" || recordDateType === "All")
          ? showThisMonthRecords()
          : null}
        {isThisYearRecords.length > 0 &&
          (recordDateType === "This Year" || recordDateType === "All")
          ? showThisYearRecords()
          : null}
        {isOtherYearsRecords.length > 0 &&
          (recordDateType === "Other Years" || recordDateType === "All")
          ? showOtherYearsRecords()
          : null}
      </div>
    </div>
  );
};
