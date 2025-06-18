<template>
  <section aria-labelledby="banner-title">
    <hr class="semi" />
    <div class="banner reveal">
      <img
        src="/lightroom-presets.png"
        alt="Banner showcasing Slavic Media Lightroom Presets"
      />
      <div class="title">
        <h3>
          Emulate the classic 35mm and 120 film looks with Slavic Media’s
          signature LUTs
        </h3>
        <Btn
          tag="a"
          href="https://store.slavic.media"
          icon="sparkles"
          label="Transform Your Photos"
          variant="primary"
          aria-label="Transform Your Photos"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  height: var(--dimension-1);
  width: 100vw;
  object-fit: cover;
  object-position: center;
  position: relative;
  background: #000;
  align-items: center;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
img {
  position: relative;
  display: block;
  width: 100%;
  object-fit: cover;
}
.pi-sparkles::after {
  content: "  ";
  font-family: var(--logo-font);
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.gradient,
.gradient::after,
.gradient::before {
  font-size: var(--font-size-4);
}
.title {
  position: absolute;
  width: 39%;
  padding-left: var(--homepage-padding);
  padding-right: var(--homepage-padding);
}
h3 {
  color: rgb(var(--dark-grey-color));
}
</style>
