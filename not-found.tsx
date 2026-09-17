import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <h1 className="text-4xl font-extrabold text-[#0E2640] mb-4">404</h1>
      <p className="text-[#61799C] mb-8">ページが見つかりませんでした。</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#0E2640] text-[#F5EBBC] font-bold text-sm hover:bg-[#122e4d] transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
