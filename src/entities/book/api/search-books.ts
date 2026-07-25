import type { Author } from "@/entities/author/@x/book";
import { booksApi } from "@/shared/api";
import type { Book } from "../model/types";
import { normalizeWorkId } from "../lib/normalize-work-id";

interface OpenLibrarySearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface OpenLibrarySearchResponse {
  docs: OpenLibrarySearchDoc[];
}

function mapToBook(doc: OpenLibrarySearchDoc): Book {
  const authors: Author[] = (doc.author_name ?? []).map((name, index) => ({
    id: doc.author_key?.[index] ?? name,
    name,
  }));

  return {
    id: normalizeWorkId(doc.key),
    title: doc.title,
    authors,
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
