import { useParams } from "react-router-dom";
import { useBook, buildCoverUrl } from "@/entities/book";
import { StatusSelect } from "@/features/change-status";

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

        <div className="mt-4 max-w-xs">
          <StatusSelect bookId={book.id} />
        </div>
      </div>
    </div>
  );
}
