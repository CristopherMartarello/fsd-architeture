import { useParams } from "react-router-dom";
import {
  useBook,
  buildCoverUrl,
  CommunityRatingBadge,
  CommunityBookshelvesBadge,
} from "@/entities/book";
import { StatusSelect } from "@/features/change-status";
import { RatingStars } from "@/features/rate-book";

export function BookPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBook(id ?? "");

  if (isLoading) return <div className="p-6 text-paper-ink">Carregando...</div>;
  if (error || !book)
    return <div className="p-6 text-paper-accent">Livro não encontrado</div>;

  return (
    <div className="p-6 flex gap-6">
      {book.coverId && (
        <img
          src={buildCoverUrl(book.coverId, "L")}
          alt={book.title}
          className="w-48 aspect-[2/3] object-cover rounded"
        />
      )}
      <div className="flex-1">
        <h1 className="text-paper-ink text-2xl font-bold">{book.title}</h1>
        {book.subtitle && (
          <p className="text-paper-muted text-lg">{book.subtitle}</p>
        )}
        {book.authors.length > 0 && (
          <p className="text-paper-muted mt-1">
            {book.authors.map((author) => author.name).join(", ")}
          </p>
        )}
        {book.firstPublishYear && (
          <p className="text-paper-muted text-sm mt-1">
            {book.firstPublishYear}
          </p>
        )}
        {book.subjects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {book.subjects.slice(0, 8).map((subject) => (
              <span
                key={subject.id}
                className="text-xs px-2 py-0.5 rounded-full bg-paper-surface border border-paper-muted/30 text-paper-muted"
              >
                {subject.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 max-w-xs">
          <StatusSelect bookId={book.id} />
          <CommunityBookshelvesBadge bookId={book.id} />
        </div>
        <div className="mt-2 flex items-center gap-3">
          <RatingStars bookId={book.id} />
          <CommunityRatingBadge bookId={book.id} />
        </div>

        {book.description && (
          <div className="mt-6">
            <h2 className="text-paper-ink font-semibold mb-1">Sinopse</h2>
            <p className="text-paper-muted text-sm whitespace-pre-line">
              {book.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
