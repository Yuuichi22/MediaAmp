import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import libraryReducer from './features/library/librarySlice'
import gamesReducer from  './features/game/gameSlice'
import searchReducer from './features/search/searchSlice'
const store = configureStore({
  reducer: {
    library: libraryReducer,
    games : gamesReducer,
    search : searchReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
