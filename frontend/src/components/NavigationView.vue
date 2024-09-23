<script setup>
import { RouterLink } from "vue-router";
//import { useAuth } from "../modules/users";
//const auth = useAuth();

// import useUsers from '../modules/users'

// const { isAuthenticated, logIn, logOut } = useUsers()
import { ref } from "vue";

const items = ref([
  {
    label: "Services",
    icon: "pi pi-box",
    items: [
      [
        {
          label: "Photography",
          items: [
            { label: "BLOG", route: "/blog" },

            { label: "Headshot", route: "/services/photography/headshots" },
            {
              label: "Behind the Scenes",
              route: "/services/photography/behind-the-scenes",
            },
            {
              label: "Real Estate",
              route: "/services/photography/real-estate",
            },
            { label: "Wedding", route: "/services/photography/wedding" },
          ],
        },
      ],
      [
        {
          label: "Videography",
          items: [
            { label: "Portrait", route: "/services/videography/portrait" },
            { label: "Showreel", route: "/services/videography/showreel" },
          ],
        },
      ],
      [
        {
          label: "Post Production",
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
      ],
    ],
  },
  {
    label: "Store",
    icon: "pi pi-mobile",
    items: [
      [
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
    ],
  },
  {
    label: "About",
    icon: "pi pi-clock",
    items: [
      [
        {
          items: [
            { label: "Our Team", route: "/about/our-team" },
            { label: "Press Materials", route: "/about/press-materials" },
            { label: "Contact", route: "/about/contact" },
          ],
        },
      ],
    ],
  },
]);
</script>
<template>
  <div class="card">
    <MegaMenu :model="items">
      <template #item="{ item }">
        <router-link v-if="item.route" :to="item.route" class="menu-item-link">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
        <a v-else :href="item.url" :target="item.target" class="menu-item-link">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </MegaMenu>
  </div>
  <!--<p>{{ auth.isAuthenticated }}</p>  <div v-if="!auth.isAuthenticated.value">
    <button class="cta login" @click="auth.logIn()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="user">
        <path
          d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
        />
      </svg>
      &nbsp; Log in
    </button>
  </div>
  <div v-else>
    <button class="cta login" @click="auth.logOut()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="user">
        <path
          d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
        />
      </svg>
      &nbsp; Log out
    </button>
  </div>-->
</template>

<style scoped></style>
