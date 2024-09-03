import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi";
import { md, aliases } from "vuetify/iconsets/md";

const light: ThemeDefinition = {
  colors: {
    primary: "#3063E5",
    secondary: "#969696",
    error: "#F44336",
    success: "#4CAF50",
    shadow: "#F7F7F7",
    ripple: "#CCCCCC",
  },
};

const dark: ThemeDefinition = {
  colors: {
    primary: "#3063E5",
    secondary: "#969696",
    error: "#F44336",
    success: "#4CAF50",
    shadow: "#F7F7F7",
    ripple: "#CCCCCC",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
      VBtn: {
        color: "primary",
        variant: "flat",
      },
      VDataTable: {
        class: "border rounded-lg",
      },
      VTable: {
        class: "border rounded-lg",
      },
      VTextField: {
        variant: "outlined",
        density: "compact",
      },
    },
    icons: {
      defaultSet: "md",
      aliases,
      sets: {
        mdi,
        md,
      },
    },
    ssr: true,
    theme: {
      defaultTheme: "light",
      themes: {
        light,
        dark,
      },
      variations: {
        colors: ["primary", "secondary", "error", "success"],
        lighten: 1,
        darken: 1,
      },
    },
  });
  app.vueApp.use(vuetify);
});
