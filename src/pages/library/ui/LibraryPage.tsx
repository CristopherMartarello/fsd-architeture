import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useBooks,
  READING_STATUSES,
  READING_STATUS_LABELS,
  type ReadingStatus,
  type Book,
} from "@/entities/book";
import { useLibraryEntries } from "@/features/change-status";
import { BookGrid } from "@/widgets/book-grid";

export function LibraryPage() {
  const entries = useLibraryEntries();
  const results = useBooks(entries.map((e) => e.bookId));
  const [filter, setFilter] = useState<ReadingStatus | "all">("all");

  const validBooks: { book: Book; status: ReadingStatus }[] = results
    .map((result, index) => ({
      book: result.data,
      status: entries[index].status,
    }))
    .filter((entry): entry is { book: Book; status: ReadingStatus } =>
      Boolean(entry.book),
    );

  const filtered =
    filter === "all"
      ? validBooks
      : validBooks.filter((entry) => entry.status === filter);

  if (entries.length === 0) {
    return (
      <div className="p-6">
        <p className="text-paper-muted">
          Sua biblioteca está vazia.{" "}
          <Link to="/" className="text-paper-accent underline">
            Buscar livros
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-paper-ink text-2xl font-bold mb-4">
        Minha Biblioteca
      </h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded text-sm border ${
            filter === "all"
              ? "bg-paper-accent text-white border-paper-accent"
              : "bg-paper-surface text-paper-ink border-paper-muted/30"
          }`}
        >
          Todos
        </button>
        {READING_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded text-sm border ${
              filter === status
                ? "bg-paper-accent text-white border-paper-accent"
                : "bg-paper-surface text-paper-ink border-paper-muted/30"
            }`}
          >
            {READING_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <BookGrid books={filtered.map((entry) => entry.book)} />
    </div>
  );
}
