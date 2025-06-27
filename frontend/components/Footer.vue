<script setup>
import eventBus from "@/composables/useEventBus";

const revokeConsent = () => {
  eventBus.emit("revoke-consent");
};
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer aria-labelledby="footer-heading" role="contentinfo">
    <span id="footer-heading" class="sr-only">Footer</span>
    <section class="wrapper-wide">
      <header class="services" aria-labelledby="services-footer-heading">
        <span id="services-footer-heading" class="sr-only">Our Services</span>
        <section>
          <b
            ><NuxtLink to="/video" aria-label="Video Services"
              >Video&nbsp;Services</NuxtLink
            ></b
          >
          <ul>
            <li><NuxtLink to="/video">Production</NuxtLink></li>
            <li>
              <NuxtLink to="/video#colour-grading"
                >Colour&nbsp;Grading</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/video#content"
                >Social&nbsp;Media&nbsp;Content</NuxtLink
              >
            </li>
            <li><NuxtLink to="/video#sound-edit">Sound&nbsp;Edit</NuxtLink></li>
          </ul>
        </section>
        <section>
          <b
            ><NuxtLink to="/photo" aria-label="Photo Services"
              >Photo&nbsp;Services</NuxtLink
            ></b
          >
          <ul>
            <li>
              <NuxtLink to="/photo#portrait"
                >Portrait&nbsp;Photography</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/photo#still">Still&nbsp;Photography</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/photo#drone">Aerial&nbsp;Photography</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/photo#outdoor">Outdoor&nbsp;Photography</NuxtLink>
            </li>
          </ul>
        </section>
        <section>
          <b>Subscribe</b>
          <p class="newsletter" id="register">
            Get the latest news from Slavic Media.
          </p>
          <Newsletter />
        </section>
      </header>
      <hr class="quater" aria-hidden="true" />

      <header class="footer">
        <div class="logo-links">
          <svg
            title="Logo Slavic Media"
            class="logo"
            viewBox="0 0 740 782"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
          <section class="links" aria-labelledby="quick-links-heading">
            <span id="quick-links-heading" class="sr-only">Quick Links</span>
            <a
              href="https://store.slavic.media"
              aria-label="Visit Digital Assets Portal"
              >Store&nbsp;Portal</a
            >
            <a
              href="https://clients.slavic.media"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Client Portal"
              >Client&nbsp;Portal</a
            >
            <NuxtLink
              title="Learn more about us"
              to="/about"
              aria-label="Learn more about us"
              >Who&nbsp;We&nbsp;Are</NuxtLink
            >
            <a
              title="Email us"
              href="mailto:contact@slavic.media"
              aria-label="Email us at contact@slavic.media"
              >Contact&nbsp;Us
            </a>
          </section>
        </div>
        <nav class="social-icons" aria-label="Follow us on social media">
          <a
            href="https://vimeo.com/slavicmedia"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Vimeo"
          >
            <i class="pi pi-vimeo"></i>
          </a>
          <a
            href="https://linkedin.com/company/slavicmedia/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="LinkedIn"
          >
            <i class="pi pi-linkedin"></i>
          </a>
          <a
            href="https://youtube.com/@slavicmedia"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="YouTube"
          >
            <i class="pi pi-youtube"></i>
          </a>
          <a
            href="https://instagram.com/slavic.media/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Instagram"
          >
            <i class="pi pi-instagram"></i>
          </a>
          <a
            href="https://github.com/adamsochorec/slavic.media/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="GitHub"
          >
            <i class="pi pi-github"></i>
          </a>
        </nav>
      </header>
      <hr class="quater" aria-hidden="true" />
      <header class="footer">
        <section class="copyright">
          <span
            >Copyright © {{ currentYear }} Slavic Media I/S. All rights
            reserved.</span
          >
        </section>
        <section class="links" aria-labelledby="footer-links-heading">
          <span id="footer-links-heading" class="sr-only">Footer Links</span>
          <a
            aria-label="Download our Press Kit"
            href="https://assets.slavic.media/press-kit.zip"
            title="Download Press Kit"
            >Press&nbsp;Kit</a
          >
          <NuxtLink aria-label="View our Legal page" to="/legal"
            >Legal</NuxtLink
          >
          <button
            @click="revokeConsent"
            class="cookie"
            aria-label="Manage cookie preferences"
          >
            <img
              src="../assets/cookies.svg"
              class="mr-1"
              alt="Cookie icon"
            />Cookies
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://datacvr.virk.dk/enhed/virksomhed/44081512?fritekst=slavic%20media&sideIndex=0&size=10"
            aria-label="View VAT details for Slavic Media"
            >VAT:&nbsp;DK44081512</a
          >
        </section>
      </header>
    </section>
  </footer>
</template>

<style scoped lang="postcss">
footer {
  background-color: rgb(var(--dark-grey-color));
  padding: var(--grid-gap-3) 0;
  font-family: var(--content-font);
  font-size: var(--font-size-7);
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  line-height: 2;

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-links {
      display: flex;
      align-items: center;
      gap: var(--grid-gap-2);
    }

    .social-icons {
      > * {
        margin-left: var(--grid-gap-2);
      }
      > *:first-child {
        margin-left: none;
      }
    }

    .logo {
      height: var(--grid-gap-3);
      width: auto;
      aspect-ratio: 1/1;
    }
  }

  .links {
    > * {
      border-left: var(--border-1);
      padding: 0 var(--grid-gap-1);

      &:nth-child(2) {
        border-left: none;
        padding-left: 0;
      }
    }
  }

  .copyright,
  .services li,
  .newsletter {
    color: rgba(255, 255, 255, 0.4);
  }
  .cookie {
    display: inline-flex;
    align-items: center;

    img {
      height: 8px;
      width: 17px;
    }
  }
  .services {
    display: flex;
    gap: var(--grid-gap-3);

    b a,
    b {
      color: white;
      font-weight: 100;
    }
    ul {
      list-style: none;
      margin: 0;
    }
  }
  .links > *,
  .social-icons *,
  .services a,
  .logo path {
    color: rgba(255, 255, 255, 0.6);
    fill: rgba(255, 255, 255, 0.6);
    transition: var(--transition-1);

    &:hover {
      color: white;
      fill: white;
      cursor: pointer;
    }
  }
  .logo:hover path {
    fill: white;
  }
  .links > *,
  .social-icons *,
  .logo,
  .logo path {
    transition: var(--transition-1);
  }
  hr {
    margin: var(--grid-gap-3) 0 !important;
  }
}

@media only screen and (max-width: 520px) {
  footer {
    .services {
      display: block;
      justify-content: space-between;
      align-items: center;

      > *:not(:first-child) {
        margin-top: var(--grid-gap-2);
      }
    }

    .logo {
      display: none;
    }

    .logo-links {
      gap: 0;
    }
  }
}

@media only screen and (max-width: 500px) {
  footer {
    font-size: 10px;
    .links > * {
      padding: 0 7px;
    }
  }
}

@media only screen and (max-width: 720px) {
  footer {
    .footer {
      display: block;
      justify-content: space-between;
      align-items: center;

      .links > *:first-child {
        padding-left: 0;
      }

      .social-icons {
        margin-top: var(--grid-gap-2);

        > *:first-child {
          margin-left: 0;
        }
      }
      .logo {
        height: var(--grid-gap-2);
      }
    }
  }
}
</style>
