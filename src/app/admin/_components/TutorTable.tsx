"use client";

import TutorEditForm from "@/app/admin/_components/TutorEditForm";
import TutorDetailModal from "@/app/admin/_components/TutorDetailModal";
import type { Tutor, TutorTableProps } from "@/types/tutor.types";
import { useTutorActions } from "@/hooks/useTutorActions";
import { useTutorSelection } from "@/hooks/useTutorSelection";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function TutorTable({ tutors }: TutorTableProps) {
  const [detailTutor, setDetailTutor] = useState<Tutor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    selectedIds: selectedTutorIds,
    allSelected: allTutorsSelected,
    toggle: toggleTutor,
    toggleAll: toggleAllTutors,
    clear: clearSelectedTutors,
  } = useTutorSelection(tutors.map((tutor) => tutor.id));
  const selectedTutor = tutors.find(
    (tutor) => tutor.id === selectedTutorIds[0],
  );
  const filteredTutors = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("ko-KR");

    if (!normalizedSearchTerm) {
      return tutors;
    }

    return tutors.filter((tutor) =>
      [tutor.profiles?.nickname, tutor.profiles?.furigana]
        .filter((value): value is string => Boolean(value))
        .some((value) =>
          value.toLocaleLowerCase("ko-KR").includes(normalizedSearchTerm),
        ),
    );
  }, [searchTerm, tutors]);
  const {
    isDeleting,
    isEditing,
    isSaving,
    editForm,
    setEditForm,
    openEditForm,
    closeEditForm,
    handleDeleteSelected,
    handleEditSubmit,
  } = useTutorActions({
    selectedTutor,
    selectedTutorIds,
    clearSelection: clearSelectedTutors,
  });

  function renderTutorRow(tutor: Tutor) {
    return (
      <tr
        key={tutor.id}
        onDoubleClick={() => setDetailTutor(tutor)}
        title="더블클릭하여 튜터 상세 보기"
        className="h-10 cursor-pointer overflow-hidden hover:bg-slate-50"
      >
        <td className="h-10 overflow-hidden px-2 py-0 text-center align-middle">
          <input
            type="checkbox"
            value={tutor.id}
            checked={selectedTutorIds.includes(tutor.id)}
            onChange={() => toggleTutor(tutor.id)}
            aria-label={`${tutor.profiles?.nickname ?? "이름 없음"} 선택`}
            className="h-4 w-4 accent-[#0E2640]"
          />
        </td>
        <td className="h-10 overflow-hidden px-2 py-0 font-bold text-slate-800 align-middle">
          <div className="truncate text-xs leading-4">
            {tutor.profiles?.nickname ?? "이름 없음"}
          </div>
          <div className="truncate text-[10px] font-normal leading-3 text-slate-400">
            {tutor.profiles?.furigana}
          </div>
        </td>
        <td className="h-10 truncate overflow-hidden px-2 py-0 text-slate-600 align-middle text-xs">
          {tutor.profiles?.gender === "male"
            ? "男"
            : tutor.profiles?.gender === "female"
              ? "女"
              : "-"}
        </td>
        <td className="h-10 truncate overflow-hidden px-2 py-0 text-slate-600 align-middle text-xs">
          {tutor.school}
        </td>
        <td className="h-10 truncate overflow-hidden px-2 py-0 text-slate-600 align-middle text-xs">
          {tutor.major}
        </td>
        <td className="h-10 truncate overflow-hidden px-2 py-0 text-slate-600 align-middle">
          <span className="inline-block max-w-full truncate rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold">
            {tutor.style}
          </span>
        </td>
        <td className="h-10 truncate overflow-hidden px-2 py-0 text-slate-600 align-middle text-xs">
          {tutor.mbti}
        </td>
        <td className="h-10 max-h-10 overflow-hidden px-2 py-0 align-middle text-slate-600">
          <div
            className="w-full overflow-y-auto whitespace-normal text-xs leading-4 wrap-break-word"
            style={{ height: "20px", maxHeight: "20px" }}
          >
            {tutor.bio}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <h2 className="text-xl font-bold text-[#0E2640]">등록된 튜터 목록</h2>
          <label className="sr-only" htmlFor="tutor-name-search">
            튜터 이름 검색
          </label>
          <div className="relative">
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="tutor-name-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="이름 검색"
              className="w-32 rounded-md border border-slate-300 py-1 pl-7 pr-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0E2640] focus:outline-none sm:w-40"
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => openEditForm()}
            disabled={selectedTutorIds.length !== 1}
            className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-[#0E2640] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => handleDeleteSelected()}
            disabled={isDeleting}
            className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>

      {isEditing && editForm && (
        <TutorEditForm
          value={editForm}
          isSaving={isSaving}
          onChange={setEditForm}
          onSubmit={handleEditSubmit}
          onCancel={closeEditForm}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              <th className="w-12 px-2 py-3 text-center">
                <input
                  type="checkbox"
                  checked={allTutorsSelected}
                  onChange={toggleAllTutors}
                  aria-label="전체 튜터 선택"
                  className="h-4 w-4 accent-[#0E2640]"
                />
              </th>
              <th className="w-1/8 px-2 py-3">이름</th>
              <th className="w-1/12 px-2 py-3">성별</th>
              <th className="w-1/6 px-2 py-3">대학교</th>
              <th className="w-1/6 px-2 py-3">전공</th>
              <th className="w-1/8 px-2 py-3">스타일</th>
              <th className="w-1/8 px-2 py-3">MBTI</th>
              <th className="w-1/6 px-2 py-3">소개</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredTutors.length > 0 ? (
              filteredTutors.map(renderTutorRow)
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  {searchTerm
                    ? "검색 결과가 없습니다."
                    : "등록된 튜터가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detailTutor && (
        <TutorDetailModal
          tutor={detailTutor}
          onClose={() => setDetailTutor(null)}
          onEdit={() => {
            openEditForm(detailTutor);
            setDetailTutor(null);
          }}
          onDelete={async () => {
            await handleDeleteSelected([detailTutor.id]);
            setDetailTutor(null);
          }}
        />
      )}
    </div>
  );
}
