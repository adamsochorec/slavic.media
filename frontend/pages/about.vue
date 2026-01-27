<script setup lang="ts">
// Meta SEO
const description =
  "Creative & Production studio based in Copenhagen and Prague. We tell stories through deep eye contact, magnificent shots, and clean design — helping your project stand out from the noise.";
const title = "About";

// SEO META
useSeoMeta(
  {
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: "https://cdn.slavic.media/img/IMG_1849/SD",
    ogUrl: "https://slavic.media/about",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://cdn.slavic.media/img/IMG_1849/SD",
    twitterCard: "summary",
  },
  { priority: 1 }
);
</script>

<template>
  <main aria-labelledby="about-company">
    <ClientOnly>
      <HeroVideo youtube="UQCIQ8smKDM" title="Behind the Scenes" />
    </ClientOnly>
    <hr class="semi" role="separator" />
    <!-- ABOUT START -->
    <section class="wrapper-standard">
      <h1 class="docs reveal">Who <span class="gradient">We</span> Are</h1>
      <p id="about-company" class="reveal">
        {{ description }}
      </p>
      <client-only> <Employees /></client-only>
      <p class="reveal">
        We are bootstrapped (self-funded) and profitable and always on the
        lookout to add kind, thoughtful, and exceptionally talented individuals
        to our team. <a href="mailto:contact@slavic.media">Drop us a line</a> if
        you're motivated by the intersection of individual freelance
        professionals.
      </p>

      <iframe
        id="map"
        class="reveal"
        title="Slavic Media Location"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3299827.3549044663!2d11.896611755598963!3d56.25502295714493!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c9fe2ecbe264d%3A0x5699de608acee414!2sSlavic%20Media!5e0!3m2!1sen!2scz!4v1733431912038!5m2!1sen!2scz"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        style="margin: var(--grid-gap-2) 0"
      ></iframe>
      <hr class="semi" />
    </section>
    <!--   ABOUT END -->
    <EventTimeline />
  </main>
</template>
