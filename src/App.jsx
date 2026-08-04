import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sections from "./components/Sections";
import AIChat from "./components/AIChat";

function App() {
  const [theme, setTheme] = useState("dark");
  const [scroll, setScroll] = useState(0);

  // Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = "dark";
    }
  }, []);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        (window.scrollY / totalHeight) * 100;

      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    document.body.className = newTheme;

    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="app">

      {/* Scroll Progress */}
      <div
        className="scroll-progress"
        style={{ width: `${scroll}%` }}
      ></div>

      {/* Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Hero */}
      <Hero />

      {/* Sections */}
      <Sections />

      {/* AI Assistant */}
      <AIChat />

    </div>
  );
}

export default App;