import { Link } from "react-router-dom";
import { BookCard, type Book } from "@/entities/book";
import { StatusSelect } from "@/features/change-status";
import { RatingStars } from "@/features/rate-book";

interface PopularBooksProps {
  books?: Book[];
  isLoading?: boolean;
  error?: Error | null;
}

export function PopularBooks({ books, isLoading, error }: PopularBooksProps) {
  if (isLoading) {
    return <div className="h-64 rounded-xl bg-paper-surface animate-pulse" />;
  }

  if (error || !books || books.length === 0) return null;

  return (
    <section>
      <h2 className="text-paper-ink text-xl font-bold mb-4">Em alta hoje</h2>
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
    </section>
  );
}
