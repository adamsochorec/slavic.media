<template>
  <footer role="contentinfo">
    <div class="footer-container">
      <div
        class="social-icons"
        role="navigation"
        aria-label="Social media links"
      >
        <a
          title="Email"
          href="tel:+4550104776"
          aria-label="Tel: +4550104776"
          role="link"
        >
          <i class="pi pi-phone"></i>
        </a>
        <a
          title="Email"
          href="mailto:contact@slavic.media"
          aria-label="Email: contact@slavic.media"
          role="link"
        >
          <i class="pi pi-envelope"></i>
        </a>
      </div>
      <div
        class="social-icons"
        role="navigation"
        aria-label="Social media links"
      >
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://vimeo.com/slavicmedia"
          aria-label="Slavic Media Vimeo"
          role="link"
        >
          <i title="Vimeo" class="pi pi-vimeo"></i> </a
        ><a
          href="https://www.linkedin.com/company/slavicmedia/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Slavic Media LinkedIn"
          role="link"
        >
          <i title="LinedIn" class="pi pi-linkedin"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://youtube.com/@slavicmedia"
          aria-label="Slavic Media YouTube"
          role="link"
        >
          <i title="YouTube" class="pi pi-youtube"></i>
        </a>
        <a
          href="https://www.instagram.com/slavic.media/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Slavic Media Instagram"
          role="link"
        >
          <i title="Instagram" class="pi pi-instagram fa-xl"></i>
        </a>
      </div>
    </div>
    <hr role="separator" />
    <div class="footer-container">
      <div class="grid-item" role="navigation" aria-label="Footer Navigation">
        <a
          class="footer-nav"
          href="https://slavic.media/legal/cookie-policy"
          title="Cookie Policy"
        >
          Cookie&nbsp;Policy</a
        >
        <span>&nbsp;|&nbsp;</span>
        <a
          href="https://slavic.media/legal/terms-of-sale"
          class="footer-nav"
          title="Privacy Policy "
          >Terms of Sale</a
        >
        <span>&nbsp;|&nbsp;</span>
        <a
          href="https://slavic.media/legal/digital-image-license"
          class="footer-nav"
          title="Privacy Policy "
          >Digital Image License</a
        >

        <span class="separator-hide">&nbsp;|&nbsp;</span>
        <a
          class="footer-nav"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://datacvr.virk.dk/enhed/virksomhed/44081512?fritekst=slavic%20media&sideIndex=0&size=10"
          aria-label="CVR Number"
          role="link"
        >
          CVR:&nbsp;44081512
        </a>
      </div>
      <p class="grid-item">
        ©&nbsp;<span id="current-year"></span> Slavic Media I/S.<br
          class="footerBreak"
        />
        Registered Company in Denmark
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
/* FOOTER START */
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
footer a.footer-nav {
  color: white;
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
footer .footer-container:last-of-type,
footer hr {
  opacity: 30%;
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
/* FOOTER END */
</style>
