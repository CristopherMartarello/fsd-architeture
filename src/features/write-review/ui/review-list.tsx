import { useState } from "react";
import { ReviewCard } from "@/entities/review";
import { useBookReviews } from "../model/use-book-reviews";
import { ReviewForm } from "./review-form";
import { Button } from "@/shared/ui";
import { Edit2, Trash2 } from "lucide-react";

interface ReviewListProps {
  bookId: string;
}

export function ReviewList({ bookId }: ReviewListProps) {
  const { reviews, addReview, editReview, removeReview } =
    useBookReviews(bookId);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <ReviewForm onSubmit={addReview} />

      {reviews.length === 0 ? (
        <p className="text-paper-muted text-sm">
          Nenhum comentário ainda. Seja o primeiro.
        </p>
      ) : (
        reviews.map((review) =>
          editingId === review.id ? (
            <ReviewForm
              key={review.id}
              initialText={review.text}
              submitLabel="Salvar"
              onCancel={() => setEditingId(null)}
              onSubmit={(text) => {
                editReview(review.id, text);
                setEditingId(null);
              }}
            />
          ) : (
            <ReviewCard
              key={review.id}
              review={review}
              actionSlot={
                <div className="flex text-xs">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(review.id)}
                    className="text-paper-muted hover:text-paper-accent cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReview(review.id)}
                    className="text-paper-muted hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              }
            />
          ),
        )
      )}
    </div>
  );
}
