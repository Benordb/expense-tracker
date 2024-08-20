"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "Chrome", visitors: 275, fill: "#1C64F2" },
  { browser: "Safari", visitors: 200, fill: "#E74694" },
  { browser: "Firefox", visitors: 187, fill: "#FDBA8C" },
  { browser: "Edge", visitors: 173, fill: "#16BDCA" },
  { browser: "Other", visitors: 90, fill: "#F2901C" },
];
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
export const PieCharts = () => {
  return (
    <div className="bg-white shadow-sm h-72 rounded-2xl col-span-3 relative">
      <div className="border-b-2 py-4 px-6 flex justify-between items-center ">
        <div>Income - Expense</div>
        <div className="text-gray-400">Jun 1 - Nov 30</div>
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
      <div className="absolute top-24 h-40 flex flex-col justify-between right-6">
        {chartData.map((item, index) => (
          <div key={index} className="w-[360px] flex justify-between">
            <div className="w-20 flex items-center gap-1">
              <div
                style={{ backgroundColor: item.fill }}
                className="w-3 h-3 rounded-full"
              ></div>
              {item.browser}
            </div>
            <div className="w-20">{item.visitors},000,000₮</div>
            <div>15.50%</div>
          </div>
        ))}
      </div>
    </div>
  );
};
