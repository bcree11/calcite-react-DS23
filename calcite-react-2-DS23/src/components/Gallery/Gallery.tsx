import { ReactElement, useState } from "react";

import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-dropdown";
import "@esri/calcite-components/dist/components/calcite-dropdown-group";
import "@esri/calcite-components/dist/components/calcite-dropdown-item";
import "@esri/calcite-components/dist/components/calcite-filter";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import {
  CalciteButton,
  CalciteCard,
  CalciteDropdown,
  CalciteDropdownGroup,
  CalciteDropdownItem,
  CalciteFilter,
  CalciteIcon,
  CalciteLink,
  CalciteList,
  CalciteListItem
} from "@esri/calcite-components-react";

import { instantApps } from "../../assets/instantApps";

import "./Gallery.scss";

interface IView {
  icon: string;
  title: string;
}

const viewDropdown: IView[] = [
  {
    icon: "apps",
    title: "Grid"
  },
  {
    icon: "list",
    title: "List"
  }
];

interface GridProps {
  apps: typeof instantApps;
}

export default function Gallery(): ReactElement {
  const [view, setView] = useState<IView>({ icon: "apps", title: "Grid" });
  const [apps, setApps] = useState<typeof instantApps>(instantApps);

  function handleSelection(item: IView): void {
    setView(item);
  }

  function handleFilter(event: Event): void {
    const filter = event.target as HTMLCalciteFilterElement;
    const tmpApps = instantApps.filter((app) =>
      app.title.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())
    );
    setApps(tmpApps);
  }

  return (
    <div className="gallery">
      <div className="gallery-control-bar">
        <CalciteFilter
          placeholder="Search apps"
          items={instantApps}
          onCalciteFilterChange={handleFilter}
        />
        <span className="gallery-pipe"></span>
        <CalciteDropdown placement="bottom-end">
          <CalciteButton
            slot="trigger"
            iconStart={view.icon}
            appearance="transparent"
            kind="neutral"
          >
            {view.title}
          </CalciteButton>
          <CalciteDropdownGroup>
            {viewDropdown.map((item) => (
              <CalciteDropdownItem
                key={item.title}
                iconStart={item.icon}
                selected={view.title === item.title ? true : undefined}
                // selected={view.title === item.title ? true : false}
                onCalciteDropdownItemSelect={() => handleSelection(item)}
              >
                {item.title}
              </CalciteDropdownItem>
            ))}
          </CalciteDropdownGroup>
        </CalciteDropdown>
      </div>
      {view.title === "Grid" ? <AppsCardGrid apps={apps} /> : <AppsList apps={apps} />}
    </div>
  );
}

function AppsCardGrid({ apps }: GridProps): ReactElement {
  return (
    <div className="gallery-cards">
      {apps.map((app) => (
        <CalciteCard key={app.id}>
          <a slot="thumbnail" href={app.url} target="_blank" rel="noreferrer">
            <div className="gallery-overlay">
              <span>
                <CalciteIcon icon="launch" scale="s" />
                View
              </span>
            </div>
            <img alt={app.title} src={app.thumbnail} />
          </a>
          <CalciteLink slot="title" href={app.url} target="_blank">
            {app.title}
          </CalciteLink>
          {app.snippet}
        </CalciteCard>
      ))}
    </div>
  );
}

function AppsList({ apps }: GridProps): ReactElement {
  function goToLink(url: string): void {
    window.open(url, "_blank");
  }

  return (
    <div className="gallery-list">
      <CalciteList selectionMode="none">
        {apps.map((app) => (
          <CalciteListItem key={app.id} onCalciteListItemSelect={() => goToLink(app.url)}>
            <div slot="content-start" className="gallery-list-item-content">
              <img alt={app.title} src={app.thumbnail} />
              <div className="gallery-overlay">
                <span>
                  <CalciteIcon icon="launch" scale="s" />
                  View
                </span>
              </div>
            </div>
            <div slot="content">
              <h3>{app.title}</h3>
              <p>{app.snippet}</p>
            </div>
          </CalciteListItem>
        ))}
      </CalciteList>
    </div>
  );
}
