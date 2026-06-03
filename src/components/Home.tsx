import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../store/slice/pasteSlice";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams("");

  const pasteId = searchParam.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state: RootState) => state.paste.pastes);

  useEffect(() => {
    if (pasteId && allPaste.length > 0) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Please enter both title and content");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParam("");
  }

  const charCount = value.length;
  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <input
          className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border-app)] bg-[var(--bg-card)] text-[var(--text-app)] outline-hidden focus:border-[color:var(--color-brand)] focus:ring-1 focus:ring-[color:var(--color-brand)] transition-smooth text-sm font-medium"
          type="text"
          placeholder="Title of your note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs transition-smooth cursor-pointer active:scale-95 ${
            title.trim() && value.trim()
              ? "bg-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-hover)]"
              : "bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed opacity-65"
          }`}
          disabled={!title.trim() || !value.trim()}
          type="submit"
        >
          {pasteId ? "Update Note" : "Save Note"}
        </button>
      </div>

      <div className="relative flex flex-col w-full rounded-2xl border border-[var(--border-app)] bg-[var(--bg-card)] p-1.5 focus-within:border-[color:var(--color-brand)] focus-within:ring-1 focus-within:ring-[color:var(--color-brand)] transition-smooth">
        <textarea
          className="w-full p-4 rounded-xl bg-transparent text-[var(--text-app)] placeholder:text-[var(--text-muted)] outline-hidden resize-y text-sm leading-relaxed min-h-[300px]"
          value={value}
          placeholder="Start typing your note here..."
          onChange={(e) => setValue(e.target.value)}
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

export default Home;
