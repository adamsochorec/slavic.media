<script setup>
import { ref, onMounted } from "vue";
</script>
<template>
  <div class="main" style="margin-top: 120px">
    <article class="wrapper-wide">
      <div
        class="pathname-container"
        role="region"
        aria-labelledby="pagePathHeading"
        aria-hidden="false"
      ></div>
      <h1
        id="pagePathHeading"
        class="reveal"
        role="heading"
        aria-level="1"
        aria-label="Page Title: Terms of Sale"
      >
        <span class="highlited tuscher">Terms</span> of Sale
      </h1>
      <div
        class="pathname-container reveal"
        role="navigation"
        aria-labelledby="breadcrumbsHeading"
        aria-hidden="false"
      >
        <p>
          <span class="pathname"
            ><a href="/" aria-label="Home"></a> &#8250;
          </span>
          <span class="pathname" aria-label="press">legal &#8250;</span>
          <span class="pathname" aria-label="press"> Terms of Sale</span>
        </p>
      </div>
      <hr class="reveal" role="separator" aria-label="Separator" />
      <!-- LEGAL TEXT START -->
      <h5 class="reveal">Acceptance of Terms</h5>
      <br />
      <p class="reveal">
        By purchasing from Slavic Media I/S, you agree to these Terms of Sale
        and the accompanying Digital Product License. If you disagree with any
        part of these terms, please refrain from making any purchases.
      </p>
      <br /><br />
      <h5 class="reveal">General Payment and Refunds</h5>
      <br />
      <ol>
        <li class="reveal">
          <p>
            <u>Pricing</u>: Prices for all digital products (photographs,
            Lightroom presets, courses) are as listed on Slavic Media’s website.
            Prices are subject to change without prior notice.
          </p>
        </li>
        <li class="reveal">
          <p>
            <u>Payment</u>: Payment is due at the time of purchase via the
            accepted payment methods specified on our website. Transactions must
            be completed before access to digital products is granted.
          </p>
        </li>

        <li class="reveal">
          <p>
            <u>Refunds</u>:Refunds are issued only in the event of non-delivery
            of the purchased digital product. Customers must report the
            non-delivery within 7 days of the expected delivery date to be
            eligible for a refund.
          </p>
        </li>
      </ol>
      <br /><br />
      <h5 class="reveal">Contact Information</h5>
      <br />
      <p class="reveal">
        For inquiries or issues related to purchases or licensing, please
        contact Slavic Media at
        <a href="mailto:contact@slavic.media">contact@slavic.media</a>.
      </p>
      <!-- LEGAL TEXT END -->
    </article>
  </div>
</template>
<style lang="scss" scoped></style>
