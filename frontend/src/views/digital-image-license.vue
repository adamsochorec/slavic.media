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
        aria-label="Page Title: Digital Image License"
      >
        Digital Image <span class="highlited tuscher">License</span>
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
          <span class="pathname" aria-label="press"> Digital Image License</span>
        </p>
      </div>
      <hr class="reveal" role="separator" aria-label="Separator" />
      <!-- LEGAL TEXT START -->
      <h5 class="reveal">Scope of License</h5>
      <br />
      <p class="reveal">
        This license grants the purchaser a non-exclusive, non-transferable
        right to use any digital products purchased through
        <a href="https://store.slavic.media">store.slavic.media</a> and
        <a href="https://clients.slavic.media">clients.slavic.media</a>. The
        license covers all forms of digital content available for purchase,
        including but not limited to images, software tools, and educational
        materials.
      </p>
      <br /><br />
      <h5 class="reveal">Usage Restrictions</h5>
      <br />
      <p class="reveal">
        The rights granted are personal to the purchaser and are not to be
        transferred, sold, leased, sublicensed, or otherwise redistributed. The
        use of these digital products is limited to the purchaser for personal
        or business purposes, and the products must not be used in any way that
        directly competes with Slavic Media.
      </p>
      <br /><br />
      <h5 class="reveal">Intellectual Property</h5>
      <br />
      <p class="reveal">
        All digital content remains the intellectual property of Slavic Media.
        Purchasers obtain a license to use the content but do not acquire any
        title, ownership rights, or copyrights. Any trademarks, service marks,
        or copyrights associated with the digital products must not be altered
        or removed. User Responsibilities Purchasers are responsible for
        maintaining the security of their accounts and passwords associated with
        <a href="https://slavic.media">slavic.media</a> and its subdomains.
        Slavic Media is not liable for losses or damages resulting from
        unauthorized account use. Amendments and Jurisdiction Slavic Media
        reserves the right to amend the terms of this license at any time. These
        terms are governed by and construed in accordance with the laws of
        Denmark, and any disputes related to these terms will be subject to the
        exclusive jurisdiction of the courts of Denmark.
      </p>
      <!-- LEGAL TEXT END -->
    </article>
  </div>
</template>
<style lang="scss" scoped></style>
