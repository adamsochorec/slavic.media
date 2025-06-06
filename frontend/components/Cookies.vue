<script setup>
import { ref, onMounted } from "vue";
import eventBus from "@/composables/useEventBus";

// Access runtime config
const config = useRuntimeConfig();

// State variables to manage consent status
const showConsent = ref(true);
const consentGiven = ref(false);
const consentRejected = ref(false);
const showTransition = ref(false);

// Function to check if consent has already been given or rejected
const checkConsent = () => {
  const consent = localStorage.getItem("cookieConsent");
  if (consent) {
    const consentData = JSON.parse(consent);
    const now = new Date().getTime();
    // Check if the consent is still valid (within 24 hours)
    if (now - consentData.timestamp < 24 * 60 * 60 * 1000) {
      showConsent.value = false;
      if (consentData.choice === "accept") {
        consentGiven.value = true;
        loadAfterConsentScripts();
      } else {
        consentRejected.value = true;
      }
      // Load Chatway script regardless of the choice
      loadChatwayScript();
    }
  }
};

// Function to dynamically load scripts
const loadScripts = (scripts) => {
  scripts.forEach((scriptSrc) => {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.head.appendChild(script);
  });
};

// Function to load scripts that require consent
const loadAfterConsentScripts = () => {
  const scripts = [
    `https://www.googletagmanager.com/gtag/js?id=${config.public.GOOGLE_ANALYTICS}`,
  ];
  loadScripts(scripts);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", `${config.public.GOOGLE_ANALYTICS}`);
};

// Function to load the Chatway script
const loadChatwayScript = () => {
  const chatwayScript = document.createElement("script");
  chatwayScript.id = "chatway";
  chatwayScript.async = true;
  chatwayScript.src = `https://cdn.chatway.app/widget.js?id=${config.public.CHATWAY}`;
  document.head.appendChild(chatwayScript);
};

// Function to handle acceptance of cookies
const acceptCookies = () => {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ choice: "accept", timestamp: new Date().getTime() })
  );
  consentGiven.value = true;
  showConsent.value = false;
  // Load scripts that require consent
  loadAfterConsentScripts();
  // Load Chatway script
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
  // Load Chatway script even if consent is rejected
  loadChatwayScript();
  // Reload the page to propagate the cookie removal
  location.reload();
};

// Function to revoke consent
const revokeConsent = () => {
  localStorage.removeItem("cookieConsent");
  showConsent.value = true;
  consentGiven.value = false;
  consentRejected.value = false;
  showTransition.value = true;
};

// Check consent status on component mount
onMounted(() => {
  checkConsent();
  eventBus.on("revoke-consent", revokeConsent);
});
</script>

<template>
  <transition name="slide" :css="showTransition">
    <section
      v-if="showConsent"
      class="wrapper"
      aria-labelledby="cookie-consent-title"
      role="dialog"
      aria-modal="true"
    >
      <header class="title logo-font">
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
        <Btn
          tag="button"
          label="Accept all"
          variant="primary"
          :class="{ clicked: consentGiven }"
          @click="acceptCookies"
          :aria-pressed="consentGiven.toString()"
        />
        <Btn
          tag="button"
          label="Reject"
          variant="secondary"
          :class="{ clicked: consentRejected }"
          @click="rejectCookies"
          :aria-pressed="consentRejected.toString()"
        />
      </div>
    </section>
  </transition>
</template>

<style lang="postcss" scoped>
.wrapper {
  position: fixed;
  bottom: var(--grid-gap-2);
  right: var(--grid-gap-2);
  max-width: 347px;
  width: 100%;
  background-color: var(--dark-grey-color-full);
  border-radius: var(--border-radius-1);
  -webkit-backdrop-filter: var(--blur-1);
  backdrop-filter: var(--blur-1);
  z-index: 2147483008;
  padding: var(--grid-gap-2);
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);

  @media only screen and (max-width: 667px) {
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
.title {
  display: flex;
  align-items: center;
  font-size: var(--font-size-4);
  font-family: var(--logo-font);
  color: white;
}
.info {
  margin: var(--grid-gap-1) 0;
  font-size: var(--font-size-7);
}
.grid-container {
  display: grid;
  justify-content: space-between;
  width: 100%;
  grid-gap: var(--grid-gap-2);
  grid-template-columns: repeat(2, 1fr);
}
button {
  width: 100%;
  min-width: 100%;
  justify-content: center;

  @media only screen and (max-width: 400px) {
    font-size: var(--font-size-8);
  }
}
.slide-enter-active,
.slide-leave-active {
  -webkit-transition: -webkit-transform var(--transition-2);
  -o-transition: transform var(--transition-2);
  transition: transform var(--transition-2),
    -webkit-transform var(--transition-2);
}
.slide-enter-from,
.slide-leave-to {
  -webkit-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%);
}
</style>
