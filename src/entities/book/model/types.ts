import type { Author } from "@/entities/author/@x/book";

export interface Subject {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  authors: Author[];
  subjects: Subject[];
  coverId: number | null;
  firstPublishYear: number | null;
}
