import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-switch";
import { CalciteLabel, CalciteSwitch } from "@esri/calcite-components-react";

import "./Container.scss";

interface ContainerProps {
  handleThemeSwitch: (e: Event) => void;
}

export default function Container({ handleThemeSwitch }: ContainerProps): ReactElement {
  return (
    <div className="app-container">
      <div className="app-container-theme-controls">
        <CalciteLabel layout="inline">
          Dark mode: Off
          <CalciteSwitch onCalciteSwitchChange={handleThemeSwitch}></CalciteSwitch>
          On
        </CalciteLabel>
      </div>
      <Outlet />
    </div>
  );
}
