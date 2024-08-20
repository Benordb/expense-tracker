"use client";
import { useEffect, useState } from "react";
import { RecordCard } from "./record-card";
import { LoadingForm } from "../loading";
import { api } from "@/lib/axios";
import { useAuth } from "../utils/authProvider";
export const LastRecords = () => {
  const [records, setRecords] = useState([]);
  const { user } = useAuth()
  useEffect(() => {
    const getRecords = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(
          `/records/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecords();
  }, []);
  if (records.length == 0) return <LoadingForm />;
  const lastRecordsData = records.filter((record, index) => index < 5);
  return (
    <div className="bg-white shadow-sm rounded-2xl col-span-6">
      <div className="border-b-2 py-4 px-6 flex font-bold items-center ">
        Last Records
      </div>
      {lastRecordsData.map((record, index) => (
        <RecordCard record={record} />
      ))}
    </div>
  );
};
