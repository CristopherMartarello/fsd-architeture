import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import {
  READING_STATUSES,
  READING_STATUS_LABELS,
  type ReadingStatus,
} from "@/entities/book";
import { useBookStatus } from "../model/use-book-status";

interface StatusSelectProps {
  bookId: string;
}

export function StatusSelect({ bookId }: StatusSelectProps) {
  const { status, setStatus } = useBookStatus(bookId);

  return (
    <Select
      items={READING_STATUS_LABELS}
      value={status}
      onValueChange={(value) => setStatus(value as ReadingStatus)}
    >
      <SelectTrigger className="w-full cursor-pointer bg-paper-surface border-paper-muted/30 text-paper-ink">
        <SelectValue placeholder="Adicionar" />
      </SelectTrigger>
      <SelectContent>
        {READING_STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="cursor-pointer">
            {READING_STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
