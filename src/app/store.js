import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import libraryReducer from './features/Library/librarySlice'
import gamesReducer from './features/Game/gameSlice'
import searchReducer from './features/Search/searchSlice'
const store = configureStore({
  reducer: {
    library: libraryReducer,
    games : gamesReducer,
    search : searchReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
