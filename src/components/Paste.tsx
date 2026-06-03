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

const ReadMoreText = ({ text, maxLength = 100 }: ReadMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-amber-600 font-semibold hover:text-amber-800 ml-1 cursor-pointer transition-colors duration-200"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </span>
  );
};

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
    <div>
      <input
        className="bg-black p-2 rounded-2xl min-w-[600px] mt-5"
        placeholder="search here"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredPaste.length > 0 &&
          filteredPaste.map((paste, index) => {
            return (
              <div className="border" key={index}>
                <div className="flex flex-row gap-4 justify-evenly mt-5 mb-3">
                  <button className="bg-amber-50 rounded-2xl font-bold px-4">
                    <Link to={`/?pasteId=${paste._id}`}>Edit</Link>
                  </button>
                  <button className="bg-amber-50 rounded-2xl font-bold px-4">
                    <Link to={`/paste/${paste._id}`}>View</Link>
                  </button>
                  <button
                    className="bg-amber-50 rounded-2xl font-bold px-4"
                    onClick={() => handleDelete(paste._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-amber-50 rounded-2xl font-bold px-4"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="bg-amber-50 rounded-2xl font-bold px-4"
                    onClick={() => handleShare(paste)}
                  >
                    Share
                  </button>
                </div>
                <div>{paste.title}</div>
                <div>
                  <ReadMoreText text={paste.content} maxLength={100} />
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
