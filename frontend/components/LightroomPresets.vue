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
        <Btn
          tag="a"
          label="Transform Your Photos"
          variant="primary"
          href="https://store.slavic.media"
          icon="sparkles"
          target="_blank"
          aria-label="Transform Your Photos"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  height: 240px;
  justify-content: center;
  width: 100vw;
  backdrop-filter: var(--blur-1) !important; /* Standard syntax */
  -webkit-backdrop-filter: var(--blur-1) !important; /* Chrome, Safari, Opera */
  object-fit: cover;
  object-position: center;
  position: relative;
  background: #000;
  align-items: center;
  overflow: hidden;
  display: flex;
  box-shadow: var(--box-shadow-1);

  @media only screen and (max-width: 500px) {
    height: var(--dimension-2);
  }
}

img {
  position: relative;
  display: block;
  width: 100%;
  filter: var(--blur-1);
}

.pi-sparkles::after {
  content: " Want the look?";
  font-family: var(--logo-font);
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.gradient,
.gradient::after,
.gradient::before {
  font-size: var(--font-size-4);
  text-shadow: var(--box-shadow-1);

  @media only screen and (max-width: 900px) {
    font-size: var(--font-size-2);
  }
}

.title {
  position: absolute;
  text-align: center;
  margin-bottom: var(--grid-gap-2);
  padding: var(--grid-gap-2);

  @media only screen and (max-width: 900px) {
    width: 80%;
  }

  @media only screen and (min-width: 900px) {
    width: 30%;
  }
}

@media only screen and (max-width: 500px) {
  p {
    font-size: var(--font-size-8);
  }
}
</style>
