import { StatusSelect } from "@/features/change-status";
import { BookCard } from "@/entities/book";
import { useSearchBook, SearchInput } from "@/features/search-book";

export function HomePage() {
  const { query, setQuery, books, isLoading, error } = useSearchBook();

  return (
    <div className="p-6">
      <h1 className="text-paper-ink text-2xl font-bold mb-4">Book Tracker</h1>

      <SearchInput value={query} onChange={setQuery} />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {isLoading && (
          <p className="text-paper-muted col-span-full">Carregando...</p>
        )}
        {error && (
          <p className="text-paper-accent col-span-full">
            Erro ao buscar livros
          </p>
        )}
        {!query.trim() && (
          <p className="text-paper-muted col-span-full">
            Digite algo para começar a busca.
          </p>
        )}
        {books?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            actionSlot={<StatusSelect bookId={book.id} />}
          />
        ))}
      </div>
    </div>
  );
}
