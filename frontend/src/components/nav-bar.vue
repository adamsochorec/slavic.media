<script setup>
import { ref } from "vue";

const nav = ref([
  {
    label: "Photo",
    icon: "pi pi-camera",
    items: [
      {
        label: "Portrait",
        route: "/services/photo#portrait",
        icon: "pi pi-user",
        value: "Outdoor",
      },
      {
        label: "Outdoor",
        route: "/services/photo#outdoor",
        icon: "pi pi-map",
        value: "Outdoor",
      },
      {
        label: "Still",
        route: "/services/photo#still",
        icon: "pi pi-camera",
        value: "Still",
      },
    ],
  },
  {
    label: "Video",
    icon: "pi pi-video",
    items: [
      {
        label: "Showreel",
        route: "/services/video#showreel",
        icon: "pi pi-trophy",
        value: "Showreel",
      },
      {
        label: "Content",
        route: "/services/video#content",
        icon: "pi pi-user",
        value: "Portrait",
      },
      {
        label: "Narrative",
        route: "/services/video#narrative",
        icon: "pi pi-microphone",
        value: "Narrative",
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
    url: "https://store.slavic.media",
    icon: "pi pi-shopping-bag",
    target: "_blank",
  },
  {
    label: "About",
    icon: "pi pi-users",
    items: [
      { label: "Blog", route: "/blog", icon: "pi pi-pencil" },
      { label: "About", route: "/about", icon: "pi pi-users" },
    ],
  },
]);
</script>
<template>
  <Menubar style="background-color: transparent" :model="nav">
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
</template>

<style scoped>
.p-menubar {
  border: none;
}
</style>
