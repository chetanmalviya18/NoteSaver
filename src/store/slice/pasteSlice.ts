import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface Paste {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}
export interface PasteState {
  pastes: Paste[];
}

const getInitialPastes = (): Paste[] => {
  try {
    const stored = localStorage.getItem("pastes");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse pastes from localStorage", error);
    return [];
  }
};

const initialState: PasteState = {
  pastes: getInitialPastes(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action: PayloadAction<Paste>) => {
      const newPaste = action.payload;

      const exists = state.pastes.some((p) => p._id === newPaste._id);
      if (exists) return;

      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste added successfully");
    },
    updateToPaste: (state, action: PayloadAction<Paste>) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((i) => i._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated");
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All paste deleted");
    },
    removeFromPastes: (state, action: PayloadAction<string>) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((i) => i._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted");
      }
    },
  },
});

export const { addToPaste, updateToPaste, removeFromPastes, resetAllPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
