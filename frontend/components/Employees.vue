<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";

// Fetch documents
const {
  data: employees,
  pending,
  error,
} = await useFetch("https://api.slavic.media/employee");

// Progressive IMG loading
const checkIfAlreadyLoaded = (img: HTMLImageElement) => {
  if (img && img.complete && img.src !== img.dataset.src) {
    img.src = img.dataset.src!;
  }
};

let lightbox: any;
let removeArrowNavigation: () => void;

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-employees", {
      observer: true,
      observeParents: true,
      spaceBetween: 15,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.3,
        },
        375: {
          slidesPerView: 2.3,
        },
        620: {
          slidesPerView: 2.5,
        },
      },
      direction: "horizontal",
    });

    // Custom SVGs for arrows
    const leftArrowSVGString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="pswp__button--arrow--left">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6" />
      </svg>`;
    const rightArrowSVGString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="pswp__button--arrow--right">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
      </svg>`;

    lightbox = new PhotoSwipeLightbox({
      gallery: "#employeeGallery",
      children: "a.lightbox",
      secondaryZoomLevel: 1.5,
      errorMsg: "The photo cannot be loaded",
      preload: [1, 2],
      pswpModule: () => import("photoswipe"),
      wheelToZoom: true,
      loop: false,
      arrowPrevSVG: leftArrowSVGString,
      arrowNextSVG: rightArrowSVGString,
    });

    // Initialize PhotoSwipe Dynamic Caption Plugin
    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
      captionContent: (slide: any) => {
        return slide.data.element.querySelector(".pswp-caption-content")
          .innerHTML;
      },
      type: "auto",
    });

    // Initialize the lightbox
    lightbox.init();

    // Enable arrow navigation for Swiper
    removeArrowNavigation = useArrowNavigation(swiper);

    document
      .querySelectorAll<HTMLImageElement>(".employee-img")
      .forEach((img) => {
        checkIfAlreadyLoaded(img);
      });
  });
});

// Cleanup on component unmount
onUnmounted(() => {
  if (removeArrowNavigation) {
    removeArrowNavigation();
  }
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>
<template>
  <section
    class="swiper swiper-employees reveal"
    aria-labelledby="our-team-heading"
    role="region"
  >
    <h2 id="our-team-heading" class="visually-hidden">Our Team</h2>
    <!-- Swiper wrapper -->
    <div
      class="swiper-wrapper"
      v-if="!pending && !error"
      aria-busy="false"
      id="employeeGallery"
    >
      <!-- Swiper slide for each employee -->
      <figure
        v-for="employee in employees"
        :key="employee._id"
        class="swiper-slide"
        role="group"
        :aria-labelledby="`employee-${employee._id}`"
      >
        <!-- Slide content -->
        <div class="reveal">
          <Icon :name="`flag:${employee.flag}-4x3`" class="note flag" />
          <a
            :href="`https://cdn.slavic.media/img/${employee._id}/4K`"
            data-pswp-width="1200"
            data-pswp-height="900"
            :data-cropped="true"
            class="lightbox"
          >
            <img
              :src="`https://cdn.slavic.media/img/${employee._id}/thumbnail`"
              :data-src="`https://cdn.slavic.media/img/${employee._id}/SD`"
              :alt="`Portrait of ${employee.name}`"
              :title="`${employee.name}`"
              class="employee-img"
              @load="(event) => (event.target.src = event.target.dataset.src)"
              loading="lazy"
            />
            <!-- Slide Caption -->

            <span class="pswp-caption-content">
              <h3>{{ employee.department }}</h3>
              <h4 v-if="employee?.linkedin">
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :href="`https://www.linkedin.com/in/${employee.linkedin}`"
                  >{{ employee.name }}</a
                >
              </h4>
              <h4 v-else>
                {{ employee.name }}
              </h4>
              <p class="bio">
                {{ employee.description }}
              </p>
              <div class="social-icons reveal">
                <a
                  :href="`mailto:${employee.email}`"
                  :aria-label="`Send an email to ${employee.name} at ${employee.email}`"
                >
                  <i title="Email" class="pi pi-envelope"></i>
                </a>
                <a
                  v-if="employee.linkedin"
                  :href="`https://linkedin.com/in/${employee.linkedin}`"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :aria-label="`View ${employee.name}'s LinkedIn profile`"
                >
                  <i title="LinkedIn" class="pi pi-linkedin"></i>
                </a>
                <a
                  v-if="employee.github"
                  :href="`https://github.com/${employee.github}`"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :aria-label="`View ${employee.name}'s GitHub profile`"
                >
                  <i title="GitHub" class="pi pi-github"></i>
                </a>
              </div>
            </span>
          </a>
        </div>
        <!-- Employee profile section -->
        <section class="profile">
          <h3 class="reveal">{{ employee.department }}</h3>

          <h4
            :id="`employee-${employee._id}`"
            class="reveal"
            v-if="employee?.linkedin"
          >
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="`https://linkedin.com/in/${employee.linkedin}`"
              >{{ employee.name }}</a
            >
          </h4>
          <h4 v-else>
            {{ employee.name }}
          </h4>
        </section>
      </figure>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.swiper {
  margin: var(--grid-gap-2) 0 var(--grid-gap-2) 0;
  border-top: var(--border-1);
  border-bottom: var(--border-1);
  padding: var(--grid-gap-3) 0;
}
.bio {
  margin: var(--grid-gap-1) 0;
  font-size: var(--font-size-7);
}
.profile {
  h3 {
    margin-top: var(--grid-gap-1) !important;
  }

  p {
    margin-bottom: var(--grid-gap-1) !important;
  }

  h4 {
    font-size: var(--font-size-7);
  }
}
h3 {
  font-size: var(--font-size-6);
}
h4 {
  font-size: var(--font-size-6);
  font-family: var(--content-font);
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;

  @media only screen and (max-width: 430px) {
    font-size: var(--font-size-7);
  }
}
#ourteam {
  .grid-container-team {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
img {
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 4 / 3;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-1);
}
.social-icons {
  > * {
    margin-right: var(--grid-gap-1);
  }

  a:nth-last-child(1) {
    margin-right: 0;
  }
}
.grid-container.skeleton {
  display: grid;
  grid-gap: var(--grid-gap-2);
}
</style>
