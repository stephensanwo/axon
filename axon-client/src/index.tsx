import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/notes";
import { AppProvider } from "./context/app";
import { GlobalTheme } from "@carbon/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { FolderProvider } from "./context/folder";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <GlobalTheme theme="g100">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <NoteProvider>
              <FolderProvider>
                <App />
              </FolderProvider>
            </NoteProvider>
          </AppProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GlobalTheme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();