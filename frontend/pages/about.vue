<script setup lang="ts">
// Meta SEO
const description =
  "Creative & Production studio based in Denmark (Kolding, Copenhagen) and Czechia (Prague). We tell stories through deep eye contact, magnificent shots, and clean design — helping your project stand out from the noise.";
const title = "About";

// SEO META
definePageMeta(
  {
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: "https://cdn.slavic.media/img/IMG_1849/thumbnail",
    ogUrl: "https://slavic.media/about",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://cdn.slavic.media/img/IMG_1849/thumbnail",
    twitterCard: "summary",
  },
  { priority: 1 }
);
</script>

<template>
  <main aria-labelledby="about-company">
    <HeroVideo :id="1013776851" alt="Behind the Scenes | Slavic Media">
    </HeroVideo>
    <!--   ABOUT START -->
    <section class="wrapper-standard" role="region">
      <hr class="semi" />
      <h1 class="docs reveal">Who <span class="gradient">We</span> Are</h1>
      <p id="about-company" class="reveal">
        {{ description }}
      </p>
      <Employees />
      <p class="reveal">
        Slavic Media is headquartered in Kolding, Denmark, with remote team
        members distributed across the kingdom and Czechia. We are bootstrapped
        (self-funded) and profitable.<br />
        We’re always on the lookout to add kind, thoughtful, and exceptionally
        talented individuals to our team.
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
      <p class="reveal">
        <a href="mailto:contact@slavic.media">Drop us a line</a> if you're
        motivated by the intersection of individual freelance professionals.
      </p>
      <br />
    </section>
    <!--   ABOUT END -->
    <EventTimeline />
  </main>
</template>
