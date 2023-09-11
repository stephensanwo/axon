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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
