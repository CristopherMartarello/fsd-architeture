import { booksApi } from "@/shared/api";
import type { Book } from "../model/types";
import { mapDocToBook, type OpenLibraryDoc } from "../lib/map-doc-to-book";

interface OpenLibrarySearchResponse {
  docs: OpenLibraryDoc[];
}

export async function searchBooks(
  query: string,
  limit = 24,
): Promise<Book[]> {
  const { data } = await booksApi.get<OpenLibrarySearchResponse>(
    "/search.json",
    {
      params: { q: query, limit },
    },
  );

  return data.docs.map(mapDocToBook);
}
