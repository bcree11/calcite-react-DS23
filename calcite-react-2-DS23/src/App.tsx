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
    if (appDiv.current != null) {
      appDiv.current.className = switchEl.checked
        ? "App calcite-mode-dark"
        : "App calcite-mode-light";
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
