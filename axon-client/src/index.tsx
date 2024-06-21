import "./primer.scss";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { datadog } from "./api/monitoring/datadog";
import Router from "./Router";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { AXON_THEME } from "./theme";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { authConfig } from "./Auth";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();
Amplify.configure(authConfig);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider colorMode="dark" theme={AXON_THEME}>
        <BaseStyles>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </BaseStyles>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
