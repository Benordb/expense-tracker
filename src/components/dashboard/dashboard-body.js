"use client"
import { Container } from "../container";
import { MultipleChart } from "./multiple-chart";
import { LastRecords } from "./last-records";
import { TextExpense } from "./text-expense";
import { TextIncome } from "./text-income";
import { PieCharts } from "./pie-chart";
import { Card } from "./card";
import { api } from "@/lib/axios";
import { useAuth } from "../utils/authProvider";
import { useEffect, useState } from "react";

export const DashboardBody = () => {
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
  const allIncome = records.reduce((accumulator, currentValue) => {
    return currentValue.transaction_type === "income"
      ? accumulator + currentValue.amount
      : accumulator;
  }, 0)
  const allExpense = records.reduce((accumulator, currentValue) => {
    return currentValue.transaction_type === "expense"
      ? accumulator + currentValue.amount
      : accumulator;
  }, 0)
  return (
    <Container background="bg-gray-100">
      <div className="grid grid-cols-6 py-8  gap-6">
        <Card />
        <TextIncome income={allIncome} />
        <TextExpense expense={allExpense} />
        <MultipleChart income={allIncome} expense={allExpense} />
        <PieCharts records={records} />
        <LastRecords />
      </div>
    </Container>
  );
};
