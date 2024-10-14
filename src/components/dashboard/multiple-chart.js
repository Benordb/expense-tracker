"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



const chartConfig = {
  income: {
    label: "Income",
    color: "#84CC16",
  },
  expense: {
    label: "Expense",
    color: "#F97316",
  },
};
export const MultipleChart = ({ income, expense }) => {
  const chartData = [
    { month: "January", income: 0, expense: 0 },
    { month: "February", income: 0, expense: 0 },
    { month: "March", income: 0, expense: 0 },
    { month: "April", income: 0, expense: 0 },
    { month: "May", income: 0, expense: 0 },
    { month: "June", income: 0, expense: 0 },
    { month: "July", income: 0, expense: 0 },
    { month: "August", income: 0, expense: 0 },
    { month: "September", income: 0, expense: 0 },
    { month: "October", income: income, expense: expense },
    { month: "November", income: 0, expense: 0 },
    { month: "December", income: 0, expense: 0 },
  ];
  return (
    <div className="bg-white shadow-sm h-72 rounded-2xl col-span-3">
      <div className="border-b-2 py-4 px-6 flex justify-between items-center font-bold">
        Income - Expense
      </div>
      <ChartContainer className="h-3/4 w-full pt-4" config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} barGap={0} barSize={16}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar
            dataKey="income"
            fill="var(--color-income)"
            radius={[40, 40, 0, 0]}
          />
          <Bar
            className="w-200"
            dataKey="expense"
            fill="var(--color-expense)"
            radius={[40, 40, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
