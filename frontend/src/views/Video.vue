<script setup>
import { onMounted } from "vue";
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
        <div id="content"></div>
      </div>
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
      </div>
    </article>

    <hr class="semi" role="separator" />

    <article class="wrapper-wide" id="reels">
      <swiperReels></swiperReels>

      <div id="showreel"></div>
    </article>
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
            crafted to showcase your product in a way that inspires and leaves a
            lasting impression.
          </p>
        </div>
      </div>
      <hr class="semi" role="separator" />
    </article>
    <!-- GALLERY ITEM 1.1 -->
    <article
      class="wrapper-wide gallery"
      id="gallery-video"
      aria-label="Video Gallery"
    >
      <div class="gallery-item reveal">
        <img
          src="https://slavic.media/img/cover-fynutzu.jpg"
          alt="Fynutzu Music"
        />
        <div class="gallery-item-caption">
          <i class="pi pi-play-circle bubble"> </i>
          <svg class="flag note" title="Flag of Denmark">
            <use href="#flag-denmark"></use>
          </svg>

          <h4>Tech the Night</h4>
          <p>
            2024&nbsp;|&nbsp;<span>fynutzumusic.com</span
            ><i class="pi pi-arrow-right"></i>
          </p>
          <a href="https://vimeo.com/994873542"></a>
        </div>
      </div>
      <!-- GALLERY ITEM 1.2 -->
      <div class="gallery-item reveal">
        <img
          src="https://slavic.media/img/cover-norwegianfjords.jpg"
          alt="Timetravels."
        />
        <div class="gallery-item-caption">
          <i class="pi pi-play-circle bubble"> </i>
          <svg class="flag note" title="Flag of Norway">
            <use href="#flag-norway"></use>
          </svg>

          <h4>Norwegian Fjords</h4>
          <p>
            2024&nbsp;|&nbsp;<span>timetravels.com</span
            ><i class="pi pi-arrow-right"></i>
          </p>
          <a href="https://vimeo.com/950575511"></a>
        </div>
      </div>
      <!-- GALLERY ITEM 1.3 -->
      <div class="gallery-item reveal">
        <img
          src="https://slavic.media/img/cover-finnishlapland.jpg"
          alt="Timetravels."
        />
        <div class="gallery-item-caption">
          <i class="pi pi-play-circle bubble"> </i>
          <svg
            class="flag note"
            title="Flag of Finland"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#flag-finland"></use>
          </svg>
          <h4>Finnish Lapland</h4>
          <p>
            2024&nbsp;|&nbsp;<span>timetravels.com</span
            ><i class="pi pi-arrow-right"></i>
          </p>
          <a href="https://vimeo.com/950479131"></a>
        </div>
      </div>
      <!-- GALLERY ITEM 1.4 -->
      <div class="gallery-item reveal">
        <img
          src="https://slavic.media/img/cover-swedishlapland.jpg"
          alt="Timetravels."
        />
        <div class="gallery-item-caption">
          <i class="pi pi-play-circle bubble"> </i>
          <svg
            class="flag note"
            title="Flag of Sweden"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#flag-sweden"></use>
          </svg>
          <h4>Swedish Lapland</h4>
          <p>
            2024&nbsp;|&nbsp;<span>timetravels.com</span
            ><i class="pi pi-arrow-right"></i>
          </p>
          <a href="https://vimeo.com/942145699"></a>
        </div>
      </div>
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
    <!-- GALLERY ITEM 2.1 -->
    <article
      class="wrapper-wide gallery"
      id="gallery-video"
      aria-label="Video Gallery"
    >
      <div class="gallery-item reveal">
        <img
          src="https://slavic.media/img/cover-huskyfarm.jpg"
          alt="Timetravels."
        />
        <div class="gallery-item-caption">
          <i class="pi pi-play-circle bubble"> </i>
          <svg class="flag note" title="Flag of Finland">
            <use href="#flag-finland"></use>
          </svg>
          <h4>Husky Farm Veskoniemi</h4>
          <p>
            2024&nbsp;|&nbsp;<span>timetravels.com</span
            ><i class="pi pi-arrow-right"></i>
          </p>
          <a href="https://vimeo.com/956644060"></a>
        </div>
      </div>
      <!-- GALLERY ITEM 2.2 -->
      <div class="gallery-item reveal" aria-label="Huset Fundament 2023">
        <img
          src="https://slavic.media/img/cover-husetfundament.jpg"
          alt="Showreel of a cultural volunteer organisation.."
        />
        <div class="gallery-item-caption">
          <i class="pi pi-play-circle bubble"></i>

          <svg
            class="flag note"
            title="Flag of Denmark"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#flag-denmark"></use>
          </svg>
          <h4>Huset Fundament</h4>
          <p>
            2023&nbsp;|&nbsp;<span>husetfundament.dk</span
            ><i class="pi pi-arrow-right"></i>
          </p>
          <a
            aria-label="Open video popup for Huset Fundament"
            href="https://vimeo.com/942148434"
          ></a>
        </div>
      </div>
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
<style lang="scss" scoped></style>
