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

const teamMembers = ref([
  {
    id: "marcel",
    name: "Marcel H.",
    role: "Director of Photography",
    img: "https://slavic.media/img/marcel.jpg",
    flag: "flag-slovakia",
    email: "marcel@slavic.media",
    linkedin: "https://www.linkedin.com/in/marcelhajik",
  },
  {
    id: "adam",
    name: "Adam S.",
    role: "Sales & Communication",
    img: "https://slavic.media/img/adam.jpg",
    flag: "flag-czechia",
    email: "adam@slavic.media",
    linkedin: "https://www.linkedin.com/in/adamsochorec",
    github: "https://github.com/adamsochorec"
  },
  {
    id: "dominik",
    name: "Dominik T.",
    role: "Graphic Designer",
    img: "https://slavic.media/img/dominik.jpg",
    flag: "flag-slovakia",
    email: "dominik@slavic.media",
    linkedin: "https://www.linkedin.com/in/dominik-tószegi-07872a248/",
  },
  {
    id: "ferdinand",
    name: "Ferdinand P.",
    role: "Sound Engineer",
    img: "https://slavic.media/img/ferdinand.jpg",
    flag: "flag-czechia",
    email: "ferda.petrs@gmail.com",
    linkedin: "",
  },
]);

onMounted(() => {
  const ourteamSwiper = new Swiper(".swiper-ourteam", {
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
</script>

<template>
  <section class="swiper swiper-ourteam reveal">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper skills-section">
      <!-- Team Member Slide -->
      <div
        v-for="member in teamMembers"
        :key="member.id"
        class="swiper-slide"
        :id="member.id"
        role="region"
        :aria-label="member.name"
      >
        <div class="reveal">
          <svg
            :title="'Flag of ' + member.flag.split('-')[1]"
            class="note flag"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1093 1092"
            style="enable-background: new 0 0 1093 1092"
            xml:space="preserve"
          >
            <use :href="'#' + member.flag"></use>
          </svg>
          <img
            :src="member.img"
            :alt="'Portrait of ' + member.name"
            :title="member.name"
            class="reveal"
            :aria-label="'Portrait of ' + member.name"
          />
        </div>
        <section class="profile">
          <h4 class="reveal">{{ member.name }}</h4>
        
          <div class="social-icons reveal">
            <a
              :href="'mailto:' + member.email"
              :aria-label="'Email: ' + member.email"
            >
              <i title="Email" class="pi pi-envelope"></i>

            </a>
            <a
              v-if="member.linkedin"
              :href="member.linkedin"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <i title="LinkedIn" class="pi pi-linkedin"></i>
            </a>
            <a
              v-if="member.github"
              :href="member.github"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <i title="GitHub" class="pi pi-github"></i>
            </a>
          </div>
          <h6 class="reveal">
            {{member.role}}
          </h6>
        </section>
      </div>
      <!-- Team Member Slide End -->
    </div>
  </section>
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

.social-icons > *{
  margin-right: var(--grid-gap-1);
}
.social-icons a:nth-last-child() {
  margin-right: 0;
}
</style>