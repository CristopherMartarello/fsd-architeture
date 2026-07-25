export function normalizeWorkId(id: string): string {
  return id.startsWith("/works/") ? id.replace("/works/", "") : id;
}
