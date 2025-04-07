import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { store, persistor } from "./app/store";
import {Provider, useDispatch} from "react-redux"
import { ClerkProvider } from '@clerk/clerk-react'
import { PersistGate } from "redux-persist/integration/react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
      </PersistGate>
    </Provider>

);
