<script setup>
import eventBus from "@/eventBus";

const revokeConsent = () => {
  eventBus.emit("revoke-consent");
};
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer role="contentinfo">
    <div class="footer-container">
      <nav class="social-icons" aria-label="Contact links">
        <a title="Call us" href="tel:+4550104776" aria-label="Tel: +4550104776">
          <i class="pi pi-phone"></i>
        </a>
        <a
          title="Email us"
          href="mailto:contact@slavic.media"
          aria-label="Email: contact@slavic.media"
        >
          <i class="pi pi-envelope"></i>
        </a>
      </nav>
      <nav class="social-icons" aria-label="Social media links">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://vimeo.com/slavicmedia"
          aria-label="Vimeo"
        >
          <i title="Vimeo" class="pi pi-vimeo"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/slavicmedia/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="LinkedIn"
        >
          <i title="LinkedIn" class="pi pi-linkedin"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://youtube.com/@slavicmedia"
          aria-label="YouTube"
        >
          <i title="YouTube" class="pi pi-youtube"></i>
        </a>
        <a
          href="https://www.instagram.com/slavic.media/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Instagram"
        >
          <i title="Instagram" class="pi pi-instagram fa-xl"></i>
        </a>
      </nav>
    </div>
    <hr class="quater" role="separator" />
    <div class="footer-container">
      <nav aria-label="Footer Navigation">
        <button @click="revokeConsent" class="cookie">
          <img src="../assets/cookies.svg" alt="privacy options" />
          &nbsp;&nbsp;<span class="underline">Cookies</span>
        </button>
        <span class="separator"></span>
        <a aria-label="Press Kit" href="/assets/press-kit.zip" title="Assets">
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
      </nav>
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
    </div>
  </footer>
</template>

<style scoped>
.separator {
  margin: 0 var(--grid-gap-1);
}
.separator::after {
  content: "|";
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
span,
.footer-container:last-of-type i,
footer hr {
  color: rgba(var(--white-color), 0.3);
}
a:hover span,
button span:hover,
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
footer .social-icons,
footer .language-container {
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
