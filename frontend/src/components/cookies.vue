<script setup>
import { ref, onMounted } from "vue";
import eventBus from "@/eventBus";

const showConsent = ref(true);
const consentGiven = ref(false);
const consentRejected = ref(false);

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
    }
  } else {
    // Load analytics if no consent data is found
    loadAfterConsentScripts();
  }
};

const loadScripts = (scripts) => {
  scripts.forEach((scriptSrc) => {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.head.appendChild(script);
  });
};

const loadAfterConsentScripts = () => {
  const scripts = ["https://www.googletagmanager.com/gtag/js?id=G-KGTECW9SN8"];
  loadScripts(scripts);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-KGTECW9SN8");
};

const acceptCookies = () => {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ choice: "accept", timestamp: new Date().getTime() })
  );
  consentGiven.value = true;
  showConsent.value = false;
  loadAfterConsentScripts();
};

const rejectCookies = () => {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ choice: "reject", timestamp: new Date().getTime() })
  );
  consentRejected.value = true;
  showConsent.value = false;
};

const revokeConsent = () => {
  localStorage.removeItem("cookieConsent");
  showConsent.value = true;
  consentGiven.value = false;
  consentRejected.value = false;
};

onMounted(() => {
  checkConsent();
  eventBus.on("revoke-consent", revokeConsent);
});
</script>

<template>
  <section
    v-if="showConsent"
    class="wrapper"
    aria-labelledby="cookie-consent-title"
    role="dialog"
    aria-modal="true"
  >
    <header class="title">
      <i class="pi pi-cog pi-spin" aria-hidden="true"></i>
      <h2 id="cookie-consent-title">Cookie Consent</h2>
    </header>
    <p class="info">
      This website uses analytical cookies to help you have a superior and more
      relevant browsing experience on the website. <br />
      You can learn more about our policy
      <router-link to="/legal/cookie-policy">here</router-link>.
    </p>
    <div class="grid-container">
      <button
        class="button cta"
        :class="{ clicked: consentGiven }"
        @click="acceptCookies"
        aria-pressed="consentGiven"
      >
        Accept all
      </button>
      <button
        class="button cta secondary"
        :class="{ clicked: consentRejected }"
        @click="rejectCookies"
        aria-pressed="consentRejected"
      >
        Reject non-essential
      </button>
    </div>
  </section>
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
  -ms-flex-align: center;
  align-items: center;

  -webkit-column-gap: var(--grid-gap-2);

  -moz-column-gap: var(--grid-gap-2);

  column-gap: var(--grid-gap-2);
}
.title h2 {
  font-size: var(--font-size-4);
  font-family: var(--logo-font);
}
.title i {
  font-size: 23px;
}
.title i:hover {
  color: unset;
  cursor: auto;
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
    background-color: var(--dark-grey-color-full);
    border-radius: var(--border-radius-1);
    -webkit-backdrop-filter: var(--blur-1);
    backdrop-filter: var(--blur-1);
    padding: var(--grid-gap-2) var(--homepage-padding);
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    -webkit-box-shadow: var(--box-shadow-1);
    box-shadow: var(--box-shadow-1);
  }
}
</style>
