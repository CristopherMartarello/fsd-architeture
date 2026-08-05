import { useParams } from "react-router-dom";
import { useAuthor, buildAuthorPhotoUrl } from "@/entities/author";
import { useBooksByAuthor } from "@/entities/book";
import { BookGrid } from "@/widgets/book-grid";

export function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const authorId = id ?? "";

  // Duas entities compostas AQUI, na página, ligadas só pelo id (string).
  // Nenhuma entity importa a outra — sem @x.
  const { data: author, isLoading, error } = useAuthor(authorId);
  const { data: works } = useBooksByAuthor(authorId);

  if (isLoading) return <div className="p-6 text-paper-ink">Carregando...</div>;
  if (error || !author)
    return <div className="p-6 text-paper-accent">Autor não encontrado</div>;

  const lifespan = [author.birthDate, author.deathDate]
    .filter(Boolean)
    .join(" — ");

  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col gap-6">
      <article className="rounded-2xl bg-paper-surface border border-paper-muted/20 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          {author.photoId ? (
            <img
              src={buildAuthorPhotoUrl(author.photoId, "M")}
              alt={author.name}
              className="w-32 h-32 object-cover rounded-full shadow-xl ring-1 ring-paper-muted/20 shrink-0"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-paper-base flex items-center justify-center text-paper-ink/40 text-3xl font-bold shrink-0">
              {author.name.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h1 className="text-paper-ink text-3xl font-bold">{author.name}</h1>
            {lifespan && (
              <p className="text-paper-muted text-sm mt-1">{lifespan}</p>
            )}
            {author.bio && (
              <p className="text-paper-muted text-sm mt-3 leading-relaxed whitespace-pre-line line-clamp-6">
                {author.bio}
              </p>
            )}
            {author.link && (
              <a
                href={author.link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-paper-accent text-sm underline mt-3"
              >
                {author.link.title}
              </a>
            )}
          </div>
        </div>
      </article>

      {works && works.length > 0 && (
        <section className="rounded-2xl bg-paper-surface border border-paper-muted/20 shadow-sm p-6 md:p-8">
          <h2 className="text-paper-ink text-xl font-bold mb-4">Obras</h2>
          <BookGrid books={works} />
        </section>
      )}
    </div>
  );
}
