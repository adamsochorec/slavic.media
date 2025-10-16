<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import eventBus from "@/composables/useEventBus";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const isVisible = ref(false);
const formIdentifier = ref<string>("");
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref<string | null>(null);

const config = useRuntimeConfig();
const formsubmitEndpoint = `https://formsubmit.co/ajax/${config.public.FORM}`;

const router = useRouter();

let Fancybox: any;

onMounted(async () => {
  // Dynamically import Fancybox only on client
  const pkg = await import("@fancyapps/ui");
  Fancybox = pkg.Fancybox;

  eventBus.on("showRequestAProposal", (identifier: string) => {
    formIdentifier.value = identifier;
    isVisible.value = true;
    Fancybox.show([{ src: "#requestAProposalPopup" }]);
  });

  router.afterEach(() => {
    if (isVisible.value) {
      Fancybox.close();
      isVisible.value = false;
    }
  });
});

onUnmounted(() => {
  if (Fancybox) {
    Fancybox.close();
    isVisible.value = false;
  }
});

onUnmounted(() => {
  Fancybox.close();
  isVisible.value = false;
});

// Handle AJAX form submission
async function handleSubmit(e: Event) {
  e.preventDefault();
  isSubmitting.value = true;
  submitError.value = null;

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  try {
    const response = await fetch(formsubmitEndpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      submitSuccess.value = true;
      form.reset();
    } else {
      const data = await response.json();
      submitError.value = data.message || "Submission failed.";
    }
  } catch (err: any) {
    submitError.value = err.message || "Submission failed.";
  } finally {
    isSubmitting.value = false;
  }
}
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
        <h3 id="contactFormHeading" v-if="!submitSuccess">
          Request a <span class="gradient" role="presentation">Proposal</span>
        </h3>
        <br v-if="!submitSuccess" />
        <form
          id="contactForm"
          @submit="handleSubmit"
          enctype="multipart/form-data"
          role="form"
          aria-describedby="formDescription"
        >
          <template v-if="!submitSuccess">
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

            <input type="hidden" name="source" :value="formIdentifier" />
            <p style="font-size: var(--font-size-7)">
              By submitting form you agree with our
              <NuxtLink to="/legal/privacy-policy">Privacy Policy</NuxtLink>.
            </p>
            <Button
              tag="button"
              label="Submit proposal"
              icon="arrow-right"
              variant="primary"
              type="submit"
              :disabled="isSubmitting"
            />
            <input type="hidden" name="_captcha" value="false" /><input
              type="hidden"
              name="_template"
              value="table"
            />
          </template>
        </form>
        <div
          v-if="submitSuccess"
          class="flex-center"
          style="text-align: center"
        >
          <DotLottieVue
            id="lottie"
            background="transparent"
            autoplay
            aria-label="Page not found animation."
            src="https://lottie.host/fb6f1870-4331-43b6-9592-657a70f94a69/lubJi7Xgi4.lottie"
          />
          <h4 class="gradient">Success!</h4>
          <p>Our team will get back to you as soon as possible</p>
          <Button
            tag="button"
            icon="arrow-right"
            label="Keep exploring"
            variant="primary"
            aria-label="Keep exploring"
            @click="
              () => {
                Fancybox.close();
                isVisible.value = false;
              }
            "
          />
        </div>
        <div v-if="submitError" style="color: red; margin-top: 1em">
          {{ submitError }}
        </div>
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
}
#lottie {
  height: 100px;
  aspect-ratio: 1/1;
  margin-bottom: var(--grid-gap-1);
}
@media only screen and (max-width: 415px) {
  .fancybox__content {
    padding: var(--grid-gap-3) var(--grid-gap-1);
  }
}
</style>
