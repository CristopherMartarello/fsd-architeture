export const READING_STATUSES = [
  "want",
  "reading",
  "paused",
  "finished",
  "reread",
] as const;

export type ReadingStatus = (typeof READING_STATUSES)[number];

export const READING_STATUS_LABELS: Record<ReadingStatus, string> = {
  want: "Quero ler",
  reading: "Lendo",
  paused: "Pausado",
  finished: "Finalizado",
  reread: "Relendo",
};
