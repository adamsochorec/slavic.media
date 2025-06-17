<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

interface SubMenuItem {
  title: string;
  path: string;
  icon?: string;
}
interface MenuItem {
  title: string;
  icon: string;
  path: string;
  external?: boolean;
  dropdownId?: string;
  subMenu?: SubMenuItem[];
}
const props = ref<MenuItem[]>([]);

const router = useRouter();
const dropdowns = reactive<{ [key: string]: boolean }>({});
const isMobile = ref(false);
const menuItems = ref([
  {
    title: "Video",
    icon: "pi pi-video",
    path: "/video",
  },
  {
    title: "Photo",
    icon: "pi pi-camera",
    path: "/photo",
  },
  {
    title: "Store",
    icon: "pi pi-shopping-bag",
    path: "https://store.slavic.media",
  },
  {
    title: "For clients",
    icon: "pi pi-download",
    path: "https://clients.slavic.media",
    external: true,
  },
  {
    title: "Blog",
    icon: "pi pi-align-left",
    path: "/blog",
  },
  {
    title: "About",
    icon: "pi pi-users",
    path: "/about",
  },
]);

const toggleDropdown = (event: Event, dropdownId: string) => {
  event.stopPropagation();
  dropdowns[dropdownId] = !dropdowns[dropdownId];
  // Close other dropdowns
  Object.keys(dropdowns).forEach((key) => {
    if (key !== dropdownId) {
      dropdowns[key] = false;
    }
  });
};

const collapseMenu = () => {
  const hamburger = document.querySelector(".hamburger") as HTMLElement;
  const menuLeft = document.querySelector(".menu-left") as HTMLElement;
  hamburger.classList.remove("open");
  menuLeft.classList.remove("collapse");
  Object.keys(dropdowns).forEach((key) => {
    dropdowns[key] = false;
  });
};

onMounted(() => {
  header();
  isMobile.value = window.innerWidth < 850;
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth < 850;
  });

  window.addEventListener("beforeunload", collapseMenu);

  // Remove this block or ensure `titlePath` is properly defined
  router.beforeEach((to, from, next) => {
    collapseMenu();
    next(); // Ensure navigation proceeds
  });
});

function header() {
  let lastScrollTop = 0;

  const hamburger = document.querySelector(".hamburger") as HTMLElement;
  const menuLeft = document.querySelector(".menu-left") as HTMLElement;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    menuLeft.classList.toggle("collapse");
  });

  const menuLeftLinks = document.querySelectorAll(".menu-left a");
  menuLeftLinks.forEach((path) => {
    path.addEventListener("click", collapseMenu);
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
      collapseMenu();
    } else if (st + windowHeight < document.documentElement.scrollHeight) {
      header.classList.remove("hide-nav");
      header.classList.add("show-nav");
    }
    lastScrollTop = st;
  }
}
</script>

