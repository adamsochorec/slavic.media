<script setup>
import { onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

// GRID GAP
const gridGap2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-2"
);
const gridGap3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-3"
);
onMounted(() => {
  const ourteamSwiper = new Swiper(".swiper-ourteam", {
    preloadImages: false,
    lazyLoading: true,
    observer: true,
    observeParents: true,
    spaceBetween: gridGap3,
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: 2.3,
      },
      375: {
        slidesPerView: 3.3,
      },
      620: {
        slidesPerView: 3.5,
      },
    },
    // Optional parameters
    direction: "horizontal",
  });
});
</script>
<template>
  <section class="swiper swiper-ourteam reveal">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper skills-section">
      <!-- MARCEL SECTION START -->
      <div
        class="swiper-slide"
        id="marcel"
        role="region"
        aria-label="Marcel H."
      >
        <!-- MARCEL SECTION START -->

        <div class="reveal">
          <svg
            title="Flag of Slovakia"
            class="note flag"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1093 1092"
            style="enable-background: new 0 0 1093 1092"
            xml:space="preserve"
          >
            <use href="#flag-slovakia"></use>
          </svg>

          <img
            src="https://slavic.media/img/marcel.jpg"
            alt="Portrait of Marcel H."
            title="Marcel H."
            class="reveal"
            aria-label="Marcel's Portrait"
          />
        </div>
        <section class="profile">
          <h4 class="reveal">Marcel H.</h4>
          <h6 class="reveal">
            Director <br class="hide-cta-max" />of<br class="hide-cta-max" />
            Photography
          </h6>

          <div class="social-icons reveal">
            <a
              href="mailto:marcel@slavic.media"
              aria-label="Email: marcel@slavic.media"
            >
              <i title="Email" class="pi pi-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/marcelhajik"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <i title="LinkedIn" class="pi pi-linkedin"></i>
            </a>
          </div>
        </section>
      </div>
      <!-- MARCEL SECTION END -->
      <!-- ADAM SECTION START -->
      <div class="swiper-slide" id="adam" role="region" aria-label="Adam S">
        <div class="reveal">
          <svg class="flag note" title="Flag of Czechia">
            <use href="#flag-czechia"></use>
          </svg>

          <img
            src="https://slavic.media/img/adam.jpg"
            alt="Portrait of Adam S."
            title="Adam S."
            class="reveal"
            role="img"
            aria-label="Portrait of Adam S."
          />
        </div>

        <div class="profile">
          <h4 class="reveal" role="heading" aria-level="4">Adam S.</h4>
          <h6 class="reveal">
            Sales<br class="hide-cta-max" />
            & <br class="hide-cta-max" />Communication
          </h6>
          <div class="social-icons reveal">
            <a
              href="mailto:adam@slavic.media"
              aria-label="Email: adam@slavic.media"
            >
              <i title="Email" class="pi pi-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/adamsochorec"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <i title="LinkedIn" class="pi pi-linkedin"></i>
            </a>
          </div>
        </div>
        <!-- ADAM SKILLS END -->
      </div>
      <!-- ADAM SECTION END -->
      <!-- DOMINIK SECTION START -->
      <div
        class="swiper-slide"
        id="dominik"
        role="region"
        aria-label="Dominik T."
      >
        <div class="reveal">
          <svg
            title="Flag of Slovakia"
            class="note flag"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1093 1092"
            style="enable-background: new 0 0 1093 1092"
            xml:space="preserve"
          >
            <use href="#flag-slovakia"></use>
          </svg>
          <img
            src="https://slavic.media/img/dominik.jpg"
            alt="Portrait of Dominik T."
            title="Dominik T."
            class="reveal"
            role="img"
            aria-label="Portrait of Dominik T."
          />
        </div>
        <div class="profile">
          <h4 class="reveal" role="heading" aria-level="4">Dominik T.</h4>
          <h6 class="reveal">
            Graphic<br class="hide-cta-max" />
            Designer
          </h6>
          <br class="hide-cta-max" />
          <div class="social-icons reveal">
            <a
              href="mailto:dominik@slavic.media"
              aria-label="Email: dominik@slavic.media"
            >
              <i title="Email" class="pi pi-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/dominik-tószegi-07872a248/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <i title="LinkedIn" class="pi pi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- DOMINIK SECTION END -->
      <!-- FERDINAND SECTION START -->
      <div
        class="swiper-slide"
        id="ferdinand"
        role="region"
        aria-label="Ferdinand P."
      >
        <div class="reveal">
          <svg class="flag note" title="Flag of Czechia">
            <use href="#flag-czechia"></use>
          </svg>
          <img
            src="https://slavic.media/img/ferdinand.jpg"
            alt="Portrait of Ferdinand P."
            title="Ferdiannd P."
            class="reveal"
            role="img"
            aria-label="Portrait of Ferdiannd P."
          />
        </div>
        <div class="profile">
          <h4 class="reveal" role="heading" aria-level="4">Ferdinand P.</h4>
          <h6 class="reveal">
            Sound<br class="hide-cta-max" />
            Engineer
          </h6>
          <br class="hide-cta-max" />
          <div class="social-icons reveal">
            <a
              href="mailto:ferda.petrs@gmail.com"
              aria-label="Email: ferda.petrs@gmail.com"
            >
              <i title="Email" class="pi pi-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- FERDINAND SECTION END -->
    </div>
  </section>
