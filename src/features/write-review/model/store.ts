import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Review } from "@/entities/review";

interface WriteReviewState {
  reviews: Record<string, Review[]>; // bookId -> reviews
  addReview: (bookId: string, text: string) => void;
  editReview: (bookId: string, reviewId: string, text: string) => void;
  removeReview: (bookId: string, reviewId: string) => void;
}

export const useWriteReviewStore = create<WriteReviewState>()(
  persist(
    (set) => ({
      reviews: {},
      addReview: (bookId, text) =>
        set((state) => {
          const review: Review = {
            id: crypto.randomUUID(),
            bookId,
            text,
            createdAt: new Date().toISOString(),
          };
          return {
            reviews: {
              ...state.reviews,
              [bookId]: [review, ...(state.reviews[bookId] ?? [])],
            },
          };
        }),
      editReview: (bookId, reviewId, text) =>
        set((state) => ({
          reviews: {
            ...state.reviews,
            [bookId]: (state.reviews[bookId] ?? []).map((review) =>
              review.id === reviewId
                ? { ...review, text, updatedAt: new Date().toISOString() }
                : review,
            ),
          },
        })),
      removeReview: (bookId, reviewId) =>
        set((state) => ({
          reviews: {
            ...state.reviews,
            [bookId]: (state.reviews[bookId] ?? []).filter(
              (review) => review.id !== reviewId,
            ),
          },
        })),
    }),
    { name: "book-tracker-reviews" },
  ),
);
