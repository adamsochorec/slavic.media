<template>
  <div class="flex flex-wrap" aria-busy="true" aria-live="polite">
    <div class="w-full xl:w-6/12">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="2rem"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="2rem"
        width="10rem"
        borderRadius="10px"
        class="mb-2"
        aria-hidden="true"
      ></Skeleton>
    </div>
    <div class="w-full xl:w-6/12 pl-6">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="4rem"
        class="mb-2"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="14rem"
        class="mb-6"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="10rem"
        height="2rem"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
    </div>
  </div>
  <div class="flex justify-between mt-10" aria-busy="true" aria-live="polite">
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
