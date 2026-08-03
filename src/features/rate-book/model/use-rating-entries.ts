import { useRateBookStore } from "./store";

interface RatingEntry {
  bookId: string;
  rating: number;
}

export function useRatingEntries(): RatingEntry[] {
  const ratings = useRateBookStore((state) => state.ratings);

  return Object.entries(ratings).map(([bookId, rating]) => ({
    bookId,
    rating,
  }));
}
