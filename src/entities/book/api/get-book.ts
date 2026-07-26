import { booksApi } from "@/shared/api";
import { getAuthor, type Author } from "@/entities/author/@x/book";
import type { Book } from "../model/types";
import { normalizeWorkId } from "../lib/normalize-work-id";
import { toSubject } from "../lib/to-subject";

interface OpenLibraryWorkResponse {
  key: string;
  title: string;
  subtitle?: string;
  description?: string | { type: string; value: string };
  excerpts?: { excerpt: string }[];
  first_sentence?: { type: string; value: string };
  covers?: number[];
  first_publish_date?: string;
  authors?: { author: { key: string } }[];
  subjects?: string[];
}

function toDescription(work: OpenLibraryWorkResponse): string | null {
  if (work.description) {
    return typeof work.description === "string"
      ? work.description
      : work.description.value;
  }
  if (work.excerpts?.[0]?.excerpt) return work.excerpts[0].excerpt;
  if (work.first_sentence?.value) return work.first_sentence.value;
  return null;
}

function mapWorkToBook(work: OpenLibraryWorkResponse, authors: Author[]): Book {
  return {
    id: normalizeWorkId(work.key),
    title: work.title,
    subtitle: work.subtitle ?? null,
    description: toDescription(work),
    authors,
    subjects: (work.subjects ?? []).map(toSubject),
    coverId: work.covers?.[0] ?? null,
    firstPublishYear: work.first_publish_date
      ? Number.parseInt(work.first_publish_date, 10) || null
      : null,
  };
}

export async function getBook(id: string): Promise<Book> {
  const { data } = await booksApi.get<OpenLibraryWorkResponse>(
    `/works/${id}.json`,
  );

  const authorKeys = data.authors?.map((a) => a.author.key) ?? [];
  const authors = await Promise.all(authorKeys.map((key) => getAuthor(key)));

  return mapWorkToBook(data, authors);
}
