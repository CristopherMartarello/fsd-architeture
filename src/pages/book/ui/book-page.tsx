import { useParams, Link } from "react-router-dom";
import {
  useBook,
  buildCoverUrl,
  CommunityRatingBadge,
  CommunityBookshelvesBadge,
} from "@/entities/book";
import { StatusSelect } from "@/features/change-status";
import { RatingStars } from "@/features/rate-book";
import { ReviewList } from "@/features/write-review";

export function BookPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBook(id ?? "");

  if (isLoading) return <div className="p-6 text-paper-ink">Carregando...</div>;
  if (error || !book)
    return <div className="p-6 text-paper-accent">Livro não encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
      <article className="rounded-2xl bg-paper-surface border border-paper-muted/20 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <div className="shrink-0 mx-auto sm:mx-0">
            {book.coverId ? (
              <img
                src={buildCoverUrl(book.coverId, "L")}
                alt={book.title}
                className="w-52 h-auto rounded-lg shadow-xl ring-1 ring-paper-muted/20"
              />
            ) : (
              <div className="w-52 aspect-2/3 rounded-lg bg-paper-base flex items-center justify-center text-paper-ink/40 text-sm">
                Sem capa
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-paper-ink text-3xl font-bold leading-tight">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="text-paper-muted text-lg mt-1">{book.subtitle}</p>
            )}

            {book.authors.length > 0 && (
              <p className="text-paper-ink/80 mt-3">
                por{" "}
                {book.authors.map((author, index) => (
                  <span key={author.id}>
                    {index > 0 && ", "}
                    <Link
                      to={`/author/${author.id}`}
                      className="font-medium underline decoration-paper-muted/40 underline-offset-2 hover:text-paper-accent hover:decoration-paper-accent"
                    >
                      {author.name}
                    </Link>
                  </span>
                ))}
              </p>
            )}

            {book.firstPublishYear && (
              <p className="text-paper-muted text-sm mt-1">
                Publicado em {book.firstPublishYear}
              </p>
            )}

            {book.subjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {book.subjects.slice(0, 8).map((subject) => (
                  <span
                    key={subject.id}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-paper-base border border-paper-muted/25 text-paper-muted"
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 rounded-xl bg-paper-base/60 p-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-paper-muted">
                  Sua biblioteca
                </span>
                <div className="max-w-xs">
                  <StatusSelect bookId={book.id} />
                </div>
                <CommunityBookshelvesBadge bookId={book.id} />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-paper-muted">
                  Sua avaliação
                </span>
                <div className="flex items-center gap-3">
                  <RatingStars bookId={book.id} />
                  <CommunityRatingBadge bookId={book.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {book.description && (
          <div className="mt-8 pt-6 border-t border-paper-muted/15">
            <h2 className="text-paper-ink font-semibold mb-2">Sinopse</h2>
            <p className="text-paper-muted text-sm leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>
        )}
      </article>

      <section className="rounded-2xl bg-paper-surface border border-paper-muted/20 shadow-sm p-6 md:p-8">
        <h2 className="text-paper-ink font-semibold mb-4">Comentários</h2>
        <ReviewList bookId={book.id} />
      </section>
    </div>
  );
}
