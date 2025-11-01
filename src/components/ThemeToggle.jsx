import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Lucide icons

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "8px",
      }}
    >
      {theme === "light" ? <Moon size={22} /> : <Sun size={22} color="yellow" />}
    </button>
  );
};

export default ThemeToggle;
