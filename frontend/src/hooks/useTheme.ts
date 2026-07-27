import {
  useEffect,
  useState
} from "react";


type Theme =
  | "dark"
  | "light";



const STORAGE_KEY =
  "andgel-portfolio-theme";



export default function useTheme() {


  const [
    theme,
    setTheme
  ] = useState<Theme>(() => {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      ) as Theme | null;


    return saved ?? "dark";

  });



  useEffect(() => {

    const root =
      document.documentElement;


    root.classList.remove(
      "dark",
      "light"
    );


    root.classList.add(
      theme
    );


    localStorage.setItem(
      STORAGE_KEY,
      theme
    );


  }, [
    theme
  ]);



  const toggleTheme = () => {

    setTheme(
      current =>
        current === "dark"
          ? "light"
          : "dark"
    );

  };



  return {

    theme,

    setTheme,

    toggleTheme,

    isDark:
      theme === "dark"

  };

}