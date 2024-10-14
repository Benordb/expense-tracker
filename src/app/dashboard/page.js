"use client";
import { Header } from "@/components";
import { DashboardBody } from "@/components/dashboard/dashboard-body";
import { useAuth } from "@/components/utils/authProvider";
export default function Dashboard() {
  const { user } = useAuth()
  return (
    <>
      <Header />
      <DashboardBody />
    </>
  );
}
