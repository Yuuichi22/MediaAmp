import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = [
  {
    id: -1,
    name: "default name",
    description: "",
    tags: [],
    genres: [],
  },
];

const persistConfig = {
  key: "library",
  storage,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (state, action) => action.payload,

    resetLibrary: () => [],

    addToLibrary: (state, action) => {
      state.push(action.payload);
    },

    removeFromLibrary: (state, action) => {
      return state.filter((game) => game.id !== action.payload.id);
    },
  },
});

export const { resetLibrary, setLibrary, addToLibrary, removeFromLibrary } =
  librarySlice.actions;

export default persistReducer(persistConfig, librarySlice.reducer);
