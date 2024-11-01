<script setup>
import { onMounted, ref } from "vue";
import $ from "jquery";
import swiperReels from "@/components/swiper-reels.vue";

onMounted(() => {
  // Initialize Magnific Popup
  document.querySelectorAll(".gallery").forEach((gallery) => {
    $(gallery).magnificPopup({
      delegate: "a", // Targets specific link class for delegation
      type: "iframe", // Sets the type to iframe for displaying videos
      gallery: {
        enabled: true,
        navigateByImgClick: false,
        preload: [0, 1], // Preloads adjacent items
        arrowMarkup:
          '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
        tPrev: "Previous",
        tNext: "Next",
      },
      zoom: {
        enabled: true,
        duration: 300, // Duration of the zoom animation
      },
      src: function (item) {
        // Directly returns the href attribute value for iframe src
        return item.el.getAttribute("href");
      },
    });
  });
});

const showreel = ref([
  {
    img: "https://slavic.media/img/cover-norwegianfjords.jp",
    iconClass: "pi pi-play-circle bubble",
    flagTitle: "Flag of Norway",
    flagHref: "#flag-norway",
    title: "Norwegian Fjords",
    year: "2024",
    client: "timetravels.com",
    video: "https://vimeo.com/950575511",
  },
  {
    img: "https://slavic.media/img/cover-finnishlapland.jpg",
    iconClass: "pi pi-play-circle bubble",
    flagTitle: "Flag of Finland",
    flagHref: "#flag-finland",
    title: "Finnish Lapland",
    year: "2024",
    client: "timetravels.com",
    video: "https://vimeo.com/950575512",
  },
]);

