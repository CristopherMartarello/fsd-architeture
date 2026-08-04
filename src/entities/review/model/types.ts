export interface Review {
  id: string;
  bookId: string;
  text: string;
  createdAt: string;
  updatedAt?: string | null;
}
