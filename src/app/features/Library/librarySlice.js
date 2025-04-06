import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  list: [], 
};

const persistConfig = {
  key: "library",
  storage,
  whitelist: ["list"],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (state, action) => {
      state.list = action.payload; 
    },

    resetLibrary: (state) => {
      state.list = []; 
    },

    addToLibrary: (state, action) => {
      state.list.push(action.payload);
    },

    removeFromLibrary: (state, action) => {
      state.list = state.list.filter((game) => game.id !== action.payload.id); 
    },
  },
});

export const { resetLibrary, setLibrary, addToLibrary, removeFromLibrary } =
  librarySlice.actions;

export default persistReducer(persistConfig, librarySlice.reducer);
