import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath(window.location.href);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
