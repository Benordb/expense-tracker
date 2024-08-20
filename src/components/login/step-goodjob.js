import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Finish } from "@/components/logo";

export const StepGoodJob = () => {
    return (
        <>
            <div className="w-fit m-auto">
                <Finish />
            </div>
            <h1 className="font-bold text-2xl mt-4 mb-3">Good Job</h1>
            <p className="text-slate-700 mb-12">
                Your very first account has been created. Now continue to
                dashboard and start tracking
            </p>
            <Link href="/dashboard">
                <Button className="w-full rounded-3xl bg-blue-600 text-lg">
                    Go to Dashboard
                </Button>
            </Link>
        </>
    )
}