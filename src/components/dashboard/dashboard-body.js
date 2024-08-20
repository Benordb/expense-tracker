import { Container } from "../container";

import { MultipleChart } from "./multiple-chart";
import { LastRecords } from "./last-records";
import { TextExpense } from "./text-expense";
import { TextIncome } from "./text-income";
import { PieCharts } from "./pie-chart";
import { Card } from "./card";

export const DashboardBody = () => {
  return (
    <Container background="bg-gray-100">
      <div className="grid grid-cols-6 py-8  gap-6">
        <Card />
        <TextIncome />
        <TextExpense />
        <MultipleChart />
        <PieCharts />
        <LastRecords />
      </div>
    </Container>
  );
};
