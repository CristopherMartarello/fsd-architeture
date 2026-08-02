import { useQuery } from "@tanstack/react-query";
import { getTrendingBooks, type TrendingPeriod } from "./get-trending-books";

export function useTrendingBooks(period: TrendingPeriod = "daily", limit = 12) {
  return useQuery({
    queryKey: ["books", "trending", period, limit],
    queryFn: () => getTrendingBooks(period, limit),
  });
}
