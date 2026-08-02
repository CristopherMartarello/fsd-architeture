import { Link } from "react-router-dom";
import { buildCoverUrl, type Book } from "@/entities/book";
import { StatusSelect } from "@/features/change-status";

interface HeroBannerProps {
  book?: Book;
  isLoading?: boolean;
  error?: Error | null;
}

export function HeroBanner({ book, isLoading, error }: HeroBannerProps) {
  if (isLoading) {
    return <div className="h-64 rounded-xl bg-paper-surface animate-pulse" />;
  }

  if (!book || error) return null;

  return (
    <section className="flex gap-6 rounded-xl bg-paper-surface border border-paper-muted/20 p-6">
      {book.coverId ? (
        <img
          src={buildCoverUrl(book.coverId, "L")}
          alt={book.title}
          className="w-40 aspect-[2/3] object-cover rounded-lg shadow-md shrink-0"
        />
      ) : (
        <div className="w-40 aspect-[2/3] rounded-lg bg-paper-base flex items-center justify-center text-paper-ink/50 text-sm shrink-0">
          Sem capa
        </div>
      )}

      <div className="flex flex-col min-w-0">
        <span className="text-paper-accent text-xs font-semibold uppercase tracking-wide">
          Em destaque hoje
        </span>
        <h2 className="text-paper-ink text-3xl font-bold leading-tight mt-1 line-clamp-2">
          {book.title}
        </h2>
        {book.authors.length > 0 && (
          <p className="text-paper-muted mt-1 line-clamp-1">
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
            {book.subjects.slice(0, 5).map((subject) => (
              <span
                key={subject.id}
                className="text-xs px-2 py-0.5 rounded-full bg-paper-base border border-paper-muted/30 text-paper-muted"
              >
                {subject.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-auto pt-4">
          <Link
            to={`/book/${book.id}`}
            className="px-4 py-2 rounded-lg bg-paper-accent text-white text-sm font-medium"
          >
            Ver detalhes
          </Link>
          <div className="w-50">
            <StatusSelect bookId={book.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
