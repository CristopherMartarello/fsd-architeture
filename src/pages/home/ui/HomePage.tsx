import { BookCard, useSearchBooks } from "@/entities/book";

export function HomePage() {
  const { data, isLoading, error } = useSearchBooks("harry potter");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-paper-ink text-2xl font-bold mb-4">Book Tracker</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {data?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
