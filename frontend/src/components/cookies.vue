<script setup>
import { ref, onMounted } from "vue";
import $ from "jquery";
import "magnific-popup";

// Configuration for third-party scripts
const cookieScripts = {
  necessary: [
    {
      id: "chatway",
      src: "https://cdn.chatway.app/widget.js?id=eIN2tIZBFO8j",
      async: true,
    },
  ],
  analytics: [
    {
      id: "google-analytics",
      src: "https://www.googletagmanager.com/gtag/js?id=G-KGTECW9SN8",
      async: true,
      init: () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-KGTECW9SN8");
      },
    },
  ],
};

// Utility functions for managing cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function loadScripts(category, enabled) {
  const scripts = cookieScripts[category];
  if (!scripts) return;

  scripts.forEach((scriptConfig) => {
    const existingScript = document.getElementById(scriptConfig.id);

    if (enabled) {
      // Add script if not already loaded
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = scriptConfig.id;
        script.src = scriptConfig.src;
        script.async = scriptConfig.async || false;
        document.head.appendChild(script);

        // Execute initialization logic if defined
        if (scriptConfig.init) {
          script.onload = scriptConfig.init;
        }
      }
    } else {
      // Remove script if loaded
      if (existingScript) {
        existingScript.remove();
      }

      // Additional cleanup for analytics
      if (category === "analytics") {
        window.dataLayer = [];
      }
    }
  });
}

// Define cookie settings
const cookieSettings = ref([
  {
    id: "necessary",
    label: "Necessary",
    description:
      "These cookies are essential for our site to be fully functional and therefore cannot be turned off.",
    disabled: true,
    checked: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "We use these cookies to understand how visitors use the website and products, so we can further improve your experience.",
    disabled: false,
    checked: getCookie("analytics") === "true",
  },
]);

onMounted(() => {
  // Open modal on page load
  $(".popup-with-cookies").magnificPopup({
    type: "inline",
    preloader: false,
    closeBtnInside: false,
    closeOnBgClick: false, // Prevent closing on background click
    enableEscapeKey: false, // Prevent closing with the escape key
  });

  $(".popup-with-cookies").magnificPopup("open");

  // Load scripts based on saved preferences
  loadScripts("necessary", true); // Always load necessary scripts
  loadScripts(
    "analytics",
    cookieSettings.value.find((setting) => setting.id === "analytics").checked
  );

  // Save button click event
  $("#save").on("click", function () {
    cookieSettings.value.forEach((setting) => {
      if (!setting.disabled) {
        const userChoice = document.getElementById(setting.id).checked;
        setCookie(setting.id, userChoice, 1);
        loadScripts(setting.id, userChoice);
      }
    });
    $.magnificPopup.close();
  });

  // Accept All button click event
  $("#accept").on("click", function () {
    cookieSettings.value.forEach((setting) => {
      if (!setting.disabled) {
        setting.checked = true;
        document.getElementById(setting.id).checked = true;
        setCookie(setting.id, true, 1);
        loadScripts(setting.id, true);
      }
    });

    // Delay closing the popup by 1 second for better UX
    setTimeout(() => {
      $.magnificPopup.close();
    }, 1000);
  });
});
</script>

<template>
  <div class="white-popup-block mfp-hide cookies">
    <article id="cookies" class="wrapper-standard" role="article">
      <section role="region">
        <h3 role="heading" aria-level="3">
          You control your
          <span class="highlited tuscher" role="presentation">data</span>
        </h3>
        <br />
        <p>
          We use cookies to tailor your experience using our website and
          products. Click “Accept All” for the best experience. Alternatively,
          you can modify our Cookie usage by accessing “Cookies Settings”.<br />You
          can learn more about our policy
          <router-link to="/legal/cookie-policy">here</router-link>
        </p>
        <hr class="semi" />
        <div
          class="settings"
          v-for="setting in cookieSettings"
          :key="setting.id"
        >
          <input
            type="checkbox"
            :id="setting.id"
            :disabled="setting.disabled"
            :checked="setting.checked"
            class="input-switch"
          />
          <label :for="setting.id">
            <strong>{{ setting.label }}</strong>
            <br />
            {{ setting.description }}
          </label>
          <br /><br />
        </div>

        <div class="buttons">
          <button id="accept" class="cta">Accept All</button>
          <button id="save" class="cta">Save Settings</button>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--grid-gap-3);
}
.buttons button {
  max-width: 100%;
}
#save {
  background-color: transparent;
}
#save:hover {
  background-color: rgba(var(--secondary-colour), 0.8);
}
label {
  font-size: var(--font-size-7);
}
.settings {
  display: grid;
  grid-template-columns: 10% 90%;
  grid-gap: 0 var(--grid-gap-3);
}

input[type="checkbox"].input-switch {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 60px;
  height: 34px;
  border-radius: 34px;
  background-color: #cccccc;
  cursor: pointer;
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 26px;
    height: 26px;
    margin: 4px;
    background-color: #ffffff;
    border-radius: 100%;
    transition: var(--transition-1);
  }

  &:checked {
    background-color: rgb(var(--secondary-colour), 1);

    &:before {
      transform: translateX(+100%);
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
