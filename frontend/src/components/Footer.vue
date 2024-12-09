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
    <hr style="opacity: 30%" role="separator" />
    <div class="footer-container">
      <nav class="grid-item" aria-label="Footer Navigation">
        <button @click="revokeConsent" class="footer-nav cookie-button">
          <img
            class="cookie"
            src="../assets/cookies.svg"
            alt="privacy options"
          />
          &nbsp;&nbsp;<span style="opacity: 30%" class="footer-link"
            >Cookies</span
          >
        </button>
        <span style="opacity: 30%" class="footer-link">&nbsp;|&nbsp;</span>
        <a
          aria-label="Press Kit"
          href="/assets/press-kit.zip"
          class="footer-nav footer-link"
          title="Assets"
          style="opacity: 30%"
        >
          <i
            style="font-size: var(--font-size-7)"
            aria-hidden="true"
            class="pi pi-download"
          ></i>
          &nbsp;<span>Press Kit</span>
        </a>
        <span style="opacity: 30%" class="footer-link">&nbsp;|&nbsp;</span>
        <router-link
          style="opacity: 30%"
          aria-label="Legal documents"
          to="/legal"
          class="footer-nav footer-link"
        >
          <i
            style="font-size: var(--font-size-7)"
            aria-hidden="true"
            class="pi pi-briefcase"
          ></i>
          &nbsp;<span>Legal</span>
        </router-link>
        <span style="opacity: 30%" class="footer-link">&nbsp;|&nbsp;</span>
        <p style="opacity: 30%; display: inline" title="VAT Number">
          <span class="footer-link">VAT:&nbsp;DK44081512</span>
        </p>
      </nav>
      <span style="opacity: 30%" class="footer-link">
        ©&nbsp;{{ currentYear }} Slavic Media I/S.&nbsp;<br
          class="footerBreak"
        />
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://datacvr.virk.dk/enhed/virksomhed/44081512?fritekst=slavic%20media&sideIndex=0&size=10"
          class="footer-nav"
          style="text-decoration: underline; color: white"
          >Registered company in Denmark
        </a></span
      >
    </div>
  </footer>
</template>

<style scoped>
.cookie-button {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.cookie {
  height: 10px;
  vertical-align: middle;
  width: auto;
}
.grid-item i:hover {
  color: unset;
}
.footer-link i:hover {
  color: white;
}
footer .footer-nav {
  color: rgb(var(--primary-color));
}
footer .footer-nav span,
footer .footer-nav span:hover {
  text-decoration: underline;
}

footer {
  padding: var(--grid-gap-3) var(--homepage-padding);
  background-color: rgb(var(--dark-grey-color));
  width: 100%;
  font-family: var(--content-font);
}
footer img {
  width: 70px;
  height: 100%;
  -webkit-animation: none;
  animation: none;
}

footer .footer-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  line-height: 1.5;
}
footer .footer-container .footerBreak {
  display: none;
}

footer p,
footer a,
footer span {
  font-weight: var(--paragraph-weight);
  text-shadow: none;
  color: rgb(var(--white-color));
  font-family: var(--content-font);
}
footer hr {
  margin: var(--grid-gap-2) 0 !important;
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

@media only screen and (max-width: 415px) {
  .separator-hide {
    display: none;
  }
}

@media only screen and (max-width: 850px) {
  footer {
    font-size: var(--font-size-8);
  }

  footer .footer-container:last-of-type {
    display: block;
    text-align: center;
  }

  footer .footer-container .footerBreak {
    display: block;
  }
}
</style>
