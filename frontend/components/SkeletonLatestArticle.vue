<template>
  <figure class="container">
    <PrimeSkeleton
      style="background-color: oklch(var(--dark-grey-color))"
      height="300px"
      borderRadius="10px"
      class="mb-6"
      aria-hidden="true"
    ></PrimeSkeleton>
    <figure>
      <PrimeSkeleton
        style="background-color: oklch(var(--dark-grey-color))"
        height="15px"
        width="100%"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></PrimeSkeleton>
      <PrimeSkeleton
        style="background-color: oklch(var(--dark-grey-color))"
        height="15px"
        width="70%"
        borderRadius="10px"
        class="mb-4"
        aria-hidden="true"
      ></PrimeSkeleton>
      <PrimeSkeleton
        style="background-color: oklch(var(--dark-grey-color))"
        height="10px"
        width="100%"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></PrimeSkeleton>
      <PrimeSkeleton
        style="background-color: oklch(var(--dark-grey-color))"
        height="10px"
        width="100%"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></PrimeSkeleton>
      <PrimeSkeleton
        style="background-color: oklch(var(--dark-grey-color))"
        height="10px"
        width="80%"
        borderRadius="10px"
        class="mb-6"
        aria-hidden="true"
      ></PrimeSkeleton>
      <div class="flex">
        <PrimeSkeleton
          style="background-color: oklch(var(--dark-grey-color))"
          shape="circle"
          size="2rem"
          class="mr-2"
        ></PrimeSkeleton>
        <PrimeSkeleton
          style="background-color: oklch(var(--dark-grey-color))"
          height="10px"
          width="50%"
          borderRadius="10px"
          class="mb-2"
          aria-hidden="true"
        ></PrimeSkeleton>
      </div>
    </figure>
  </figure>
</template>
<style scoped lang="postcss">
.container {
  display: grid;
  grid-template-columns: 60% 38%;
  grid-gap: 0 var(--grid-gap-3);

  @media only screen and (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
}
</style>
