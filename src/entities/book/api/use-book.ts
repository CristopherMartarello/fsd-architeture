import { useQuery } from "@tanstack/react-query";
import { getBook } from "./get-book";

export function useBook(id: string) {
  return useQuery({
    queryKey: ["books", "detail", id],
    queryFn: () => getBook(id),
    enabled: Boolean(id),
  });
}
