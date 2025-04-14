<script setup lang="ts">
import { onMounted } from "vue";
import { loadGoogleMaps } from "@/functions/google-maps";

const apiKey = "";

onMounted(async () => {
  try {
    const googleMaps: any = await loadGoogleMaps(apiKey);

    const centerMap = { lat: 56.1236961, lng: 9.2658987 };

    const markers = [
      {
        date: "Slavic Media",
        lat: 55.49958968671408,
        lng: 9.464197866229727,
        event: "Langelinie 22",
      },
      {
        date: "Test Media",
        lat: 54.80334355348578,
        lng: 9.543357653234933,
        event: "Langelinie 22",
      },
    ];
    const mapOptions = {
      center: centerMap,
      zoom: 5,
    };
    const fehMarker = "";

    const infoWindow = new googleMaps.InfoWindow({
      minWidth: 150,
      maxWidth: 150,
    });
    const mapElement = document.getElementById("map");

    const map = new googleMaps.Map(mapElement, mapOptions);

    const bounds = new googleMaps.LatLngBounds();

    for (let i = 0; i < markers.length; i++) {
      const marker = new googleMaps.Marker({
        position: { lat: markers[i].lat, lng: markers[i].lng },
        map: map,
        icon: fehMarker,
      });

      bounds.extend(marker.getPosition());

      const infoWindowContent = `
        <div class="feh-content">
          <span class="location-name">${markers[i].date}</span><br>
          <span class="location-event">${markers[i].event}</span>
        </div>
      `;

      googleMaps.event.addListener(marker, "click", function () {
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(map, marker);
      });
    }
  } catch (error) {
    console.error("Error loading Google Maps:", error);
  }
});
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style scoped></style>
