import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AIChat from "./components/AIChat";

import Home from "./pages/Home";
import Certificates from "./pages/Certificates";

function App() {

  const [theme, setTheme] = useState("dark");

  const [scroll, setScroll] = useState(0);

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

      setTheme(savedTheme);

      document.body.className = savedTheme;

    } else {

      document.body.className = "dark";

    }

  }, []);

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

  const toggleTheme = () => {

    const newTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    document.body.className = newTheme;

    localStorage.setItem("theme", newTheme);

  };

  return (

    <BrowserRouter>

      <div className="app">

        <div
          className="scroll-progress"
          style={{ width: `${scroll}%` }}
        ></div>

        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/certificates"
            element={<Certificates />}
          />

        </Routes>

        <AIChat />

      </div>

    </BrowserRouter>

  );

}

export default App;