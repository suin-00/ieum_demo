import React from "react";

export function FooterSection() {
  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <span className="font-extrabold text-xl tracking-tight text-[#1E293B]">
            IEUM<span className="text-[#5478F6]">.</span>
          </span>
          <p className="text-slate-400 text-xs font-medium mt-1">
            韓国留学の「分からない」をなくす。
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href="#"
            className="text-xs font-bold text-slate-400 hover:text-[#5478F6] transition-colors"
          >
            利用規約
          </a>
          <a
            href="#"
            className="text-xs font-bold text-slate-400 hover:text-[#5478F6] transition-colors"
          >
            プライバシーポリシー
          </a>
          <a
            href="#"
            className="text-xs font-bold text-slate-400 hover:text-[#5478F6] transition-colors"
          >
            運営会社
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 text-center text-[10px] font-medium text-slate-300">
        © {new Date().getFullYear()} IEUM. All rights reserved.
      </div>
    </footer>
  );
}
