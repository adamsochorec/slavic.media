<script setup>
import { ref } from "vue";

// Define the press items in an array
const pressItems = ref([
  {
    href: "assets/brand-guide.pdf",
    img: "https://slavic.media/img/cover-brandguide.png",
    title: "Brand Guide",
    description:
      "Sets the visual and stylistic standards for the brand, ensuring consistency in logos, colours, fonts, and design.",
    ariaLabel: "Link to Brand Guide",
  },
  {
    href: "assets/credit-guide.pdf",
    img: "https://slavic.media/img/cover-creditguide.png",
    title: "Credit Guide",
    description:
      "Outlines how to tag and credit work across digital as well as printed media.",
    ariaLabel: "Link to Credit Guide",
  },
  {
    href: "assets/press-kit.zip",
    img: "https://slavic.media/img/cover-presskit.jpg",
    title: "Press Kit",
    description:
      "Package of vectorised logos, fonts and other essential branding materials.",
    ariaLabel: "Link to Press Kit",
  },
]);
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <h1 id="pagePathHeading" class="reveal" role="heading" aria-level="1">
        The<span class="gradient"> Slavic Media</span> Assets
      </h1>
      <hr class="reveal" role="separator" aria-label="Separator" />
      <!-- PRESS MATERIALS GRID START -->
      <div
        class="reveal"
        id="gallery-press"
        role="grid"
        aria-label="Press Materials Grid"
      >
        <a
          v-for="(item, index) in pressItems"
          :key="index"
          class="gallery-item"
          :href="item.href"
          target="_blank"
        >
          <h2>
            {{ item.title }}
          </h2>

          <div
            class="grid-item"
            role="gridcell"
            :style="{ backgroundImage: `url(${item.img})` }"
          ></div>
          <p>
            {{ item.description }}
          </p>
        </a>
      </div>
      <!-- PRESS MATERIALS GRID END -->
    </article>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
}
#gallery-press {
  display: grid;
  grid-gap: var(--grid-gap-3);
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}
#gallery-press .gallery-item p {
  font-size: var(--font-size-6);
  padding: unset;
  opacity: 1;
  -webkit-transform: unset;
  -ms-transform: unset;
  transform: unset;
}
#gallery-press .grid-item {
  height: var(--dimension-2);
}
#gallery-press .gallery-item {
  margin-bottom: var(--grid-gap-3);
}
#gallery-press .grid-item {
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  margin: var(--grid-gap-1) 0;
}
#gallery-press a:hover h2 {
  text-decoration: underline;
}
#gallery-press a:hover p {
  text-decoration: none !important;
  opacity: 100;
}
#gallery-press .grid-item {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
}

#gallery-press .gallery-item,
#gallery-press .gallery-item::after,
#gallery-press .gallery-item:hover,
#gallery-press .grid-item,
#gallery-press .grid-item::after,
#gallery-press .grid-item:hover {
  border-radius: var(--border-radius-1);
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}

#gallery-press .grid-item span p,
#gallery-press .grid-item span p i {
  color: rgb(var(--primary-color));
}
#gallery-press .grid-item:focus::after,
#gallery-press .grid-item:hover::after {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}
#gallery-press .grid-item::after {
  background: inherit;
  background-size: cover;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center;
}
@media only screen and (max-width: 667px) {
  .gallery .gallery-item span {
    font-size: var(--font-size-8);
  }
  #gallery-press {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}
@media only screen and (min-height: 700px) and (min-width: 1500px) {
  footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
