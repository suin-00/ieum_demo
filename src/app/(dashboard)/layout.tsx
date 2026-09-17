import React from 'react';
import { Navbar } from '@/components/common/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 flex flex-col pt-16">{children}</main>
    </div>
  );
}
