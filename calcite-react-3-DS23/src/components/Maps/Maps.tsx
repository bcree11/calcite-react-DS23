import { ReactElement } from "react";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";

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

import applicationJSON from "../../config/application.json";

import CustomApp from "../CustomApp/CustomApp";

import "./Maps.scss";

export default function Maps(): ReactElement {
  const { webmap, portalUrl } = applicationJSON;
  //Set Portal URL
  esriConfig.portalUrl = portalUrl;
  const mapView = new MapView({
    map: new WebMap({
      portalItem: {
        id: webmap
      }
    })
  });

  return (
    <div className="maps">
      <CalciteTabs>
        <CalciteTabNav slot="title-group">
          <CalciteTabTitle selected>Embedded App</CalciteTabTitle>
          <CalciteTabTitle>Custom App</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab>
          <iframe
            src="https://webapps.maps.arcgis.com/apps/instant/countdown/index.html?appid=573812ace75a438ea9d9613e36f1ca68"
            width="100%"
            height="100%"
          ></iframe>
        </CalciteTab>
        <CalciteTab>
          <CustomApp view={mapView} />
        </CalciteTab>
      </CalciteTabs>
    </div>
  );
}
