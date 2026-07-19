import { Link } from "react-router-dom";
import { BookCard, type Book } from "@/entities/book";
import { StatusSelect } from "@/features/change-status";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {books.map((book) => (
        <div key={book.id}>
          <Link to={`/book/${book.id.replace("/works/", "")}`}>
            <BookCard book={book} />
          </Link>
          <div className="mt-2">
            <StatusSelect bookId={book.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
