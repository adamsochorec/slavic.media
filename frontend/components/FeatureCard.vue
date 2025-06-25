<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProgressiveImg } from "@/composables/useProgressiveImg";

interface LinkCard {
  url: string;
  img: string;
  title: string;
  gradient: string;
  description?: string;
}
const props = defineProps<LinkCard>();

const imgRef = ref<HTMLImageElement | null>(null);
const {
  thumbnailUrl,
  fullImageUrl,
  imgLoaded,
  updateImgSrc,
  checkIfAlreadyLoaded,
} = useProgressiveImg(props.img, "/HD");

onMounted(() => {
  checkIfAlreadyLoaded(imgRef.value);
});
</script>
<template>
  <NuxtLink class="reveal" :to="url">
    <figure class="card">
      <img
        ref="imgRef"
        :src="thumbnailUrl"
        @load="updateImgSrc"
        :alt="`${title} ${gradient} cover`"
      />
      <div class="content flex-center">
        <div class="caption reveal">
          <h2 class="logo-font">
            {{ title }} <span class="gradient">{{ gradient }}</span>
          </h2>
          <p>{{ description }}.</p>
        </div>
        <Label icon="arrow-right" label="Learn more" />
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

  &:hover {
    outline: none;
    border: none;
  }
  img {
    -webkit-transition: var(--transition-1);
    -o-transition: var(--transition-1);
    transition: var(--transition-1);
  }

  @media only screen and (min-width: 700px) {
    &:hover {
      img {
        -webkit-filter: saturate(0);
        filter: saturate(0);
        -webkit-transition: var(--transition-1);
        -o-transition: var(--transition-1);
        transition: var(--transition-1);
      }
    }
    h2 {
      font-size: var(--font-size-3);
    }
  }
  @media only screen and (max-width: 700px) {
    height: var(--dimension-1);
    width: 100%;
    aspect-ratio: unset;
    border-radius: 0;
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
.black .caption *:not(h2 .gradient) {
  color: rgb(var(--grey-color));
}
</style>
