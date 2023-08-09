import React from "react";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/notes";
import { AppProvider } from "./context/app";
import { GlobalTheme } from "@carbon/react";
import { createRoot } from "react-dom/client";
import { FolderProvider } from "./context/folder";
import { AuthProvider } from "./context/auth";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <GlobalTheme theme="g100">
      <BrowserRouter>
        <NoteProvider>
          <FolderProvider>
            <AppProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </AppProvider>
          </FolderProvider>
        </NoteProvider>
      </BrowserRouter>
    </GlobalTheme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
