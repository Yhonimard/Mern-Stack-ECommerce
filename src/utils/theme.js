import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  breakpoints: {
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
    "2xl": "1536px",
  },

  colors: {
    mygray: {
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
});
export default theme;
