import { booksApi } from "@/shared/api";
import type { CommunityBookshelves } from "../model/types";

interface OpenLibraryBookshelvesResponse {
  counts: {
    want_to_read: number;
    currently_reading: number;
    already_read: number;
  };
}

export async function getBookBookshelves(
  id: string,
): Promise<CommunityBookshelves> {
  const { data } = await booksApi.get<OpenLibraryBookshelvesResponse>(
    `/works/${id}/bookshelves.json`,
  );

  return {
    wantToRead: data.counts.want_to_read,
    currentlyReading: data.counts.currently_reading,
    alreadyRead: data.counts.already_read,
  };
}
