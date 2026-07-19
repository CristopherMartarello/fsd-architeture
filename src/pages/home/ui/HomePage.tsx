import { BookGrid } from "@/widgets/book-grid";
import { useSearchBook, SearchInput } from "@/features/search-book";
import { Link } from "react-router-dom";

export function HomePage() {
  const { query, setQuery, books, isLoading, error } = useSearchBook();

  return (
    <div className="p-6">
      <h1 className="text-paper-ink text-2xl font-bold mb-4">Book Tracker</h1>
      <Link to="/library" className="text-paper-accent underline text-sm">
        Ver minha biblioteca
      </Link>

      <SearchInput value={query} onChange={setQuery} />

      <div className="mt-6">
        {isLoading && <p className="text-paper-muted">Carregando...</p>}
        {error && <p className="text-paper-accent">Erro ao buscar livros</p>}
        {!query.trim() && (
          <p className="text-paper-muted">Digite algo para começar a busca.</p>
        )}
        {books && <BookGrid books={books} />}
      </div>
    </div>
  );
}
