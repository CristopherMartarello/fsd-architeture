import { useRateBookStore } from "./store";

export function useBookRating(bookId: string) {
  const rating = useRateBookStore((state) => state.ratings[bookId] ?? 0);
  const setRating = useRateBookStore((state) => state.setRating);

  return {
    rating,
    setRating: (value: number) => setRating(bookId, value),
  };
}
