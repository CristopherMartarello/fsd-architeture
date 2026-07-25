import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RateBookState {
  ratings: Record<string, number>;
  setRating: (bookId: string, rating: number) => void;
}

export const useRateBookStore = create<RateBookState>()(
  persist(
    (set) => ({
      ratings: {},
      setRating: (bookId, rating) =>
        set((state) => ({ ratings: { ...state.ratings, [bookId]: rating } })),
    }),
    { name: "book-tracker-rating" },
  ),
);
