<script setup lang="ts">
interface Button {
  label?: string;
  icon?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  tag?: "button" | "a" | "NuxtLink";
  href?: string;
  to?: string | object;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const props = defineProps<Button>();
const emit = defineEmits(["click"]);
</script>

<template>
  <template v-if="tag === 'button'">
    <button
      :class="['cta', variant]"
      :type="type"
      @click="$emit('click')"
      :aria-label="label"
    >
      <span :class="`pi pi-${icon} ${label ? 'mr-2' : ''}`"></span>
      {{ label }}
    </button>
  </template>
  <template v-else-if="tag === 'a'">
    <a
      :class="['cta', variant]"
      :href="href"
      :target="target"
      @click="$emit('click')"
      :aria-label="label"
    >
      <span :class="`pi pi-${icon} ${label ? 'mr-2' : ''}`"></span>

      {{ label }}
    </a>
  </template>
  <template v-else-if="tag === 'NuxtLink'">
    <NuxtLink
      :class="['cta', variant]"
      :to="to"
      @click="$emit('click')"
      :aria-label="label"
    >
      <span :class="`pi pi-${icon} ${label ? 'mr-2' : ''}`"></span>

      {{ label }}
    </NuxtLink>
  </template>
</template>
<style lang="postcss">
.cta {
  line-height: var(--grid-gap-2);
  background-color: oklch(var(--secondary-color));
  padding: var(--grid-gap-1) var(--grid-gap-2);
  color: oklch(1 0 0);
  border-radius: var(--border-radius-2);
  margin-top: var(--grid-gap-2) !important;
  max-width: fit-content;
  font-size: var(--font-size-7);
  font-family: var(--logo-font);
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  box-shadow: var(--box-shadow-1);
  white-space: nowrap;
  border: 2px solid oklch(var(--secondary-color));
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  z-index: 1;
  text-decoration: none !important;
  transition: var(--transition-1);

  &:hover {
    background-color: oklch(var(--secondary-color) / 80%);
    border: 2px solid oklch(var(--secondary-color) / 10%);
    text-decoration: none !important;
  }
}

.secondary {
  background-color: transparent;

  &:hover {
    background-color: oklch(var(--secondary-color) / 80%);
  }
}
</style>
