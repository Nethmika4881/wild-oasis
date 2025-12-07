import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
const DarkModeProvider = function ({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    }
    if (!isDarkMode) {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  });
  const toggleDarkMode = function () {
    setIsDarkMode((c) => !c);
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = function () {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("used at a wrong place");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
