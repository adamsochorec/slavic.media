<script setup>
import eventBus from "@/composables/useEventBus";

const revokeConsent = () => {
  eventBus.emit("revoke-consent");
};
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <section class="wrapper-wide">
      <header class="services">
        <section>
          <b><NuxtLink to="/video">Video&nbsp;Services</NuxtLink></b>
          <ul>
            <li>Production</li>
            <li>Colour&nbsp;Grading</li>
            <li>Social&nbsp;Media&nbsp;Content</li>
            <li>Sound&nbsp;Edit</li>
          </ul>
        </section>
        <section>
          <b><NuxtLink to="/photo">Photo&nbsp;Services</NuxtLink></b>
          <ul>
            <li>Portrait&nbsp;Photography</li>
            <li>Still&nbsp;Photography</li>
            <li>Drone&nbsp;Photography Content</li>
            <li>Outdor&nbsp;Photography</li>
          </ul>
        </section>
      </header>
      <hr class="quater" />

      <header class="footer">
        <div class="logo-links">
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
          <section class="links">
            <a href="https://store.slavic.media" aria-label="store.slavic.media"
              >Digital&nbsp;Assets&nbsp;Portal</a
            >
            <a
              href="https://clients.slavic.media"
              target="_blank"
              aria-label="clients.slavic.media"
              >Client&nbsp;Portal</a
            >
            <NuxtLink title="Who We Are" to="/about"
              >Who&nbsp;We&nbsp;Are
            </NuxtLink>
            <a
              title="Email us"
              href="mailto:contact@slavic.media"
              aria-label="Email: contact@slavic.media"
              >Contact&nbsp;Us</a
            >
          </section>
        </div>
        <nav class="social-icons" aria-label="Social media links">
          <SocialIcon url="vimeo.com/slavicmedia" label="Vimeo" id="vimeo" />
          <SocialIcon
            url="linkedin.com/company/slavicmedia/"
            label="LinkedIn"
            id="linkedin"
          />
          <SocialIcon
            url="youtube.com/@slavicmedia"
            label="YouTube"
            id="youtube"
          />
          <SocialIcon
            url="instagram.com/slavic.media/"
            label="Instagram"
            id="instagram"
          />
          <SocialIcon
            url="github.com/adamsochorec/slavic.media/"
            label="GitHub"
            id="github"
          />
        </nav>
      </header>
      <hr class="quater" />
      <header class="footer" role="contentinfo">
        <section class="copyright">
          <span
            >Copyright © {{ currentYear }} Slavic Media I/S All rights
            reserved</span
          >
        </section>
        <section class="links">
          <a
            aria-label="Press Kit"
            href="https://assets.slavic.media/press-kit.zip"
            title="Assets"
          >
            Press&nbsp;Kit</a
          >
          <NuxtLink aria-label="Legal" to="/legal">Legal</NuxtLink>
          <button @click="revokeConsent" class="cookie">
            <img
              src="../assets/cookies.svg"
              class="mr-1"
              alt="privacy options"
            />Cookies
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://datacvr.virk.dk/enhed/virksomhed/44081512?fritekst=slavic%20media&sideIndex=0&size=10"
            >VAT:&nbsp;DK44081512</a
          >
        </section>
      </header>
    </section>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background-color: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-3) 0;
  font-family: var(--content-font);
  font-size: var(--font-size-7);
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  line-height: 1.5;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.links > * {
  border-left: var(--border-1);
  padding: 0 var(--grid-gap-1);
}
.links > *:hover {
  text-decoration: underline;
}
.links > *:first-child {
  border-left: none;
}
.logo-links {
  display: flex;
  align-items: center;
  gap: var(--grid-gap-2);
}
.copyright,
.services li {
  color: rgba(255, 255, 255, 0.4);
}
.cookie {
  display: inline-flex;
  align-items: center;
  img {
    height: 10px;
    vertical-align: middle;
    width: auto;
  }
}
.services {
  display: flex;
  gap: var(--grid-gap-3);
  line-height: 2;
}
.services ul {
  list-style: none;
  margin: 0;
}
.social-icons > * {
  margin-left: var(--grid-gap-2);
}
.social-icons > *:first-child {
  margin-left: none;
}
.logo {
  height: var(--grid-gap-3);
  width: auto;
  aspect-ratio: 1/1;
}
.links > *,
.social-icons *,
.services a,
.logo path {
  color: rgba(255, 255, 255, 0.6);
  fill: rgba(255, 255, 255, 0.6);
}
.links > *:hover,
.social-icons *:hover,
.services a:hover,
.logo:hover path {
  color: white;
  fill: white;
  cursor: pointer;
}
.links > *,
.links > *:hover,
.social-icons *,
.social-icons *:hover,
.logo,
.logo:hover path {
  transition: var(--transition-1);
}

@media only screen and (max-width: 420px) {
  .services {
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .services > *:not(:first-child) {
    margin-top: var(--grid-gap-2);
  }
  .services,
  .logo-links {
    gap: 0;
  }
  .copyright {
    margin-bottom: var(--grid-gap-2);
  }
}
@media only screen and (max-width: 500px) {
  .logo {
    display: none;
  }
  .links > * {
    padding: 0 7px;
  }
}

@media only screen and (max-width: 720px) {
  .footer {
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .links > *:first-child {
    padding-left: 0;
    line-height: 2;
  }
  .social-icons {
    margin-top: var(--grid-gap-3);
  }
  .social-icons > *:first-child {
    margin-left: 0;
  }
}
</style>
