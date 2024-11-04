<script setup>
import { ref, onMounted } from "vue";
</script>
<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <h1
        id="pagePathHeading"
        class="reveal"
        role="heading"
        aria-level="1"
        aria-label="Page Title: Cookie Policy"
      >
        Cookie <span class="highlited tuscher">Policy</span>
      </h1>

      <hr class="reveal" role="separator" aria-label="Separator" />
      <!-- LEGAL TEXT START -->
      <p class="reveal">
        This Cookie Policy (“Policy”) is meant to explain the type of cookies
        and other tracking technologies that this website may place on your
        device to improve the services and your experience when visiting us.
      </p>
      <br /><br />

      <h5 class="reveal">What are cookies?</h5>
      <br />
      <p class="reveal">
        Cookies are small pieces of text sent by us to your computer or mobile
        device to store information. Cookies are unique to your account or your
        browser, and they are used to enable features and functionality.
        Session-based cookies are automatically deleted when you close your
        browser. Persistent cookies last until you or your browser delete them
        or until they expire.
      </p>
      <br /><br />
      <h5 class="reveal">Functional cookies</h5>
      <br />
      <p class="reveal">
        We use cookies on our website for the following purpose:
      </p>

      <ol>
        <li class="reveal">
          <p>
            <u>Authentication</u>: We use cookies to determine whether or not
            you've visited our website and interactions to keep you updated
            during visits as you access different pages.

            <li class="reveal">
              <p>
                <u>Security</u>: We use cookies to enable and support security
                features, prevent fraud and detect malicious activity.
              </p>
            </li>
            <li class="reveal">
              <p>
                <u>Preferences and Features</u>: We use cookies to enable
                features, personalize your content and remember your
                preferences.
              </p>
            </li>

            <li class="reveal">
              <p class="reveal">
                <u>Performance and Analytics</u>: We use cookies to analyze how
                our services perform. These cookies help us identify and fix
                errors, understand and improve products, features and services,
                and monitor how users reach our services.
              </p>
            </li>
          </p>
        </li>
      </ol>

      <br /><br />
      <h5 class="reveal">Required cookies</h5>
      <br />
      <p class="reveal">
        These cookies are essential for our services to work as intended. You
        may disable these cookies but various parts of our services may become
        unavailable. Some of these cookies include, but are not limited to:
      </p>

      <br />
      <ol>
        <li class="reveal">
          <p>
            <u>PHPSESSID</u>: Provides a unique session identifier for Users
          </p>
        </li>
        <li class="reveal">
          <p><u>XSRF</u>: Token - Prevents Cross-site Request Forgery</p>
        </li>
      </ol>

      <br /><br />
      <h5 class="reveal">Third-Party cookies</h5>
      <br />
      <p class="reveal">
        These are third party services that we use for purposes as described:
      </p>
      <ol>
        <li class="reveal">
          <p>
            <a
              href="https://policies.google.com/privacy"
              rel="noopener noreferrer nofollow"
              target="_blank"
              >Google Analytics:</a
            >
            We use Google Analytics to help measure how users interact with our
            websites
          </p>
        </li>
        <li class="reveal">
          <p>
            <a
              href=" https://newrelic.com/termsandconditions/privacy"
              rel="noopener noreferrer nofollow"
              target="_blank"
              >New Relic</a
            >: We use New Relic to monitor the performance and errors of our
            applications
          </p>
        </li>
        <li class="reveal">
          <p>
            <a
              href="https://www.cloudflare.com/privacypolicy"
              rel="noopener noreferrer nofollow"
              target="_blank"
              >Cloudflare</a
            >: We use Cloudflare to provide application security
          </p>
        </li>
        <li class="reveal">
          <p>
            <a
              href="https://chatway.app/privacy-policy"
              rel="noopener noreferrer nofollow"
              target="_blank"
              >Chatway</a
            >: We use Chatway.app to facilitate seamless communication between
            visitors and our team
          </p>
        </li>
      </ol>

      <br /><br />
      <h5 class="reveal">How do I control cookies?</h5>
      <br />
      <p class="reveal">
        Please keep in mind that removing or blocking cookies will make parts of
        our website no longer accessible. Most browsers accept cookies
        automatically but they also give you the ability to manage cookies. You
        can typically find cookie control in your browser’s “Tools” or
        “Preferences” menu, giving you ability to disallow cookies from all or
        specific sites. For more information on how to block, manage or filter
        cookies, you can learn more about through your browser’s help file or by
        visiting websites like
        <a
          href="http://www.allaboutcookies.org"
          rel="noopener noreferrer nofollow"
          target="_blank"
          >allaboutcookies.org</a
        >
      </p>
      <br /><br />
      <h5 class="reveal">How often will you update this Cookie Statement?</h5>
      <br />
      <p class="reveal">
        From time to time, we will update this Cookie Policy in order to reflect
        changes to the cookies we use for operational, legal or regulatory
        reasons. Please visit this Cookie Policy again regularly to fully
        understand our use of cookies and other related technologies.
      </p>
      <br /><br />
      <h5 class="reveal">Contact Information</h5>
      <br />
      <p class="reveal">
        For inquiries or issues related to cookies or privacy, please contact
        Slavic Media at
        <a href="mailto:contact@slavic.media">contact@slavic.media</a>.
      </p>
      <!-- LEGAL TEXT END -->
    </article>
  </div>
</template>
<style lang="scss" scoped></style>
