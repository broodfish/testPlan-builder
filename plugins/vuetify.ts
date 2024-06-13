import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi";
import { md, aliases } from "vuetify/iconsets/md";

const light: ThemeDefinition = {
  colors: {
    primary: "#435E91",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D7E2FF",
    onPrimaryContainer: "#001A40",
    secondary: "#6F7487",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DAE2F9",
    onSecondaryContainer: "#131C2C",
    tertiary: "#CFA36F",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFDDB8",
    onTertiaryContainer: "#2A1700",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#FFFFFF",
    onBackground: "#1A1B20",
    surface: "#FFFFFF",
    onSurface: "#1A1B20",
    surfaceVariant: "#E1E2EC",
    onSurfaceVariant: "#44474E",
    outline: "#74777F",
    outlineVariant: "#C4C6D0",
    neutral: "#E8E1DC",
    onNeutral: "#1E1B18",
    shadow: "#efefef",
  },
};

const dark: ThemeDefinition = {
  colors: {
    primary: "#ACC7FF",
    onPrimary: "#0E2F60",
    primaryContainer: "#2A4678",
    onPrimaryContainer: "#D7E2FF",
    secondary: "#BEC6DC",
    onSecondary: "#283041",
    secondaryContainer: "#3F4759",
    onSecondaryContainer: "#DAE2F9",
    tertiary: "#F8BB71",
    onTertiary: "#472A00",
    tertiaryContainer: "#B28957",
    onTertiaryContainer: "#FFDDB8",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#111318",
    onBackground: "#E2E2E9",
    surface: "#111318",
    onSurface: "#E2E2E9",
    surfaceVariant: "#44474E",
    onSurfaceVariant: "#C4C6D0",
    outline: "#8E9099",
    outlineVariant: "#919093",
    neutral: "#625E5A",
    onNeutral: "#F7EFEA",
    shadow: "rgba(0, 0, 0, 0.2)",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
      VDataTable: {
        hover: true,
        headerProps: {
          class: "text-outlineVariant h-auto font-weight-black px-3 py-1",
        },
      },
      VDataTableVirtual: {
        hover: true,
        headerProps: {
          class: "text-outlineVariant h-auto font-weight-black px-3 py-1",
        },
      },
      VTextField: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VTextarea: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VCombobox: {
        variant: "outlined",
        hideDetails: "auto",
      },
      VBtnGroup: {
        density: "compact",
        divided: true,
      },
      VSelect: {
        variant: "outlined",
        hideDetails: "auto",
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
        colors: [
          "primary",
          "secondary",
          "tertiary",
          "error",
          "background",
          "surface",
          "outline",
          "neutral",
        ],
        lighten: 5,
        darken: 1,
      },
    },
  });
  app.vueApp.use(vuetify);
});
