import { booksApi } from "@/shared/api";
import { getAuthor, type Author } from "@/entities/author/@x/book";
import type { Book } from "../model/types";

interface OpenLibraryWorkResponse {
  key: string;
  title: string;
  covers?: number[];
  first_publish_date?: string;
  authors?: { author: { key: string } }[];
}

function mapWorkToBook(work: OpenLibraryWorkResponse, authors: Author[]): Book {
  return {
    id: work.key,
    title: work.title,
    authors,
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

  const authorKeys =
    data.authors?.map((a) => a.author.key.replace("/authors/", "")) ?? [];
  console.log("authorKeys", authorKeys);
  const authors = await Promise.all(authorKeys.map((key) => getAuthor(key)));

  return mapWorkToBook(data, authors);
}
