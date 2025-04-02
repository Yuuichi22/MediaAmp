import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import libraryReducer from './features/Library/librarySlice'

const store = configureStore({
  reducer: {
    library: libraryReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
