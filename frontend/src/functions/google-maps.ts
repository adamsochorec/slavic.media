export function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof google !== "undefined") {
      resolve(google.maps);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);

    window.initMap = () => {
      resolve(google.maps);
    };
  });
}
