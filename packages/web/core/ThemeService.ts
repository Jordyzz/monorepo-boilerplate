class ThemeService {
  private themes = {
    light: {
      primary: "#6266EA",
      primaryLight: "#D0E5FF",
      backgroundPrimary: "#F8FAFB",
      backgroundSecondary: "#FFF",
      secondary: "#000",
      fontPrimary: "#607489",
      fontSecondary: "#C9C9CB",
      white: "#fff",
    },
    dark: {
      primary: "#6266EA",
      primaryLight: "#D0E5FF",
      backgroundPrimary: "#F8FAFB",
      backgroundSecondary: "#FFF",
      secondary: "#000",
      fontPrimary: "#607489",
      fontSecondary: "#C9C9CB",
      white: "#fff",
    },
    colors: {},
  };

  private vars = {
    primary: null,
    primaryLight: null,
    backgroundPrimary: null,
    backgroundSecondary: null,
    secondary: null,
    fontPrimary: null,
    fontSecondary: null,
    white: null,
  };

  init(type?: keyof ThemeService["themes"]) {
    Object.assign(this.vars, type ? this.themes[type] : this.themes.light);
    let key: keyof ThemeService["vars"];
    for (key in this.vars) {
      this.setVariable(key, this.vars[key]);
    }
  }

  //   toggleTheme() {
  //     const activeTheme = getState().config.theme;
  //     const newTheme = activeTheme === "light" ? "dark" : "light";
  //     this.init(newTheme);
  //     dispatch(setTheme(newTheme));
  //   }

  private setVariable(key: string, value: string | null) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export const themeService = new ThemeService();
