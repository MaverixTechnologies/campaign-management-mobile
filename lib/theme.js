import { extendTheme } from "native-base";

/**
 * Learn more about extending/customizing theme:
 * https://docs.nativebase.io/default-theme
 * https://docs.nativebase.io/customizing-theme
 * https://docs.nativebase.io/customizing-components
 * https://docs.nativebase.io/utility-props#style-props
 * https://reactnavigation.org/docs/themes/
 */

const schema = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#818cf8",
  500: "#4f46e5",
  600: "#0284c7",
  700: "#004282",
  800: "#002851",
  900: "#000e21",
};

const whiteAlpha = {
  50: "RGBA(255, 255, 255, 0.04)",
  100: "RGBA(255, 255, 255, 0.06)",
  200: "RGBA(255, 255, 255, 0.08)",
  300: "RGBA(255, 255, 255, 0.16)",
  400: "RGBA(255, 255, 255, 0.24)",
  500: "RGBA(255, 255, 255, 0.36)",
  600: "RGBA(255, 255, 255, 0.48)",
  700: "RGBA(255, 255, 255, 0.64)",
  800: "RGBA(255, 255, 255, 0.80)",
  900: "RGBA(255, 255, 255, 0.92)",
};
const blackAlpha = {
  50: "RGBA(0, 0, 0, 0.04)",
  100: "RGBA(0, 0, 0,0.06)",
  200: "RGBA(0, 0, 0,0.08)",
  300: "RGBA(20, 0, 0, 0.16)",
  400: "RGBA(0, 0, 0, 0.24)",
  500: "RGBA(0, 0, 0, 0.36)",
  600: "RGBA(0, 0, 0, 0.48)",
  700: "RGBA(0, 0, 0, 0.64)",
  800: "RGBA(0, 0, 0, 0.80)",
  900: "RGBA(0, 0, 0, 0.92)",
};
const dark = {
  primary: schema[300],
  background: schema[900],
  card: schema[900],
  text: schema[50],
  border: schema[400],
  notification: schema[400],
};

const light = {
  primary: schema[700],
  background: schema[50],
  card: schema[50],
  text: schema[900],
  border: schema[600],
  notification: schema[600],
};

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "light",
  },
  colors: {
    primary: schema,
    text: schema,
    dark: dark,
    light: light,
    whiteAlpha: whiteAlpha,
    blackAlpha: blackAlpha,
  },
  fonts: {},
  components: {
    Button: {
      defaultProps: {
        colorScheme: "primary",
        variant: "solid",
      },
    },
    Input: {
      defaultProps: {
        colorScheme: "primary",
        variant: "filled",
      },
    },
    Select: {
      defaultProps: {
        colorScheme: "primary",
        variant: "filled",
      },
    },
    ModalContent: {
      baseStyle: {
        _light: { bg: "primary.50" },
        _dark: { bg: "primary.900" },
      },
    },
  },
});

export const navLightTheme = {
  dark: false,
  colors: light,
};

export const navDarkTheme = {
  dark: true,
  colors: dark,
};
