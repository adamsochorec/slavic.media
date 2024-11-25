<script setup>
import { onMounted, nextTick } from "vue";
import $ from "jquery";
import "magnific-popup";

onMounted(() => {
  nextTick(() => {
    $(document).ready(function () {
      $("#request-a-proposal-button").on("click", function (e) {
        e.preventDefault();
        $.magnificPopup.open({
          items: {
            src: "#request-a-proposal",
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
});
</script>

<template>
  <div>
    <!-- Popup Trigger -->
    <button class="popup-with-form reveal" id="request-a-proposal-button">
      <div class="cta">Request a Proposal<i class="pi pi-arrow-right"></i></div>
    </button>

    <!-- Popup Content -->
    <div id="request-a-proposal" class="white-popup-block mfp-hide">
      <article
        class="wrapper-standard"
        role="article"
        aria-label="Contact Form"
      >
        <section
          class="contact-form-section"
          role="region"
          aria-label="Contact Form Section"
        >
          <h3 role="heading" aria-level="3">
            Request a
            <span class="gradient" role="presentation">Proposal</span>
          </h3>
          <br />
          <form
            id="contactForm"
            action="https://formspree.io/f/mwkgdyez"
            method="POST"
            role="form"
            aria-labelledby="contactFormHeading"
            aria-describedby="This form is used to request a proposal."
          >
            <div
              class="grid-container contact-form"
              role="group"
              aria-labelledby="contactFormGroupLabel"
              aria-describedby="This group contains the contact form fields."
            >
              <div class="grid-item" aria-label="Email">
                <p><label for="email">Email *</label></p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autocomplete="email"
                />
                <br />
              </div>
              <div class="grid-item" aria-label="Name">
                <p><label for="name">Name *</label></p>
                <input
                  type="text"
                  id="name"
                  required
                  name="name"
                  autocomplete="name"
                />
                <br />
              </div>
            </div>
            <div
              role="group"
              aria-label="Project Description and Submit Button"
            >
              <p><label for="project">Project description *</label></p>
              <textarea
                minlength="10"
                name="project"
                rows="4"
                required
                id="project"
              ></textarea>
              <button class="submit-btn" aria-label="Submit" role="button">
                Submit<i class="pi pi-arrow-right"></i>
              </button>
              <input
                type="hidden"
                name="_next"
                value="https://slavic.media/success"
              />
            </div>
          </form>
        </section>
      </article>
    </div>
  </div>
</template>
<style scoped>
article {
  height: var(--dimension-1);
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
  background-image: url(/img/jpg/chevron-down-solid.svg);
  background-position: right;
  background-repeat: no-repeat;
  background-size: 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
textarea {
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
