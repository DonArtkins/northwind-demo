import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Catalog } from "./pages/Catalog";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Catalog />
  </StrictMode>,
);
