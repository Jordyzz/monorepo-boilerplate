class ThemeService {
  private themes = {
    light: {
      primary: "#6266EA",
      primaryLight: "#D0E5FF",
      backgroundPrimary: "#F8FAFB",
      backgroundSecondary: "#FFF",
      secondary: "#000",
      secondaryLight: "#FFD4B4",
      fontPrimary: "#607489",
      fontSecondary: "#000",
      white: "#fff",
      black: "#000",
    },
    dark: {
      primary: "#6266EA",
      primaryLight: "#D0E5FF",
      backgroundPrimary: "#F8FAFB",
      backgroundSecondary: "#FFF",
      secondary: "#000",
      secondaryLight: "#FFD4B4",
      fontPrimary: "#607489",
      fontSecondary: "#000",
      white: "#fff",
      black: "#000",
    },
    colors: {},
  };

  private vars = {
    primary: null,
    primaryLight: null,
    backgroundPrimary: null,
    backgroundSecondary: null,
    secondary: null,
    secondaryLight: null,
    fontPrimary: null,
    fontSecondary: null,
    white: null,
    black: null,
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

  private programPalletes = {
    1: {
      backgroundColor: "#F0EEFF",
      primary: "#2B54E6",
      secondary: "#6266EA",
      tretiary: "#887EAE",
    },
    2: {
      backgroundColor: "#ECF6FF",
      primary: "#2B54E6",
      secondary: "#6266EA",
      tretiary: "#887EAE",
    },
    3: {
      backgroundColor: "#6266EA",
      primary: "#fff",
      secondary: "#FFCEE6",
      tretiary: "#fff",
    },
  };

  public getProgramPallete(index: number) {
    return this.programPalletes[index % 3 == 0 ? 3 : index % 2 == 0 ? 2 : 1];
  }
}

export const themeService = new ThemeService();
