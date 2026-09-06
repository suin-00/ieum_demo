import { useState } from "react";

export function useTutorSelection(tutorIds: string[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected =
    tutorIds.length > 0 && selectedIds.length === tutorIds.length;

  function toggle(id: string) {
    setSelectedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [...currentIds, id],
    );
  }

  function toggleAll() {
    setSelectedIds(allSelected ? [] : tutorIds);
  }

  function clear() {
    setSelectedIds([]);
  }

  return {
    selectedIds,
    allSelected,
    toggle,
    toggleAll,
    clear,
  };
}
