<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import eventBus from "@/functions/eventBus";
import $ from "jquery";
import "magnific-popup";

const isVisible = ref<boolean>(false);
const content = ref<string>("");

onMounted(() => {
  eventBus.on("showRequestAProposal", (data: string) => {
    content.value = data;
    isVisible.value = true;
    nextTick(() => {
      $.magnificPopup.open({
        items: {
          src: "#requestAProposalPopup",
          type: "inline",
        },
        preloader: "false",
        focus: "#name",
        overflowY: "scroll",
        fixedContentPos: "false",
        callbacks: {
          beforeOpen: function () {
            if ($(window).width() < 700) {
              this.st.focus = false;
            } else {
              this.st.focus = "#name";
            }
          },
        },
      });
    });
  });
});
</script>

<template>
  <div>
    <!-- Popup Content -->
    <div id="requestAProposalPopup" class="white-popup-block mfp-hide">
      <section
        class="wrapper-standard"
        role="dialog"
        aria-labelledby="contactFormHeading"
        aria-modal="true"
      >
        <section
          class="contact-form-section"
          role="region"
          aria-labelledby="contactFormHeading"
        >
          <h3 id="contactFormHeading">
            Request a
            <span class="gradient" role="presentation">Proposal</span>
          </h3>
          <br />
          <form
            id="contactForm"
            action="https://formspree.io/f/mwkgdyez"
            method="POST"
            role="form"
            aria-describedby="formDescription"
          >
            <p id="formDescription" class="visually-hidden">
              This form is used to request a proposal.
            </p>
            <div id="contactFormGroupLabel" class="visually-hidden">
              Contact Form Group
            </div>
            <div
              class="grid-container contact-form"
              role="group"
              aria-labelledby="contactFormGroupLabel"
            >
              <div class="grid-item">
                <p><label for="firstName">First Name *</label></p>
                <input
                  type="text"
                  id="firstName"
                  required
                  name="firstName"
                  autocomplete="given-name"
                />
                <br />
                <p><label for="lastName">Last Name *</label></p>
                <input
                  type="text"
                  id="lastName"
                  required
                  name="lastName"
                  autocomplete="family-name"
                />
                <br />
              </div>
              <div class="grid-item">
                <p><label for="email">Work Email *</label></p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autocomplete="email"
                />
                <br />
                <p><label for="company">Company</label></p>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autocomplete="organization"
                />
                <br />
              </div>
            </div>
            <div role="group" aria-labelledby="projectDescriptionLabel">
              <p>
                <label for="project" id="projectDescriptionLabel"
                  >Project description *</label
                >
              </p>
              <textarea
                minlength="10"
                name="project"
                rows="4"
                required
                id="project"
              ></textarea>
              <button class="submit-btn" aria-label="Submit" role="button">
                Submit<i class="pi pi-arrow-right" aria-hidden="true"></i>
              </button>
              <input
                type="hidden"
                name="_next"
                value="https://slavic.media/success"
              />
            </div>
          </form>
        </section>
      </section>
    </div>
  </div>
</template>
<style scoped>
.wrapper-standard {
  max-height: var(--dimension-1);
  overflow: scroll;
}
.contact-form-section .contact-form .grid-item:nth-child(odd) {
  margin: 0 var(--grid-gap-2) 0 0;
}
.contact-form-section .contact-form .grid-item:nth-child(even) {
  margin: 0 0 0 var(--grid-gap-2);
}
.contact-form-section input,
.contact-form-section select,
.contact-form-section textarea {
  border-radius: var(--border-radius-1);
  padding: var(--grid-gap-1) var(--grid-gap-2);
  width: 100%;
  font-size: 1em;
}
.contact-form-section ::-webkit-input-placeholder {
  color: rgba(var(--white-color), 0.7);
}
.contact-form-section ::-moz-placeholder {
  color: rgba(var(--white-color), 0.7);
}
.contact-form-section :-ms-input-placeholder {
  color: rgba(var(--white-color), 0.7);
}
.contact-form-section ::-ms-input-placeholder {
  color: rgba(var(--white-color), 0.7);
}
.contact-form-section ::placeholder,
.contact-form-section input,
.contact-form-section select,
.contact-form-section textarea {
  color: rgba(var(--white-color), 0.7);
}
option .default-option {
  color: rgba(var(--white-color), 0.5);
}
.contact-form-section input,
.contact-form-section select,
.contact-form-section textarea {
  color: rgba(var(--white-color), 1);
}
.contact-form-section ::-webkit-input-placeholder,
.contact-form-section ::-moz-placeholder,
.contact-form-section :-ms-input-placeholder {
  font-family: var(--content-font);
  font-weight: var(--paragraph-weight);
  line-height: 20px;
}

.contact-form-section ::-webkit-input-placeholder {
  font-family: var(--content-font);
  font-weight: var(--paragraph-weight);
  line-height: 20px;
}

.contact-form-section ::-moz-placeholder {
  font-family: var(--content-font);
  font-weight: var(--paragraph-weight);
  line-height: 20px;
}

.contact-form-section :-ms-input-placeholder {
  font-family: var(--content-font);
  font-weight: var(--paragraph-weight);
  line-height: 20px;
}

.contact-form-section ::-ms-input-placeholder {
  font-family: var(--content-font);
  font-weight: var(--paragraph-weight);
  line-height: 20px;
}

.contact-form-section ::placeholder,
.contact-form-section input,
.contact-form-section select,
.contact-form-section textarea {
  font-family: var(--content-font);
  font-weight: var(--paragraph-weight);
  line-height: 20px;
}
.contact-form-section input,
.contact-form-section select,
.contact-form-section textarea {
  background: rgb(var(--dark-grey-color));
  border: none;
}
.contact-form-section input,
.contact-form-section select {
  margin-bottom: var(--grid-gap-1);
}
.contact-form-section input:focus,
.contact-form-section select:focus,
.contact-form-section textarea:focus {
  border: none;
  outline: 0;
}
.contact-form-section p {
  margin-bottom: var(--grid-gap-1);
}
select {
  background-color: transparent;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
@media only screen and (max-width: 375px) {
  button.submit-btn {
    font-size: var(--font-size-8);
  }
}
@media only screen and (max-width: 500px) {
  .contact-form-section .contact-form .grid-item:nth-child(even),
  .contact-form-section .contact-form .grid-item:nth-child(odd) {
    margin: 0;
  }
  .grid-container.contact-form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}
</style>
