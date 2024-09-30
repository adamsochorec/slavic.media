<script setup>
import ContactDialog from "../components/ContactDialog.vue";
</script>

<template>
  <article class="wrapper-standard">
    <hr class="semi" />
    <h1 style="font-size: var(--font-size-1)">Contact</h1>
    <hr role="separator" />
    <iframe
      class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 shadow-lg"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4809020.145234018!2d6.263556528437922!3d53.946765873503985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c9fe2ecbe264d%3A0x5699de608acee414!2sSlavic%20Media!5e0!3m2!1sen!2scz!4v1727700697477!5m2!1sen!2scz"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <hr role="separator" />

    <Card>
      <template #title>Billing Address</template>
      <template #content>
        <p class="m-0">
          Langelinie 22<br />
          6000 Kolding<br />Denmark
        </p>
        <Tag icon="pi pi-clipboard"></Tag>
      </template>
    </Card>
    <hr role="separator" />
    <ContactDialog />
    <hr class="semi" />
  </article>
</template>
<style lang="scss" scoped></style>
