<template>
  <section aria-labelledby="banner-title">
    <hr class="semi" />
    <div class="banner reveal">
      <img
        src="https://cdn.slavic.media/img/2023-05-12-08969/height=100"
        alt="Banner showcasing Slavic Media Lightroom Presets"
      />
      <div class="title flex-center">
        <div>
          <span
            style="font-size: var(--font-size-5)"
            class="pi pi-sparkles gradient"
            aria-hidden="true"
          >
          </span>
          <p id="banner-title">
            Emulate the classic 35mm and 120 film looks with Slavic Media’s
            signature LUTs for Lightroom and Photoshop.
          </p>
        </div>
        <a
          target="_blank"
          href="https://store.slavic.media"
          aria-label="Transform Your Photos"
        >
          <div class="cta">Transform Your Photos</div>
        </a>
      </div>
    </div>
  </section>
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
img {
  position: relative;
  display: block;
  width: 100%;
  -webkit-filter: var(--blur-1);
  filter: var(--blur-1);
}
.pi-sparkles::after {
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
  margin-bottom: var(--grid-gap-2);
  padding: var(--grid-gap-2);
}
@media only screen and (max-width: 500px) {
  p {
    font-size: var(--font-size-8);
  }
  .banner {
    height: var(--dimension-2);
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
