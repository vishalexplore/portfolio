import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDownload,
  FaShareAlt,
  FaLink,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";

import profile from "../assets/profile.jpeg";

function Hero() {
  const [greeting, setGreeting] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // PHOTO → INFO → QR → PHOTO
  const [photoMode, setPhotoMode] = useState("photo");
  

  /* =========================================
     PHOTO CARD CLICK
  ========================================= */

  const handlePhotoClick = () => {
    if (photoMode === "photo") {
      setPhotoMode("info");
    } else if (photoMode === "info") {
      setPhotoMode("qr");
    } else {
      setPhotoMode("photo");
    }
  };


  /* =========================================
     SCROLL → RETURN TO PHOTO
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setPhotoMode("photo");
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /* =========================================
     GREETING
  ========================================= */

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();
  }, []);


  /* =========================================
     PORTFOLIO URL
  ========================================= */

  const portfolioUrl =
    window.location.origin;

  const shareText =
    "Check out Vishal Sharma's Portfolio 🚀";


  /* =========================================
     NATIVE SHARE
  ========================================= */

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title:
            "Vishal Sharma | Portfolio",
          text: shareText,
          url: portfolioUrl,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      copyLink();
    }
  };


  /* =========================================
     COPY LINK
  ========================================= */

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        portfolioUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(
        "Unable to copy link",
        error
      );
    }
  };


  /* =========================================
     WHATSAPP
  ========================================= */

  const shareWhatsApp = () => {
    const url =
      `https://wa.me/?text=${encodeURIComponent(
        `${shareText}\n${portfolioUrl}`
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =========================================
     LINKEDIN
  ========================================= */

  const shareLinkedIn = () => {
    const url =
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        portfolioUrl
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <section
      className="hero"
      id="home"
    >

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="hero-blur"></div>


      {/* =====================================
          LEFT
      ===================================== */}

      <div className="hero-left">

        {/* =================================
            PHOTO / INFO / QR CARD
        ================================= */}

        {/* =========================================
    PHOTO CARD
    PHOTO → INFO → PHOTO
========================================= */}

<div
  className={`photo-card photo-mode-${photoMode}`}
  onClick={handlePhotoClick}
>
  <div className="photo-card-inner">

    {/* PHOTO */}
    <div className="photo-card-face photo-card-front">
      <img
        src={profile}
        alt="Vishal"
      />
    </div>

    {/* INFO */}
    <div className="photo-card-face photo-card-info">

      <div className="back-icon">
        ⚡
      </div>

      <h3>
        Vishal
      </h3>

      <p>
        Full Stack Developer
      </p>

      <div className="back-skills">
        <span>React</span>
        <span>Node.js</span>
        <span>JavaScript</span>
        <span>AI / ML</span>
      </div>

      <small>
        Click to see photo
      </small>

    </div>

  </div>
</div>
      </div>


      {/* =====================================
          RIGHT
      ===================================== */}

      <div className="hero-right">

        {/* STATUS */}

        <div className="badge">

          <span className="live-dot"></span>

          <span>
            Available for Internship and Jobs
          </span>

        </div>


        {/* GREETING */}

        <div className="hero-greeting">
          {greeting}
        </div>


        {/* HEADING */}

        <h1>
          Hi, I'm <span>Vishal</span>
        </h1>


        {/* TYPING */}

        <div className="typing">

          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,

              "React Developer",
              2000,

              "Frontend Developer",
              2000,

              "UI/UX Designer",
              2000,

              "AI Enthusiast",
              2000,
            ]}
            wrapper="span"
            speed={45}
            repeat={Infinity}
            cursor={false}
          />

        </div>


        {/* DESCRIPTION */}

        <p className="hero-desc">

          I design premium digital
          experiences using React,
          JavaScript, Firebase and
          modern UI with smooth
          animations and high
          performance.

        </p>


        {/* BUTTONS */}

        <div className="hero-buttons">

          <a
            href="#contact"
            className="primary-btn"
          >
            Hire Me
          </a>


          <a
            href="/resume.pdf"
            download
            className="secondary-btn"
          >

            <FaDownload />

            Resume

          </a>


          <button
            className="secondary-btn share-btn"
            onClick={() =>
              setShareOpen(
                (prev) => !prev
              )
            }
            type="button"
          >

            <FaShareAlt />

            Share

          </button>


          {/* ===============================
              SHARE MENU
          =============================== */}

          {shareOpen && (

            <div className="share-menu">

              <div className="share-menu-header">

                <div>

                  <strong>
                    Share Portfolio
                  </strong>

                  <span>
                    Share Vishal's portfolio
                  </span>

                </div>


                <button
                  className="share-close"
                  onClick={() =>
                    setShareOpen(false)
                  }
                  aria-label="Close share menu"
                  type="button"
                >

                  <FaTimes />

                </button>

              </div>


              {/* DEVICE SHARE */}

              <button
                className="share-option"
                onClick={nativeShare}
                type="button"
              >

                <span className="share-option-icon">
                  📱
                </span>

                <span>

                  <strong>
                    Share
                  </strong>

                  <small>
                    Use device share
                  </small>

                </span>

              </button>


              {/* COPY */}

              <button
                className="share-option"
                onClick={copyLink}
                type="button"
              >

                <span className="share-option-icon">
                  <FaLink />
                </span>

                <span>

                  <strong>
                    {copied
                      ? "Link Copied!"
                      : "Copy Link"}
                  </strong>

                  <small>
                    Copy portfolio URL
                  </small>

                </span>

              </button>


              {/* WHATSAPP */}

              <button
                className="share-option"
                onClick={shareWhatsApp}
                type="button"
              >

                <span className="share-option-icon">
                  <FaWhatsapp />
                </span>

                <span>

                  <strong>
                    WhatsApp
                  </strong>

                  <small>
                    Share on WhatsApp
                  </small>

                </span>

              </button>


              {/* LINKEDIN */}

              <button
                className="share-option"
                onClick={shareLinkedIn}
                type="button"
              >

                <span className="share-option-icon">
                  💼
                </span>

                <span>

                  <strong>
                    LinkedIn
                  </strong>

                  <small>
                    Share on LinkedIn
                  </small>

                </span>

              </button>


              <div className="share-url">
                {portfolioUrl}
              </div>

            </div>

          )}

        </div>


        {/* =====================================
            SOCIAL
        ===================================== */}

        <div className="hero-social">

          <a
            href="https://github.com/vishalexplore"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>


          <a
            href="https://www.linkedin.com/in/vishalsharma714"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>


          <a
            href="https://instagram.com/hacknexplain"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

        </div>

      </div>


      {/* =====================================
          FLOATING WIDGETS
      ===================================== */}

      <div className="widget react-widget">
        ⚛ React
      </div>

      <div className="widget node-widget">
        🚀 Node.js
      </div>

      <div className="widget ai-widget">
        🤖 AI / ML
      </div>

    </section>
  );
}

export default Hero;