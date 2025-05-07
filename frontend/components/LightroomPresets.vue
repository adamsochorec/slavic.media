<template>
  <section aria-labelledby="banner-title">
    <hr class="semi" />
    <div class="banner reveal">
      <div class="title flex-center">
        <div>
          <span
            style="font-size: var(--font-size-5)"
            class="pi pi-sparkles"
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
          href="https://store.slavic.media"
          target="_blank"
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
  height: 240px;
  justify-content: center;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: linear-gradient(120deg, #c71e1e, #11457e, #974242, #2b73c0);
  background-size: 300% 300%;
  animation: gradientAnimation 14s ease infinite;
}
.pi-sparkles::after {
  content: " Want the look?";
  font-family: var(--logo-font);
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.banner::before,
.banner::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  animation: blobAnimation 20s ease-in-out infinite;
  z-index: 0;
}

.banner::before {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.banner::after {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -150px;
  animation-delay: 3s;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes blobAnimation {
  0%,
  100% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.2) translate(50px, 50px);
  }
}
.title {
  position: relative;
  text-align: center;
  margin-bottom: var(--grid-gap-2);
  padding: var(--grid-gap-2);
  z-index: 1;
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
