<script setup lang="ts">
interface Btn {
  label: string;
  icon?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  tag?: "button" | "a" | "NuxtLink";
  href?: string;
  to?: string | object;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const props = defineProps<Btn>();
const emit = defineEmits(["click"]);
</script>

<template>
  <template v-if="tag === 'button'">
    <button :class="['cta', variant]" :type="type" @click="$emit('click')">
      <span v-if="icon" :class="`pi pi-${icon} mr-2`"></span>

      {{ label }}
    </button>
  </template>
  <template v-else-if="tag === 'a'">
    <a
      :class="['cta', variant]"
      :href="href"
      :target="target"
      @click="$emit('click')"
    >
      <span v-if="icon" :class="`pi pi-${icon} mr-2`"></span>

      {{ label }}
    </a>
  </template>
  <template v-else-if="tag === 'NuxtLink'">
    <NuxtLink :class="['cta', variant]" :to="to" @click="$emit('click')">
      <span v-if="icon" :class="`pi pi-${icon} mr-2`"></span>

      {{ label }}
    </NuxtLink>
  </template>
</template>
<style lang="scss">
.cta {
  line-height: var(--grid-gap-2);
  background-color: rgba(var(--secondary-color), 1);
  padding: var(--grid-gap-1) var(--grid-gap-2);
  color: white;
  border-radius: var(--border-radius-2);
  margin-top: var(--grid-gap-2) !important;
  max-width: -webkit-fit-content;
  max-width: -moz-fit-content;
  max-width: fit-content;
  font-size: var(--font-size-7);
  font-family: var(--logo-font);
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  -webkit-box-shadow: var(--box-shadow-1);
  box-shadow: var(--box-shadow-1);
  white-space: nowrap;
  border: 2px solid rgba(var(--secondary-color), 1);
  cursor: pointer;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 1;
  text-decoration: none !important;
}
.cta:hover {
  background-color: rgba(var(--secondary-color), 0.8);
  border: 2px solid rgba(var(--secondary-color), 0.1);
  text-decoration: none !important;
}
.cta,
.cta:hover {
  -webkit-transition: var(--transition-1);
  -o-transition: var(--transition-1);
  transition: var(--transition-1);
}
.secondary {
  background-color: transparent;
}
.secondary:hover {
  background-color: rgba(var(--secondary-color), 0.8);
}
</style>
