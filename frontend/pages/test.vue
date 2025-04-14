<template>
  <lightgallery
    class="gallery"
    :settings="{ speed: 500, plugins: plugins }"
    :onInit="onInit"
    :onBeforeSlide="onBeforeSlide"
  >
    <a
      class="gallery-item"
      data-src="//vimeo.com/112836958"
      data-sub-html="<h4>Nature</h4><p>Video by <a target='_blank' href='https://vimeo.com/charliekaye'>Charlie Kaye</a></p>"
    >
      <img src="https://cdn.slavic.media/img/thumbnail/width=300" />
    </a>
    <a
      class="gallery-item"
      data-lg-size="1280-720"
      data-src="//vimeo.com/112836958"
      data-poster="/images/demo/vimeo-video-poster.jpg"
      data-sub-html="<h4>Nature</h4><p>Video by <a target='_blank' href='https://vimeo.com/charliekaye'>Charlie Kaye</a></p>"
    >
      <img
        width="300"
        height="100"
        class="img-responsive"
        src="https://cdn.slavic.media/img/thumbnail/width=300"
      />
    </a>
  </lightgallery>
</template>

<script>
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

export default {
  name: "App",
  components: {
    Lightgallery,
  },
  data: () => ({
    plugins: [lgVideo],
  }),
};
</script>
<style lang="css">
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");

@media only screen and (max-width: 400px) {
  .gallery-item {
    height: 120px;
  }
}
@media only screen and (max-width: 575px) {
  .gallery {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
