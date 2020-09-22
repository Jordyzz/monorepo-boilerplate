class ThemeService {
  public theme = {
    colors: {
      primary: "#2cb9b0",
      secondary: "#0c0d34",
      white: "#fff",
      grey: "rgba(12, 13, 52, 0.05)",
      darkGrey: "#8a8d90",
      danger: "#ff0058",
      text: "rgba(12, 13, 52, 0.7)",
      black: "#000",
    },
    sizes: {
      xl: 75,
      l: 34,
    },
    spacing: {
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
    },
    textVariants: {
      title1: {
        fontSize: 28,
        fontFamily: "SFProText-Semibold",
        color: "#0c0d34",
      },
      title2: {
        fontSize: 24,
        lineHeight: 30,
        fontFamily: "SFProText-Semibold",
        color: "#0c0d34",
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "SFProText-Regular",
        color: "rgba(12, 13, 52, 0.7)",
      },
      button: {
        fontSize: 15,
        fontFamily: "SFProText-Regular",
        textAlign: "center",
      },
    },
  };
}

export const themeService = new ThemeService();
