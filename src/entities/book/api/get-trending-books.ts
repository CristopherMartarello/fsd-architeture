import { booksApi } from "@/shared/api";
import type { Book } from "../model/types";
import { mapDocToBook, type OpenLibraryDoc } from "../lib/map-doc-to-book";

export type TrendingPeriod =
  | "now"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "forever";

interface OpenLibraryTrendingResponse {
  works: OpenLibraryDoc[];
}

export async function getTrendingBooks(
  period: TrendingPeriod = "daily",
  limit = 12,
): Promise<Book[]> {
  const { data } = await booksApi.get<OpenLibraryTrendingResponse>(
    `/trending/${period}.json`,
    {
      params: { limit },
    },
  );

  return data.works.map(mapDocToBook);
}
