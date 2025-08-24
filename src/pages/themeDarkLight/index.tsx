import { useEffect, useState } from "react";
import S from "./themeDarkLight.module.scss";

export default function ThemeDarkLight() {
  // 로컬에 값 저장하는 경우
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  // 현재 시스템 다크모드 확인 후 그에 맞는 값으로 첫 세팅을 해줌
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      const mode = checkDarkMode.matches ? "dark" : "light";
      setTheme(mode);
      document.documentElement.setAttribute("data-theme", mode);
      console.log(window.matchMedia("(prefers-color-scheme: dark)"));
    }
  }, []);

  return (
    <div>
      <h1>Dark Mode Example</h1>
      <div className="text">지금은 {theme} 모드입니다.</div>
      <button onClick={toggleTheme} className={S.button}>
        {theme === "light" ? "dark" : "light"} 으로 변경
      </button>
    </div>
  );
}
