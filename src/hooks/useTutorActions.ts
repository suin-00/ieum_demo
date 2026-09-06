import { useState, type FormEvent } from "react";
import { deleteTutorAccounts, updateTutorAccount } from "@/actions/adminTutor";
import type { Tutor, TutorEditFormValues } from "@/types/tutor.types";
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

  function openEditForm(tutor = selectedTutor) {
    if (!tutor) {
      return;
    }

    setEditForm({
      name: tutor.profiles?.name ?? "",
      furigana: tutor.profiles?.furigana ?? "",
      gender: tutor.profiles?.gender ?? "male",
      school: tutor.school ?? "",
      major: tutor.major ?? "",
      style: tutor.style ?? "",
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
