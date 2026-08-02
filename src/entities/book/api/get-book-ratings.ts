import { booksApi } from "@/shared/api";
import type { CommunityRating } from "../model/types";

interface OpenLibraryRatingsResponse {
  summary: {
    average: number | null;
    count: number;
  };
}

export async function getBookRatings(id: string): Promise<CommunityRating> {
  const { data } = await booksApi.get<OpenLibraryRatingsResponse>(
    `/works/${id}/ratings.json`,
  );

  return {
    average: data.summary.average,
    count: data.summary.count,
  };
}
