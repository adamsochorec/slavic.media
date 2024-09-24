<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
  {
    label: "Photo",
    icon: "pi pi-camera",
    items: [
      {
        label: "Headshot",
        route: "/services/photo#headshots",
        icon: "pi pi-user",
      },
      {
        label: "Behind the Scenes",
        route: "/services/photo/behind-the-scenes",
        icon: "pi pi-camera",
      },
      {
        label: "Real Estate",
        route: "/services/photo#real-estate",
        icon: "pi pi-home",
      },
      {
        label: "Wedding",
        route: "/services/photo#wedding",
        icon: "pi pi-camera",
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
      },

      {
        label: "Showreel",
        route: "/services/video#showreel",
        icon: "pi pi-trophy",
      },
    ],
  },
  {
    label: "Post Production",
    icon: "pi pi-pen-to-square",
    items: [
      {
        label: "Video Editing",
        route: "/services/post-production#video-editing",
        icon: "pi pi-image",
      },
      {
        label: "Graphic Design",
        route: "/services/post-production#graphic-design",
        icon: "pi pi-palette",
      },
      {
        label: "Sound Design",
        route: "/services/post-production#sound-design",
        icon: "pi pi-headphones",
      },
    ],
  },
  {
    label: "Store",
    icon: "pi pi-shopping-bag",
    items: [
      {
        label: "Lightroom Presets",
        route: "https://store.slavic.media",
        icon: "pi pi-microchip",
      },
    ],
  },
  {
    label: "About",
    icon: "pi pi-users",
    items: [
      { label: "Blog", route: "/blog", icon: "pi pi-pencil" },
      { label: "Our Team", route: "/our-team", icon: "pi pi-users" },
      { label: "Press Materials", route: "/press", icon: "pi pi-print" },
      { label: "Contact", route: "/contact", icon: "pi pi-comments" },
    ],
  },
]);
</script>

<style scoped></style>