<template>
  <header class="logo-font">
    <div class="container">
      <nav id="navigation" role="navigation" aria-label="Main Navigation">
        <NuxtLink to="/" aria-label="Home">
          <img
            class="logo"
            alt="Logo Slavic Media"
            src="https://cdn.slavic.media/img/Primary-1/HD"
          />
        </NuxtLink>
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
          <li v-for="item in menuItems" :key="item.title" role="none">
            <NuxtLink
              v-if="!item.external"
              :to="item.path"
              class="menuitem"
              @mouseenter="(event) => toggleDropdown(event, item.dropdownId)"
              role="menuitem"
              aria-haspopup="true"
              :aria-expanded="dropdowns[item.dropdownId]"
              :aria-controls="`${item.dropdownId}-dropdown`"
            >
              <span :class="item.icon"></span>{{ item.title }}&nbsp;&nbsp;
              <span
                v-if="item.subMenu"
                :class="{
                  'pi pi-angle-down': true,
                  rotated: dropdowns[item.dropdownId],
                }"
                style="font-size: 10px"
              ></span>
            </NuxtLink>
            <a v-else :href="item.path" target="_blank" role="menuitem">
              <span :class="item.icon"></span>{{ item.title }}
            </a>
            <ul
              v-if="item.subMenu"
              :id="`${item.dropdownId}-dropdown`"
              class="dropdown"
              :class="{ show: dropdowns[item.dropdownId] }"
              role="menu"
            >
              <li
                v-for="subItem in item.subMenu"
                :key="subItem.title"
                role="none"
              >
                <NuxtLink :to="subItem.path" role="menuitem">
                  <span :class="subItem.icon"></span>{{ subItem.title }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.menuitem {
  width: 100%;
}
.dropdown {
  display: grid;
  position: relative;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
  -webkit-transition: max-height var(--transition-2);
  -o-transition: max-height var(--transition-2);
  transition: max-height var(--transition-2);
  max-height: 0;
  overflow: hidden;
}
.dropdown.show {
  max-height: 1000px;
  -webkit-transition: max-height var(--transition-2);
  -o-transition: max-height var(--transition-2);
  transition: max-height var(--transition-2);
}
.rotated {
  transform: rotate(180deg);
}
.pi-angle-down,
.rotated {
  transition: transform var(--transition-2);
}
.menu-left ul a {
  padding: 10px;
  font-size: var(--font-size-7);
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
header a,
span.menuitem {
  text-decoration: none;
  color: white;
}

header a :focus,
header a:hover,
span.menuitem:focus,
span.menuitem:hover {
  color: white;
}
.menu-left a:not(.menu-left ul a),
span.menuitem {
  display: inline-block;
  position: relative;
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: var(--font-size-6);
  padding: 17px var(--grid-gap-1);
}
.menu-left a:hover,
.menuitem:hover {
  background-color: rgba(var(--primary-color), 0.4);
}
.menu-left a,
.menu-left a:hover,
.menuitem,
.menuitem:hover {
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
  cursor: pointer;
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
    background var(--transition-2);
  -o-transition:
    width 0s ease,
    background var(--transition-2);
  transition:
    width 0s ease,
    background var(--transition-2);
}
.menu-left a:after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  -webkit-transition: width var(--transition-2);
  -o-transition: width var(--transition-2);
  transition: width var(--transition-2);
}
.menu-left a:hover:before {
  width: 100%;
  -webkit-transition: width var(--transition-2);
  -o-transition: width var(--transition-2);
  transition: width var(--transition-2);
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
  position: fixed;
  top: 0;
  left: 0;
  text-transform: capitalize;
  width: 100%;
  background-color: var(--dark-grey-color-full);
  will-change: transform;
  -webkit-transition: background var(--transition-2);
  -o-transition: background var(--transition-2);
  transition: background var(--transition-2);
  -ms-transform: translateY(0);
  transform: translateY(0);
  -webkit-transform: translateY(0);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  z-index: 9;
  backdrop-filter: var(--blur-1); /* Standard syntax */
  -webkit-backdrop-filter: var(--blur-1); /* Chrome, Safari, Opera */
  -moz-backdrop-filter: var(--blur-1); /* Firefox */
  -ms-backdrop-filter: var(--blur-1); /* Edge */
  -o-backdrop-filter: var(--blur-1); /* Older versions of Opera */
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
  -webkit-transition: all var(--transition-2);
  -o-transition: all var(--transition-2);
  transition: all var(--transition-2);
  z-index: 9;
  font-weight: var(--paragraph-weight);
}
.collapse {
  visibility: unset !important;
}
ul.menu-left:before {
  content: "";
  display: table;
  clear: both;
}
ul.menu-left.collapse {
  max-height: 30em !important;
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
  background-color: rgba(255, 255, 255, 1);
  -webkit-transition: all 0.25s;
  -o-transition: all 0.25s;
  transition: all 0.25s;
  margin-top: 4px;
}

header.transparent {
  backdrop-filter: none; /* Standard syntax */
  -webkit-backdrop-filter: none; /* Chrome, Safari, Opera */
  -moz-backdrop-filter: none; /* Firefox */
  -ms-backdrop-filter: none; /* Edge */
  -o-backdrop-filter: none; /* Older versions of Opera */
  box-shadow: none;
  background-color: transparent;
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
  .dropdown {
    position: absolute;
    -webkit-box-shadow: var(--box-shadow-1);
    box-shadow: var(--box-shadow-1);
    background-color: rgba(var(--dark-grey-color));
    border-radius: 0 0 var(--border-radius-1) var(--border-radius-1);
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
  .menu-left a {
    width: 100%;
  }
  .dropdown a {
    margin-left: 20px;
  }
  .dropdown {
    border-left: 2px solid rgba(255, 255, 255, 0.3);
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
