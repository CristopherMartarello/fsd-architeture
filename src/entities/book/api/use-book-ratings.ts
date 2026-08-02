import { useQuery } from "@tanstack/react-query";
import { getBookRatings } from "./get-book-ratings";

export function useBookRatings(id: string) {
  return useQuery({
    queryKey: ["books", "ratings", id],
    queryFn: () => getBookRatings(id),
    enabled: Boolean(id),
  });
}
