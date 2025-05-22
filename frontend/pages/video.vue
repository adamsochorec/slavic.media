<script setup lang="ts">
// Meta SEO
const description =
  "From inspiring stories to cinematic visuals, each video project is crafted to captivate, impress, and showcase your vision with creative precision.";
const title = "Video Services";

// SEO META
useSeoMeta(
  {
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: "https://cdn.slavic.media/img/video/sd",
    ogUrl: "https://slavic.media",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://cdn.slavic.media/img/video/sd",
    twitterCard: "summary",
  },
  { priority: 1 }
);
// Further services matrix
const services = [
  {
    id: "portrait",
    title: "Colorful Portrait",
    icon: "user",
    description:
      "Through rich colors and deep eye contact, each portrait captures the true essence of who you are.",
  },
  {
    id: "still",
    title: "Timeless Still",
    icon: "expand",
    description:
      "Magnificent moments from concerts, theatre, and live performances.",
  },
  {
    id: "drone",
    title: "Spectacular Drone",
    icon: "wave-pulse",
    description:
      "Whether capturing a cruise trip on the open sea or a hotel from the above.",
  },
  {
    id: "outdoor",
    title: "Immersive Outdoor",
    icon: "compass",
    description:
      "From the tundra to the desert, we specialize in capturing the raw beauty of nature.",
  },
];
</script>
<template>
  <main style="margin-top: 120px">
    <section class="wrapper-wide" aria-labelledby="video-services-heading">
      <!-- VIDEO PROJECTS START -->
      <div class="grid-container caption-container" aria-busy="false">
        <div class="grid-item reveal">
          <h1 class="docs" id="video-services-heading">
            <span class="gradient"> Video </span>
            Services
          </h1>
        </div>
        <div class="grid-item reveal">
          <p>
            From inspiring stories to cinematic visuals, each video project is
            crafted to captivate, impress, and showcase your vision with
            creative precision.
          </p>
          <Btn
            tag="button"
            label="Request a proposal"
            icon="arrow-right"
            variant="primary"
            @click="showRequestAProposal('video')"
          />
        </div>
        <br />
      </div>
      <VideoCard />
      <!-- VIDEO PROJECTS END -->
      <section aria-labelledby="colougrading-services-heading">
        <div id="colour-grading"></div>
        <hr class="hide reveal" role="separator" />
        <!-- COLOUR GRADING START-->
        <div class="grid-container caption-container">
          <div class="grid-item reveal">
            <h2 class="docs" id="colougrading-services-heading">
              Colour <span class="gradient">Grading</span>
            </h2>
          </div>
          <div class="grid-item reveal">
            <p>
              Bring your footage to life with our professional video colour
              grading. Using DaVinci Resolve, we grade boring log footage to
              unlock its full potential, delivering rich, vibrant colours across
              the depth spectrum and natural skin tones.
            </p>
            <Btn
              tag="button"
              label="Request a proposal"
              icon="arrow-right"
              variant="primary"
              @click="showRequestAProposal('colour grading')"
            />
          </div>
        </div>
        <br />
        <ColourGrading></ColourGrading>
      </section>
      <!-- COLOUR GRADING END-->
      <div id="content"></div>
      <hr class="hide reveal" role="separator" />
      <!-- CONTENT START -->
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2 class="docs" aria-label="Engaging Content">
            Engaging <span class="gradient">Content</span>
          </h2>
        </div>
        <div class="grid-item reveal">
          <p>
            Social media reels that capture your brand’s essence—engaging,
            genuine, and designed to resonate with your audience.
          </p>
          <Btn
            tag="button"
            label="Request a proposal"
            icon="arrow-right"
            variant="primary"
            @click="showRequestAProposal('content')"
          />
        </div>
      </div>
      <br />
      <Reels />
      <!-- CONTENT END -->
      <hr class="hide reveal" role="separator" />
      <div id="sound-edit"></div>
      <!-- SOUND EDIT START -->
      <div class="grid-container caption-container">
        <div class="grid-item reveal">
          <h2 class="docs" aria-label="Video Services">
            Sound<span class="gradient"> Edit</span>
          </h2>
        </div>
        <div class="grid-item reveal">
          <p>
            Production sound (the dialogue and ambient noises captured during
            shooting), foley (reproduced sounds), Walla (crowd noises), SFX
            (sound effects), Music
          </p>
          <Btn
            tag="button"
            label="Request a proposal"
            icon="arrow-right"
            variant="primary"
            @click="showRequestAProposal('sound design')"
          />
        </div>
      </div>
      <br />
      <SoundEdit class="reveal"></SoundEdit>
      <!-- SOUND EDIT END -->
    </section>
    <!-- LIGHTROOM PRESETS START -->
    <section aria-busy="false">
      <LightroomPresets />
    </section>
    <!-- LIGHTROOM PRESETS END -->
    <hr class="semi" />
    <!-- FURTHER SERVICES START -->
    <section
      id="services"
      class="wrapper-wide reveal"
      aria-labelledby="photo-services-heading"
    >
      <h3 class="docs" id="photo-services-heading">
        Discover our <span class="gradient">photo</span> services
      </h3>
      <div class="gallery">
        <LinkCard
          v-for="service in services"
          :key="service.id"
          :url="`/photo#${service.id}`"
          :title="service.title"
          :icon="service.icon"
          :description="service.description"
        />
      </div>
    </section>
    <!-- FURTHER SERVICES END -->
  </main>
</template>

<style lang="postcss" scoped>
h1 {
  text-transform: capitalize;
}
@media only screen and (min-width: 415px) {
  h1.docs,
  h2.docs {
    padding-bottom: unset;
    border-bottom: unset;
    margin-bottom: unset;
  }
}
@media only screen and (max-width: 415px) {
  h2.docs {
    margin-top: calc(2 * var(--grid-gap-3));
  }
  hr.hide {
    display: none;
  }
}
.gallery {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: var(--grid-gap-2);
  padding-bottom: var(--grid-gap-3);
  margin-bottom: -var(--grid-gap-3);

  @media only screen and (min-width: 690px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
