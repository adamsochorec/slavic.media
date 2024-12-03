<template>
  <div class="flex flex-wrap">
    <div class="w-full xl:w-6/12">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="2rem"
        borderRadius="10px"
        class="mb-2"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="2rem"
        width="10rem"
        borderRadius="10px"
        class="mb-2"
      ></Skeleton>
    </div>
    <div class="w-full xl:w-6/12 pl-6">
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        height="4rem"
        class="mb-2"
        borderRadius="10px"
      ></Skeleton>

      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="14rem"
        class="mb-6"
        borderRadius="10px"
      ></Skeleton>
      <Skeleton
        style="background-color: rgb(var(--dark-grey-color))"
        width="10rem"
        height="2rem"
        borderRadius="10px"
      ></Skeleton>
    </div>
  </div>
  <div class="flex justify-between mt-10">
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="24%"
      height="200px"
      borderRadius="10px"
    ></Skeleton>
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="48%"
      borderRadius="10px"
      height="200px"
    ></Skeleton>
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="24%"
      borderRadius="10px"
      height="200px"
    ></Skeleton>
  </div>
  <div class="flex justify-between mt-4">
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="49%"
      height="200px"
      borderRadius="10px"
    ></Skeleton>
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      width="49%"
      height="200px"
      borderRadius="10px"
    ></Skeleton>
  </div>
</template>