const narrative = ref([
  {
    img: "https://slavic.media/img/cover-huskyfarm.jpg",
    iconClass: "pi pi-play-circle bubble",
    flagTitle: "Flag of FInland",
    flagHref: "#flag-finland",
    title: "Husky Farm Veskoniemi",
    year: "2024",
    client: "timetravels.com",
    video: "https://vimeo.com/956644060",
  },
  {
    img: "https://slavic.media/img/cover-husetfundament.jpg",
    iconClass: "pi pi-play-circle bubble",
    flagTitle: "Flag of Denmark",
    flagHref: "#flag-denmark",
    title: "Huset Fundament",
    year: "2023",
    client: "husetfundament.dk",
    video: "https://vimeo.com/942148434",
  },
]);
</script>
<template>
  <div class="main">
    <article class="wrapper-wide" style="margin-top: 120px">
      <contactForm></contactForm>

      <!-- PAGE INTRO -->
      <div class="grid-container caption-container">
        <div class="grid-item">
          <h1 class="reveal" aria-label="Video Services">
            <span class="highlited">Video</span>
            Services
          </h1>
          <!-- BREADCRUMB MENU -->
          <div class="pathname-container reveal">
            <p>
              <span class="pathname"
                ><a href="/" aria-label="Home"></a> &#8250;
              </span>
              <span class="pathname" aria-label="Video">Services &#8250; </span>

              <span class="pathname" aria-label="Video">Video</span>
            </p>
          </div>
        </div>
        <div class="grid-item">
          <p class="reveal">
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <a class="popup-with-form reveal" href="#request-a-proposal">
            <div class="cta">
              Request a Proposal<i class="pi pi-arrow-right"></i>
            </div>
          </a>
        </div>
        <div id="showreel"></div>
      </div>
      <!-- GALLERY 1 -->
      <article class="wrapper-wide" id="video">
        <hr class="reveal" role="separator" />
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2>Brand <span class="highlited">Showreel</span></h2>
          </div>
          <div class="grid-item">
            <p class="reveal">
              Deep eye contact and powerful visuals that connect—each frame
              crafted to showcase your product in a way that inspires and leaves
              a lasting impression.
            </p>
          </div>
        </div>
        <hr class="semi" role="separator" />
      </article>
      <!-- GALLERY 1.1 -->
      <article
        class="wrapper-wide gallery"
        id="gallery-video"
        aria-label="Video Gallery"
      >
        <div
          v-for="(item, index) in showreel"
          :key="index"
          class="gallery-item reveal"
        >
          <img :src="item.img" :alt="item.title" />
          <div class="gallery-item-caption">
            <i :class="item.iconClass"></i>
            <svg class="flag note" :title="item.flagTitle">
              <use :href="item.flagHref"></use>
            </svg>
            <h4>{{ item.title }}</h4>
            <p>
              {{ item.year }}&nbsp;|&nbsp;<span>{{ item.client }}</span>
              <i class="pi pi-arrow-right"></i>
            </p>
            <a :href="item.video" target="_blank" rel="noopener noreferrer"></a>
          </div>
        </div>
        <div id="content"></div>
      </article>

      <hr role="separator" />

      <!-- SWIPER GALLERY -->
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2 class="reveal" aria-label="Engaging Content">
            Engaging <span class="highlited">Content</span>
          </h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Social media reels that capture your brand’s essence—engaging,
            genuine, and designed to resonate with your audience.
          </p>
        </div>
        <div id="content"></div>
      </div>
    </article>

    <hr class="semi" role="separator" />

    <article class="wrapper-wide" id="reels">
      <swiperReels></swiperReels>

      <div id="narrative"></div>
    </article>

    <!-- GALLERY 2 -->
    <article class="wrapper-wide" id="video">
      <hr class="reveal" role="separator" />
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2>Cinematic <span class="highlited">Narrative</span></h2>
        </div>
        <div class="grid-item">
          <p class="reveal">
            Narratives, documentaries, and portraits that bring your story to
            life capturing moments that move, inspire, and leave a lasting
            imprint.
          </p>
        </div>
      </div>
      <hr class="semi" role="separator" />
    </article>
    <!-- GALLERY 2.1 -->
    <article
      class="wrapper-wide gallery"
      id="gallery-video"
      aria-label="Video Gallery"
    >
      <div
        v-for="(item, index) in narrative"
        :key="index"
        class="gallery-item reveal"
      >
        <img :src="item.img" :alt="item.alt" />
        <div class="gallery-item-caption">
          <i :class="item.iconClass"></i>
          <svg class="flag note" :title="item.flagTitle">
            <use :href="item.flagHref"></use>
          </svg>
          <h4>{{ item.title }}</h4>
          <p>
            {{ item.year }}&nbsp;|&nbsp;<span>{{ item.client }}</span>
            <i class="pi pi-arrow-right"></i>
          </p>
          <a :href="item.video" target="_blank" rel="noopener noreferrer"></a>
        </div>
      </div>
      <!-- NARRATIVE ITEMS END -->
    </article>
    <section class="flex-center">
      <router-link class="popup-with-form reveal" href="#request-a-proposal">
        <div class="cta">
          Request a Proposal<i class="pi pi-arrow-right"></i>
        </div>
      </router-link>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--grid-gap-2);
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.gallery .gallery-item {
  position: relative;
  max-width: calc(100vw - var(--homepage-padding) * 2);
  height: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background: #000;
  cursor: pointer;
  overflow: hidden;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.gallery .gallery-item:hover {
  background: var(--dark-grey-color-full);
}
.gallery .gallery-item img {
  position: relative;
  display: block;
  opacity: 0.5;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transition: all 350ms ease-in-out;
  -o-transition: all 350ms ease-in-out;
  transition: all 350ms ease-in-out;
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}
.gallery .gallery-item .gallery-item-caption {
  padding: var(--grid-gap-2);
}
.gallery .gallery-item .gallery-item-caption,
.gallery .gallery-item .gallery-item-caption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.gallery .gallery-item p {
  position: relative;
  margin: 0;
  z-index: 1;
  pointer-events: none;
}
.gallery .gallery-item span {
  text-decoration: underline;
}
.gallery .gallery-item p {
  font-size: var(--fontsize-note);
  padding: 12px 0;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, -webkit-transform 0.35s;
  -o-transition: opacity 0.35s, transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  transition: opacity 0.35s, transform 0.35s, -webkit-transform 0.35s;
  -webkit-transform: translate3d(10%, 0, 0);
  transform: translate3d(10%, 0, 0);
}
.gallery .gallery-item:hover img {
  -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-filter: var(--blur-1);
  filter: var(--blur-1);
}
.gallery .gallery-item .gallery-item-caption {
  text-align: left;
}
.gallery .gallery-item:hover h3::after {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.gallery .gallery-item:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.gallery .gallery-item #videoplay {
  fill: #ffffff;
  vertical-align: baseline;
  height: var(--grid-gap-2);
}
</style>
