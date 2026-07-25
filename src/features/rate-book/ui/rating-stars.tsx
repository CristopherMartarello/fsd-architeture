import { Star } from "lucide-react";
import { MAX_RATING } from "../model/constants";
import { useBookRating } from "../model/use-book-rating";

interface RatingStarsProps {
  bookId: string;
}

export function RatingStars({ bookId }: RatingStarsProps) {
  const { rating, setRating } = useBookRating(bookId);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setRating(value)}
          className="p-0.5"
          aria-label={`Avaliar com ${value} estrela${value > 1 ? "s" : ""}`}
        >
          <Star
            size={16}
            className={
              value <= rating
                ? "fill-paper-accent text-paper-accent"
                : "text-paper-muted"
            }
          />
        </button>
      ))}
    </div>
  );
}
