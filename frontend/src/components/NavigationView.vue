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
      { label: "BLOG", route: "/blog" },
      { label: "Headshot", route: "/services/photo/headshots" },
      {
        label: "Behind the Scenes",
        route: "/services/photo/behind-the-scenes",
      },
      { label: "Real Estate", route: "/services/photo/real-estate" },
      { label: "Wedding", route: "/services/photo/wedding" },
    ],
  },
  {
    label: "video",
    icon: "pi pi-video",
    items: [
      { label: "Portrait", route: "/services/video/portrait" },
      { label: "Showreel", route: "/services/video/showreel" },
    ],
  },
  {
    label: "Post Production",
    icon: "pi pi-pen-to-square",
    items: [
      {
        label: "Video Editing",
        route: "/services/post-production/video-editing",
      },
      {
        label: "Graphic Design",
        route: "/services/post-production/graphic-design",
      },
      {
        label: "Sound Design",
        route: "/services/post-production/sound-design",
      },
    ],
  },
  {
    label: "Store",
    icon: "pi pi-shopping-bag",
    items: [
      {
        label: "Lightroom Presets",
        items: [
          { label: "Cinestill", route: "/store/lightroom-presets/cinestill" },
          {
            label: "Film Emulation",
            route: "/store/lightroom-presets/film-emulation",
          },
        ],
      },
    ],
  },
  {
    label: "About",
    icon: "pi pi-users",
    items: [
      { label: "Our Team", route: "/about/our-team" },
      { label: "Press Materials", route: "/about/press-materials" },
      { label: "Contact", route: "/about/contact" },
    ],
  },
]);
</script>

<style scoped>
/* Add your styles here */
</style>
