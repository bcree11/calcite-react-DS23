import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-avatar";
import "@esri/calcite-components/dist/components/calcite-dropdown";
import "@esri/calcite-components/dist/components/calcite-dropdown-group";
import "@esri/calcite-components/dist/components/calcite-dropdown-item";
import {
  CalciteAvatar,
  CalciteButton,
  CalciteDropdown,
  CalciteDropdownGroup,
  CalciteDropdownItem
} from "@esri/calcite-components-react";

import "./Header.scss";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  function handleNavigation(path: string): void {
    navigate(path);
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          <h1>Building Web Apps with Calcite Design System and React</h1>
        </div>
        <div className="header-actions-container">
          <nav className="header-actions">
            <CalciteButton
              appearance="transparent"
              kind="neutral"
              onClick={() => handleNavigation("/")}
            >
              Gallery
            </CalciteButton>
            <CalciteButton
              appearance="transparent"
              kind="neutral"
              onClick={() => handleNavigation("/maps")}
            >
              Maps
            </CalciteButton>
          </nav>
          <CalciteDropdown placement="bottom-end">
            <button slot="trigger" className="header-avatar">
              <CalciteAvatar fullName="Calcite React" />
            </button>
            <CalciteDropdownGroup selectionMode="none">
              <CalciteDropdownItem>Profile</CalciteDropdownItem>
              <CalciteDropdownItem>My projects</CalciteDropdownItem>
              <CalciteDropdownItem>Sign out</CalciteDropdownItem>
            </CalciteDropdownGroup>
          </CalciteDropdown>
        </div>
      </div>
    </header>
  );
}
