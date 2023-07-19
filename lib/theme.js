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
  50: "#E9F1FF",
  100: "#D1E4FF",
  200: "#9DCAFF",
  300: "#6DB0F6",
  400: "#5095D9",
  500: "#317BBE",
  600: "#0061A3",
  700: "#00497C",
  800: "#003258",
  900: "#001D36",
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
  primary: "#6DB0F6",
  secondary: "#FFB59F",
  background: "#171C22",
  card: schema[900],
  text: "#fff",
  border: schema[400],
  notification: schema[400],
};

const light = {
  primary: "#0061A3",
  secondary: "#F06539",
  background: "#fff",
  card: schema[50],
  text: "#171C22",
  border: schema[600],
  notification: schema[600],
};

export const theme = extendTheme({
  config: {
    // useSystemColorMode: true,
    initialColorMode: "light",
  },
  colors: {
    primary: {
      50: "#FDFCFF",
      100: "#D1E4FF",
      200: "#9DCAFF",
      300: "#6DB0F6",
      400: "#5095D9",
      500: "#317BBE",
      600: "#0061A3",
      700: "#00497C",
      800: "#003258",
      900: "#001D36",
    },
    secondary: {
      50: "#FDFCFF",
      100: "#FFEDE8",
      200: "#FFDBD0",
      300: "#FFB59F",
      400: "#FF8B68",
      500: "#F06539",
      600: "#CE4D22",
      700: "#AC3509",
      800: "#852300",
      900: "#5E1600",
    },
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
        borderRadius: "8px",
      },
      baseStyle: {
        _light: { bg: "primary.600" },
        _dark: { bg: "primary.300" },
      },
    },
    Input: {
      defaultProps: {
        colorScheme: "primary",
        variant: "outline",
        size: "xl",
        borderRadius: "8px",
        placeholderTextColor: "#354550",
        borderColor: "primary.600",
        bg: "primary.50",
        px: "2",
        fontSize: "md",
      },
    },
    Select: {
      defaultProps: {
        colorScheme: "primary",
        variant: "outline",
        size: "xl",
        borderRadius: "8px",
        placeholderTextColor: "#354550",
        borderColor: "primary.600",
        bg: "primary.50",
        px: "2",
        fontSize: "md",
      },
    },
    Text: {
      defaultProps: {
        color: "#354550",
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
