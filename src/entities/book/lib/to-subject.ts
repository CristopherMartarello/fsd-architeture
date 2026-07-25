import type { Subject } from "../model/types";

export function toSubject(name: string): Subject {
  return { id: name.toLowerCase().trim().replace(/\s+/g, "_"), name };
}
