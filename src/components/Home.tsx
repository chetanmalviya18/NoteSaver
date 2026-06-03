import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../store/slice/pasteSlice";
import type { RootState } from "../store/store";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams("");

  const pasteId = searchParam.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state: RootState) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update paste
      dispatch(updateToPaste(paste));
    } else {
      //create paste
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParam("");
  }

  return (
    <div>
      <div className="mt-10 flex gap-10 justify-center items-center">
        <input
          className="p-2 rounded-2xl bg-black w-2xs"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="p-2 rounded-2xl bg-black"
          type="submit"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="bg-black rounded-3xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={14}
        />
      </div>
    </div>
  );
};

export default Home;
