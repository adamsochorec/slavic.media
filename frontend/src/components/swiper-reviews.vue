<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import review from "@/modules/review";

const { state, getAllReviews } = review();
const isDataLoaded = ref(false);

// GRID GAP
const gridGap2 = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--grid-gap-2")
);
const gridGap3 = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--grid-gap-3")
);

interface Review {
  _id: string;
  name: string;
  role: string;
  img: string;
  profileLink: string;
  rating: number;
  message: string;
  fullReview: string;
}

onMounted(async () => {
  await getAllReviews();
  isDataLoaded.value = true;

  nextTick(() => {
    new Swiper(".swiper-reviews", {
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

    function truncateText(text: string, maxLength: number) {
      if (text.length > maxLength) {
        let truncated = text.substring(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(" ");
        if (lastSpaceIndex > 0) {
          truncated = truncated.substring(0, lastSpaceIndex);
        }
        return {
          truncated: truncated + "...",
          full: text,
        };
      }
      return {
        truncated: text,
        full: text,
      };
    }

    const reviewMessages =
      document.querySelectorAll<HTMLElement>(".reviews-message");

    reviewMessages.forEach((message) => {
      const { truncated, full } = truncateText(message.textContent || "", 170);

      if (full.length > 170) {
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
      } else {
        message.textContent = full; // No truncation needed
      }
    });
  });
});
</script>

<template>
  <section class="swiper swiper-reviews reveal">
    <div class="swiper-wrapper" v-if="isDataLoaded">
      <!-- Slide -->
      <div
        v-for="review in state.reviews"
        :key="review._id"
        class="swiper-slide card"
      >
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="Client's Profile Photo"
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
                >{{ review.name }}</a
              ><br />{{ review.role }}<br />
            </p>
            <div class="stars" :data-rating="review.rating"></div>
          </div>
        </div>
        <p
          class="reviews-message"
          :data-full-review="`https://maps.app.goo.gl/${review.fullReview}`"
        >
          {{ review.message }}
        </p>
      </div>
    </div>
    <div class="swiper-pagination" v-if="isDataLoaded"></div>
    <div class="grid-container skeleton" v-else>
      <div>
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
      <div class="second">
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
      <div class="third">
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
      <div class="fourth">
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
</template>

<style scoped>
.grid-container.skeleton {
  display: grid;
  grid-gap: var(--grid-gap-2);
}
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
  height: 55px;
  width: 55px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: var(--border-radius-2);
  -webkit-box-shadow: var(--box-shadow-1);
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
@media only screen and (max-width: 375px) {
  .grid-container.skeleton {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-container.skeleton .third,
  .grid-container.skeleton .fourth {
    display: none;
  }
}
@media only screen and (min-width: 375px) {
  .grid-container.skeleton {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-container.skeleton .fourth {
    display: none;
  }
}
@media only screen and (min-width: 947px) {
  .grid-container.skeleton {
    grid-template-columns: repeat(4, 1fr);
  }
  .grid-container.skeleton .fourth {
    display: block;
  }
}
</style>
