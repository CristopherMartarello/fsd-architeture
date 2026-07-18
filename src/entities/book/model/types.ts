import type { Author } from "@/entities/author/@x/book";
export interface Book {
  id: string;
  title: string;
  authors: Author[];
  coverId: number | null;
  firstPublishYear: number | null;
}
