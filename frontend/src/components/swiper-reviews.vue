<script setup>
import { ref, onMounted, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import useReview from "@/modules/review";
const { state, getAllReviews } = useReview();

const isDataLoaded = ref(false);

// GRID GAP
const gridGap2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-2"
);
const gridGap3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-3"
);

onMounted(async () => {
  await getAllReviews();
  isDataLoaded.value = true;

  // Function to display stars based on the rating value
  function showStars(container, rating) {
    container.innerHTML = ""; // Clear any existing content

    // Create stars based on the rating
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "stars";

      // Fill the star if it's within the rating
      if (i <= rating) {
        star.innerHTML = "★"; // Use a star symbol
      } else {
        star.innerHTML = "☆"; // Use an empty star symbol
      }

      // Append the star to the container
      container.appendChild(star);
    }
  }

  // Get all elements with the "stars" class
  const starContainers = document.querySelectorAll(".stars");

  // Iterate through each element and display stars based on the data-rating attribute
  starContainers.forEach(function (starContainer) {
    const rating = parseInt(starContainer.getAttribute("data-rating"), 10);
    showStars(starContainer, rating);
  });

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
        375: {
          slidesPerView: 2,
        },
        620: {
          slidesPerView: 3,
        },
        947: {
          slidesPerView: 4,
        },
      },
      // Optional parameters
      direction: "horizontal",
    });
  });

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return {
        truncated: text.substring(0, maxLength) + "...",
        full: text,
      };
    }
    return {
      truncated: text,
      full: text,
    };
  }

  // Apply truncation to review messages in Swiper reviews
  const reviewMessages = document.querySelectorAll(".reviews-message");

  reviewMessages.forEach((message) => {
    const { truncated, full } = truncateText(message.textContent, 170);

    if (full.length > 170) {
      message.textContent = truncated;

      // Create "Read Full Review" link
      const readMoreLink = document.createElement("a");
      readMoreLink.href = message.dataset.fullReview;
      readMoreLink.textContent = "Read Full Review";
      readMoreLink.classList.add("read-more-link");
      readMoreLink.target = "_blank";
      readMoreLink.rel = "noopener noreferrer nofollow";

      // Append a line break and the link to the message
      const lineBreak = document.createElement("br");
      message.appendChild(lineBreak);
      message.appendChild(readMoreLink);
    } else {
      message.textContent = full; // No truncation needed
    }
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
        class="swiper-slide"
      >
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="Client's Profile Photo"
              :title="review.name"
              :src="`https://lh3.googleusercontent.com/a-/${review.img}=w120-h120-p-rp-mo-br100`"
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
    <div class="swiper-wrapper" v-else>
      <div class="swiper-slide" v-for="n in 4" :key="n">
        <Skeleton
          borderRadius="10px"
          class="mb-2"
          width="100%"
          height="150px"
        ></Skeleton>
        <Skeleton width="100%" height="15px" class="mb-2"></Skeleton>
        <Skeleton width="70%" height="15px" class="mb-2"></Skeleton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swiper-reviews .swiper-slide {
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
.swiper-reviews .grid-container {
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

/* @media only screen and (max-width: 440px) {
  .swiper-reviews .swiper-slide {
    padding: var(--grid-gap-1);
  }
  .swiper-reviews {
    border-radius: var(--border-radius-1);
    height: 240px;
  }
  .swiper-reviews img {
    height: var(--grid-gap-3);
    width: var(--grid-gap-3);
  }
} */
</style>
