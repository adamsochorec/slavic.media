<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import review from "@/modules/review";
import { useArrowNavigation } from "@/functions/arrow-navigation";
import { useSwiperAutoplay } from "@/functions/swiper-autoplay";

const { state, getAllReviews } = review();
const isDataLoaded = ref(false);

// GRID GAP
const gridGap2 = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--grid-gap-2")
);

onMounted(async () => {
  await getAllReviews();
  isDataLoaded.value = true;

  nextTick(() => {
    const swiper = new Swiper(".swiper-reviews", {
      loop: true,
      speed: 600,
      spaceBetween: gridGap2,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: { delay: 2000, pauseOnMouseEnter: true },
      preloadImages: false,
      lazyLoading: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        450: {
          slidesPerView: 2,
        },
        670: {
          slidesPerView: 3,
        },
        947: {
          slidesPerView: 4,
        },
      },
      direction: "horizontal",
    });

    const removeArrowNavigation = useArrowNavigation(swiper);
    const removeSwiperAutoplay = useSwiperAutoplay(swiper);

    onUnmounted(() => {
      removeArrowNavigation();
      removeSwiperAutoplay();
    });

    function showStars(container: HTMLElement, rating: number) {
      container.innerHTML = ""; // Clear any existing content

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "stars";

        if (i <= rating) {
          star.innerHTML = "★"; // Use a star symbol
        } else {
          star.innerHTML = "☆"; // Use an empty star symbol
        }

        container.appendChild(star);
      }
    }

    const starContainers = document.querySelectorAll<HTMLElement>(".stars");

    starContainers.forEach((starContainer) => {
      const rating = parseInt(
        starContainer.getAttribute("data-rating") || "0",
        10
      );
      showStars(starContainer, rating);
    });

    // Intersection Observer to pause/resume autoplay
    const swiperElement = document.querySelector(".swiper-reviews");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            swiper.autoplay.start();
          } else {
            swiper.autoplay.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (swiperElement) {
      observer.observe(swiperElement);
    }
  });
});
</script>
<template>
  <section
    class="swiper swiper-reviews reveal"
    aria-labelledby="reviews-heading"
    role="region"
  >
    <h2 id="reviews-heading" class="visually-hidden">Customer Reviews</h2>
    <div class="swiper-wrapper" v-if="isDataLoaded" aria-busy="false">
      <!-- Slide -->
      <div
        v-for="review in state.reviews"
        :key="review._id"
        class="swiper-slide card"
        role="group"
        :aria-labelledby="`review-${review._id}`"
      >
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              :alt="`Profile photo of ${review.name}`"
              :title="review.name"
              :src="`https://lh3.googleusercontent.com/${review.img}=w120-h120-p-rp-mo-br100`"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                :href="`https://www.google.com/maps/contrib/${review.profileLink}?hl=en-US`"
                :aria-label="`View ${review.name}'s Google Maps profile`"
                :title="`View ${review.name}'s profile on Google Maps`"
              >
                {{ review.name }}
              </a>
              <br />
              {{ review.occupation }}
            </p>
            <div
              class="stars"
              :data-rating="review.rating"
              :aria-label="`Rating: {{ review.rating }} out of 5 stars`"
            ></div>
          </div>
        </div>
        <p class="reviews-message" id="`review-${review._id}`">
          {{ review.message }}
        </p>
      </div>
    </div>
    <div class="swiper-pagination" v-if="isDataLoaded" aria-busy="false"></div>
    <skeletonSwiper v-else aria-busy="true"></skeletonSwiper>
  </section>
</template>
<style scoped>
.swiper-reviews .card {
  padding: var(--grid-gap-1);
  width: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background-color: rgb(var(--dark-grey-color));
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.swiper-reviews {
  border-radius: var(--border-radius-1);
  padding-bottom: calc(var(--grid-gap-2) * 2);
}
.swiper-reviews p {
  padding: 0;
  font-size: var(--font-size-8);
}
.swiper-reviews .quotes {
  font-size: 32px;
  color: white;
  padding: 0;
  margin: 0;
}
.swiper-reviews img {
  height: 60px;
  width: auto;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-2);
  -webkit-box-shadow: var(--box-shadow-1);
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
  box-shadow: var(--box-shadow-1);
  margin: 0 !important;
}
.swiper-slide .grid-container {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: var(--grid-gap-1);
}
.grid-container .grid-item:nth-child(odd) {
  margin-right: none !important;
}
.swiper-reviews .reviews-message {
  margin-top: var(--grid-gap-1);
}
.swiper-reviews .stars {
  display: inline-block;
  font-size: var(--font-size-8);
  color: gold;
}
.reviews-message {
  height: 80px;
  overflow: scroll;
  -webkit-transition: max-height var(--transition-2);
  -o-transition: max-height var(--transition-2);
  transition: max-height var(--transition-2);
}
.reviews-message.expanded {
  max-height: 500px;
}
</style>
