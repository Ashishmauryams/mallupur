import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Icons ke liye

function ThemeToggleBtn() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "pointer",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}

export default ThemeToggleBtn;