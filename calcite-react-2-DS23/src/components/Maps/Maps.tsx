import { ReactElement } from "react";

import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import {
  CalciteTab,
  CalciteTabNav,
  CalciteTabs,
  CalciteTabTitle
} from "@esri/calcite-components-react";

import "./Maps.scss";

export default function Maps(): ReactElement {
  return (
    <div className="maps">
      <CalciteTabs>
        <CalciteTabNav slot="title-group">
          <CalciteTabTitle selected>Embedded App</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab>
          <iframe
            src="https://webapps.maps.arcgis.com/apps/instant/countdown/index.html?appid=573812ace75a438ea9d9613e36f1ca68"
            width="100%"
            height="100%"
          ></iframe>
        </CalciteTab>
      </CalciteTabs>
    </div>
  );
}
