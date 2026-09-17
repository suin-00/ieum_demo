import { Navbar } from "@/components/common/Navbar";

export default function StudentMatchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 이 경로의 페이지들에서는 항상 STUDENT_UNMATCHED 상태의 네비바가 고정됨 */}
      <Navbar userState="STUDENT_UNMATCHED" />
      <main className="pt-20 min-h-screen bg-[#F8FAFC]">{children}</main>
    </>
  );
}
