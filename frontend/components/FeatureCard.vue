<script setup lang="ts">
import { truncateText } from "@/composables/useTruncateText.ts";

interface LinkCard {
  url: string;
  img: string;
  title: string;
  description?: string;
}
const props = defineProps<LinkCard>();
</script>
<template>
  <NuxtLink class="reveal" :to="url">
    <figure class="card">
      <img :src="`https://cdn.slavic.media/img/${img}/hd`" />
      <div class="content flex-center">
        <div class="caption reveal">
          <h3>{{ title }} <span class="gradient">Services</span></h3>
          <p>{{ description }}</p>
        </div>
        <NuxtLink class="reveal" :to="url">
          <Label icon="arrow-right" label="Learn more"></Label
        ></NuxtLink>
      </div>
    </figure>
  </NuxtLink>
</template>
<style lang="postcss" scoped>
.card {
  position: relative;
  border-radius: var(--border-radius-1);
  background: #000;
  cursor: pointer;
  aspect-ratio: 1/1;
  height: 100%;
  overflow: hidden;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);

  img {
    -webkit-transition: var(--transition-1);
    -o-transition: var(--transition-1);
    transition: var(--transition-1);
  }
  &:hover {
    img {
      -webkit-filter: saturate(0);
      filter: saturate(0);
      -webkit-transition: var(--transition-1);
      -o-transition: var(--transition-1);
      transition: var(--transition-1);
    }
  }
  @media only screen and (max-width: 700px) {
    height: var(--dimension-1);
    width: 100%;
    aspect-ratio: unset;
    border-radius: 0;

    h3 {
      font-size: var(--font-size-2);
    }
  }
}
img {
  position: relative;
  display: block;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: var(--grid-gap-3);
}
p {
  font-size: var(--font-size-7);
  margin: var(--grid-gap-1) 0;
}
.black .caption * {
  color: rgb(var(--dark-grey-color));
}
</style>
