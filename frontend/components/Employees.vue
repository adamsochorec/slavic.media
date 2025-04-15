<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import employee from "@/composables/modules/employee";

interface Employee {
  _id: string;
  name: string;
  flag: string;
  email: string;
  linkedin?: string;
  github?: string;
  department: string;
  desc: string;
  originalWidth?: number;
  originalHeight?: number;
}

// State management for employees
const { state, getAllEmployees } = employee();
const isDataLoaded = ref(false);
let lightbox: any;
let removeArrowNavigation: () => void;

// Lifecycle hook to fetch employees and initialize Swiper and PhotoSwipe
onMounted(async () => {
  // Fetch all employees
  await getAllEmployees();
  isDataLoaded.value = true;

  // Initialize Swiper and PhotoSwipe after the DOM is updated
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
      children: "a.employee-img-link",
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
  <div>
    <section
      class="swiper swiper-employees reveal"
      aria-labelledby="our-team-heading"
      role="region"
    >
      <h2 id="our-team-heading" class="visually-hidden">Our Team</h2>
      <!-- Swiper wrapper -->
      <div
        class="swiper-wrapper"
        v-if="isDataLoaded"
        aria-busy="false"
        id="employeeGallery"
      >
        <!-- Swiper slide for each employee -->
        <div
          v-for="employee in state.employees"
          :key="employee._id"
          class="swiper-slide"
          role="group"
          :aria-labelledby="`employee-${employee._id}`"
        >
          <!-- Slide content -->
          <div class="reveal">
            <Icon :name="`cif:${employee.flag}`" class="note flag" />
            <a
              :href="`https://cdn.slavic.media/img/${employee._id}/hd`"
              data-pswp-width="1200"
              data-pswp-height="900"
              :data-cropped="true"
              class="employee-img-link"
            >
              <img
                :src="`https://cdn.slavic.media/img/${employee._id}/thumbnail`"
                :data-src="`https://cdn.slavic.media/img/${employee._id}/sd`"
                :alt="`Portrait of ${employee.name}`"
                :title="`${employee.name}`"
                class="employee-img"
                @load="(event) => (event.target.src = event.target.dataset.src)"
              />
              <!-- Slide Caption -->

              <span class="pswp-caption-content">
                <h3>{{ employee.department }}</h3>
                <h4 v-if="employee?.linkedin">
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    :href="employee.linkedin"
                    >{{ employee.name }}</a
                  >
                </h4>
                <h4 v-else>
                  {{ employee.name }}
                </h4>
                <p class="bio">
                  {{ employee.desc }}
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
                :href="employee.linkedin"
                >{{ employee.name }}</a
              >
            </h4>
            <h4 v-else>
              {{ employee.name }}
            </h4>
          </section>
        </div>
      </div>

      <!-- Skeleton loader for loading state -->
      <SkeletonSwiper
        v-else
        aria-busy="true"
        aria-live="polite"
      ></SkeletonSwiper>
      <!-- Swiper pagination -->
      <div
        class="swiper-pagination"
        v-if="isDataLoaded"
        aria-busy="false"
      ></div>
    </section>
  </div>
</template>

<style scoped>
.swiper-employees {
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
.bio {
  margin: var(--grid-gap-1) 0;
  font-size: var(--font-size-7);
}
.profile h3 {
  margin-top: var(--grid-gap-1) !important;
}
.profile p {
  margin-bottom: var(--grid-gap-1) !important;
}
.profile h4 {
  font-size: var(--font-size-7);
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
}
#ourteam .grid-container-team {
  grid-template-columns: repeat(3, 1fr);
  display: grid;
}
img {
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  aspect-ratio: 4/3;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-1);
}
.social-icons > * {
  margin-right: var(--grid-gap-1);
}
.social-icons a:nth-last-child() {
  margin-right: 0;
}
.grid-container.skeleton {
  display: grid;
  grid-gap: var(--grid-gap-2);
}

@media only screen and (max-width: 430px) {
  h4 {
    font-size: var(--font-size-7);
  }
}
</style>
