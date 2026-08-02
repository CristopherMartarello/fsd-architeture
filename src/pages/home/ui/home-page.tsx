import { BookGrid } from "@/widgets/book-grid";
import { HeroBanner } from "@/widgets/hero-banner";
import { PopularBooks } from "@/widgets/popular-books";
import { useSearchBook, SearchInput } from "@/features/search-book";
import { useTrendingBooks } from "@/entities/book";

export function HomePage() {
  const { query, setQuery, books, isLoading, error } = useSearchBook();
  const {
    data: trendingBooks,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useTrendingBooks("daily", 12);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="p-6 flex flex-col gap-8">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar por livros, autores..."
      />

      {hasQuery ? (
        <div>
          {isLoading && <p className="text-paper-muted">Carregando...</p>}
          {error && <p className="text-paper-accent">Erro ao buscar livros</p>}
          {books && <BookGrid books={books} />}
        </div>
      ) : (
        <>
          <HeroBanner
            book={trendingBooks?.[0]}
            isLoading={isTrendingLoading}
            error={trendingError}
          />
          <PopularBooks
            books={trendingBooks?.slice(1)}
            isLoading={isTrendingLoading}
            error={trendingError}
          />
        </>
      )}
    </div>
  );
}
