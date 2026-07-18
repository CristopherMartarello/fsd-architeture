import { useState } from "react";
import { useDebounce } from "@/shared/lib";
import { useSearchBooks } from "@/entities/book";

export function useSearchBook() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { data: books, isLoading, error } = useSearchBooks(debouncedQuery);

  return { query, setQuery, books, isLoading, error };
}
