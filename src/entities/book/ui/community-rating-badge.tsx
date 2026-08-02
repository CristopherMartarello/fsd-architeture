import { Star } from "lucide-react";
import { useBookRatings } from "../api/use-book-ratings";

interface CommunityRatingBadgeProps {
  bookId: string;
}

export function CommunityRatingBadge({ bookId }: CommunityRatingBadgeProps) {
  const { data: rating, isLoading } = useBookRatings(bookId);

  if (isLoading || !rating || rating.count === 0) return null;

  return (
    <p className="flex items-center gap-1 text-paper-muted text-sm">
      <Star size={14} className="fill-paper-accent text-paper-accent" />
      {rating.average?.toFixed(1)}{" "}
      <span className="text-paper-muted/70">
        ({rating.count} avaliaç{rating.count === 1 ? "ão" : "ões"} da
        comunidade)
      </span>
    </p>
  );
}
