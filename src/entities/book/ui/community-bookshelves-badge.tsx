import { useBookBookshelves } from "../api/use-book-bookshelves";

interface CommunityBookshelvesBadgeProps {
  bookId: string;
}

export function CommunityBookshelvesBadge({
  bookId,
}: CommunityBookshelvesBadgeProps) {
  const { data: shelves, isLoading } = useBookBookshelves(bookId);

  if (isLoading || !shelves) return null;

  const total =
    shelves.wantToRead + shelves.currentlyReading + shelves.alreadyRead;
  if (total === 0) return null;

  return (
    <p className="text-paper-muted/70 text-xs">
      {shelves.wantToRead} querem ler · {shelves.currentlyReading} lendo ·{" "}
      {shelves.alreadyRead} já leram
    </p>
  );
}
