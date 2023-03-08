import { Platform } from "react-native";

interface Colors {
  textPrimary?: string;
  textSecondary?: string;
  primary?: string;
  white?: string;
  grey?: string;
  backgroundDark?: string;
  backgroundLight?: string;
  error?: string;
}

interface FontSizes {
  body?: number;
  subheading?: number;
}

interface Fonts {
  main: "System" | "Roboto" | "Arial";
}

interface FontWeights {
  normal?: "400";
  bold?: "700";
}

export interface Theme {
  colors: Colors;
  fontSizes: FontSizes;
  fonts: Fonts;
  fontWeights: FontWeights;
}

const theme: Theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    white: "#ffffff",
    grey: "#b5b5b5",
    backgroundDark: "#24292e",
    backgroundLight: "#e1e4e8",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
