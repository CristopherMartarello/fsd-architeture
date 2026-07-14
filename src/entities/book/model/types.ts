export interface Book {
  id: string;
  title: string;
  authorNames: string[];
  coverId: number | null;
  firstPublishYear: number | null;
}
