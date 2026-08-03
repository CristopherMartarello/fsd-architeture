import type { Author } from "@/entities/author/@x/book";
import type { Book } from "../model/types";
import { normalizeWorkId } from "./normalize-work-id";
import { toSubject } from "./to-subject";

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  subject?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export function mapDocToBook(doc: OpenLibraryDoc): Book {
  const authors: Author[] = (doc.author_name ?? []).map((name, index) => ({
    id: doc.author_key?.[index] ?? name,
    name,
  }));

  return {
    id: normalizeWorkId(doc.key),
    title: doc.title,
    subtitle: null,
    description: null,
    authors,
    subjects: (doc.subject ?? []).map(toSubject),
    coverId: doc.cover_i ?? null,
    firstPublishYear: doc.first_publish_year ?? null,
  };
}
