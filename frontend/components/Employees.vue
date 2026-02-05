<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";

// Access runtime config
const config = useRuntimeConfig();

// Fetch documents
const {
  data: employees,
  pending,
  error,
} = await useFetch(`${config.public.API_URL}/employee`);

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
              <div class="url">
                <div>
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
                </div>
                <div class="social-icons reveal">
                  <a
                    v-if="employee.email"
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
                  <a
                    v-if="employee.imdb"
                    :href="`https://imdb.com/name/${employee.imdb}`"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    :aria-label="`View ${employee.name}'s IMDb profile`"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="IMDb_Square_Format_Black_BKG_White_Logo"
                      version="1.1"
                      viewBox="0 0 250 250"
                      class="imdb"
                    >
                      <path
                        id="BKG_161616"
                        class="st1"
                        d="M233.3.2H17C7.9.8.7,7.9.2,16.8v216.5c.6,9.1,7.4,16.1,16.2,16.9.2,0,.3,0,.5,0h216.6c.2,0,.3,0,.5,0,9.1-.8,16.2-8.6,16.2-17.8V18c0-9.3-7.2-17.1-16.5-17.8-.1,0-.3,0-.4,0h0Z"
                      />
                      <path
                        id="IMDb_Logo"
                        class="st0"
                        d="M48.5,85.8v77.4h-20v-77.4h20ZM91.1,85.8l-4.6,36.2-2.9-19.7c-.9-6.3-1.6-11.8-2.4-16.5h-25.9v77.4h17.5v-51.1c0,0,7.4,51.1,7.4,51.1h12.5l7-52.2v52.2h17.5v-77.4h-26.1ZM148.2,163.2c4.8,0,8.4-.3,10.8-.8,2.4-.5,4.4-1.4,6-2.8,1.6-1.3,2.8-3.1,3.4-5.5.6-2.4,1.1-7,1.1-13.9v-27.1c0-7.3-.3-12.3-.8-14.7-.4-2.5-1.5-4.8-3.3-6.8-1.8-2.1-4.4-3.5-7.8-4.4-3.3-.8-9-1.3-18.6-1.3h-15v77.4h24.2ZM144,99.1v50.8c2.8,0,4.6-.6,5.3-1.8.6-1.1,1-4.3,1-9.4v-30c0-3.5,0-5.8-.4-6.8-.2-1-.7-1.7-1.5-2.1-.8-.5-2.3-.7-4.4-.7ZM176.2,85.8v77.4h18l1.2-4.9c1.6,2,3.4,3.5,5.4,4.5,1.9.9,4.8,1.4,7.1,1.4s5.9-.8,8.2-2.5c2.3-1.6,3.8-3.6,4.4-5.9.6-2.3.9-5.7.9-10.3v-21.7c0-4.6-.1-7.7-.4-9.1-.2-1.4-.8-2.9-1.8-4.4-1.1-1.5-2.6-2.6-4.5-3.5-1.9-.8-4.2-1.2-6.9-1.2s-5.2.5-7.2,1.4c-1.9.9-3.7,2.3-5.3,4.2v-25.2h-19.2ZM202.2,124.6c0-3.2-.2-5.3-.6-6.3-.4-1.1-2.1-1.5-3.3-1.5s-1.9.4-2.3,1.3c-.4.9-.6,3.1-.6,6.6v20.5c0,3.4.2,5.6.6,6.6.4.9,1.2,1.4,2.3,1.4s2.9-.5,3.2-1.5c.4-1,.6-3.3.6-7v-19.9Z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <p class="bio">
                {{ employee.description }}
              </p>
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

    @media only screen and (max-width: 430px) {
      font-size: var(--font-size-7);
    }
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
  line-height: 1.5;
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
.url {
  display: flex;
  justify-content: space-between;
  align-items: start;
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
  display: flex;
  align-items: center;
  > * {
    margin-right: var(--grid-gap-1);
  }
  .imdb {
    height: 1rem;
    width: 1rem;
    border-radius: unset;

    .st0 {
      fill: oklch(--grey-color);
      fill-rule: evenodd;
    }
    .st1 {
      fill: oklch(1 0 0);
    }
  }
  svg.imdb:hover .st1 {
    fill: oklch(var(--primary-color));
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
