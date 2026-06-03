import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between items-center py-6 border-b border-[var(--border-app)] mb-8">
      <div className="flex items-center gap-2.5">
        <svg
          className="text-[color:var(--color-brand)]"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
        <span className="text-xl font-bold tracking-tight text-[var(--text-app)]">
          NoteSaver
        </span>
      </div>
      <nav className="flex flex-row gap-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              isActive
                ? "bg-[var(--bg-card)] text-[color:var(--color-brand)] border border-[var(--border-app)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text-app)] hover:bg-[var(--border-app)]/30"
            }`
          }
        >
          Create Note
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-4 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              isActive
                ? "bg-[var(--bg-card)] text-[color:var(--color-brand)] border border-[var(--border-app)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text-app)] hover:bg-[var(--border-app)]/30"
            }`
          }
        >
          All Notes
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
