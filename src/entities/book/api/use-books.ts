import { useQueries } from "@tanstack/react-query";
import { getBook } from "./get-book";

export function useBooks(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["books", "detail", id],
      queryFn: () => getBook(id),
      enabled: Boolean(id),
    })),
  });
}
