import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: index,
    },

    {
      path: "/blog",
      name: "blog",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/blog.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/blog/:id",
      name: "blog single",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/article.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    /*   {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        requiresAuth: true,
      },
    }, */
  ],
});

// Navigation guard that runs before each route change
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("user");
  console.log("is auth", isAuthenticated);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log("requires auth", requiresAuth);

  // If the route requires authentication and the user is not authenticated, redirect to the home page
  if (!isAuthenticated && requiresAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
