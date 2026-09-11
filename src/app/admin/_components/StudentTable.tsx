"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Student } from "@/types/student.types";

interface StudentTableProps {
  students: Student[];
}

function formatCreatedAt(value: string | null): string {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date(value));
}

function normalizeStudentName(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ja-JP")
    .replace(/[ァ-ヶ]/g, (character) =>
      String.fromCharCode(character.charCodeAt(0) - 0x60),
    );
}

export default function StudentTable({ students }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = useMemo(() => {
    const normalizedSearchTerm = normalizeStudentName(searchTerm.trim());

    if (!normalizedSearchTerm) {
      return students;
    }

    return students.filter((student) =>
      normalizeStudentName(student.name ?? "").includes(normalizedSearchTerm),
    );
  }, [searchTerm, students]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-5">
        <h2 className="text-xl font-bold text-[#0E2640]">등록된 학생 목록</h2>
        <div className="relative">
          <Search
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <label className="sr-only" htmlFor="student-name-search">
            학생 이름 검색
          </label>
          <input
            id="student-name-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="이름 검색"
            className="w-32 rounded-md border border-slate-300 py-1 pl-7 pr-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0E2640] focus:outline-none sm:w-40"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              <th className="px-2 py-3">이름</th>
              <th className="px-2 py-3">이메일</th>
              <th className="px-2 py-3">가입 일시</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-2 py-3 font-semibold text-slate-800">
                    {student.name ?? "이름 없음"}
                  </td>
                  <td className="px-2 py-3 text-slate-600">
                    {student.email ?? "-"}
                  </td>
                  <td className="px-2 py-3 text-slate-600">
                    {formatCreatedAt(student.created_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-400">
                  {searchTerm
                    ? "검색 결과가 없습니다."
                    : "등록된 학생이 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
