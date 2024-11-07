<script setup>
import { ref, onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

// GRID GAP
const gridGap2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-2"
);
const gridGap3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--grid-gap-3"
);

const reviewItems = ref([
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjU0bBUSLZrfY0whwOy3uybp1XNy8_EVRWagirofxyijv5jTDmAs=s72-c-rp-mo-br100",
    name: "Silvija V.",
    role: "Marketing Specialist",
    profileLink:
      "https://www.google.com/maps/contrib/100164207852691879240/reviews?hl=en-GB",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/3WMUeYxiLsH4FANm8",
    message:
      "Timetravels company that specializes on tours to Scandinavia and Lapland had the pleasure of working with an incredible team of young videographers. They were not only highly professional but also extremely thoughtful in their approach, paying close attention to every detail to ensure they captured the essence of this breathtaking region. What stood out the most was their dedication to understanding our vision. They took the time to get to know our itinerary and goals, ensuring that each moment they filmed was meaningful and aligned with our overall message. We highly recommend these videographers to anyone.",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjXLAMWur_dVziFzMUVHcio8h0BMkgbW8sUpw4KDFEcrpkztXIu8=s72-c-rp-mo-br100",
    imgTitle: "FranklinCovey, Leadership company",
    name: "Žiga B.",
    role: "Artist",
    profileLink:
      "https://www.google.com/maps/contrib/110970382095165132586/reviews?hl=en-GB",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/qCwuTZ1D1E8KKZ2J9",
    message:
      "I’m beyond satisfied with the work Slavic Media did for my exhibition! They captured the event beautifully, with photos that truly reflect the atmosphere and evoked emotions. Their post-production work was equally impressive, enhancing every detail and bringing the images to life. The team was professional, easy to work with, and made the whole process smooth. I couldn’t be happier with the results—thank you, Slavic Media!",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWKliCjpb5tKTxfmg-jhSqjGanrg583NhOCJO2SXl-PuVxnCKI=w120-h120-p-rp-mo-br100",
    name: "FranklinCovey",
    role: "Leadership company",
    profileLink:
      "https://www.google.com/maps/contrib/102868388374755508982?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/rJ68FZZt2QUpiwEh7",
    message:
      "Za FranklinCovey Česká republika mohu potvrdit, že vždy můžeme spolehnout na rychlé dodání, flexibilita, pozornost k detailům, kreativní nápady a doporučení k tomu, jak dosáhnout nejlepšího výsledku. Slavic Media drží krok s dobou a co je nejlepší - práce je baví a na výsledcích je to znát. Adame a Marceli, děkujeme!",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVp41MBuTxuz4HQIt172lk5B4Tsj2hUAFLIRZKBl0gZd_Ax=w120-h120-p-rp-mo-br100",
    name: "Armando P.",
    role: "Musician",
    profileLink:
      "https://www.google.com/maps/contrib/106744506446456654416?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/YidP9jjYv19DMXoo9",
    message:
      "Amazing services from talented young professionals. Smart solutions, serious and creative attitude. Excellent.",
  },
  {
    img: "https://lh3.googleusercontent.com/a/ACg8ocJpEE9rIHxCOIQH2O6oQH2G7MSYNf71eC5poj-WNPe8=w120-h120-p-rp-mo-br100",
    name: "Daniel D.",
    role: "Musician",
    profileLink:
      "https://www.google.com/maps/contrib/110738271589854335121?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/9oQHTwawpTKMwPKMA",
    message:
      "Adam photographed SLOEVSINDs first show at Pitstop Kolding. Great and lively pictures capturing the high energy and mood from the show - awesome work!",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWr3R2B2S2VxsEfKZXltWT611uRPhp1ViWHxYRuxj9G9q4=w120-h120-p-rp-mo-br100",
    name: "Nikos S.",
    role: "UX Researcher",
    profileLink:
      "https://www.google.com/maps/contrib/109240411528056870351?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/uD9iwoSXRzFtJEk88",
    message:
      "These guys are very talented, professional and always deliver in time. I am very happy with our collaboration as they can easily adapt to concepts and masterfully capture moments through their media art.",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjX0xNwelhtHQ_46afqwRvy8K1_gBCCVFzmw9C-GNY9nTQ=w120-h120-p-rp-mo-br100",
    name: "Bygning 5",
    role: "Collaborator",
    profileLink:
      "https://www.google.com/maps/contrib/116209661109434700092?hl=en-US",
    rating: 5,
    fullReview: "",
    message: "Collaboration with pros :)",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjUdOj4ktRKka0VAUcovtfK8anD-Utkduwcj5YrTJ7bnjGs=w120-h120-p-rp-mo-br100",
    name: "Annesofie B.",
    role: "Project Assistant",
    profileLink:
      "https://www.google.com/maps/contrib/100383834414028866094?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/gJkXFBGJeapXkBuT7",
    message:
      "Have had them take photos for a few events and they are just a great team. Good guys, easy to work with, great eye for photography. 10/10 would recommend 🙌",
  },
  {
    img: "https://lh3.googleusercontent.com/a/ACg8ocLtiYezKjjGk3MmzuuwgUbI9BNNjkq5y8xXZVNlGvKb=w120-h120-p-rp-mo-br100",
    name: "Erika H.",
    role: "Client",
    profileLink:
      "https://www.google.com/maps/contrib/108504332332452488678?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/SWzcz1S5kJubgx6B8",
    message: "They were amazing to work with. Definitely not the last collab.",
  },
  {
    img: "https://lh3.googleusercontent.com/a/ACg8ocK_dqNUXsyTgNgQCIZRtpaaYHgydI3xXSg6CaJCS7Er=w120-h120-p-rp-mo-br100",
    name: "Yaan D.",
    role: "Client",
    profileLink:
      "https://www.google.com/maps/contrib/118217763143382642144?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/7WTPUyYqP8siPYhi8",
    message:
      "Adam photographed my wedding. I was looking for someone who could pull off a combination of digital and analogue photography on the go and this guy just straight nailed it.",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjXZ14eIvhbSg9Qmpyeu_NaaYcqbgv-I6A1vJ46rin9gn8I=w120-h120-p-rp-mo-br100",
    name: "Isbjörg",
    role: "Band",
    profileLink:
      "https://www.google.com/maps/contrib/116120348225372955039?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/wCwYcBwEB7LVSLcY8",
    message: "Great photos! 🙏🔥",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWHqZSf5lbWhEHNQtRhjD7R1VPDDXILC0-_fTAdps0N0w=w120-h120-p-rp-mo-br100",
    name: "Nicole J.",
    role: "Client",
    profileLink:
      "https://www.google.com/maps/contrib/100363374932860666953?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/9n3wNNW9gonQJST49",
    message:
      "To fantastiske fyre! Slavic Media forstår at levere til tiden og i en upåklagelig kvalitet - hver gang. De mestrer at indfange de øjeblikke, der er med til at formidle den historie man vil fortælle. De største anbefalinger herfra.",
  },
  {
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVWC7FZLpPknVEpxrdB7NFfgLVs18Vs92Sfdpgo9ENmWYk=w120-h120-p-rp-mo-br100",
    name: "Janka H.",
    role: "Client",
    profileLink:
      "https://www.google.com/maps/contrib/101149448207142561689?hl=en-US",
    rating: 5,
    fullReview: "https://maps.app.goo.gl/jkGMy2hSYon4dN28A",
    message: "Amazing service! 🤩",
  },
]);

onMounted(() => {
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

  // Initialize Swiper for the reviews section
  const reviewsSwiper = new Swiper(".swiper-reviews", {
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
    loop: true,
  });

  // Function to truncate text to a specified length and add ellipsis
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
    <div class="swiper-wrapper">
      <!-- Slide -->
      <div
        v-for="(item, index) in reviewItems"
        :key="index"
        class="swiper-slide"
      >
        <div class="grid-container">
          <div class="grid-item">
            <img
              class="customer-img"
              alt="Client's Profile Photo"
              :title="item.name"
              :src="item.img"
            />
          </div>
          <div class="grid-item">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                :href="item.profileLink"
                >{{ item.name }}</a
              ><br />{{ item.role }}<br />
            </p>
            <div class="stars" :data-rating="item.rating"></div>
          </div>
        </div>
        <p class="reviews-message" :data-full-review="item.fullReview">
          {{ item.message }}
        </p>
      </div>
    </div>

    <div class="swiper-pagination"></div>
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
  font-size: var(--font-size-9);
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
  font-size: var(--font-size-9);
  color: gold;
}
</style>
