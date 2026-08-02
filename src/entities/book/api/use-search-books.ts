import { searchBooks } from "./search-books";
import { useQuery } from "@tanstack/react-query";

export function useSearchBooks(query: string, limit?: number) {
  return useQuery({
    queryKey: ["books", "search", query, limit],
    queryFn: () => searchBooks(query, limit),
    enabled: query.trim().length > 0,
  });
}
