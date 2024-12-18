<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

import employee from "@/modules/employee";

// Define the Employee interface
interface Employee {
  _id: string;
  name: string;
  flag: string;
  email: string;
  linkedin?: string;
  github?: string;
  department: string;
}

const { state, getAllEmployees } = employee();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllEmployees();
  isDataLoaded.value = true;

  nextTick(() => {
    new Swiper(".swiper-ourteam", {
      preloadImages: false,
      lazyLoading: true,
      observer: true,
      observeParents: true,
      spaceBetween: parseInt(gridGap2),
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
});

// GRID GAP
const gridGap2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-2"
);
const gridGap3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-3"
);
</script>

<template>
  <div>
    <section
      class="swiper swiper-ourteam reveal"
      aria-labelledby="our-team-heading"
      role="region"
    >
      <h2 id="our-team-heading" class="visually-hidden">Our Team</h2>
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper" v-if="isDataLoaded" aria-busy="false">
        <div
          v-for="employee in state.employees"
          :key="employee._id"
          class="swiper-slide"
          role="group"
          :aria-labelledby="`employee-${employee._id}`"
        >
          <!-- Slide start -->
          <div class="reveal">
            <country-flag :country="employee.flag" class="note" size="small" />
            <img
              :src="`https://cdn.slavic.media/images/${employee._id}/width=400,sharpen=100`"
              :alt="`Portrait of ${employee.name}`"
              :title="`${employee.name}`"
            />
          </div>
          <section class="profile">
            <h3 :id="`employee-${employee._id}`" class="reveal">
              {{ employee.name }}
            </h3>
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
            <h4 class="reveal">
              {{ employee.department }}
            </h4>
          </section>
          <!-- Slide End -->
        </div>
      </div>
      <skeletonSwiper
        v-else
        aria-busy="true"
        aria-live="polite"
      ></skeletonSwiper>
    </section>
  </div>
</template>
<style scoped>
.profile h3,
.profile h4,
.profile p {
  padding: 0;
  margin: 0 0 var(--grid-gap-1) 0;
}
.profile h3,
.profile h4 {
  margin-top: var(--grid-gap-1) !important;
}
.profile p {
  margin-bottom: var(--grid-gap-1) !important;
}
h3 {
  font-size: var(--font-size-4);
}
h4 {
  font-size: var(--font-size-7);
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
    font-size: var(--font-size-8);
  }
}
</style>
