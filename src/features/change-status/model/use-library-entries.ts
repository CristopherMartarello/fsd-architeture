import { useChangeStatusStore } from "./store";
import type { ReadingStatus } from "@/entities/book";

interface LibraryEntry {
  bookId: string;
  status: ReadingStatus;
}

export function useLibraryEntries(): LibraryEntry[] {
  const statuses = useChangeStatusStore((state) => state.statuses);

  return Object.entries(statuses).map(([bookId, status]) => ({
    bookId,
    status,
  }));
}
