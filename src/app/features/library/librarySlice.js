import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  list: [], // ✅ Store library data inside "list" property
};

const persistConfig = {
  key: "library",
  storage,
  whitelist: ["list"], // ✅ Persist only the "list" property
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (state, action) => {
      state.list = action.payload; // ✅ Update "list" with new data
    },

    resetLibrary: (state) => {
      state.list = []; // ✅ Reset "list" to an empty array
    },

    addToLibrary: (state, action) => {
      state.list.push(action.payload); // ✅ Add new game to "list"
    },

    removeFromLibrary: (state, action) => {
      state.list = state.list.filter((game) => game.id !== action.payload.id); // ✅ Remove game by ID
    },
  },
});

export const { resetLibrary, setLibrary, addToLibrary, removeFromLibrary } =
  librarySlice.actions;

export default persistReducer(persistConfig, librarySlice.reducer);
