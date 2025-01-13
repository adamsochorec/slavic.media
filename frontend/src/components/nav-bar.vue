<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showDropdown = ref(false);
const isMobile = ref(window.innerWidth < 850);

const toggleDropdown = (event: Event) => {
  event.stopPropagation();
  showDropdown.value = !showDropdown.value;
};

const collapseMenu = () => {
  const hamburger = document.querySelector(".hamburger") as HTMLElement;
  const menuLeft = document.querySelector(".menu-left") as HTMLElement;
  hamburger.classList.remove("open");
  menuLeft.classList.remove("collapse");
  showDropdown.value = false;
};

const props = defineProps<{ pageTitle: string }>();

onMounted(() => {
  header();
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth < 850;
  });

  window.addEventListener("beforeunload", collapseMenu);

  router.beforeEach((to, from, next) => {
    collapseMenu();
    next();
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
  menuLeftLinks.forEach((link) => {
    link.addEventListener("click", collapseMenu);
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
  <header>
    <div class="container">
      <nav id="navigation" role="navigation" aria-label="Main Navigation">
        <router-link to="/" aria-label="Home">
          <img
            class="logo"
            alt="Logo Slavic Media"
            src="https://cdn.slavic.media/images/Primary-1/height=80"
          />
        </router-link>
        <span class="page" v-if="pageTitle">
          <span class="gradient">{{ pageTitle }}</span>
        </span>

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
            <span class="menuitem"
              @click="toggleDropdown"
              role="menuitem"
              aria-haspopup="true"
              :aria-expanded="showDropdown"
              aria-controls="services-dropdown"
            >
              <span class="pi pi-sitemap"></span>Services&nbsp;&nbsp;
              <span :class="{'pi pi-angle-down': true, rotated: showDropdown}" style="font-size: 10px"></span>
            </span>
            <ul id="services-dropdown" class="dropdown" :class="{ show: showDropdown }" role="menu">
              <li role="none">
                <router-link to="/services/photo" role="menuitem">
                  <span class="pi pi-camera"></span>Photo
                </router-link>
              </li>
              <li role="none">
                <router-link to="/services/video" role="menuitem">
                  <span class="pi pi-video"></span>Video
                </router-link>
              </li>
              <li role="none">
                <router-link to="/services/drone" role="menuitem">
                  <span class="pi pi-bolt"></span>Drone
                </router-link>
              </li>
              <li role="none">
                <router-link to="/services/post-production" role="menuitem">
                  <span class="pi pi-image"></span>Post Production
                </router-link>
              </li>
            </ul>          
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
.page {
  position: absolute;
  padding: 12px 0;
  font-size: var(--font-size-5) !important;
  text-transform: capitalize;
}
.page .gradient {
  border-left: 2px solid rgba(var(--white-color), 0.3);
  padding: 5px var(--grid-gap-1);
  margin-left: var(--grid-gap-1);
}
.menuitem{
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
.pi-angle-down, .rotated {
  transition: transform var(--transition-2);
}
.menu-left ul a{
  padding: 10px;
  font-size: var(--font-size-7);
}
header {
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
header a,  
span.menuitem {
  text-decoration: none;
  color: rgba(var(--white-color), 1);
}
header a :focus,
header a:hover,  
span.menuitem:focus,  
span.menuitem:hover {
  color: rgba(var(--white-color), 1);
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
.menuitem:hover{
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
  font-family: var(--logo-font);
  position: fixed;
  top: 0;
  left: 0;
  text-transform: capitalize;
  width: 100%;
  background-color: var(--dark-grey-color-full);
  will-change: transform;
  -webkit-transition: background var(--transition-2);
  -o-transition:background var(--transition-2);
  transition: background var(--transition-2);
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
.dropdown{
  border-left: 2px solid rgba(var(--white-color), 0.3)
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