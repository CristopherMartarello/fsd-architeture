import type { Book } from "../model/types";
import { booksApi } from "@/shared/api";

interface OpenLibrarySearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface OpenLibrarySearchResponse {
  docs: OpenLibrarySearchDoc[];
}

function mapToBook(doc: OpenLibrarySearchDoc): Book {
  return {
    id: doc.key,
    title: doc.title,
    authorNames: doc.author_name ?? [],
    coverId: doc.cover_i ?? null,
    firstPublishYear: doc.first_publish_year ?? null,
  };
}

export async function searchBooks(query: string): Promise<Book[]> {
  const { data } = await booksApi.get<OpenLibrarySearchResponse>(
    "/search.json",
    {
      params: { q: query },
    },
  );

  return data.docs.map(mapToBook);
}
