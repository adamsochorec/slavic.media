import { ref } from "vue";

export const services = ref([
  {
    label: "Photo",
    icon: "pi pi-camera",
    items: [
      {
        label: "Headshot",
        route: "/services/photo#headshots",
        icon: "pi pi-user",
        value: "Headshot",
      },
      {
        label: "Behind the Scenes",
        route: "/services/photo/behind-the-scenes",
        icon: "pi pi-camera",
        value: "Behind the Scenes",
      },
      {
        label: "Real Estate",
        route: "/services/photo#real-estate",
        icon: "pi pi-home",
        value: "Real Estate",
      },
      {
        label: "Wedding",
        route: "/services/photo#wedding",
        icon: "pi pi-camera",
        value: "Wedding",
      },
    ],
  },
  {
    label: "Video",
    icon: "pi pi-video",
    items: [
      {
        label: "Portrait",
        route: "/services/video#portrait",
        icon: "pi pi-user",
        value: "Portrait",
      },
      {
        label: "Showreel",
        route: "/services/video#showreel",
        icon: "pi pi-trophy",
        value: "Showreel",
      },
    ],
  },
  {
    label: "Services",
    icon: "pi pi-pen-to-square",
    items: [
      {
        label: "Video Editing",
        route: "/services/post-production#video-editing",
        icon: "pi pi-image",
        value: "Video Editing",
      },
      {
        label: "Colour Grading",
        route: "/services/post-production#graphic-design",
        icon: "pi pi-palette",
        value: "Colour Grading",
      },
      {
        label: "Sound Design",
        route: "/services/post-production#sound-design",
        icon: "pi pi-headphones",
        value: "Sound Design",
      },
    ],
  },
  {
    label: "Store",
    icon: "pi pi-shopping-bag",
    items: [
      {
        label: "Lightroom Presets",
        url: "https://store.slavic.media",
        icon: "pi pi-microchip",
        target: "_blank",
      },
    ],
  },
  {
    label: "About",
    icon: "pi pi-users",
    items: [
      { label: "Blog", route: "/blog", icon: "pi pi-pencil" },
      { label: "Our Team", route: "/our-team", icon: "pi pi-users" },
      {
        label: "Press Resources",
        route: "/press-resources",
        icon: "pi pi-print",
      },
      { label: "Contact", route: "/contact", icon: "pi pi-comments" },
    ],
  },
]);