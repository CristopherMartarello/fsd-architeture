import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ReadingStatus } from "@/entities/book";

interface ChangeStatusState {
  statuses: Record<string, ReadingStatus>;
  setStatus: (bookId: string, status: ReadingStatus) => void;
}

export const useChangeStatusStore = create<ChangeStatusState>()(
  // persist -> salvar no localstorage
  persist(
    (set) => ({
      statuses: {},
      setStatus: (bookId, status) =>
        set((state) => ({
          statuses: { ...state.statuses, [bookId]: status },
        })),
    }),
    { name: "book-tracker-status" },
  ),
);
