import { Input } from "@/shared/ui";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar por título, autor..."
      className="bg-paper-surface border-paper-muted/30 text-paper-ink"
    />
  );
}
