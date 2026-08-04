import { BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Buscar" },
  { to: "/library", label: "Minha Biblioteca" },
];

export function AppHeader() {
  return (
    <header className="flex items-center w-full justify-between p-6 border-b border-paper-muted/20 bg-paper-muted/50">
      <div className="max-w-7xl mx-auto w-full flex justify-between gap-6">
        <div className="flex items-center gap-2 mr-4">
          <BookOpen />
          <span className="text-lg font-bold text-paper-ink">Book Tracker</span>
        </div>
        <nav className="flex gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-paper-accent border-b-2 border-b-paper-accent"
                    : "text-paper-ink/70"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
