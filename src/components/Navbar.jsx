import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";


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
  "certificates",
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

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scroll" : ""
      }`}
    >
      <div className="logo">
        Vishal<span>.</span>
      </div>

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

        <a
  href="#certificates"
  className={active === "certificates" ? "active" : ""}
  onClick={() => setMenuOpen(false)}
>
  Certificates
</a>

        <a
          href="#contact"
          className={active === "contact" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
      </nav>

      <div className="nav-right">

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </div>
    </header>
  );
}

export default Navbar;