import { ReactElement, useEffect, useRef, useState } from "react";

import Search from "@arcgis/core/widgets/Search";
import Legend from "@arcgis/core/widgets/Legend";

import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@esri/calcite-components/dist/components/calcite-action-group";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import {
  CalciteAction,
  CalciteActionBar,
  CalciteActionGroup,
  CalciteButton,
  CalciteModal,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel
} from "@esri/calcite-components-react";

import View from "../View/View";

import "./CustomApp.scss";

import { intro } from "../../assets/settings";

type PanelState = "intro" | "legend" | "search";

interface CustomAppProps {
  view: __esri.MapView | null;
}

interface MapPanelProps {
  panelState: PanelState;
  view: __esri.MapView | null;
}

interface SearchContainerProps {
  view: __esri.MapView | null;
}

interface InfoContainerProps {
  handleModalClose: () => void;
}

export default function CustomApp({ view }: CustomAppProps): ReactElement {
  const [title, setTitle] = useState("");
  const [panelState, setPanelState] = useState<PanelState>("intro");
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    if (view != null) {
      view.when().then(() => {
        const map = view.map as __esri.WebMap;
        setTitle(map?.portalItem.title);
      });
    }
  }, [view]);

  function handleModalClose(): void {
    setOpenInfo(false);
  }

  return (
    <CalciteShell className="custom-app">
      <header slot="header">
        <h2>{title}</h2>
      </header>
      <CalciteShellPanel
        slot="panel-start"
        position="start"
        resizable
        detached-height-scale="l"
        width-scale="m"
      >
        <CalciteActionBar slot="action-bar" layout="vertical">
          <CalciteActionGroup layout="vertical">
            <CalciteAction
              active={panelState === "intro" ? true : undefined}
              text="Intro"
              icon="text"
              onClick={() => setPanelState("intro")}
            />
            <CalciteAction
              active={panelState === "search" ? true : undefined}
              text="Search"
              icon="search"
              onClick={() => setPanelState("search")}
            />
            <CalciteAction
              active={panelState === "legend" ? true : undefined}
              text="Legend"
              icon="legend"
              onClick={() => setPanelState("legend")}
            />
          </CalciteActionGroup>
          <CalciteActionGroup slot="bottom-actions" layout="vertical">
            <CalciteAction
              active={openInfo ? true : undefined}
              text="Information"
              icon="information"
              onClick={() => setOpenInfo(!openInfo)}
            />
          </CalciteActionGroup>
        </CalciteActionBar>
        <CalcitePanel>
          <MapPanel panelState={panelState} view={view} />
        </CalcitePanel>
      </CalciteShellPanel>
      <View view={view} />
      {openInfo ? <InformationContainer handleModalClose={handleModalClose} /> : null}
    </CalciteShell>
  );
}

function MapPanel({ panelState, view }: MapPanelProps): ReactElement | null {
  return (
    <div className="custom-app-panel">
      {panelState === "intro" ? (
        <IntroContainer />
      ) : panelState === "search" ? (
        <SearchContainer view={view} />
      ) : panelState === "legend" ? (
        <LegendContainer view={view} />
      ) : null}
    </div>
  );
}

function IntroContainer(): ReactElement {
  return (
    <div>
      <h3>Introduction</h3>
      <p>{intro}</p>
    </div>
  );
}

function SearchContainer({ view }: SearchContainerProps): ReactElement {
  const searchWidget = useRef<Search | null>(null);
  const searchContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (view != null && searchContainer.current != null) {
      searchContainer.current.innerHTML = "";
      const widget = document.createElement("div");
      widget.id = "search-widget";
      searchContainer.current?.prepend(widget);
      searchWidget.current = new Search({
        container: widget,
        view: view,
        includeDefaultSources: true
      });
    }
  }, [view]);

  return (
    <div>
      <h3>Search</h3>
      <div ref={searchContainer} id="search-widget-container"></div>
    </div>
  );
}

function LegendContainer({ view }: SearchContainerProps): ReactElement {
  const legendWidget = useRef<Legend | null>(null);
  const legendContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (view != null && legendContainer.current != null) {
      legendContainer.current.innerHTML = "";
      const widget = document.createElement("div");
      widget.id = "legend-widget";
      legendContainer.current?.prepend(widget);
      legendWidget.current = new Legend({
        container: widget,
        view: view
      });
    }
  }, [view]);

  return (
    <div>
      <h3>Legend</h3>
      <div ref={legendContainer} id="legend-widget-container"></div>
    </div>
  );
}

function InformationContainer({ handleModalClose }: InfoContainerProps): ReactElement {
  const modalContainer = useRef<HTMLCalciteModalElement | null>(null);

  return (
    <CalciteModal
      ref={modalContainer}
      docked
      onCalciteModalClose={handleModalClose}
      open
      scale="m"
      width="s"
    >
      <h3 slot="header">Information</h3>
      <div slot="content">
        The small modal is perfect for short confirmation dialogs or very compact interfaces with
        few elements.
      </div>
      <CalciteButton
        slot="primary"
        width="full"
        onClick={() => {
          if (modalContainer.current != null) modalContainer.current.open = false;
        }}
      >
        Close
      </CalciteButton>
    </CalciteModal>
  );
}
