<script setup>
import eventBus from "@/functions/event-bus";

const revokeConsent = () => {
  eventBus.emit("revoke-consent");
};
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer role="contentinfo">
    <div class="footer-container">
      <nav>
        <router-link to="/" aria-label="Home">
          <svg
            title="Logo Slavic Media"
            class="logo"
            viewBox="0 0 740 782"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- SVG content -->
          </svg>
        </router-link>
      </nav>
      <nav class="social-icons" aria-label="Social media links">
        <SocialIcon href="vimeo.com/slavicmedia" label="Vimeo" id="vimeo" />
        <SocialIcon
          href="linkedin.com/company/slavicmedia/"
          label="LinkedIn"
          id="linkedin"
        />
        <SocialIcon
          href="youtube.com/@slavicmedia"
          label="YouTube"
          id="youtube"
        />
        <SocialIcon
          href="instagram.com/slavic.media/"
          label="Instagram"
          id="instagram"
        />
        <SocialIcon
          href="github.com/adamsochorec/slavic.media/"
          label="GitHub"
          id="github"
        />
      </nav>
    </div>
    <hr role="separator" />
    <div class="footer-container">
      <nav aria-label="Footer Navigation">
        <button @click="revokeConsent" class="cookie">
          <img src="../assets/cookies.svg" alt="privacy options" />
          &nbsp;&nbsp;<span class="underline">Cookies</span>
        </button>
        <span class="separator"></span>
        <a
          aria-label="Press Kit"
          href="https://assets.slavic.media/press-kit.zip"
          title="Assets"
        >
          <i
            style="font-size: var(--font-size-7)"
            aria-hidden="true"
            class="pi pi-download"
          ></i>
          &nbsp;<span class="underline">Press Kit</span>
        </a>
        <span class="separator"></span>
        <router-link aria-label="Legal documents" to="/legal">
          <i
            style="font-size: var(--font-size-7)"
            aria-hidden="true"
            class="pi pi-briefcase"
          ></i>
          &nbsp;<span class="underline">Legal</span>
        </router-link>
        <span class="separator"></span>
        <a
          title="Email us"
          href="mailto:contact@slavic.media"
          aria-label="Email: contact@slavic.media"
        >
          <i
            style="font-size: var(--font-size-7)"
            aria-hidden="true"
            class="pi pi-envelope"
          ></i>
          &nbsp;<span class="underline">Contact</span>
        </a>
        <span class="separator hide-min"></span>
        <br class="hide-max" />

        <span>
          ©&nbsp;{{ currentYear }} Slavic Media I/S.<span
            class="separator"
          ></span
          >VAT:&nbsp;DK44081512
        </span>
        <span class="separator hide-min"></span>
        <br class="hide-max" />
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://datacvr.virk.dk/enhed/virksomhed/44081512?fritekst=slavic%20media&sideIndex=0&size=10"
          ><span class="underline">Registered company in Denmark</span>
          <country-flag class="flag" country="dk" size="small" />
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.underline {
  text-decoration-skip-ink: auto;
}
.logo {
  height: var(--grid-gap-2);
}
.logo path {
  fill: white;
}
.logo:hover path {
  fill: rgb(var(--primary-color));
}
.logo,
.logo:hover {
  transition: var(--transition-1);
}
.separator {
  margin: 0 5px;
}
nav {
  line-height: normal;
}
.separator::after {
  content: "⋅";
  font-size: var(--font-size-3);
  vertical-align: middle;
}
.flag {
  vertical-align: middle;
  opacity: 30%;
}
a:hover .flag {
  opacity: 100%;
}
.cookie {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.cookie img {
  height: 10px;
  vertical-align: middle;
  width: auto;
}
footer {
  padding: var(--grid-gap-3) var(--homepage-padding);
  background-color: rgb(var(--dark-grey-color));
  width: 100%;
  font-family: var(--content-font);
}
.footer-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  line-height: 2;
}
.footer-container:last-of-type {
  display: block;
  text-align: center;
}
.hide-max {
  display: none;
}
footer hr {
  margin: var(--grid-gap-1) 0;
}
span,
.footer-container:last-of-type i,
footer hr {
  color: rgba(var(--white-color), 0.3);
}
a:hover span,
button.cookie:hover span,
a .flag,
a:hover .flag,
.footer-container:last-of-type a:hover i {
  color: rgba(var(--white-color), 1);
}
a span,
button span,
a:hover span,
button span:hover {
  transition: var(--transition-1);
}
/* SOCIAL ICONS START */
footer .social-icons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-decoration: none;
}

.social-icons a:not(.social-icons a:nth-last-child(1)) {
  margin-right: var(--grid-gap-1);
}
.social-icons a:nth-child(5) {
  margin-right: 0;
}
/* SOCIAL ICONS END */

@media only screen and (max-width: 850px) {
  .hide-max {
    display: block;
  }
  .hide-min {
    display: none;
  }
  footer {
    font-size: var(--font-size-8);
  }
}
</style>
