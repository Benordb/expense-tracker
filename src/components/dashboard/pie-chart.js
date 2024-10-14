"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContexts } from "../utils/context";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};
export const PieCharts = ({ records }) => {
  const [chartData, setChartData] = useState([])
  const [categories, setCategories] = useState([])
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
  useEffect(() => {
    const visitorsMap = records.reduce((acc, record) => {
      if (acc[record.categoryId]) {
        acc[record.categoryId] += record.amount;
      } else {
        acc[record.categoryId] = record.amount;
      }
      return acc;
    }, {});
    if (records.length) {
      const chartDatas = categories.map((category) => ({
        browser: category.name.split(" ")[0],
        visitors: visitorsMap[category.id] || 0,
        fill: category.color
      }));
      setChartData(chartDatas);
    }
  }, [records, categories]);
  return (
    <div className="bg-white shadow-sm h-72 rounded-2xl col-span-3 relative">
      <div className="border-b-2 py-4 px-6 flex justify-between items-center ">
        <div>Income - Expense</div>
        <div className="text-gray-400">Jan 1 - Dec 31</div>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[230px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
      <div className="absolute top-24 h-40 flex flex-col right-6">
        {chartData.map((item, index) => {
          if (item.visitors > 0) {
            return (
              <div key={index} className="w-[360px] flex justify-between">
                <div className="w-20 flex items-center gap-1">
                  <div
                    style={{ backgroundColor: item.fill }}
                    className="w-3 h-3 rounded-full"
                  ></div>
                  {item.browser}
                </div>
                <div className="w-20">{item.visitors}₮</div>
                <div>{((item.visitors / records.reduce((acc, record) => acc + record.amount, 0)) * 100).toFixed(2)}%</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};
