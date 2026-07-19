import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "./get-author";

export function useAuthor(key: string) {
  return useQuery({
    queryKey: ["authors", key],
    queryFn: () => getAuthor(key),
    enabled: Boolean(key),
  });
}
