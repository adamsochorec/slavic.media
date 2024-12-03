<template>
  <div class="reveal">
    <Skeleton
      style="background-color: rgb(var(--dark-grey-color))"
      class="p-6"
      width="100%"
      height="130px"
      borderRadius="10px"
    ></Skeleton>
    <div>
      <Skeleton
        width="80%"
        height="10px"
        style="background-color: rgb(var(--dark-grey-color))"
        class="mt-2"
        borderRadius="10px"
      ></Skeleton>
      <Skeleton
        width="60%"
        style="background-color: rgb(var(--dark-grey-color))"
        class="mt-2"
        borderRadius="10px"
        height="10px"
      ></Skeleton>
      <div class="flex mt-4">
        <Skeleton
          style="background-color: rgb(var(--dark-grey-color))"
          class="mr-2"
          shape="circle"
          size="4rem"
        ></Skeleton>
        <div>
          <Skeleton
            width="10rem"
            height="10px"
            style="background-color: rgb(var(--dark-grey-color))"
            class="mb-2"
            borderRadius="10px"
          ></Skeleton>
          <Skeleton
            width="5rem"
            style="background-color: rgb(var(--dark-grey-color))"
            class="mb-2"
            height="10px"
            borderRadius="10px"
          ></Skeleton>
          <Skeleton
            style="background-color: rgb(var(--dark-grey-color))"
            borderRadius="10px"
            height="10px"
          ></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.v-else-gallery {
  grid-template-columns: repeat(3, 1fr);
}
@media only screen and (max-width: 667px) {
  .v-else-gallery {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
