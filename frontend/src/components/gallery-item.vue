<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  img: string;
  url: string;
  title: string;
  desc: string;
  icon: string;
  opacity: number;
}>();

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated = text.substring(0, maxLength);
  return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
}
</script>

<template>
  <router-link :to="url" class="gallery-item reveal">
    <img
      :style="`opacity:${opacity}`"
      :src="`https://cdn.slavic.media/images/${img}/fit=contain,width=400,sharpen=100`"
    />
    <div class="gallery-item-caption">
      <i :class="`bubble pi pi-${icon}`"></i>
      <h3 v-if="title">{{ truncateText(title, 20) }}</h3>
      <p>{{ truncateText(desc, 100) }}</p>
    </div>
  </router-link>
</template>

<style scoped>
h3 {
  text-transform: capitalize;
}
.gallery-item {
  position: relative;
  max-width: calc(100vw - var(--homepage-padding) * 2);
  height: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background: #000;
  cursor: pointer;
  overflow: hidden;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
.gallery-item:hover {
  background: var(--dark-grey-color-full);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
.gallery-item img {
  position: relative;
  display: block;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}
.gallery-item .gallery-item-caption {
  padding: var(--grid-gap-2);
}
.gallery-item .gallery-item-caption,
.gallery-item .gallery-item-caption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.gallery-item p {
  position: relative;
  margin: var(--grid-gap-1) 0;
  z-index: 1;
  pointer-events: none;
}
.gallery-item span {
  text-decoration: underline;
}
.gallery-item p {
  font-size: var(--font-size-7);
  padding: 0;
  opacity: 0;
  -webkit-transition:
    opacity 0.35s,
    -webkit-transform 0.35s;
  transition:
    opacity 0.35s,
    -webkit-transform 0.35s;
  -o-transition:
    opacity 0.35s,
    transform 0.35s;
  transition:
    opacity 0.35s,
    transform 0.35s;
  transition:
    opacity 0.35s,
    transform 0.35s,
    -webkit-transform 0.35s;
  -webkit-transform: translate3d(10%, 0, 0);
  transform: translate3d(10%, 0, 0);
}
.gallery-item:hover img {
  -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-filter: var(--blur-1);
  filter: var(--blur-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
  -webkit-transform: scale(1);
}
.gallery-item img:hover {
  -webkit-filter: var(--blur-1);
  filter: var(--blur-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
.gallery-item .gallery-item-caption {
  text-align: left;
}
.gallery-item:hover h3::after {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.gallery-item:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.gallery-item #videoplay {
  fill: #ffffff;
  vertical-align: baseline;
  height: var(--grid-gap-2);
}

@media only screen and (max-width: 375px) {
  .gallery-item .gallery-item-caption {
    padding: var(--grid-gap-2);
  }
  .gallery-item p {
    display: none;
  }
}
@media only screen and (max-width: 415px) {
  .gallery .grid-item {
    height: 80px;
  }
}
@media only screen and (max-width: 500px) {
  .gallery-item .gallery-item-caption {
    padding: var(--grid-gap-2);
  }
}
@media only screen and (max-width: 667px) {
  .gallery-item span {
    font-size: var(--font-size-8);
  }
}
</style>
