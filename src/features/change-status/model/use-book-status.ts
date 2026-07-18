import { useChangeStatusStore } from "./store";
import type { ReadingStatus } from "@/entities/book";

export function useBookStatus(bookId: string) {
  const status = useChangeStatusStore((state) => state.statuses[bookId]);
  const setStatus = useChangeStatusStore((state) => state.setStatus);

  return {
    status,
    setStatus: (newStatus: ReadingStatus) => setStatus(bookId, newStatus),
  };
}
