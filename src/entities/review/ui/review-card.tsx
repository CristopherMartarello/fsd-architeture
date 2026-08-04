import type { Review } from "../model/types";

interface ReviewCardProps {
  review: Review;
  actionSlot?: React.ReactNode;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function ReviewCard({ review, actionSlot }: ReviewCardProps) {
  return (
    <div className="rounded-lg border border-paper-muted/20 bg-paper-surface p-4">
      <p className="text-paper-ink text-sm whitespace-pre-line">{review.text}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-paper-muted">
          {dateFormatter.format(new Date(review.createdAt))}
          {review.updatedAt && " · editado"}
        </span>
        {actionSlot}
      </div>
    </div>
  );
}
