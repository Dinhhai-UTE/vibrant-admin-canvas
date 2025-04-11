
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ColorTheme = "blue" | "red" | "green" | "yellow" | "pink" | "purple";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  toggleTheme: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colorTheme: "blue",
  toggleTheme: () => {},
  setColorTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const savedColorTheme = localStorage.getItem("colorTheme");
    return (savedColorTheme as ColorTheme) || "blue";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("theme-blue", "theme-red", "theme-green", "theme-yellow", "theme-pink", "theme-purple");
    root.classList.remove("gradient-bg-blue", "gradient-bg-red", "gradient-bg-green", "gradient-bg-yellow", "gradient-bg-pink", "gradient-bg-purple");
    
    if (colorTheme !== "blue") {
      root.classList.add(`theme-${colorTheme}`);
    }
    
    // Add gradient background class
    root.classList.add(`gradient-bg-${colorTheme}`);
    
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
