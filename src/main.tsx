import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Твої глобальні стилі з :root
import App from "./App";
import { ThemeProvider } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
