import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams<{ id: string }>();
  const allPastes = useSelector((state: RootState) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-red-500 font-bold">
        Paste not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex gap-10 justify-center items-center">
        <input
          className="p-2 rounded-2xl bg-black w-[400px] text-white"
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
          className="p-2 rounded-2xl bg-amber-50 font-bold text-black cursor-pointer hover:bg-amber-100 transition-colors"
        >
          Copy Content
        </button>
      </div>
      <div className="mt-4">
        <textarea
          className="bg-black rounded-3xl min-w-[500px] p-4 text-white"
          value={paste.content}
          disabled
          placeholder="Content"
          rows={14}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
