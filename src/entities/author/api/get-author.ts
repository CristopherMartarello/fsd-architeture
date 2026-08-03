import { booksApi } from "@/shared/api";
import type { Author } from "../model/types";
import { normalizeAuthorKey } from "../lib/normalize-author-key";

interface OpenLibraryAuthorResponse {
  key: string;
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
  links?: { title: string; url: string }[];
}

function toBio(data: OpenLibraryAuthorResponse): string | null {
  if (!data.bio) return null;
  return typeof data.bio === "string" ? data.bio : data.bio.value;
}

export async function getAuthor(key: string): Promise<Author> {
  const { data } = await booksApi.get<OpenLibraryAuthorResponse>(
    `/authors/${normalizeAuthorKey(key)}.json`,
  );

  return {
    id: normalizeAuthorKey(data.key),
    name: data.name,
    bio: toBio(data),
    birthDate: data.birth_date ?? null,
    deathDate: data.death_date ?? null,
    photoId: data.photos?.find((photo) => photo > 0) ?? null,
    link: data.links?.[0] ?? null,
  };
}
