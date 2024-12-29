import $ from "jquery";
import "magnific-popup";

export async function initializephotoGallery() {
  $(".popup-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      fixedContentPos: true,
      overflowY: "scroll",
      navigateByImgClick: true,
      preload: [0, 1],
    },
    zoom: {
      enabled: true,
      duration: 300,
    },
    image: {
      tError: "Error",
      titleSrc: function (item: any) {
        return item.el.attr("title");
      },
    },
    callbacks: {
      elementParse: function (item: any) {
        item.src = item.el.attr("href");
      },
    },
    fixedContentPos: true,
  });
}
