<script setup lang="ts">
import { ref, nextTick, onUnmounted, onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useArrowNavigation } from "@/composables/useArrowNavigation";
import { useSwiperAutoplay } from "@/composables/useSwiperAutoplay";

// Fetch documents
const {
  data: reviews,
  pending,
  error,
} = await useFetch("https://api.slavic.media/review");

let removeArrowNavigation: () => void;
let removeSwiperAutoplay: () => void;

onMounted(() => {
  nextTick(() => {
    const swiper = new Swiper(".swiper-reviews", {
      loop: true,
      speed: 600,
      spaceBetween: 15,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: { delay: 2000, pauseOnMouseEnter: true },
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

    removeArrowNavigation = useArrowNavigation(swiper);
    removeSwiperAutoplay = useSwiperAutoplay(swiper);

    function showStars(container: HTMLElement, rating: number) {
      container.innerHTML = "";

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

onUnmounted(() => {
  if (removeArrowNavigation) removeArrowNavigation();
  if (removeSwiperAutoplay) removeSwiperAutoplay();
});
</script>

<template>
  <section
    class="swiper swiper-reviews reveal"
    aria-labelledby="reviews-heading"
    role="region"
  >
    <h2 id="reviews-heading" class="visually-hidden">Customer Reviews</h2>
    <div class="swiper-wrapper" v-if="!pending && !error" aria-busy="false">
      <!-- Slide -->
      <figure
        v-for="review in reviews"
        :key="review._id"
        class="swiper-slide"
        role="group"
        :aria-labelledby="`review-${review._id}`"
      >
        <div class="grid-container">
          <div class="grid-item">
            <NuxtImg
              class="customer-img"
              :alt="`Profile photo of ${review.name}`"
              :title="review.name"
              :src="`https://lh3.googleusercontent.com/${review.img}=w120-h120-p-rp-mo-br100`"
              width="120"
              height="120"
              loading="lazy"
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
      </figure>
    </div>
    <div
      class="swiper-pagination"
      v-if="!pending && !error"
      aria-busy="false"
    ></div>
    <SkeletonSwiper v-else aria-busy="true" />
  </section>
</template>
<style scoped lang="postcss">
.swiper-reviews {
  border-radius: var(--border-radius-1);
  padding-bottom: calc(var(--grid-gap-2) * 2);

  .swiper-slide {
    padding: var(--grid-gap-1);
    width: var(--dimension-2);
    border-radius: var(--border-radius-1);
    background-color: rgb(var(--dark-grey-color));
    box-shadow: var(--box-shadow-1);
  }

  p {
    padding: 0;
    font-size: var(--font-size-7);
  }

  .quotes {
    font-size: 32px;
    color: white;
    padding: 0;
    margin: 0;
  }

  img {
    height: 60px;
    width: auto;
    object-fit: cover;
    border-radius: var(--border-radius-2);
    box-shadow: var(--box-shadow-1);
    animation: skeleton-loading 1s linear infinite alternate;
    margin: 0 !important;
  }

  .reviews-message {
    margin-top: var(--grid-gap-1);
  }

  .stars {
    display: inline-block;
    font-size: var(--font-size-8);
    color: gold;
  }
}
.swiper-slide .grid-container {
  display: flex;
  grid-gap: var(--grid-gap-1);

  .grid-item:nth-child(odd) {
    margin-right: none !important;
  }
}
.reviews-message {
  height: 100px;
  overflow: scroll;
  transition: max-height var(--transition-2);

  &.expanded {
    max-height: 500px;
  }
}
</style>
