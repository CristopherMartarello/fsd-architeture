import type { Book } from "../../model/types";
import { buildCoverUrl } from "../../lib/build-cover-url";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui";

interface BookCardProps {
  book: Book;
  actionSlot?: React.ReactNode;
}

export function BookCard({ book, actionSlot }: BookCardProps) {
  return (
    <Card className="border-paper-muted/20 bg-paper-surface overflow-hidden hover:cursor-pointer">
      <CardHeader className="p-0">
        {book.coverId ? (
          <img
            src={buildCoverUrl(book.coverId, "L")}
            alt={book.title}
            className="aspect-2/3 w-full object-contain"
          />
        ) : (
          <div className="aspect-2/3 w-full bg-paper-base flex items-center justify-center text-paper-ink/50 text-sm">
            Livro sem capa.
          </div>
        )}
      </CardHeader>

      <CardContent className="p-3">
        <h3 className="text-paper-ink font-medium leading-tight line-clamp-2">
          {book.title}
        </h3>
        {book.authors.length > 0 && (
          <p className="text-paper-muted text-sm mt-1 line-clamp-1">
            {book.authors.map((author) => author.name).join(", ")}
          </p>
        )}
        {book.firstPublishYear && (
          <p className="text-paper-ink/60 text-xs mt-1">
            {book.firstPublishYear}
          </p>
        )}
      </CardContent>

      {actionSlot && <CardFooter className="p-3 pt-0">{actionSlot}</CardFooter>}
    </Card>
  );
}
