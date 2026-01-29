import type { IControl, Map, Layer } from "maplibre-gl";

interface Source {
  source: string;
  label: string;
}

export function useSourceSwitchControl(sources: Source[]) {
  class SourceSwitchControl implements IControl {
    private _map: Map | undefined;
    private _container: HTMLElement | undefined;

    onAdd(map: Map) {
      this._map = map;
      this._container = document.createElement("div");
      this._container.className = "maplibregl-ctrl";

      const select = document.createElement("select");

      sources.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.source;
        option.innerHTML = item.label;
        if (item.source === "winter-tiles") {
          option.selected = true;
        }
        select.appendChild(option);
      });

      select.addEventListener("change", (event) => {
        if (!this._map) return;
        const oldLayers = this._map.getStyle().layers;
        const layerIndex = oldLayers.findIndex((l) => l.id === "tiles");
        const layerDef = oldLayers[layerIndex] as Layer;
        const before =
          oldLayers[layerIndex + 1] && oldLayers[layerIndex + 1].id;

        if (layerDef) {
          layerDef.source = (event.target as HTMLSelectElement).value;
          this._map.removeLayer("tiles");
          this._map.addLayer(layerDef, before);
        }
      });
      this._container.appendChild(select);

      return this._container;
    }

    onRemove() {
      if (this._container?.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
      this._map = undefined;
    }
  }
  return new SourceSwitchControl();
}
