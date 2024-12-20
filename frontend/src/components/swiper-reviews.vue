<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import review from "@/modules/review";
import { truncateText } from "@/functions/truncate-text.ts";
import { useArrowNavigation } from "@/functions/useArrowNavigation";

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
      autoplay: { delay: 1000, pauseOnMouseEnter: true },
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

    onUnmounted(() => {
      removeArrowNavigation();
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

    const reviewMessages =
      document.querySelectorAll<HTMLElement>(".reviews-message");

    reviewMessages.forEach((message) => {
      const truncated = truncateText(message.textContent || "", 170);

      if (message.textContent && message.textContent.length > 170) {
        message.textContent = truncated;

        const readMoreLink = document.createElement("a");
        readMoreLink.href = message.dataset.fullReview || "#";
        readMoreLink.textContent = "Read Full Review";
        readMoreLink.classList.add("read-more-link");
        readMoreLink.target = "_blank";
        readMoreLink.rel = "noopener noreferrer nofollow";

        const lineBreak = document.createElement("br");
        message.appendChild(lineBreak);
        message.appendChild(readMoreLink);
      }
    });
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
              {{ review.role }}
            </p>
            <div
              class="stars"
              :data-rating="review.rating"
              :aria-label="`Rating: ${review.rating} out of 5 stars`"
            ></div>
          </div>
        </div>
        <p
          class="reviews-message"
          id="`review-${review._id}`"
          :data-full-review="`https://maps.app.goo.gl/${review.fullReview}`"
        >
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
  padding: var(--grid-gap-2);
  height: var(--dimension-2);
  max-height: 256px;
  width: var(--dimension-2);
  border-radius: var(--border-radius-1);
  background-color: rgb(var(--dark-grey-color));
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.swiper-reviews {
  border-radius: var(--border-radius-1);
  height: 240px;
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
  height: 50px;
  width: 50px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-2);
  -webkit-box-shadow: var(--box-shadow-1);
  -webkit-animation: skeleton-loading 1s linear infinite alternate;
  animation: skeleton-loading 1s linear infinite alternate;
  box-shadow: var(--box-shadow-1);
}
.swiper-slide .grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: var(--grid-gap-1);
}
.swiper-reviews .reviews-message {
  margin: var(--grid-gap-1) 0;
}
.swiper-reviews .stars {
  display: inline-block;
  font-size: var(--font-size-8);
  color: gold;
}
</style>
