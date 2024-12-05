<template>
  <article class="reveal" aria-busy="true" aria-live="polite">
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      class="p-6"
      width="100%"
      height="130px"
      borderRadius="10px"
      aria-hidden="true"
    ></Skeleton>
    <div>
      <div class="flex mt-4 mb-4">
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          class="mr-2"
          shape="circle"
          size="4rem"
          aria-hidden="true"
        ></Skeleton>
        <div>
          <Skeleton
            width="10rem"
            height="10px"
            style="background-color: rgb(var(--dark-grey-color))"
            class="mb-2"
            borderRadius="10px"
            aria-hidden="true"
          ></Skeleton>
          <Skeleton
            width="5rem"
            style="background-color: rgb(var(--dark-grey-color))"
            class="mb-2"
            height="10px"
            borderRadius="10px"
            aria-hidden="true"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            borderRadius="10px"
            height="10px"
            aria-hidden="true"
          ></Skeleton>
        </div>
      </div>
      <Skeleton
        width="100%"
        height="10px"
        style="background-color: rgb(var(--dark-grey-color))"
        borderRadius="10px"
        aria-hidden="true"
      ></Skeleton>
      <Skeleton
        width="60%"
        style="background-color: rgb(var(--dark-grey-color))"
        class="mt-2"
        borderRadius="10px"
        height="10px"
        aria-hidden="true"
      ></Skeleton>
    </div>
  </article>
</template>
