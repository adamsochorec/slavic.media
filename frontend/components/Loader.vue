<template>
  <div class="loader-container"><span class="loader"></span></div>
</template>

<style scoped lang="postcss">
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;

  -webkit-backdrop-filter: var(--blur-1);
  backdrop-filter: var(--blur-1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;

  .loader,
  .mfp-preloader .loader {
    height: 70px;
    width: 70px;
  }
}

.loader {
  animation: submit-loader 1s ease infinite;
  border: 2px solid oklch(1 0 0 / 80%);
  border-bottom-color: oklch(var(--primary-color));
  border-radius: 50%;
  border-top-color: oklch(var(--primary-color));
  height: 18.5px;
  pointer-events: none;
  width: 18.5px;
}

@keyframes submit-loader {
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
