import { useQuery } from "@tanstack/react-query";
import { getBookBookshelves } from "./get-book-bookshelves";

export function useBookBookshelves(id: string) {
  return useQuery({
    queryKey: ["books", "bookshelves", id],
    queryFn: () => getBookBookshelves(id),
    enabled: Boolean(id),
  });
}
