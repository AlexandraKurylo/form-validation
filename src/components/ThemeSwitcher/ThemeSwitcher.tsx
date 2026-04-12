import { useEffect, useState } from "react";
import MoonIcon from "../../assets/icon-moon.svg?react";
import SunIcon from "../../assets/icon-sun.svg?react";
import cls from "./ThemeSwitcher.module.css";

export const ThemeSwitcher = () => {
  const [isDark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const themeText = isDark ? "Dark" : "Light";
  const ThemeIcon = isDark ? MoonIcon : SunIcon;

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <div className={cls.switcher} onClick={() => setDark(!isDark)}>
      <span>{themeText}</span>
      <ThemeIcon className={cls.icon} />
    </div>
  );
};
