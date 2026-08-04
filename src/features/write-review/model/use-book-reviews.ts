import type { Review } from "@/entities/review";
import { useWriteReviewStore } from "./store";

const EMPTY: Review[] = [];

export function useBookReviews(bookId: string) {
  const reviews = useWriteReviewStore(
    (state) => state.reviews[bookId] ?? EMPTY,
  );
  const addReview = useWriteReviewStore((state) => state.addReview);
  const editReview = useWriteReviewStore((state) => state.editReview);
  const removeReview = useWriteReviewStore((state) => state.removeReview);

  return {
    reviews,
    addReview: (text: string) => addReview(bookId, text),
    editReview: (reviewId: string, text: string) =>
      editReview(bookId, reviewId, text),
    removeReview: (reviewId: string) => removeReview(bookId, reviewId),
  };
}
