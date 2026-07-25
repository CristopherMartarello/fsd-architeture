export function normalizeAuthorKey(key: string): string {
  return key.startsWith("/authors/") ? key.replace("/authors/", "") : key;
}
