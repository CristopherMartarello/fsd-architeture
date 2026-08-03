import { useQuery } from "@tanstack/react-query";
import { getBooksByAuthor } from "./get-books-by-author";

export function useBooksByAuthor(authorId: string, limit?: number) {
  return useQuery({
    queryKey: ["books", "by-author", authorId, limit],
    queryFn: () => getBooksByAuthor(authorId, limit),
    enabled: Boolean(authorId),
  });
}
