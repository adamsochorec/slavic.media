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
            <g filter="url(#filter0_d_29_674)">
              <path
                d="M728.169 771.315C677.925 751.777 624.688 741.85 571.208 741.85C545.246 741.85 519.187 744.185 493.396 748.906L492.399 749.1C492.399 749.1 513.786 677.031 499.747 629.707C473.225 540.362 240.253 390.919 240.253 390.919C240.253 390.919 93.9737 288.923 38.7417 222.158C-0.480371 174.712 11.8313 10.5483 11.8313 10.5483C62.0754 30.0864 115.312 40.0135 168.792 40.0135C194.754 40.0135 220.813 37.6777 246.604 32.9575L247.601 32.7628C247.601 32.7628 226.214 104.832 240.253 152.156C266.775 241.501 499.747 390.944 499.747 390.944C499.747 390.944 646.026 492.94 701.258 559.706C740.48 607.152 728.169 771.315 728.169 771.315Z"
                fill="#C71E1E"
              />
              <path
                d="M730 360.433V32.7388H375.007C375.007 32.7388 320.383 141.962 730 360.433Z"
                fill="#C71E1E"
              />
              <path
                d="M10.0015 421.406V749.1H364.995C364.995 749.1 419.619 639.877 10.0015 421.406Z"
                fill="#C71E1E"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_29_674"
                x="0"
                y="0.54834"
                width="740"
                height="781"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_29_674"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_29_674"
                  result="shape"
                />
              </filter>
            </defs>
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
