import React from "react";
import PlanCard from "@/app/(dashboard)/students/matching/_components/PlanCard";

export default function PlanPage() {
  return (
    <div className="h-full w-full bg-[#F9FAFB] flex flex-col font-sans overflow-hidden">
      <main className="h-full w-full flex flex-col justify-center overflow-hidden">
        <PlanCard />
      </main>
    </div>
  );
}
