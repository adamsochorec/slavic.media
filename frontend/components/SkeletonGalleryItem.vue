<template>
  <article class="reveal" aria-busy="true" aria-live="polite">
    <PrimeSkeleton
      style="background-color: oklch(var(--dark-grey-color))"
      class="p-6"
      width="100%"
      height="200px"
      borderRadius="10px"
      aria-hidden="true"
    ></PrimeSkeleton>
    <div>
      <figure class="flex mt-4 mb-4">
        <PrimeSkeleton
          style="background-color: oklch(var(--dark-grey-color))"
          class="mr-2"
          shape="circle"
          size="2.5rem"
          aria-hidden="true"
        ></PrimeSkeleton>
        <div>
          <PrimeSkeleton
            width="5rem"
            style="background-color: oklch(var(--dark-grey-color))"
            class="mb-2"
            height="10px"
            borderRadius="10px"
            aria-hidden="true"
          ></PrimeSkeleton>
          <PrimeSkeleton
            width="10rem"
            height="10px"
            style="background-color: oklch(var(--dark-grey-color))"
            class="mb-2"
            borderRadius="10px"
            aria-hidden="true"
          ></PrimeSkeleton>
        </div>
      </figure>
      <PrimeSkeleton
        width="100%"
        height="10px"
        style="background-color: oklch(var(--dark-grey-color))"
        borderRadius="10px"
        aria-hidden="true"
      ></PrimeSkeleton>
      <PrimeSkeleton
        width="60%"
        style="background-color: oklch(var(--dark-grey-color))"
        class="mt-2"
        borderRadius="10px"
        height="10px"
        aria-hidden="true"
      ></PrimeSkeleton>
    </div>
  </article>
</template>
