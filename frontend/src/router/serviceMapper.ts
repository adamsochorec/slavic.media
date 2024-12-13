export function getServiceComponent(id: string) {
  switch (id) {
    case "photo":
      return import("../views/Photo.vue");
    case "video":
      return import("../views/Video.vue");
    case "drone":
      return import("../views/drone.vue");
    default:
      return import("../views/404.vue");
  }
}
