<template>
  <div class="flex justify-between" aria-busy="true" aria-live="polite">
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="24%"
      height="200px"
      borderRadius="10px"
      aria-hidden="true"
    ></Skeleton>
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="48%"
      borderRadius="10px"
      height="200px"
      aria-hidden="true"
    ></Skeleton>
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="24%"
      borderRadius="10px"
      height="200px"
      aria-hidden="true"
    ></Skeleton>
  </div>
  <div class="flex justify-between mt-4" aria-busy="true" aria-live="polite">
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="49%"
      height="200px"
      borderRadius="10px"
      aria-hidden="true"
    ></Skeleton>
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="49%"
      height="200px"
      borderRadius="10px"
      aria-hidden="true"
    ></Skeleton>
  </div>
</template>
<style scoped lang="postcss">
@media only screen and (min-width: 1280px) {
  .grid-item {
    padding-left: 30px;
  }
}
</style>
