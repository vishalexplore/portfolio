import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaMicrophone,
} from "react-icons/fa";

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "contact",
      ];

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) return;

        const top = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Screen par kahin bhi click karne par menu close
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuOpen) return;

      const navbar = document.querySelector(".navbar");

      if (navbar && !navbar.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, [menuOpen]);

  // Browser back/forward par menu close
  useEffect(() => {
    const handlePopState = () => {
      setMenuOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  const startVoiceAssistant = () => {
    window.dispatchEvent(
      new Event("open-voice-assistant")
    );
  };

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scroll" : ""
      }`}
    >
      <Link to="/" className="logo">
        Vishal<span>.</span>
      </Link>

      <nav className={menuOpen ? "nav active" : "nav"}>
        <a
          href="#home"
          className={active === "home" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>

        <a
          href="#about"
          className={active === "about" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>

        <a
          href="#skills"
          className={active === "skills" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Skills
        </a>

        <a
          href="#projects"
          className={active === "projects" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </a>

        <Link
          to="/certificates"
          onClick={() => setMenuOpen(false)}
        >
          Certificates
        </Link>

        <Link
  to="/resume"
  onClick={() => setMenuOpen(false)}
>
  Resume
</Link>

        <a
          href="#contact"
          className={active === "contact" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>

        <button
          className="mobile-theme-option"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}

          <span>
            {theme === "dark"
              ? "Light Mode"
              : "Dark Mode"}
          </span>
        </button>
      </nav>

      <div className="nav-right">
        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="voice-nav-btn"
          onClick={startVoiceAssistant}
          aria-label="Voice Assistant"
          title="Voice Assistant"
        >
          <FaMicrophone />
        </button>

        <button
          className="menu-btn"
          onClick={handleMenuToggle}
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;