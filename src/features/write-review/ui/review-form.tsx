import { useState } from "react";
import { Button } from "@/shared/ui";

interface ReviewFormProps {
  initialText?: string;
  submitLabel?: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
}

export function ReviewForm({
  initialText = "",
  submitLabel = "Comentar",
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [text, setText] = useState(initialText);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    if (!onCancel) setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Escreva um comentário sobre este livro..."
        rows={3}
        className="w-full rounded-lg border border-paper-muted/30 bg-paper-surface p-3 text-sm text-paper-ink resize-y focus:outline-none focus:border-paper-accent"
      />
      <div className="flex gap-2 self-end">
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer hover:bg-paper-accent hover:text-paper-surface"
          disabled={!text.trim()}
        >
          {submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            className="cursor-pointer hover:bg-paper-accent hover:text-paper-surface"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
