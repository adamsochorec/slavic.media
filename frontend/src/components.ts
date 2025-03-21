import { App } from "vue";
import { defineAsyncComponent } from "vue";

// Function to register global components with lazy loading
export function registerGlobalComponents(app: App) {
  app.component(
    "HeroVideo",
    defineAsyncComponent(() => import("@/components/hero-video.vue"))
  );
  app.component(
    "SwiperEmployees",
    defineAsyncComponent(() => import("@/components/swiper-employees.vue"))
  );
  app.component(
    "CompanyTimeline",
    defineAsyncComponent(() => import("@/components/company-timeline.vue"))
  );
  app.component(
    "Footer",
    defineAsyncComponent(() => import("@/components/Footer.vue"))
  );
  app.component(
    "NavBar",
    defineAsyncComponent(() => import("@/components/nav-bar.vue"))
  );
  app.component(
    "Cookies",
    defineAsyncComponent(() => import("@/components/cookies.vue"))
  );
  app.component(
    "GalleryItem",
    defineAsyncComponent(() => import("@/components/gallery-item.vue"))
  );
  app.component(
    "BlogCard",
    defineAsyncComponent(() => import("@/components/blog-card.vue"))
  );
  app.component(
    "SkeletonSwiper",
    defineAsyncComponent(() => import("@/components/skeleton-swiper.vue"))
  );
  app.component(
    "SkeletonArticle",
    defineAsyncComponent(() => import("@/components/skeleton-article.vue"))
  );
  app.component(
    "FurtherReading",
    defineAsyncComponent(() => import("@/components/further-reading.vue"))
  );
  app.component(
    "SkeletonGalleryItem",
    defineAsyncComponent(() => import("@/components/skeleton-gallery-item.vue"))
  );
  app.component(
    "BannerLightroomPresets",
    defineAsyncComponent(
      () => import("@/components/banner-lightroom-presets.vue")
    )
  );
  app.component(
    "SkeletonServices",
    defineAsyncComponent(() => import("@/components/skeleton-services.vue"))
  );
  app.component(
    "RequestAProposal",
    defineAsyncComponent(() => import("@/components/request-a-proposal.vue"))
  );
  app.component(
    "SwiperClients",
    defineAsyncComponent(() => import("@/components/swiper-clients.vue"))
  );
  app.component(
    "SwiperReviews",
    defineAsyncComponent(() => import("@/components/swiper-reviews.vue"))
  );
  app.component(
    "SwiperColourGrading",
    defineAsyncComponent(() => import("@/components/swiper-colour-grading.vue"))
  );
  app.component(
    "Map",
    defineAsyncComponent(() => import("@/components/map.vue"))
  );
  app.component(
    "LatestArticle",
    defineAsyncComponent(() => import("@/components/latest-article.vue"))
  );
  app.component(
    "ArticleMetadata",
    defineAsyncComponent(() => import("@/components/article-metadata.vue"))
  );
  app.component(
    "FurtherLegal",
    defineAsyncComponent(() => import("@/components/further-legal.vue"))
  );
  app.component(
    "FurtherServices",
    defineAsyncComponent(() => import("@/components/further-services.vue"))
  );
  app.component(
    "DynamicContent",
    defineAsyncComponent(() => import("@/components/dynamic-content.vue"))
  );
  app.component(
    "Img",
    defineAsyncComponent(() => import("@/components/img.vue"))
  );
  app.component(
    "SwiperServices",
    defineAsyncComponent(() => import("@/components/swiper-services.vue"))
  );
  app.component(
    "SwiperVideo",
    defineAsyncComponent(() => import("@/components/swiper-video.vue"))
  );
  app.component(
    "SoundEdit",
    defineAsyncComponent(() => import("@/components/sound-edit.vue"))
  );
  app.component(
    "SwiperPhotoServices",
    defineAsyncComponent(
      () => import("@/components/swiper-further-services.vue")
    )
  );
  app.component(
    "SkeletonLatestArticle",
    defineAsyncComponent(
      () => import("@/components/skeleton-latest-article.vue")
    )
  );
  app.component(
    "SocialIcon",
    defineAsyncComponent(() => import("@/components/social-icon.vue"))
  );
}
