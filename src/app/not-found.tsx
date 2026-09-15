import Link from "next/link";

// 텍스트를 상단으로 분리
const NOT_FOUND_TEXT = {
  title: "404",
  description: "ページが見つかりませんでした。",
  buttonText: "ホームに戻る",
  homeUrl: "/",
} as const;

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <h1 className="text-4xl font-extrabold text-[#0E2640] mb-4">
        {NOT_FOUND_TEXT.title}
      </h1>
      <p className="text-[#61799C] mb-8">{NOT_FOUND_TEXT.description}</p>
      <Link
        href={NOT_FOUND_TEXT.homeUrl}
        className="px-6 py-2.5 rounded-full bg-[#0E2640] text-[#F5EBBC] font-bold text-sm hover:bg-[#122e4d] transition-colors"
      >
        {NOT_FOUND_TEXT.buttonText}
      </Link>
    </div>
  );
}
