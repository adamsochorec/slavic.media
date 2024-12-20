<script setup lang="ts">
import { onMounted } from "vue";
import { loadGoogleMaps } from "@/functions/google-maps";

const apiKey = "AIzaSyCTbMf5-6CExnOHtAZKuFHUoDl1C8kkWME";

onMounted(async () => {
  try {
    const googleMaps = await loadGoogleMaps(apiKey);
    const map = new googleMaps.Map(document.getElementById("map"), {
      center: { lat: 56.25502295714493, lng: 11.896611755598963 },
      zoom: 8,
    });

    const markers = [
      {
        position: { lat: 56.25502295714493, lng: 11.896611755598963 },
        label: "Slavic Media",
        description:
          "Creative & Production studio based in Denmark and Czechia.",
      },
      // Add more markers here
    ];

    markers.forEach((marker) => {
      const mapMarker = new googleMaps.Marker({
        position: marker.position,
        map,
        title: marker.label,
        label: marker.label,
      });

      const infoWindow = new googleMaps.InfoWindow({
        content: `<div><strong>${marker.label}</strong><br>${marker.description}</div>`,
      });

      mapMarker.addListener("click", () => {
        infoWindow.open(map, mapMarker);
      });
    });
  } catch (error) {
    console.error("Failed to load Google Maps", error);
  }
});
</script>

<template>
  <div id="map" class="map reveal"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
