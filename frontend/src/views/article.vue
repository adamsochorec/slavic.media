<script setup>
import { ref, onMounted, watch } from "vue";
import article from "../modules/article";
import { useRoute } from "vue-router";
import "magnific-popup";
import blogCard from "@/components/blog-card.vue";
import $ from "jquery";

const { getAllArticles, getSpecificArticle, state } = article();
const route = useRoute();

const isDataLoaded = ref(false);

const loadArticle = async (slug) => {
  isDataLoaded.value = false;
  await getSpecificArticle(slug);
  isDataLoaded.value = true;

  // POP UP GALLERY
  $(document).ready(function () {
    $(".article-content").magnificPopup({
      delegate: "a.reveal",
      type: "image",
      tLoading: "Loading",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        fixedContentPos: "false",
        overflowY: "scroll",
        navigateByImgClick: true,
        preload: [0, 1],
      },
      zoom: {
        enabled: true,
        duration: 300,
      },
      image: {
        tError: "Error",
        titleSrc: function (item) {
          return item.el.attr("title");
        },
      },
      callbacks: {
        elementParse: function (item) {
          item.src = item.el.attr("href");
        },
      },
    });
  });
};

onMounted(async () => {
  await getAllArticles();
  await loadArticle(route.params.slug);
});

watch(route, async (newRoute) => {
  await loadArticle(newRoute.params.slug);
});

// COPY LINK
const copyHref = (href) => {
  navigator.clipboard.writeText(href);
};
</script>

<template>
  <article class="main" style="margin-top: 120px">
    <section class="wrapper-wide">
      <div v-if="isDataLoaded">
        <h1 class="reveal">
          {{ state.article.title }}
        </h1>
        <!-- ARTICLE METADATA START -->
        <div class="article-metadata flex justify-between reveal">
          <div class="flex items-center gap-2">
            <Avatar
              :image="state.article.author.thumbnail"
              size="large"
              shape="circle"
            />
            <div>
              <b
                ><a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  :href="state.article.author.url"
                  style="font-size: var(--font-size-7)"
                  >{{ state.article.author.name }}</a
                ></b
              ><br />
              <span style="font-size: var(--font-size-7)">
                {{ state.article.metadata.formatedDate }}&nbsp;⋅&nbsp;{{
                  state.article.metadata.length
                }}
                min read</span
              >
            </div>
          </div>
          <div class="flex items-center gap-3">
            <a
              v-if="state.article.metadata.linkedin"
              target="_blank"
              rel="noopener noreferrer nofollow"
              :href="state.article.metadata.linkedin"
            >
              <i class="pi pi-linkedin"></i>
            </a>
            <button
              v-tooltip.bottom="{
                value: 'Copy link',
                autoHide: false,
              }"
              @click="
                copyHref(`https://slavic.media/blog/${state.article.slug}`)
              "
            >
              <i class="pi pi-link"></i>
            </button>
          </div>
        </div>
        <!-- ARTICLE METADATA END -->
        <div class="article-content">
          <section
            v-for="(content, index) in state.article.content"
            :key="index"
            v-html="content"
          ></section>
        </div>
      </div>
      <div v-else>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="50%"
          class="mb-4"
        ></Skeleton>
        <div class="flex justify-between mt-4">
          <div class="flex mb-4">
            <Skeleton
              style="background-color: rgb(var(--dark-grey-color))"
              shape="circle"
              size="4rem"
              class="mr-2"
            ></Skeleton>
            <div>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                width="10rem"
                height="10px"
                class="mb-2"
              ></Skeleton>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                width="5rem"
                height="10px"
                class="mb-2"
              ></Skeleton>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                height=".5rem"
              ></Skeleton>
            </div>
          </div>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            shape="circle"
            width="2rem"
            height="10px"
          ></Skeleton>
        </div>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          class="mb-4"
          width="100%"
          height="200px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="100%"
          class="mb-4"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="10px"
          width="50%"
          class="mb-4"
        ></Skeleton>
      </div>
    </section>
    <bannerLightroomPresets v-if="isDataLoaded"></bannerLightroomPresets>
    <section class="wrapper-standard">
      <div v-if="isDataLoaded">
        <hr class="semi" />
        <h3>More from <span class="gradient">Slavic Media</span> Blog</h3>
        <hr class="quater reveal" />
        <div class="grid-container">
          <div
            v-for="article in state.furtherReading"
            :key="article._id"
            role="region"
          >
            <blogCard :article="article"></blogCard>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--font-size-2);
}
.article-metadata {
  margin: var(--grid-gap-2) 0;
  color: rgb(var(--white-color));
  background: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-2);
  border-radius: var(--border-radius-1);
}
.article-metadata a:hover {
  text-decoration: underline;
}

.grid-container {
  grid-template-columns: repeat(1, 1fr);
  display: grid;
  grid-gap: var(--grid-gap-3);
  height: auto;
  border-radius: var(--border-radius-1);
  color: white;
}

@media only screen and (min-width: 400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
