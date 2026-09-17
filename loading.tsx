export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white">
      {/* 회전하는 원형 고리 (Spinner) */}
      <div className="w-12 h-12 border-4 border-slate-200 border-t-[#0E2640] rounded-full animate-spin"></div>
    </div>
  );
}