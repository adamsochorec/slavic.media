<template>
  <section aria-labelledby="banner-title">
    <hr class="semi" />
    <div class="banner reveal">
      <img
        src="https://cdn.slavic.media/img/lightroom-presets/4K"
        alt="Banner showcasing Slavic Media Lightroom Presets"
      />
      <div class="title reveal">
        <h3>
          Emulate the classic 35mm and 120 film looks with
          <span class="gradient">Slavic Media’s</span>
          signature LUTs.
        </h3>
        <Btn
          tag="a"
          icon="sparkles"
          href="https://store.slavic.media"
          label="Transform Your Photos"
          variant="primary"
        />
      </div>
    </div>
    <FeatureCard
      url="https://store.slavic.media"
      title="Lightroom"
      gradient="Presets"
      img="lightroom-presets-2"
      class="hide"
      description="Emulate the classic 35mm and 120 film looks with Slavic Media’s signature LUTs"
    />
  </section>
</template>

<style scoped>
.banner {
  display: none;
}
img {
  position: relative;
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: 80% center;
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
  padding: var(--homepage-padding);
}
h3 {
  text-align: center;
}

@media only screen and (min-width: 650px) {
  .banner {
    height: var(--dimension-1);
    width: 100vw;
    position: relative;
    align-items: center;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .hide {
    display: none;
  }
  .title {
    width: 39%;
    position: absolute;
    left: 8px;
    z-index: 1;
} 
  }
  h3 {
    text-align: left;
  }
}
</style>
