<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/composables/useEventBus";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useRuntimeConfig } from "#app";

const isVisible = ref(false);
const formIdentifier = ref<string>("");

// Access runtime config
const config = useRuntimeConfig();
const formspreeEndpoint = `https://formspree.io/f/${config.public.FORMSPREE}`;

const router = useRouter();

onMounted(() => {
  // Listen for the custom event to show the popup
  eventBus.on("showRequestAProposal", (identifier: string) => {
    formIdentifier.value = identifier;
    isVisible.value = true;
    Fancybox.show([{ src: "#requestAProposalPopup" }]);
  });

  // Close the popup on route change
  router.afterEach(() => {
    if (isVisible.value) {
      Fancybox.close();
      isVisible.value = false;
    }
  });
});

onUnmounted(() => {
  // Clean up event listeners
  Fancybox.close();
  isVisible.value = false;
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
            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              required
              name="firstName"
              autocomplete="given-name"
            />
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              required
              name="lastName"
              autocomplete="family-name"
            />
          </div>
          <div class="input-item">
            <input
              type="email"
              placeholder="Work Email"
              id="email"
              name="email"
              required
              autocomplete="email"
            />
          </div>
          <div class="input-item">
            <input
              type="text"
              id="company"
              placeholder="Company"
              name="company"
              autocomplete="organization"
            />
          </div>
          <div class="input-item">
            <textarea
              minlength="10"
              placeholder="Project description"
              name="project"
              rows="10"
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

<style scoped lang="postcss">
.fancybox__content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius-1);
  border: var(--border-1);
  z-index: 9999999;
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
    padding: var(--grid-gap-2);
    border-radius: var(--border-radius-1);
    background: rgba(var(--dark-grey-color), 1);
    border: var(--border-1);
    line-height: normal;
    width: 100%;
    -webkit-transition: var(--transition-1);
    -o-transition: var(--transition-1);
    transition: var(--transition-1);
  }

  input:focus,
  textarea:focus {
    outline: none;
    -webkit-box-shadow: var(--box-shadow-2);
    box-shadow: var(--box-shadow-2);
    -webkit-transition: var(--transition-1);
    -o-transition: var(--transition-1);
    transition: var(--transition-1);
  }
}

@media only screen and (max-width: 415px) {
  .fancybox__content {
    padding: var(--grid-gap-3) var(--grid-gap-1);
  }
}
</style>
