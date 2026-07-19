import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Buscar" },
  { to: "/library", label: "Minha Biblioteca" },
];

export function AppHeader() {
  return (
    <header className="border-b border-paper-muted/20 bg-paper-surface">
      <nav className="flex gap-6 px-6 py-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-paper-accent" : "text-paper-ink/70"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
