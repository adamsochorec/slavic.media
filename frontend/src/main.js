import "./assets/style.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Nora from "@primevue/themes/nora";
import { definePreset } from "@primevue/themes";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";

const app = createApp(App);

const slavicmedia = definePreset(Nora, {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "2px",
      sm: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
    },
    tricolora: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#11457e", // secondary
      600: "#11457ecc", //secondary hover
      700: "#c71e1e", //primary
      800: "#c71e1ecc", //primary hover
      900: "#282828", // grey
      950: "#0000004d", // dark grey
    },
    semantic: {
      transitionDuration: "0s",
      focusRing: {
        width: "2px",
        style: "solid",
        color: "{primary.color}",
        offset: "2px",
        shadow: "none",
      },
      iconSize: "1rem",
      anchorGutter: "0",
      primary: {
        50: "{tricolora.50}",
        100: "{tricolora.100}",
        200: "{tricolora.200}",
        300: "{tricolora.300}",
        400: "{tricolora.400}",
        500: "{tricolora.500}",
        600: "{tricolora.600}",
        700: "{tricolora.700}",
        800: "{tricolora.800}",
        900: "{tricolora.900}",
        950: "{tricolora.950}",
      },
      formField: {
        paddingX: "0.75rem",
        paddingY: "0.5rem",
        borderRadius: "{border.radius.xs}",
        focusRing: {
          width: "2px",
          style: "solid",
          color: "{primary.color}",
          offset: "-1px",
          shadow: "none",
        },
        transitionDuration: "{transition.duration}",
      },
      list: {
        padding: "0.125rem 0",
        gap: "0",
        header: {
          padding: "0.5rem 0.75rem 0.375rem 0.75rem",
        },
        option: {
          padding: "0.5rem 0.75rem",
          borderRadius: "0",
        },
        optionGroup: {
          padding: "0.5rem 0.75rem",
          fontWeight: "700",
        },
      },
      content: {
        borderRadius: "{border.radius.xs}",
      },
      mask: {
        transitionDuration: "0.15s",
      },
      navigation: {
        list: {
          padding: "0.125rem 0",
          gap: "0",
        },
        item: {
          padding: "0.5rem 0.75rem",
          borderRadius: "0",
          gap: "0.5rem",
        },
        submenuLabel: {
          padding: "0.5rem 0.75rem",
          fontWeight: "700",
        },
        submenuIcon: {
          size: "0.875rem",
        },
      },
      overlay: {
        select: {
          borderRadius: "{border.radius.xs}",
          shadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        },
        popover: {
          borderRadius: "{border.radius.xs}",
          padding: "0.75rem",
          shadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        },
        modal: {
          borderRadius: "{border.radius.xs}",
          padding: "1.25rem",
          shadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        },
        navigation: {
          shadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        },
      },
      colorScheme: {
        light: {
          tricolora: {
            0: "#ffffff",
            50: "{tricolora.50}",
            100: "{tricolora.100}",
            200: "{tricolora.200}",
            300: "{tricolora.300}",
            400: "{tricolora.400}",
            500: "{tricolora.500}",
            600: "{tricolora.600}",
            700: "{tricolora.700}",
            800: "{tricolora.800}",
            900: "{tricolora.900}",
            950: "{tricolora.950}",
          },
          primary: {
            color: "{primary.600}",
            contrastColor: "#ffffff",
            hoverColor: "{primary.700}",
            activeColor: "{primary.800}",
          },
          highlight: {
            background: "{primary.600}",
            focusBackground: "{primary.700}",
            color: "#ffffff",
            focusColor: "#ffffff",
          },
          mask: {
            background: "rgba(0,0,0,0.4)",
            color: "{tricolora.200}",
          },
          formField: {
            background: "{tricolora.0}",
            disabledBackground: "{tricolora.300}",
            filledBackground: "{tricolora.100}",
            filledFocusBackground: "{tricolora.100}",
            borderColor: "{tricolora.500}",
            hoverBorderColor: "{tricolora.500}",
            focusBorderColor: "{tricolora.500}",
            invalidBorderColor: "{red.500}",
            color: "{tricolora.900}",
            disabledColor: "{tricolora.600}",
            placeholderColor: "{tricolora.600}",
            floatLabelColor: "{tricolora.600}",
            floatLabelFocusColor: "{tricolora.600}",
            floatLabelInvalidColor: "{red.500}",
            iconColor: "{tricolora.900}",
            shadow: "none",
          },
          text: {
            color: "{tricolora.900}",
            hoverColor: "{tricolora.950}",
            mutedColor: "{tricolora.600}",
            hoverMutedColor: "{tricolora.700}",
          },
          content: {
            background: "{tricolora.0}",
            hoverBackground: "{tricolora.200}",
            borderColor: "{tricolora.400}",
            color: "{text.color}",
            hoverColor: "{text.hover.color}",
          },
          overlay: {
            select: {
              background: "{tricolora.0}",
              borderColor: "transparent",
              color: "{text.color}",
            },
            popover: {
              background: "{tricolora.0}",
              borderColor: "transparent",
              color: "{text.color}",
            },
            modal: {
              background: "{tricolora.0}",
              borderColor: "transparent",
              color: "{text.color}",
            },
          },
          list: {
            option: {
              focusBackground: "{tricolora.200}",
              selectedBackground: "{highlight.background}",
              selectedFocusBackground: "{highlight.focus.background}",
              color: "{text.color}",
              focusColor: "{text.hover.color}",
              selectedColor: "{highlight.color}",
              selectedFocusColor: "{highlight.focus.color}",
              icon: {
                color: "{text.muted.color}",
                focusColor: "{text.hover.muted.color}",
              },
            },
            optionGroup: {
              background: "transparent",
              color: "{text.color}",
            },
          },
          navigation: {
            item: {
              focusBackground: "{primary.color}",
              activeBackground: "{tricolora.200}",
              color: "{text.color}",
              focusColor: "{primary.contrast.color}",
              activeColor: "{text.hover.color}",
              icon: {
                color: "{text.muted.color}",
                focusColor: "{primary.contrast.color}",
                activeColor: "{text.hover.muted.color}",
              },
            },
            submenuLabel: {
              background: "transparent",
              color: "{text.color}",
            },
            submenuIcon: {
              color: "{text.muted.color}",
              focusColor: "{primary.contrast.color}",
              activeColor: "{text.hover.muted.color}",
            },
          },
        },
        dark: {
          tricolora: {
            0: "#ffffff",
            50: "{tricolora.50}",
            100: "{tricolora.100}",
            200: "{tricolora.200}",
            300: "{tricolora.300}",
            400: "{tricolora.400}",
            500: "{tricolora.500}",
            600: "{tricolora.600}",
            700: "{tricolora.700}",
            800: "{tricolora.800}",
            900: "{tricolora.900}",
            950: "{tricolora.950}",
          },
          primary: {
            color: "{primary.500}",
            contrastColor: "{tricolora.950}",
            hoverColor: "{primary.400}",
            activeColor: "{primary.300}",
          },
          highlight: {
            background: "{primary.500}",
            focusBackground: "{primary.400}",
            color: "{tricolora.950}",
            focusColor: "{tricolora.950}",
          },
          mask: {
            background: "rgba(0,0,0,0.6)",
            color: "{tricolora.200}",
          },
          formField: {
            background: "{tricolora.950}",
            disabledBackground: "{tricolora.700}",
            filledBackground: "{tricolora.800}",
            filledFocusBackground: "{tricolora.800}",
            borderColor: "{tricolora.500}",
            hoverBorderColor: "{tricolora.500}",
            focusBorderColor: "{tricolora.500}",
            invalidBorderColor: "{red.400}",
            color: "{tricolora.0}",
            disabledColor: "{tricolora.400}",
            placeholderColor: "{tricolora.400}",
            floatLabelColor: "{tricolora.400}",
            floatLabelFocusColor: "{tricolora.400}",
            floatLabelInvalidColor: "{red.400}",
            iconColor: "{tricolora.0}",
            shadow: "none",
          },
          text: {
            color: "{tricolora.0}",
            hoverColor: "{tricolora.0}",
            mutedColor: "{tricolora.400}",
            hoverMutedColor: "{tricolora.300}",
          },
          content: {
            background: "{tricolora.900}",
            hoverBackground: "{tricolora.700}",
            borderColor: "{tricolora.500}",
            color: "{text.color}",
            hoverColor: "{text.hover.color}",
          },
          overlay: {
            select: {
              background: "{tricolora.900}",
              borderColor: "{tricolora.700}",
              color: "{text.color}",
            },
            popover: {
              background: "{tricolora.900}",
              borderColor: "{tricolora.700}",
              color: "{text.color}",
            },
            modal: {
              background: "{tricolora.900}",
              borderColor: "{tricolora.700}",
              color: "{text.color}",
            },
          },
          list: {
            option: {
              focusBackground: "{tricolora.700}",
              selectedBackground: "{highlight.background}",
              selectedFocusBackground: "{highlight.focus.background}",
              color: "{text.color}",
              focusColor: "{text.hover.color}",
              selectedColor: "{highlight.color}",
              selectedFocusColor: "{highlight.focus.color}",
              icon: {
                color: "{text.muted.color}",
                focusColor: "{text.hover.muted.color}",
              },
            },
            optionGroup: {
              background: "transparent",
              color: "{text.color}",
            },
          },
          navigation: {
            item: {
              focusBackground: "{primary.color}",
              activeBackground: "{tricolora.700}",
              color: "{text.color}",
              focusColor: "{primary.contrast.color}",
              activeColor: "{text.color}",
              icon: {
                color: "{text.muted.color}",
                focusColor: "{primary.contrast.color}",
                activeColor: "{text.hover.muted.color}",
              },
            },
            submenuLabel: {
              background: "transparent",
              color: "{text.color}",
            },
            submenuIcon: {
              color: "{text.muted.color}",
              focusColor: "{primary.contrast.color}",
              activeColor: "{text.hover.muted.color}",
            },
          },
        },
      },
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: slavicmedia,
    options: {
      prefix: "p",
      darkModeSelector: ".dark-mode",
      cssLayer: false,
    },
  },
});

// Use the router
app.use(router);

// Mount the app to the element with the id 'app'
app.mount("#app");
