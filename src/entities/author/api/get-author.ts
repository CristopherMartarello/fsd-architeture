import { booksApi } from "@/shared/api";
import type { Author } from "../model/types";

interface OpenLibraryAuthorResponse {
  key: string;
  name: string;
}

export async function getAuthor(key: string): Promise<Author> {
  const { data } = await booksApi.get<OpenLibraryAuthorResponse>(
    `/authors/${key}.json`,
  );
  return { id: data.key, name: data.name };
}
