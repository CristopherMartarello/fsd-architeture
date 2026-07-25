import { Link } from "react-router-dom";
import { BookCard, type Book } from "@/entities/book";
import { StatusSelect } from "@/features/change-status";
import { RatingStars } from "@/features/rate-book";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {books.map((book) => (
        <Link key={book.id} to={`/book/${book.id}`}>
          <BookCard
            book={book}
            actionSlot={
              <div
                className="flex flex-col gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <StatusSelect bookId={book.id} />
                <RatingStars bookId={book.id} />
              </div>
            }
          />
        </Link>
      ))}
    </div>
  );
}
