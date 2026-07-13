import { openLibraryConfig } from "@/shared/config";

export function buildCoverUrl(coverId: number, size: "S" | "M" | "L" = "M") {
  return `${openLibraryConfig.coversUrl}/b/id/${coverId}-${size}.jpg`;
}
