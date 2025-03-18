import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/blog.vue"),
      meta: {
        requiresAuth: false,
        headerTitle: "Blog",
        pageTitle: "Blog | Slavic Media",
        desc: "Explore our latest blog posts.",
      },
    },
    {
      path: "/blog/:_id",
      name: "Article",
      component: () => import("@/views/article.vue"),
      meta: {
        requiresAuth: false,
        headerTitle: "Blog",
        titlePath: "/blog",
        pageTitle: "Blog | Slavic Media",
        desc: "Read our latest blog articles.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/about.vue"),
      meta: {
        requiresAuth: false,
        pageTitle: "About | Slavic Media",
        desc: "Creative & Production studio based in Denmark and Czechia. We tell stories with deep eye contact, magnificent shots, and clean designs to help your project stand out from the noise.",
      },
    },
    // SERVICES
    {
      path: "/services/photo",
      name: "photo",
      component: () => import("@/views/Photo.vue"),
      meta: {
        requiresAuth: false,
        pageTitle: "Photo Services | Slavic Media",
        desc: "Whether it’s a dynamic performance, a powerful portrait, or the vast outdoors, our photography captures authentic moments, rich in colour and emotion, that tell your story.",
      },
    },
    {
      path: "/services/video",
      name: "video",
      component: () => import("@/views/Video.vue"),
      meta: {
        requiresAuth: false,
        pageTitle: "Video Services | Slavic Media",
        desc: "From inspiring stories to cinematic visuals, each video project is crafted to captivate, impress, and showcase your vision with creative precision.",
      },
    },
    // LEGAL
    {
      path: "/legal",
      name: "Legal",
      component: () => import("@/views/legal.vue"),
      meta: {
        requiresAuth: false,
        headerTitle: "Legal",
        titlePath: "/legal",
        pageTitle: "Legal | Slavic Media",
        desc: "Before using Slavic Media services or digital products, you may review the terms and conditions of end user software license agreements.",
      },
    },
    {
      path: "/legal/:id",
      name: "LegalArticle",
      component: () => import("@/views/legal-article.vue"),
      meta: {
        requiresAuth: false,
        headerTitle: "Legal",
        titlePath: "/legal",
        pageTitle: "Legal Article",
        desc: "Before using Slavic Media services or digital products, you may review the terms and conditions of end user software license agreements.",
      },
    },
    // Catch-All Route
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/views/404.vue"),
      meta: {
        pageTitle: "Page Not Found | Slavic Media",
        desc: "The page you are looking for does not exist.",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Single Navigation Guard
router.beforeEach((to, from, next) => {
  const defaultTitle = "Your Online Presence | Slavic Media";
  const defaultDesc =
    "Creative & Production studio based in Denmark and Czechia.";

  // Dynamically set the document title and meta description
  document.title = to.meta.pageTitle || defaultTitle;
  document.description = to.meta.pageDesc || defaultDesc;

  // Handle authentication if required
  const isAuthenticated = localStorage.getItem("user");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!isAuthenticated && requiresAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
