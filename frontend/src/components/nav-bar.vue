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
    label: "Drone",
    icon: "pi pi-drone",
    items: [
      {
        label: "Still",
        command: () => router.push("/services/drone#still"),
        icon: "pi pi-camera",
        value: "Still",
      },
      {
        label: "Video",
        command: () => router.push("/services/drone#video"),
        icon: "pi pi-video",
        value: "Video",
      },
      {
        label: "Terrain Maping",
        command: () => router.push("/services/drone#terrain-maping"),
        icon: "pi pi-map",
        value: "Terrain Mapping",
      },
    ],
  },
  {
    label: "Post Production",
    icon: "pi pi-image",
    items: [
      {
        label: "Colour Grading",
        command: () => router.push("/services/post-production#colour-grade"),
        icon: "pi pi-palette",
        value: "Colour Grade",
      },
      {
        label: "Video Editing",
        command: () => router.push("/services/post-production#video-edit"),
        icon: "pi pi-image",
        value: "Video Edit",
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
  <header>
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
        <ul class="menu-left" role="menubar">
          <li role="none">
            <a
              @click="toggle"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="pi pi-sitemap"></span>Services
              <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
            </a>
          </li>
          <li role="none">
            <a
              target="_blank"
              href="https://store.slavic.media"
              role="menuitem"
            >
              <span class="pi pi-shopping-bag"></span>Store
            </a>
          </li>
          <li role="none">
            <a
              target="_blank"
              href="https://clients.slavic.media"
              role="menuitem"
            >
              <span class="pi pi-cloud-download"></span>For clients
            </a>
          </li>
          <li role="none">
            <router-link to="/blog" role="menuitem">
              <span class="pi pi-file-edit"></span>Blog
            </router-link>
          </li>
          <li role="none">
            <router-link to="/about" role="menuitem">
              <span class="pi pi-users"></span>About
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.loader-container,
header:not(#homepage header) {
  backdrop-filter: var(--blur-1) !important; /* Standard syntax */
  -webkit-backdrop-filter: var(--blur-1) !important; /* Chrome, Safari, Opera */
  -moz-backdrop-filter: var(--blur-1) !important; /* Firefox */
  -ms-backdrop-filter: var(--blur-1) !important; /* Edge */
  -o-backdrop-filter: var(--blur-1) !important; /* Older versions of Opera */
}
header img.logo {
  float: left;
  padding: 8px 0;
  width: 91px;
  height: 100%;
  border-radius: none;
  -webkit-animation: none;
  animation: none;
}

header .container {
  padding: 0 var(--homepage-padding);
  max-width: 100%;
}
header a {
  text-decoration: none;
  color: rgba(var(--white-color), 1);
}
header a :focus,
header a:hover {
  color: rgba(var(--white-color), 1);
}
.menu-left a {
  display: inline-block;
  position: relative;
  padding: 8px;
  display: inline-block;
  position: relative;
  padding: 17px var(--grid-gap-1);
}
.menu-left a:hover {
  background-color: rgba(var(--primary-color), 0.4);
}
.menu-left a,
.menu-left a:hover {
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
.menu-left a:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  -webkit-transition:
    width 0s ease,
    background 0.35s ease;
  -o-transition:
    width 0s ease,
    background 0.35s ease;
  transition:
    width 0s ease,
    background 0.35s ease;
}
.menu-left a:after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  -webkit-transition: width 0.35s ease;
  -o-transition: width 0.35s ease;
  transition: width 0.35s ease;
}
.menu-left a:hover:before {
  width: 100%;
  -webkit-transition: width 0.35s ease;
  -o-transition: width 0.35s ease;
  transition: width 0.35s ease;
}
.menu-left a:hover:after {
  width: 100%;
  background: 0 0;
  -webkit-transition: all 0s ease;
  -o-transition: all 0s ease;
  transition: all 0s ease;
}
.menu-left span.pi {
  margin-right: var(--grid-gap-1);
}
header nav ul li a {
  display: block;
}
header {
  font-family: var(--logo-font);
  position: fixed;
  top: 0;
  left: 0;
  text-transform: capitalize;
  width: 100%;
  background-color: var(--dark-grey-color-full);
  will-change: transform;
  -webkit-transition: var(--transition-2);
  -o-transition: var(--transition-2);
  transition: var(--transition-2);
  -ms-transform: translateY(0);
  transform: translateY(0);
  -webkit-transform: translateY(0);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);

  z-index: 9;
}
header nav ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
header nav ul li {
  float: none;
  margin-left: 0;
}
.hide-nav {
  -ms-transform: translateY(-120%);
  transform: translateY(-120%);
  -webkit-transform: translateY(-120%);
}
ul.menu-left {
  display: block;
  max-height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  z-index: 9;
  font-weight: var(--paragraph-weight);
}
ul.menu-left:before {
  content: "";
  display: table;
  clear: both;
}
ul.menu-left.collapse {
  max-height: 25em !important;
}
/* HAMBURGER MENU START */
.hamburger {
  display: block;
  background-color: transparent;
  float: right;
  height: 38px;
  border: none;
  outline: none;
  width: 38px;
  cursor: pointer;
}
.hamburger.open span:first-child {
  -webkit-transform: rotate(45deg) translate(4.4px, 4.4px);
  -ms-transform: rotate(45deg) translate(4.4px, 4.4px);
  transform: rotate(45deg) translate(4.4px, 4.4px);
}
.hamburger span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:last-child {
  -webkit-transform: rotate(-45deg) translate(4.4px, -4.4px);
  -ms-transform: rotate(-45deg) translate(4.4px, -4.4px);
  transform: rotate(-45deg) translate(4.4px, -4.4px);
}
.hamburger span {
  position: relative;
  display: block;
  height: 2px;
  border-radius: var(--border-radius-2);
  width: 100%;
  background-color: rgba(var(--white-color), 1);
  -webkit-transition: all 0.25s;
  -o-transition: all 0.25s;
  transition: all 0.25s;
  margin-top: 4px;
}
/* HAMBURGER MENU END */
@media only screen and (min-width: 538px) {
  header nav ul li a {
    display: block;
    padding: 6.8px 0;
  }
}
@media only screen and (max-width: 667px) {
  header .container {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  header .container:after {
    content: " ";
    display: block;
    clear: both;
  }
}
@media only screen and (min-width: 850px) {
  header ul.menu-left {
    display: block !important;
    float: right;
    max-height: none;
  }
  header nav ul li {
    float: left;
  }
  header .hamburger {
    display: none !important;
  }
}
@media only screen and (max-width: 850px) {
  header ul {
    clear: both;
  }
  header a {
    padding: 0;
  }
  .hamburger {
    padding: 11px 0px 0px 16px;
  }
  .menu-left a {
    padding: var(--grid-gap-2) var(--grid-gap-2) var(--grid-gap-2) 0;
  }
  .menu-left a:hover {
    background-color: transparent;
  }
}
@media only screen and (min-width: 1020px) {
  header .container {
    max-width: 100%;
  }
  header .container:after {
    content: " ";
    display: block;
    clear: both;
  }
}
</style>
