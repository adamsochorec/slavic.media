<script setup>
import { ref, onMounted } from "vue";
import useArticle from "../modules/article";
import { useRoute } from "vue-router";
import $ from "jquery";

const { getSpecificArticle, state } = useArticle();
const route = useRoute();

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificArticle(route.params.slug);
  isDataLoaded.value = true;

  // POP UP GALLERY
  $(document).ready(function () {
    $(".article-content").magnificPopup({
      delegate: "a",
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
      fixedContentPos: "false",
      overflowY: "scroll",
    });
  });
}); // COPY LINK
const copyHref = (href) => {
  navigator.clipboard.writeText(href);
};
</script>

<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
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
                {{ state.article.metadata.date }}&nbsp;⋅&nbsp;{{
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

      <div v-else class="mb-4 p-8">
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="30px"
          width="100%"
          class="mb-2"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="30px"
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
                class="mb-2"
              ></Skeleton>
              <Skeleton
                style="background-color: rgb(var(--dark-grey-color))"
                width="5rem"
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
            height="2rem"
          ></Skeleton>
        </div>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          class="mb-4"
          width="100%"
          height="250px"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="15px"
          width="100%"
          class="mb-4"
        ></Skeleton>
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          height="15px"
          width="50%"
          class="mb-4"
        ></Skeleton>
      </div>
    </article>
    <div v-if="isDataLoaded">
      <bannerLightroomPresets></bannerLightroomPresets>
    </div>
  </div>
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
</style>
