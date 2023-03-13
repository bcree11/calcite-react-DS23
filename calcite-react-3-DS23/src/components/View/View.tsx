import { useEffect, useRef } from "react";

import "@esri/calcite-components/dist/components/calcite-tile";

import "./View.scss";

interface ViewProps {
  view: __esri.MapView | null;
}

export default function View({ view }: ViewProps) {
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view != null && viewRef.current != null) {
      view.container = viewRef.current;
    }
  }, [view]);

  // Add Calcite Component to View
  useEffect(() => {
    if (view) {
      const tileId = "ds-tile";
      let tile = view.ui.find(tileId) as HTMLCalciteTileElement;
      if (tile == null) {
        tile = document.createElement("calcite-tile") as HTMLCalciteTileElement;
        tile.id = tileId;
        tile.icon = "3d-glasses";
        tile.heading = "Demo";
        tile.description = "Adding Calcite Component to view";
        tile.tabIndex = 0;
        view.ui.add(tile, "bottom-left");
      }
    }
  }, [view]);

  return <div ref={viewRef} className="view-container"></div>;
}
