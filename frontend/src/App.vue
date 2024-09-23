<script setup>
import { RouterView } from "vue-router";
import { provideAuth } from "./modules/users";
provideAuth();

// COMPONENTS
import FooterView from "./components/FooterView.vue";
import NavigationView from "./components/NavigationView.vue";
</script>

<template>
  <div>
    <header>
      <RouterLink to="/">
        <div class="logo-container">
          <img
            class="logo"
            src="https://slavic.media/img/Primary-1.png"
            alt="Logo Slavic Media"
            title="Logo Slavic Media"
          /></div
      ></RouterLink>
      <NavigationView />
    </header>
    <div class="main">
      <RouterView />
    </div>
    <hr class="semi bodyxfooter" role="separator" />

    <FooterView />
  </div>
</template>

<style scoped>
.main {
  font-family: var(--content-font);
  color: #1a1a1a;
  margin-top: 118.4px;
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
}
header {
  display: flex;
  justify-content: space-between;
  padding: 0 var(--homepage-padding) 0 var(--homepage-padding);
}

/* HEADER START */
#homepage header {
  background-color: rgba(var(--black-color), 0);
}
header .container {
  padding: 0 var(--homepage-padding);
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
  -webkit-transition: color 0.35s ease;
  -o-transition: color 0.35s ease;
  transition: color 0.35s ease;
}
.menu-left a {
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
  -webkit-transition: width 0s ease, background 0.35s ease;
  -o-transition: width 0s ease, background 0.35s ease;
  transition: width 0s ease, background 0.35s ease;
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
  z-index: 9999;
  will-change: transform;
  -webkit-transition: var(--transition-2);
  -o-transition: var(--transition-2);
  transition: var(--transition-2);
  -ms-transform: translateY(0);
  transform: translateY(0);
  -webkit-transform: translateY(0);
  z-index: 8;
}
header img.logo {
  float: left;
  padding: 8px 0;
  width: 91px;
  height: 100%;
  height: 100%;
  border-radius: none;
  -webkit-animation: none;
  animation: none;
}
header nav .logo:after {
  content: "";
  display: table;
  clear: both;
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
  z-index: 10;
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
/* HEADER END */
</style>
