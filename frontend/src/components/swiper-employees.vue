<script setup>
import { ref, onMounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import employee from "@/modules/employee";
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
    <section class="swiper swiper-ourteam reveal">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper" v-if="isDataLoaded">
        <div
          v-for="employee in state.employees"
          :key="employee._id"
          class="swiper-slide"
          role="region"
        >
          <!-- Slide start -->
          <div class="reveal">
            <svg
              :title="'Flag of ' + employee.origin"
              class="note flag"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 1093 1092"
              style="enable-background: new 0 0 1093 1092"
              xml:space="preserve"
            >
              <use :href="'#' + employee.origin"></use>
            </svg>
            <img
              :src="`https://slavic.media/img/${employee._id}.jpg`"
              :alt="`Portrait of ${employee.name}`"
              :title="`${employee.name}`"
              class="reveal"
            />
          </div>
          <section class="profile">
            <h4 class="reveal">{{ employee.name }}</h4>

            <div class="social-icons reveal">
              <a
                :href="'mailto:' + employee.email"
                :aria-label="'Email: ' + employee.email"
              >
                <i title="Email" class="pi pi-envelope"></i>
              </a>
              <a
                v-if="employee.linkedin"
                :href="employee.linkedin"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <i title="LinkedIn" class="pi pi-linkedin"></i>
              </a>
              <a
                v-if="employee.github"
                :href="employee.github"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <i title="GitHub" class="pi pi-github"></i>
              </a>
            </div>
            <h6 class="reveal">
              {{ employee.department }}
            </h6>
          </section>
          <!-- Slide End -->
        </div>
      </div>
      <div class="swiper-wrapper" v-else>
        <div class="swiper-slide" v-for="n in 4" :key="n">
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            borderRadius="10px"
            class="mb-2"
            width="100%"
            height="150px"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="100%"
            height="15px"
            class="mb-2"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            width="70%"
            height="15px"
            class="mb-2"
          ></Skeleton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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
.social-icons > * {
  margin-right: var(--grid-gap-1);
}
.social-icons a:nth-last-child() {
  margin-right: 0;
}
</style>
