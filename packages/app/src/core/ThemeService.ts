class ThemeService {
  public theme = {
    colors: {
      primary: "#2cb9b0",
      secondary: "#0c0d34",
      white: "#fff",
      grey: "rgba(12, 13, 52, 0.05)",
    },
    sizes: {
      xl: 75,
    },
  };
}

export const themeService = new ThemeService();
