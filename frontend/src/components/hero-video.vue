<script setup lang="ts">
interface Props {
  id: number;
  start?: number;
  ariaLabel: string;
}
const props = defineProps<Props>();
</script>

<template>
  <section class="showcase" aria-labelledby="video-description">
    <div class="video-container">
      <iframe
        :src="`https://player.vimeo.com/video/${id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;muted=1&amp;autoplay=1&amp;loop=1&amp;controls=0#t=${start}s`"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        :title="ariaLabel"
      ></iframe>
    </div>
    <p id="video-description" class="visually-hidden">
      {{ ariaLabel }}
    </p>
    <a
      class="link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      :href="`https://vimeo.com/${id}?share=copy`"
      v-tooltip.left="{ value: 'Watch on Vimeo', autoHide: true }"
      aria-label="Watch on Vimeo"
    >
      <i class="pi pi-vimeo"></i>
    </a>
  </section>
</template>

<style scoped>
.link {
  position: absolute;
  left: var(--grid-gap-1);
  text-shadow: var(--box-shadow-1);
}
.showcase {
  height: var(--dimension-1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--dimension-1);
  overflow: hidden;
  background-position: center;
  background-size: cover;
  z-index: -1;
}
.video-container iframe {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 177.77777778vh;
  height: 56.25vw;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 415px) {
  .video-container,
  .showcase {
    height: 100vh;
  }
  .link {
    bottom: 5px;
  }
}
@media only screen and (min-width: 415px) {
  .link {
    position: absolute;
    top: calc(var(--dimension-1) - 2.7 * var(--grid-gap-1));
    left: var(--grid-gap-1);
  }
}
</style>
