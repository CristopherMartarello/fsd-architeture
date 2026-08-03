export interface AuthorLink {
  title: string;
  url: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string | null;
  birthDate?: string | null;
  deathDate?: string | null;
  photoId?: number | null;
  link?: AuthorLink | null;
}
