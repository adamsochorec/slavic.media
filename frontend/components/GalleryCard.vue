<script setup lang="ts">
import { truncateText } from "@/composables/useTruncateText.ts";

interface GalleryCard {
  img: string;
  url: string;
  title?: string;
  flag?: string;
  alt: string;
  description?: string;
  icon: string;
  opacity?: number;
}
const props = defineProps<GalleryCard>();
</script>

<template>
  <figure class="gallery-item reveal">
    <NuxtLink :to="url" :data-src="`//${url}`">
      <Icon v-if="flag" :name="`flag:${flag}-4x3`" class="note flag" />
      <img
        :style="`opacity:${opacity}`"
        :src="`https://cdn.slavic.media/img/${img}/sd`"
        :alt="alt"
        :title="title"
      />
      <figcaption class="gallery-item-caption">
        <i aria-hidden="true" :class="`bubble pi pi-${icon}`"></i>
        <header>
          <span class="title" v-if="title">{{ truncateText(title, 22) }}</span>
        </header>
        <div>
          <p class="description" v-if="description">
            {{ truncateText(description, 150) }}
          </p>
        </div>
      </figcaption>
    </NuxtLink>
  </figure>
</template>

<style lang="postcss" scoped>
.gallery-item {
  position: relative;
  max-width: calc(100vw - var(--homepage-padding) * 2);
  border-radius: var(--border-radius-1);
  background: #000;
  cursor: pointer;
  aspect-ratio: 2/1;
  width: 100%;
  overflow: hidden;
  box-shadow: var(--box-shadow-1);
  transition: var(--transition-1);

  &:hover {
    background: var(--dark-grey-color-full);
    transition: var(--transition-1);
  }

  img {
    position: relative;
    display: block;
    width: 100%;
    animation: skeleton-loading 1s linear infinite alternate;
    object-fit: cover;
    transition: var(--transition-1);
  }

  &:hover img {
    filter: var(--blur-1);
    transition: var(--transition-1);
  }

  .gallery-item-caption {
    padding: var(--grid-gap-2);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;

    > a {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  p {
    position: relative;
    margin: var(--grid-gap-1) 0;
    z-index: 1;
    pointer-events: none;
    font-size: var(--font-size-7);
    padding: 0;
    opacity: 0;
    transition: opacity 0.35s, transform 0.35s;
    transform: translate3d(10%, 0, 0);

    &:hover {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .title {
    font-size: var(--font-size-4);
    text-transform: capitalize;
    text-decoration: none !important;
    font-family: var(--logo-font);
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    color: white;

    &::after {
      transform: translate3d(0, 0, 0);
    }
  }

  span {
    text-decoration: underline;
    text-decoration-skip-ink: auto;
  }

  #videoplay {
    fill: #ffffff;
    vertical-align: baseline;
    height: var(--grid-gap-2);
  }
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
