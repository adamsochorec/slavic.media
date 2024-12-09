<script lang="ts" setup>
import { ref, onMounted } from "vue";

const isChatVisible = ref(false);

const loadChatwayScript = () => {
  const script = document.createElement("script");
  script.id = "chatway";
  script.async = true;
  script.src = "https://cdn.chatway.app/widget.js?id=eIN2tIZBFO8j";
  document.body.appendChild(script);
};

onMounted(() => {
  isChatVisible.value = true; // Show the chat button initially
});
</script>

<template>
  <div
    v-if="isChatVisible"
    class="chat"
    @mouseover="loadChatwayScript"
    @touchstart="loadChatwayScript"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.7322 5H24.5989C26.2878 5 27.71 6.42222 27.6211 8.11111V24.1111C27.6211 24.4667 27.4433 24.7334 27.1767 24.9111H26.91C26.5544 24.9111 26.4655 24.9111 26.2878 24.7333L24.5989 23.0444V12.7333C24.5989 10.1556 22.5544 8.11111 19.9766 8.11111H7.62109C7.62109 6.42222 9.04332 5 10.7322 5ZM6.11111 9.62305H19.9778C21.6667 9.62305 23.0889 11.0453 23.0889 12.7342V28.9119C23.0889 29.2675 22.9111 29.5341 22.6444 29.7119H22.3778C22.0222 29.7119 21.9333 29.7119 21.7556 29.5341L17.3111 25.0897H6.11111C4.42222 25.0897 3 23.6675 3 21.9786V12.7342C3 11.0453 4.42222 9.62305 6.11111 9.62305Z"
        fill="white"
      ></path>
    </svg>
  </div>
</template>

<style scoped>
.chat {
  position: fixed;
  bottom: var(--grid-gap-2);
  aspect-ratio: 1/1;
  right: var(--grid-gap-2);
  background-color: rgb(var(--primary-color));
  padding: 6px;
  border-radius: var(--border-radius-2);
  z-index: 9;
  cursor: pointer;
}
.chat:hover {
  background-color: rgba(var(--primary-color), 0.8);
}
.cta,
.cta:hover {
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
</style>
