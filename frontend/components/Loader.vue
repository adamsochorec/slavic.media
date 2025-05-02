<template>
  <div class="loader-container"><span class="loader"></span></div>
</template>

<style scoped>
/* LOADER START */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  -webkit-backdrop-filter: var(--blur-1);
  backdrop-filter: var(--blur-1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 7;
}
.loader-container .loader,
.mfp-preloader .loader {
  height: 70px;
  width: 70px;
}
.loader {
  -webkit-animation: submit-loader 1s ease infinite;
  animation: submit-loader 1s ease infinite;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom-color: rgb(var(--primary-color));
  border-radius: 50%;
  border-top-color: rgb(var(--primary-color));
  height: 18.5px;
  pointer-events: none;
  width: 18.5px;
}
@-webkit-keyframes submit-loader {
  0% {
    -webkit-transform: rotate(0turn);
    transform: rotate(0turn);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes submit-loader {
  0% {
    -webkit-transform: rotate(0turn);
    transform: rotate(0turn);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
