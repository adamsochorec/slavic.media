<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TieredMenu from "primevue/tieredmenu";

interface MenuItem {
  label: string;
  icon: string;
  command?: () => void;
  value?: string;
  items?: MenuItem[];
}

const menu = ref<InstanceType<typeof TieredMenu>>();
const router = useRouter();

const items = ref<MenuItem[]>([
  {
    label: "Photo",
    icon: "pi pi-camera",
    items: [
      {
        label: "Portrait",
        command: () => router.push("/services/photo#portrait"),
        icon: "pi pi-user",
        value: "Portrait",
      },
      {
        label: "Outdoor",
        command: () => router.push("/services/photo#outdoor"),
        icon: "pi pi-map",
        value: "Outdoor",
      },
      {
        label: "Still",
        command: () => router.push("/services/photo#still"),
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
        command: () => router.push("/services/video#showreel"),
        icon: "pi pi-trophy",
        value: "Showreel",
      },
      {
        label: "Narrative",
        command: () => router.push("/services/video#narrative"),
        icon: "pi pi-microphone",
        value: "Narrative",
      },
      {
        label: "Content",
        command: () => router.push("/services/video#content"),
        icon: "pi pi-user",
        value: "Content",
      },
    ],
  },
  {
    label: "Post Production",
    icon: "pi pi-image",
    items: [
      {
        label: "Video Editing",
        command: () => router.push("/services/post-production#video-editing"),
        icon: "pi pi-image",
        value: "Video Editing",
      },
      {
        label: "Colour Grading",
        command: () => router.push("/services/post-production#graphic-design"),
        icon: "pi pi-palette",
        value: "Colour Grading",
      },
      {
        label: "Sound Design",
        command: () => router.push("/services/post-production#sound-design"),
        icon: "pi pi-headphones",
        value: "Sound Design",
      },
    ],
  },
]);

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};

// HEADER START
// HEADER TOGGLE AND COLLAPSE NAV START
function header() {
  let lastScrollTop = 0;

  const hamburger = document.querySelector(".hamburger") as HTMLElement;
  const menuLeft = document.querySelector(".menu-left") as HTMLElement;

  // Toggles hamburger icon and collapses navigation on click
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    menuLeft.classList.toggle("collapse");
  });

  // Removes "open" class from hamburger and collapses navigation on link click
  const menuLeftLinks = document.querySelectorAll(".menu-left a");
  menuLeftLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      menuLeft.classList.remove("collapse");
    });
  });

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        hasScrolled();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Handles header visibility on scroll
  function hasScrolled() {
    const st = window.pageYOffset || document.documentElement.scrollTop,
      header = document.querySelector("header") as HTMLElement,
      navbarHeight = header.offsetHeight,
      windowHeight = window.innerHeight,
      delta = 5;

    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > navbarHeight) {
      header.classList.remove("show-nav");
      header.classList.add("hide-nav");
      hamburger.classList.remove("open");
      menuLeft.classList.remove("collapse");
    } else if (st + windowHeight < document.documentElement.scrollHeight) {
      header.classList.remove("hide-nav");
      header.classList.add("show-nav");
    }
    lastScrollTop = st;
  }
}

onMounted(() => {
  header();
});
</script>

<template>
  <div class="container">
    <nav id="navigation" role="navigation" aria-label="Main Navigation">
      <router-link to="/" aria-label="Home">
        <img
          class="logo"
          alt="Logo Slavic Media"
          title="Logo Slavic Media"
          src="https://cdn.slavic.media/images/Primary-1/thumbnail"
        />
      </router-link>
      <button
        aria-label="Open mobile menu"
        class="hamburger"
        role="button"
        aria-expanded="false"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="menu-left" role="menu">
        <li role="none">
          <a @click="toggle"
            ><span class="pi pi-sitemap"></span>Services

            <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup
          /></a>
        </li>
        <li role="none">
          <a target="_blank" href="https://store.slavic.media" role="menuitem"
            ><span class="pi pi-shopping-bag"></span>Store</a
          >
        </li>
        <li role="none">
          <a target="_blank" href="https://clients.slavic.media" role="menuitem"
            ><span class="pi pi-cloud-download"></span>For clients</a
          >
        </li>
        <li role="none">
          <router-link to="/blog" role="menuitem"
            ><span class="pi pi-file-edit"></span>Blog</router-link
          >
        </li>
        <li role="none">
          <router-link to="/about" role="menuitem"
            ><span class="pi pi-users"></span>About</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
