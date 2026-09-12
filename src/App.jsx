import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AIChat from "./components/AIChat";
import IntroScreen from "./IntroScreen";
import VoiceAssistant from "./components/VoiceAssistant";

import Home from "./pages/Home";
import Certificates from "./pages/Certificates";


function App() {

  /* ==========================
     THEME
  ========================== */

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });


  /* ==========================
     ACCENT COLOR
  ========================== */

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem("accent") || "purple";
  });


  /* ==========================
     SCROLL
  ========================== */

  const [scroll, setScroll] = useState(0);

  const [showTopButton, setShowTopButton] =
    useState(false);


  /* ==========================
     INTRO SCREEN
  ========================== */

  const [showIntro, setShowIntro] = useState(true);


  /* ==========================
     APPLY THEME
  ========================== */

  useEffect(() => {

    document.body.className = theme;

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);


  /* ==========================
     APPLY ACCENT COLOR
  ========================== */

  useEffect(() => {

    document.body.dataset.accent =
      accent;

    localStorage.setItem(
      "accent",
      accent
    );

  }, [accent]);


  /* ==========================
     SCROLL PROGRESS
     + BACK TO TOP
  ========================== */

  useEffect(() => {

    const handleScroll = () => {

      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


      const progress =
        totalHeight > 0
          ? (window.scrollY / totalHeight) * 100
          : 0;


      setScroll(progress);


      setShowTopButton(
        window.scrollY > 400
      );

    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    handleScroll();


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  /* ==========================
     THEME TOGGLE
  ========================== */

  const toggleTheme = () => {

    setTheme((currentTheme) =>
      currentTheme === "dark"
        ? "light"
        : "dark"
    );

  };


  /* ==========================
     BACK TO TOP
  ========================== */

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  return (

    <BrowserRouter>


      {/* ==========================
          APPLE-INSPIRED INTRO
      ========================== */}

      {showIntro && (
        <IntroScreen
          onFinish={() => setShowIntro(false)}
        />
      )}


      {/* ==========================
          MAIN APP
      ========================== */}

      <div className="app">


        {/* ==========================
            SCROLL PROGRESS
        ========================== */}

        <div
          className="scroll-progress"
          style={{
            width: `${scroll}%`,
          }}
        ></div>


        {/* ==========================
            NAVBAR
        ========================== */}

        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}

          accent={accent}
          setAccent={setAccent}
        />


        {/* ==========================
            ROUTES
        ========================== */}

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


        {/* ==========================
            BACK TO TOP
        ========================== */}

        {showTopButton && (

          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >

            <FaArrowUp />

          </button>

        )}


        {/* ==========================
    AI ASSISTANT
========================== */}

<AIChat />

{/* ==========================
    VOICE ASSISTANT
========================== */}

<VoiceAssistant />


      </div>


    </BrowserRouter>

  );

}


export default App;