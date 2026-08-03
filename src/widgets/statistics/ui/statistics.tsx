import { READING_STATUSES, READING_STATUS_LABELS } from "@/entities/book";
import { useLibraryEntries } from "@/features/change-status";
import { useRatingEntries, MAX_RATING } from "@/features/rate-book";
import { Star } from "lucide-react";

interface BarRowProps {
  label: React.ReactNode;
  value: number;
  max: number;
}

function BarRow({ label, value, max }: BarRowProps) {
  const width = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-paper-muted shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-paper-base overflow-hidden">
        <div
          className="h-full rounded-full bg-paper-accent"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-6 text-sm text-paper-ink text-right tabular-nums">
        {value}
      </span>
    </div>
  );
}

interface TileProps {
  label: string;
  value: string;
}

function Tile({ label, value }: TileProps) {
  return (
    <div className="flex-1 rounded-lg bg-paper-base p-4">
      <p className="text-2xl font-bold text-paper-ink tabular-nums">{value}</p>
      <p className="text-xs text-paper-muted mt-1">{label}</p>
    </div>
  );
}

export function Statistics() {
  const entries = useLibraryEntries();
  const ratings = useRatingEntries();

  if (entries.length === 0) return null;

  const statusCounts = READING_STATUSES.map((status) => ({
    status,
    count: entries.filter((entry) => entry.status === status).length,
  }));
  const maxStatusCount = Math.max(...statusCounts.map((s) => s.count), 1);

  const starCounts = Array.from({ length: MAX_RATING }, (_, i) => {
    const star = i + 1;
    return { star, count: ratings.filter((r) => r.rating === star).length };
  });
  const maxStarCount = Math.max(...starCounts.map((s) => s.count), 1);

  const average = ratings.length
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 0;

  return (
    <section className="rounded-xl bg-paper-surface border border-paper-muted/20 p-6 flex flex-col gap-6">
      <div className="flex gap-3">
        <Tile label="Na estante" value={String(entries.length)} />
        <Tile label="Avaliados" value={String(ratings.length)} />
        <Tile
          label="Nota média"
          value={average ? `${average.toFixed(1)} ★` : "—"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-paper-ink">Por status</h3>
        {statusCounts.map(({ status, count }) => (
          <BarRow
            key={status}
            label={READING_STATUS_LABELS[status]}
            value={count}
            max={maxStatusCount}
          />
        ))}
      </div>

      {ratings.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-paper-ink">
            Distribuição de notas
          </h3>
          {starCounts.map(({ star, count }) => (
            <BarRow
              key={star}
              label={
                <div className="flex items-center gap-2">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  <span>Nota - ( {star} )</span>
                </div>
              }
              value={count}
              max={maxStarCount}
            />
          ))}
        </div>
      )}
    </section>
  );
}
