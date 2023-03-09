import { useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Container from "./components/Container/Container";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import Maps from "./components/Maps/Maps";

import "@esri/calcite-components/dist/calcite/calcite.css";
import "./App.scss";

export default function App() {
  const appDiv = useRef<HTMLDivElement>(null);

  function handleThemeSwitch(e: Event): void {
    const switchEl = e.target as HTMLCalciteSwitchElement;
    const theme = switchEl.checked ? "dark" : "light";
    if (appDiv.current != null) {
      appDiv.current.className = `App calcite-mode-${theme}`;
    }
    const jsapiStyles = document.getElementById("jsapiStyles") as HTMLLinkElement;
    if (jsapiStyles != null) {
      jsapiStyles.href = `https://js.arcgis.com/4.26/esri/themes/${theme}/main.css`;
    }
  }

  return (
    <div ref={appDiv} className="App calcite-mode-light">
      <Header />
      <Routes>
        <Route path="/" element={<Container handleThemeSwitch={handleThemeSwitch} />}>
          <Route index element={<Gallery />} />
          <Route path="maps" element={<Maps />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="error-page">
      <h2>Page not found.</h2>
      <p>
        <span>
          Go to the <Link to="/">homepage</Link>
        </span>
      </p>
    </div>
  );
}
