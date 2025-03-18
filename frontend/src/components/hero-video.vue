<script setup lang="ts">
import { useVideoControls } from "@/functions/video-controls";

interface Props {
  id: number;
  start?: number;
  ariaLabel: string;
}
const props = defineProps<Props>();
const { iframeRef, state, muteVideo, unmuteVideo, playVideo, pauseVideo } =
  useVideoControls();
</script>

<template>
  <section class="showcase" aria-labelledby="video-description">
    <div class="video-container">
      <iframe
        ref="iframeRef"
        :src="`https://player.vimeo.com/video/${id}?badge=0&ampautopause=0&ampplayer_id=0&ampapp_id=58479&ampmuted=1&ampautoplay=1&amploop=1&ampcontrols=0#t=${start}s`"
        allow="autoplay fullscreen picture-in-picture clipboard-write"
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
    <section class="controls">
      <button
        v-if="state.isPlaying"
        class="pi pi-pause-circle play"
        @click="pauseVideo"
      ></button>
      <button v-else class="pi pi-play-circle play" @click="playVideo"></button>
      <button
        v-if="state.isMuted"
        class="pi pi-volume-off volume"
        @click="unmuteVideo"
      ></button>
      <button v-else class="pi pi-volume-up volume" @click="muteVideo"></button>
    </section>
  </section>
</template>

<style lang="sass" scoped>
@import "@/assets/base.sass"

.link
  position: absolute
  left: $grid-gap-2

.showcase
  height: $dimension-1
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  -webkit-box-pack: center
  -ms-flex-pack: center
  justify-content: center
  text-align: center

.video-container
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: $dimension-1
  overflow: hidden
  background-position: center
  background-size: cover
  z-index: -1

.video-container iframe
  -webkit-box-sizing: border-box
  box-sizing: border-box
  width: 177.77777778vh
  height: 56.25vw
  min-width: 100%
  min-height: 100%
  position: absolute
  top: 50%
  left: 50%
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  transform: translate(-50%, -50%)


@media only screen and (max-width: 415px)
  .video-container,
  .showcase
    height: 100vh

  .controls,
  .link
    bottom: $grid-gap-2


@media only screen and (min-width: 415px)
  .controls,
  .link
    top: calc($dimension-1 - 3 * $grid-gap-1)
</style>
