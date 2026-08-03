import { openLibraryConfig } from "@/shared/config";

export function buildAuthorPhotoUrl(
  photoId: number,
  size: "S" | "M" | "L" = "M",
) {
  return `${openLibraryConfig.coversUrl}/a/id/${photoId}-${size}.jpg`;
}
