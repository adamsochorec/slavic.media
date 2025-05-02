<script setup lang="ts">
import { truncateText } from "@/composables/useTruncateText.ts";

interface GalleryItemProps {
  img: string;
  url: string;
  title?: string;
  flag?: string;
  alt: string;
  description?: string;
  icon: string;
  opacity?: number;
}
const props = defineProps<GalleryItemProps>();
</script>

<template>
  <article class="gallery-item reveal">
    <a :href="url" :data-src="`//${url}`">
      <Icon :name="`cif:${flag}`" class="note flag" />
      <img
        :style="`opacity:${opacity}`"
        :src="`https://cdn.slavic.media/img/${props.img}/sd`"
        :alt="alt"
        :title="title"
      />
      <div class="gallery-item-caption">
        <i aria-hidden="true" :class="`bubble pi pi-${icon}`"></i>
        <header>
          <span class="title" v-if="title">{{ truncateText(title, 22) }}</span>
        </header>
        <section>
          <p class="description" v-if="description">
            {{ truncateText(description, 170) }}
          </p>
        </section>
      </div>
    </a>
  </article>
</template>

<style scoped>
.title {
  font-size: var(--font-size-4);
  text-transform: capitalize;
  text-decoration: none !important;
  font-family: var(--logo-font);
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  color: white;
}
.gallery-item {
  position: relative;
  max-width: calc(100vw - var(--homepage-padding) * 2);
  border-radius: var(--border-radius-1);
  background: #000;
  cursor: pointer;
  aspect-ratio: 2/1;
  width: 100%;
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
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
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
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}
.gallery-item p {
  font-size: var(--font-size-7);
  padding: 0;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, -webkit-transform 0.35s;
  -o-transition: opacity 0.35s, transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  transition: opacity 0.35s, transform 0.35s, -webkit-transform 0.35s;
  -webkit-transform: translate3d(10%, 0, 0);
  transform: translate3d(10%, 0, 0);
}
.gallery-item:hover img {
  -webkit-filter: var(--blur-1);
  filter: var(--blur-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}

.gallery-item .gallery-item-caption {
  text-align: left;
}
.gallery-item:hover .title::after {
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
  .gallery .grid-item {
    height: 80px;
  }
  .gallery .gallery-item:hover p {
    display: none;
  }
}
@media only screen and (max-width: 500px) {
  .gallery-item .gallery-item-caption {
    padding: var(--grid-gap-1);
  }
}
@media only screen and (max-width: 550px) {
  .swiper-services .gallery-item .gallery-item-caption .description {
    display: none;
  }
}
</style>
