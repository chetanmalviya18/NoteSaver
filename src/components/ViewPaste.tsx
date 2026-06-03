import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const ViewPaste = () => {
  const { id } = useParams<{ id: string }>();
  const allPastes = useSelector((state: RootState) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
        <span className="text-red-500 font-bold text-lg">Note not found</span>
        <Link
          to="/pastes"
          className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--border-app)] hover:bg-[var(--border-app)]/30 text-[var(--text-app)] transition-smooth cursor-pointer"
        >
          Back to All Notes
        </Link>
      </div>
    );
  }

  const charCount = paste.content.length;
  const wordCount = paste.content.trim() === "" ? 0 : paste.content.trim().split(/\s+/).length;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <Link
          to="/pastes"
          className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-app)] transition-smooth font-medium cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Notes
        </Link>

        <span className="text-xs text-[var(--text-muted)]">
          Created on {formatDate(paste.createdAt)}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <input
          className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border-app)] bg-[var(--bg-card)] text-[var(--text-app)] outline-hidden transition-smooth text-sm font-medium opacity-80"
          type="text"
          value={paste.title}
          disabled
          placeholder="Title"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to clipboard");
          }}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--bg-card)] hover:bg-[var(--border-app)]/30 text-[var(--text-app)] shadow-xs transition-smooth cursor-pointer active:scale-95 border border-[var(--border-app)]"
        >
          Copy Content
        </button>
      </div>

      <div className="relative flex flex-col w-full rounded-2xl border border-[var(--border-app)] bg-[var(--bg-card)] p-1.5 transition-smooth">
        <textarea
          className="w-full p-4 rounded-xl bg-transparent text-[var(--text-app)] placeholder:text-[var(--text-muted)] outline-hidden resize-y text-sm leading-relaxed min-h-[300px]"
          value={paste.content}
          disabled
          placeholder="Content"
          rows={16}
        />
        <div className="flex justify-between items-center px-4 py-2 text-xs text-[var(--text-muted)] border-t border-[var(--border-app)] mt-2">
          <div>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </div>
          <div>
            {charCount} {charCount === 1 ? "character" : "characters"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
