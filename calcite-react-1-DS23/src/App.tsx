import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

// Import Calcite Button
import "@esri/calcite-components/dist/components/calcite-button";
import { CalciteButton } from "@esri/calcite-components-react";

import "./App.css";

// import Calcite CSS
import "@esri/calcite-components/dist/calcite/calcite.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 5) {
      setCount(0);
    }
  }, [count]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <CalciteButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </CalciteButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
