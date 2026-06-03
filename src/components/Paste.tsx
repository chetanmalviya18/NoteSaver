import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";
import { removeFromPastes } from "../store/slice/pasteSlice";
import type { Paste as PasteType } from "../store/slice/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface ReadMoreTextProps {
  text: string;
  maxLength?: number;
}

const ReadMoreText = ({ text, maxLength = 160 }: ReadMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className="text-sm leading-relaxed text-[var(--text-muted)] whitespace-pre-wrap">{text}</p>;
  }

  return (
    <p className="text-sm leading-relaxed text-[var(--text-muted)] whitespace-pre-wrap">
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[color:var(--color-brand)] font-semibold hover:text-[color:var(--color-brand-hover)] ml-1 cursor-pointer transition-smooth focus:outline-hidden"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </p>
  );
};

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

const Paste = () => {
  const pastes = useSelector((state: RootState) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredPaste = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(id: string) {
    dispatch(removeFromPastes(id));
  }

  function handleShare(paste: PasteType) {
    const shareUrl = `${window.location.origin}/paste/${paste?._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: paste?.title,
          text: paste?.content,
          url: shareUrl,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => {
          if (error.name !== "AbortError") {
            toast.error("Sharing failed");
          }
        });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to clipboard");
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-app)] m-0">
            My Notes
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {filteredPaste.length} {filteredPaste.length === 1 ? "note" : "notes"} found
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="h-4 w-4 text-[var(--text-muted)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[var(--border-app)] bg-[var(--bg-card)] text-[var(--text-app)] placeholder:text-[var(--text-muted)] outline-hidden focus:border-[color:var(--color-brand)] focus:ring-1 focus:ring-[color:var(--color-brand)] transition-smooth text-sm"
            placeholder="Search notes by title..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {filteredPaste.length > 0 ? (
          filteredPaste.map((paste) => {
            return (
              <div
                className="p-5 rounded-2xl border border-[var(--border-app)] bg-[var(--bg-card)] shadow-xs hover:shadow-md transition-smooth flex flex-col gap-3 group"
                key={paste._id}
              >
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-base font-semibold text-[var(--text-app)] m-0 leading-snug">
                      {paste.title}
                    </h2>
                    <span className="text-xs text-[var(--text-muted)]">
                      {formatDate(paste.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-row items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-smooth">
                    <Link
                      to={`/?pasteId=${paste._id}`}
                      className="p-2 rounded-lg border border-[var(--border-app)] hover:bg-[var(--border-app)]/30 hover:text-[color:var(--color-brand)] text-[var(--text-muted)] transition-smooth cursor-pointer"
                      title="Edit note"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </Link>

                    <Link
                      to={`/paste/${paste._id}`}
                      className="p-2 rounded-lg border border-[var(--border-app)] hover:bg-[var(--border-app)]/30 hover:text-[color:var(--color-brand)] text-[var(--text-muted)] transition-smooth cursor-pointer"
                      title="View note"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </Link>

                    <button
                      className="p-2 rounded-lg border border-[var(--border-app)] hover:bg-[var(--border-app)]/30 hover:text-[color:var(--color-brand)] text-[var(--text-muted)] transition-smooth cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard");
                      }}
                      title="Copy content"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </button>

                    <button
                      className="p-2 rounded-lg border border-[var(--border-app)] hover:bg-[var(--border-app)]/30 hover:text-[color:var(--color-brand)] text-[var(--text-muted)] transition-smooth cursor-pointer"
                      onClick={() => handleShare(paste)}
                      title="Share note"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                      </svg>
                    </button>

                    <button
                      className="p-2 rounded-lg border border-[var(--border-app)] hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 text-[var(--text-muted)] transition-smooth cursor-pointer"
                      onClick={() => handleDelete(paste._id)}
                      title="Delete note"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="border-t border-[var(--border-app)]/60 pt-3">
                  <ReadMoreText text={paste.content} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 rounded-2xl border border-[var(--border-app)] bg-[var(--bg-card)] text-[var(--text-muted)] flex flex-col items-center justify-center gap-3">
            <svg
              className="h-10 w-10 text-[var(--text-muted)]/50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 17h6" />
              <path d="M9 13h6" />
              <path d="M9 9h6" />
            </svg>
            <span className="text-sm font-medium">No notes found. Create your first note on the Home page.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
