<script setup></script>
<template>
  <div>
    <hr class="semi" />
    <div class="banner">
      <img src="https://slavic.media/img/2023-05-12-08969.jpg" />
      <div class="title flex-center">
        <div>
          <span
            style="font-size: var(--font-size-5)"
            class="pi pi-sparkles gradient"
          >
          </span>
          <p>
            Emulate the classic 35mm and 120 film looks with Slavic Media’s
            signature LUTs for Lightroom and Photoshop.
          </p>
        </div>
        <a target="_blank" href="https://store.slavic.media">
          <div class="cta">
            Transform Your Photos <i class="pi pi-arrow-right"></i>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.banner {
  height: 240px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100vw;
  backdrop-filter: var(--blur-1) !important; /* Standard syntax */
  -webkit-backdrop-filter: var(--blur-1) !important; /* Chrome, Safari, Opera */
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  position: relative;
  background: #000;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}

.gradient {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(255, 255, 255, 1)),
    color-stop(35%, rgba(199, 30, 30, 1)),
    to(rgba(17, 69, 126, 1))
  );
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0%,
    rgba(199, 30, 30, 1) 35%,
    rgba(17, 69, 126, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(199, 30, 30, 1) 35%,
    rgba(17, 69, 126, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
img {
  position: relative;
  display: block;
  opacity: 0.5;
  width: 100%;
  -webkit-filter: var(--blur-1);
  filter: var(--blur-1);
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transition: all 350ms ease-in-out;
  -o-transition: all 350ms ease-in-out;
  transition: all 350ms ease-in-out;
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}

.gradient::after {
  content: " Want the look?";
  font-family: var(--logo-font);
}
.gradient,
.gradient::after,
.gradient::before {
  font-size: var(--font-size-4);
  text-shadow: var(--box-shadow-1);
}
.title {
  position: absolute;
  text-align: center;
  padding: var(--grid-gap-2);
}
@media only screen and (max-width: 500px) {
  p {
    font-size: var(--font-size-8);
  }
}
@media only screen and (max-width: 900px) {
  .title {
    width: 80%;
  }
  .gradient,
  .gradient::after,
  .gradient::before {
    font-size: var(--font-size-2);
  }
}
@media only screen and (min-width: 900px) {
  .title {
    width: 30%;
  }
}
</style>
