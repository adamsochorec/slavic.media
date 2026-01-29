import type { IControl, Map } from "maplibre-gl";

export function useLogoControl() {
  class LogoControl implements IControl {
    private _map: Map | undefined;
    private _container: HTMLElement | undefined;

    onAdd(map: Map) {
      this._map = map;
      this._container = document.createElement("div");
      this._container.className = "maplibregl-ctrl";
      this._container.innerHTML =
        '<a href="http://mapy.com/" target="_blank"><img width="100px" src="https://api.mapy.com/img/api/logo.svg" ></a>';

      return this._container;
    }

    onRemove() {
      if (this._container?.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
      this._map = undefined;
    }
  }
  return new LogoControl();
}
