<template>
  <div class="grid-container skeleton" aria-busy="true" aria-live="polite">
    <figure>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        borderRadius="10px"
        class="mb-2"
        width="100%"
        height="150px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="100%"
        height="10px"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="70%"
        height="10px"
        class="mb-2"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
    </figure>
    <figure class="second">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        borderRadius="10px"
        class="mb-2"
        width="100%"
        height="150px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="100%"
        height="10px"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="70%"
        borderRadius="10px"
        height="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
    </figure>
    <figure class="third">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        borderRadius="10px"
        class="mb-2"
        width="100%"
        height="150px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="100%"
        height="10px"
        class="mb-2"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="70%"
        height="10px"
        class="mb-2"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
    </figure>
    <figure class="fourth">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        borderRadius="10px"
        class="mb-2"
        width="100%"
        height="150px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="100%"
        borderRadius="10px"
        height="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="70%"
        height="10px"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
    </figure>
  </div>
</template>
<style scoped>
.grid-container.skeleton {
  display: grid;
  grid-gap: var(--grid-gap-2);

  @media only screen and (max-width: 375px) {
    grid-template-columns: repeat(2, 1fr);

    .third,
    .fourth {
      display: none;
    }
  }

  @media only screen and (min-width: 375px) {
    grid-template-columns: repeat(3, 1fr);

    .fourth {
      display: none;
    }
  }

  @media only screen and (min-width: 947px) {
    grid-template-columns: repeat(4, 1fr);

    .fourth {
      display: block;
    }
  }
}
</style>
