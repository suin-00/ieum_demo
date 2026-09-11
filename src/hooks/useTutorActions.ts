import { useState, type FormEvent } from "react";
import {
  deleteTutorAccounts,
  updateTutorAccount,
} from "@/actions/admin/adminTutor";
import type {
  Tutor,
  TutorEditFormValues,
  TutorStyle,
} from "@/types/tutor.types";
import { useRouter } from "next/navigation";

interface UseTutorActionsOptions {
  selectedTutor: Tutor | undefined;
  selectedTutorIds: string[];
  clearSelection: () => void;
}

export function useTutorActions({
  selectedTutor,
  selectedTutorIds,
  clearSelection,
}: UseTutorActionsOptions) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState<TutorEditFormValues | null>(null);

  async function handleDeleteSelected(tutorIds = selectedTutorIds) {
    if (tutorIds.length === 0) {
      alert("삭제할 튜터를 선택해 주세요.");
      return;
    }

    if (!window.confirm("선택한 튜터를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteTutorAccounts(tutorIds);
    setIsDeleting(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    clearSelection();
    router.refresh();
  }

  // useTutorActions.ts 상단에 상수 정의 추가
  const ALLOWED_TUTOR_STYLES: TutorStyle[] = [
    "課外活動・インターン・キャリア",
    "サークル活動",
    "大学文化・学園祭",
    "学業・勉強",
    "韓国生活・遊び",
  ];

  // openEditForm 함수 내부 수정
  function openEditForm(tutor = selectedTutor) {
    if (!tutor) {
      return;
    }

    // 기존 style 값들을 배열로 변환한 뒤, 허용된 5가지 스타일만 필터링
    const rawStyles = Array.isArray(tutor.style)
      ? tutor.style
      : tutor.style
        ? [tutor.style]
        : [];

    const validStyles = rawStyles.filter((s): s is TutorStyle =>
      ALLOWED_TUTOR_STYLES.includes(s as TutorStyle),
    );

    setEditForm({
      first_name: tutor.profiles?.first_name ?? "",
      last_name: tutor.profiles?.last_name ?? "",
      furigana: tutor.profiles?.furigana ?? "",
      gender: tutor.profiles?.gender ?? "male",
      birth_date: tutor.profiles?.birth_date
        ? tutor.profiles.birth_date.slice(0, 10)
        : "",
      school: tutor.school ?? "",
      major: tutor.major ?? "",
      style: validStyles, // 👈 정제된 유효한 스타일만 세팅
      mbti: tutor.mbti ?? "",
      bio: tutor.bio ?? "",
    });
    setIsEditing(true);
  }
  function closeEditForm() {
    if (!isSaving) {
      setIsEditing(false);
      setEditForm(null);
    }
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTutor || !editForm) {
      return;
    }

    setIsSaving(true);
    const result = await updateTutorAccount(selectedTutor.id, editForm);
    setIsSaving(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    setIsEditing(false);
    setEditForm(null);
    clearSelection();
    router.refresh();
  }

  return {
    isDeleting,
    isEditing,
    isSaving,
    editForm,
    setEditForm,
    openEditForm,
    closeEditForm,
    handleDeleteSelected,
    handleEditSubmit,
  };
}
