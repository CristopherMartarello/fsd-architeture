import { booksApi } from "@/shared/api";
import type { Book } from "../model/types";
import { normalizeWorkId } from "../lib/normalize-work-id";

interface OpenLibraryAuthorWork {
  key: string;
  title: string;
  covers?: number[];
  first_publish_date?: string;
}

interface OpenLibraryWorksResponse {
  entries: OpenLibraryAuthorWork[];
}

function mapEntryToBook(entry: OpenLibraryAuthorWork): Book {
  return {
    id: normalizeWorkId(entry.key),
    title: entry.title,
    subtitle: null,
    description: null,
    authors: [],
    subjects: [],
    coverId: entry.covers?.find((cover) => cover > 0) ?? null,
    firstPublishYear: entry.first_publish_date
      ? Number.parseInt(entry.first_publish_date, 10) || null
      : null,
  };
}

export async function getBooksByAuthor(
  authorId: string,
  limit = 24,
): Promise<Book[]> {
  const { data } = await booksApi.get<OpenLibraryWorksResponse>(
    `/authors/${authorId}/works.json`,
    {
      params: { limit },
    },
  );

  return data.entries.map(mapEntryToBook);
}
