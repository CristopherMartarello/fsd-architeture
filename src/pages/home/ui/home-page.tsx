import { BookGrid } from "@/widgets/book-grid";
import { useSearchBook, SearchInput } from "@/features/search-book";

export function HomePage() {
  const { query, setQuery, books, isLoading, error } = useSearchBook();

  return (
    <div className="p-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar por livros, autores..."
      />

      <div className="mt-6">
        {isLoading && <p className="text-paper-muted">Carregando...</p>}
        {error && <p className="text-paper-accent">Erro ao buscar livros</p>}
        {books && <BookGrid books={books} />}
      </div>
    </div>
  );
}
