<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import eventBus from "@/composables/useEventBus";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useRuntimeConfig } from "#app";

const isVisible = ref(false);
const formIdentifier = ref<string>("");

// Access runtime config
const config = useRuntimeConfig();
const formspreeEndpoint = `https://formspree.io/f/${config.public.FORMSPREE}`;

onMounted(() => {
  eventBus.on("showRequestAProposal", (identifier: string) => {
    formIdentifier.value = identifier;
    isVisible.value = true;
    Fancybox.show([{ src: "#requestAProposalPopup" }]);
  });
});
</script>

<template>
  <div id="requestAProposalPopup" style="display: none">
    <section
      class="wrapper-narrow"
      role="dialog"
      aria-labelledby="contactFormHeading"
      aria-modal="true"
    >
      <section
        class="contact-form-section"
        role="region"
        aria-labelledby="contactFormHeading"
      >
        <h3 id="contactFormHeading">
          Request a
          <span class="gradient" role="presentation">Proposal</span>
        </h3>
        <br />
        <form
          id="contactForm"
          :action="formspreeEndpoint"
          method="POST"
          role="form"
          aria-describedby="formDescription"
        >
          <div class="input-item">
            <label for="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              required
              name="firstName"
              autocomplete="given-name"
            />
          </div>
          <div class="input-item">
            <label for="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              required
              name="lastName"
              autocomplete="family-name"
            />
          </div>
          <div class="input-item">
            <label for="email">Work Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autocomplete="email"
            />
          </div>
          <div class="input-item">
            <label for="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              autocomplete="organization"
            />
          </div>
          <div class="input-item">
            <label for="project" id="projectDescriptionLabel"
              >Project description *</label
            >
            <textarea
              minlength="10"
              name="project"
              rows="4"
              required
              id="project"
            ></textarea>
          </div>
          <input type="hidden" name="source" :value="content" />
          <p style="font-size: var(--font-size-7)">
            By submitting form you agree with our
            <NuxtLink to="/legal/privacy-policy">Privacy Policy</NuxtLink>.
          </p>
          <Btn
            tag="button"
            label="Submit"
            icon="arrow-right"
            variant="primary"
            type="submit"
          />

          <input
            type="hidden"
            name="_next"
            value="https://slavic.media/success"
          />
        </form>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
.fancybox__content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius-1);
  border: 0.5px solid rgba(255, 255, 255, 0.4);
}
button {
  min-width: 100%;
  justify-content: center;
}

.input-item {
  margin-bottom: var(--grid-gap-2);

  label,
  input,
  textarea {
    font-family: var(--content-font);
    font-optical-sizing: auto;
    font-weight: 100;
    font-style: normal;
    color: white;
    font-size: var(--font-size-6);
  }
  input,
  textarea {
    padding: var(--grid-gap-1) var(--grid-gap-2);
    border-radius: var(--border-radius-1);
    background: rgba(var(--dark-grey-color), 1);
    border: 0.5px solid rgba(255, 255, 255, 0.4);
    line-height: normal;
    width: 100%;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input:focus,
  textarea:focus {
    border-color: rgb(var(--secondary-color));
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
}

@media only screen and (max-width: 415px) {
  .fancybox__content {
    padding: var(--grid-gap-3) var(--grid-gap-1);
  }
}
</style>
