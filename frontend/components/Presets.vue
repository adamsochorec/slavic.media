<script lang="ts" setup></script>
<template>
  <hr class="semi" />
  <div class="grid-container">
    <div class="grid-item odd">
      <img class="product" src="/cinestill.jpg" />
      <ColourGrading />
    </div>
    <div class="grid-item even">
      <ColourGrading />
      <img class="product" src="/film-emulation.jpg" />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.grid-container {
  width: 100%;
  padding-left: var(--homepage-padding);
  padding-right: var(--homepage-padding);
  grid-template-columns: 1fr;
  gap: var(--grid-gap-2);
  display: grid;
}
.grid-item {
  display: grid;
  gap: var(--grid-gap-2);
}
.grid-item.odd {
  grid-template-columns: 1fr 2fr;
}
.grid-item.even {
  grid-template-columns: 2fr 1fr;
}

img.product {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: var(--border-radius-1);
}
.swiper {
  width: 100%;
  height: 100%;
}
</style>
