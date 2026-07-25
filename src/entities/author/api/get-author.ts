import { booksApi } from "@/shared/api";
import type { Author } from "../model/types";
import { normalizeAuthorKey } from "../lib/normalize-author-key";

interface OpenLibraryAuthorResponse {
  key: string;
  name: string;
}

export async function getAuthor(key: string): Promise<Author> {
  const { data } = await booksApi.get<OpenLibraryAuthorResponse>(
    `/authors/${normalizeAuthorKey(key)}.json`,
  );
  return { id: normalizeAuthorKey(data.key), name: data.name };
}
