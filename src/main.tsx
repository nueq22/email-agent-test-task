import { StrictMode } from "react";
import "react-contexify/dist/ReactContexify.css";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
