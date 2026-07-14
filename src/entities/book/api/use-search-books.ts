import { searchBooks } from "@/entities/book/api/search-books";
import { useQuery } from "@tanstack/react-query";

export function useSearchBooks(query: string) {
  return useQuery({
    queryKey: ["books", "search", query],
    queryFn: () => searchBooks(query),
    enabled: query.trim().length > 0,
  });
}
