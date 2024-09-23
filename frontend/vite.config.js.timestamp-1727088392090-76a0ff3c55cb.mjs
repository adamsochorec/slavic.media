// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/adamsochorec/Library/Mobile%20Documents/com~apple~CloudDocs/Programming/slavic.media%202.0/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/adamsochorec/Library/Mobile%20Documents/com~apple~CloudDocs/Programming/slavic.media%202.0/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///Users/adamsochorec/Library/Mobile%20Documents/com~apple~CloudDocs/Programming/slavic.media%202.0/frontend/node_modules/unplugin-vue-components/dist/vite.js";
import { PrimeVueResolver } from "file:///Users/adamsochorec/Library/Mobile%20Documents/com~apple~CloudDocs/Programming/slavic.media%202.0/frontend/node_modules/@primevue/auto-import-resolver/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/adamsochorec/Library/Mobile%20Documents/com~apple~CloudDocs/Programming/slavic.media%202.0/frontend/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    postcss: "./postcss.config.js",
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/assets/style.css";`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRhbXNvY2hvcmVjL0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL1Byb2dyYW1taW5nL3NsYXZpYy5tZWRpYSAyLjAvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hZGFtc29jaG9yZWMvTGlicmFyeS9Nb2JpbGUgRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvUHJvZ3JhbW1pbmcvc2xhdmljLm1lZGlhIDIuMC9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWRhbXNvY2hvcmVjL0xpYnJhcnkvTW9iaWxlJTIwRG9jdW1lbnRzL2NvbX5hcHBsZX5DbG91ZERvY3MvUHJvZ3JhbW1pbmcvc2xhdmljLm1lZGlhJTIwMi4wL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgUHJpbWVWdWVSZXNvbHZlciB9IGZyb20gXCJAcHJpbWV2dWUvYXV0by1pbXBvcnQtcmVzb2x2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbUHJpbWVWdWVSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczogXCIuL3Bvc3Rjc3MuY29uZmlnLmpzXCIsXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zdHlsZS5jc3NcIjtgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdlLFNBQVMsZUFBZSxXQUFXO0FBQzNnQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyx3QkFBd0I7QUFKbVIsSUFBTSwyQ0FBMkM7QUFNclcsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0FBQUEsSUFDaEMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsSUFDVCxxQkFBcUI7QUFBQSxNQUNuQixLQUFLO0FBQUEsUUFDSCxnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
