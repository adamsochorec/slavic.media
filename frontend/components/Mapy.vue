<script setup lang="ts">
import { onMounted, ref } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { mmmyyyy } from "@/composables/useDateFormat";
import { useLogoControl } from "@/composables/useLogoControl";
import { useSourceSwitchControl } from "@/composables/useSourceSwitchControl";

const config = useRuntimeConfig();
const { data: events } = await useFetch(`${config.public.API_URL}/event`);
const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!mapContainer.value) return;

  const mapSources = {
    basic: {
      type: "raster",
      url: `https://api.mapy.cz/v1/maptiles/basic/tiles.json?apikey=${config.public.MAPY_API_KEY}`,
      tileSize: 180,
    },
    outdoor: {
      type: "raster",
      url: `https://api.mapy.cz/v1/maptiles/outdoor/tiles.json?apikey=${config.public.MAPY_API_KEY}`,
      tileSize: 180,
    },
    winter: {
      type: "raster",
      url: `https://api.mapy.cz/v1/maptiles/winter/tiles.json?apikey=${config.public.MAPY_API_KEY}`,
      tileSize: 180,
    },
    aerial: {
      type: "raster",
      url: `https://api.mapy.cz/v1/maptiles/aerial/tiles.json?apikey=${config.public.MAPY_API_KEY}`,
      tileSize: 180,
    },
  };

  const isMobile = window.innerWidth < 768;
  const zoom = isMobile ? 1 : 3;
  const defaultSource = "outdoor";

  const map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: mapSources,
      layers: [
        {
          id: "tiles",
          type: "raster",
          source: defaultSource,
        },
      ],
    },
    center: [17.586886934910057, 61.67435314125305],
    zoom: zoom,
  });

  const sourceSwitchSources = [
    { source: "basic", label: "Basic" },
    { source: "outdoor", label: "Outdoor" },
    { source: "winter", label: "Winter" },
    { source: "aerial", label: "Aerial" },
  ];

  map.addControl(
    useSourceSwitchControl(sourceSwitchSources, defaultSource),
    "top-left",
  );
  map.addControl(new maplibregl.NavigationControl());

  if (events.value) {
    events.value.forEach((event: any) => {
      new maplibregl.Marker()
        .setLngLat([event.lng, event.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<strong>${mmmyyyy(
              event.date,
            )}</strong><p>${event.description}.</p>`,
          ),
        )
        .addTo(map);
    });
  }
});
</script>
<template>
  <div id="map" ref="mapContainer"></div>
</template>
