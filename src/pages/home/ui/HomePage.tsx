import { useSearchBooks } from "@/entities/book";

export function HomePage() {
  const { data, isLoading, error } = useSearchBooks("harry potter");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Book Manager</h1>
      <ul>
        {data?.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
