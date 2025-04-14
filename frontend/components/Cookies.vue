<script setup>
import { ref, onMounted } from "vue";
import eventBus from "@/composables/useEventBus";

// State variables to manage consent status
const showConsent = ref(true);
const consentGiven = ref(false);
const consentRejected = ref(false);

// Function to check if consent has already been given or rejected
const checkConsent = () => {
  const consent = localStorage.getItem("cookieConsent");
  if (consent) {
    const consentData = JSON.parse(consent);
    const now = new Date().getTime();
    if (now - consentData.timestamp < 24 * 60 * 60 * 1000) {
      showConsent.value = false;
      if (consentData.choice === "accept") {
        consentGiven.value = true;
        loadAfterConsentScripts();
      } else {
        consentRejected.value = true;
      }
      loadChatwayScript();
    }
  }
};

// Function to handle acceptance of cookies
const acceptCookies = () => {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ choice: "accept", timestamp: new Date().getTime() })
  );
  consentGiven.value = true;
  showConsent.value = false;
  loadAfterConsentScripts();
  loadChatwayScript();
};

// Function to handle rejection of cookies
const rejectCookies = () => {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ choice: "reject", timestamp: new Date().getTime() })
  );
  consentRejected.value = true;
  showConsent.value = false;
  loadChatwayScript();
  location.reload();
};

// Function to revoke consent
const revokeConsent = () => {
  localStorage.removeItem("cookieConsent");
  showConsent.value = true;
  consentGiven.value = false;
  consentRejected.value = false;
};

// Function to load scripts after consent
const loadAfterConsentScripts = () => {
  console.log("Loading scripts after consent...");
  // Add your script loading logic here
};

// Function to load Chatway script
const loadChatwayScript = () => {
  console.log("Loading Chatway script...");
  // Add your Chatway script loading logic here
};

// Check consent status on component mount
onMounted(() => {
  checkConsent();
  eventBus.on("revoke-consent", revokeConsent);
});
</script>

<template>
  <transition name="slide">
    <section
      v-if="showConsent"
      class="wrapper"
      aria-labelledby="cookie-consent-title"
      role="dialog"
      aria-modal="true"
    >
      <header class="title">
        <span id="cookie-consent-title">🍪 Cookie Consent</span>
      </header>
      <p class="info">
        This website uses analytical cookies to help you have a superior and
        more relevant browsing experience on the website. <br />
        Learn more about our
        <NuxtLink
          aria-label="Cookie Policy"
          title="Cookie Policy"
          to="/legal/cookie-policy"
          >cookie policy</NuxtLink
        >.
      </p>
      <div class="grid-container">
        <button
          class="button cta"
          :class="{ clicked: consentGiven }"
          @click="acceptCookies"
          :aria-pressed="consentGiven.toString()"
        >
          Accept all
        </button>
        <button
          class="button cta secondary"
          :class="{ clicked: consentRejected }"
          @click="rejectCookies"
          :aria-pressed="consentRejected.toString()"
        >
          Reject non-essential
        </button>
      </div>
    </section>
  </transition>
</template>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  bottom: var(--grid-gap-2);
  right: var(--grid-gap-2);
  max-width: 345px;
  width: 100%;
  background-color: var(--dark-grey-color-full);
  border-radius: var(--border-radius-1);
  -webkit-backdrop-filter: var(--blur-1);
  backdrop-filter: var(--blur-1);
  z-index: 9999999999;
  padding: var(--grid-gap-2);
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
}
.title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  color: white;
  -ms-flex-align: center;
  align-items: center;
  font-size: var(--font-size-4);
  font-family: var(--logo-font);
}
.info {
  margin: var(--grid-gap-1) 0;
  font-size: var(--font-size-7);
}
.grid-container {
  display: grid;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
  grid-gap: var(--grid-gap-2);
  grid-template-columns: repeat(2, 1fr);
}
.button {
  width: 100%;
  min-width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
/* Transition classes */
.slide-enter-active,
.slide-leave-active {
  -webkit-transition: -webkit-transform var(--transition-2);
  transition: -webkit-transform var(--transition-2);
  -o-transition: transform var(--transition-2);
  transition: transform var(--transition-2);
  transition: transform var(--transition-2),
    -webkit-transform var(--transition-2);
}
.slide-enter-from,
.slide-leave-to {
  -webkit-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%);
}
@media only screen and (max-width: 400px) {
  button {
    font-size: var(--font-size-8);
  }
}
@media only screen and (max-width: 667px) {
  .wrapper {
    bottom: 0;
    max-width: 100%;
    right: 0;
    padding: var(--grid-gap-2) var(--homepage-padding);
    border-top-left-radius: var(--border-radius-1);
    border-top-right-radius: var(--border-radius-1);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