</template>
<style scoped>
#ourteam.intro-section video {
  -o-object-fit: cover;
  object-fit: cover;
  z-index: -1;
  -webkit-filter: brightness(0.3);
  filter: brightness(0.3);
}

#forpress.intro-section .filter {
  -webkit-backdrop-filter: var(--blur-1);
  backdrop-filter: var(--blur-1);
}
.profile h3,
.profile h4,
.profile h6,
.profile p {
  padding: 0;
  margin: 0 0 var(--grid-gap-1) 0;
}
.profile h4,
.profile h6 {
  margin-top: var(--grid-gap-1) !important;
}
.profile p {
  margin-bottom: var(--grid-gap-1) !important;
}
#ourteam .grid-container-team {
  grid-template-columns: repeat(3, 1fr);
  display: grid;
}
.swiper-ourteam img {
  border-radius: var(--border-radius-1);
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 1/1;
  -o-object-fit: cover;
  object-fit: cover;
}
.profile {
  text-align: center;
}
/* OUR TEAM SKILL BAR START */
.swiper-ourteam .languages {
  height: 20px;
  padding-left: 5px;
  vertical-align: text-top;
}
.swiper-ourteam .skill-bar.faded,
.swiper-ourteam .skill-bar,
.progress {
  height: 5px;
}
.swiper-ourteam .skill-bar.faded .skill-bar,
.progress {
  border-top-left-radius: var(--border-radius-1);
  border-bottom-left-radius: var(--border-radius-1);
}
.swiper-ourteam .skill-bar {
  margin-top: 10px;
  padding: 0;
  position: relative;
  -webkit-animation: opacity-pulse 1s linear infinite alternate;
  animation: opacity-pulse 1s linear infinite alternate;
  background-color: rgb(var(--primary-color));
  width: 0;
}
.swiper-ourteam .skill-bar.faded {
  background-color: rgb(var(--grey-color));
  width: 100%;
  -webkit-animation: none;
  animation: none;
  border-radius: var(--border-radius-1);
}
.progress {
  border-radius: var(--border-radius-1);
  background-color: rgb(var(--grey-color));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
}
ul.languages-legend {
  list-style-type: disc;
}
ul.languages-legend li {
  font-size: var(--fontsize-note);
}
ul.languages-legend li::marker {
  list-style-type: square;
}

.languages-legend .responsibility-1::marker,
.skill-bar.faded .responsibility-1 {
  background-color: rgba(var(--secondary-color), 1);
  color: rgba(var(--secondary-color), 1);
  border-right: 3px solid rgb(var(--grey-color));
}
.languages-legend .responsibility-2::marker,
.skill-bar.faded .responsibility-2 {
  background-color: rgba(var(--primary-color), 1);
  color: rgba(var(--primary-color), 1);
  border-right: 3px solid rgb(var(--grey-color));
}
.languages-legend .responsibility-3::marker,
.skill-bar.faded .responsibility-3 {
  background-color: rgba(var(--white-color), 1);
  color: rgba(var(--white-color), 1);
  border-right: 3px solid rgb(var(--grey-color));
}
.languages-legend .responsibility-4::marker,
.skill-bar.faded .responsibility-4 {
  background-color: rgb(var(--dark-grey-color));
  color: rgb(var(--dark-grey-color));
}
@media only screen and (max-width: 500px) {
  #ourteam p {
    font-size: var(--fontsize-note);
  }
}
</style>
