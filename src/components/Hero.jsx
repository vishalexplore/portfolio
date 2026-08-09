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

import profile from "../assets/profile.png";

function Hero() {
  const [time, setTime] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ==========================
     LIVE CLOCK
  ========================== */

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const currentTime = now.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
      );

      setTime(currentTime);
    };

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () => clearInterval(interval);
  }, []);


  /* ==========================
     SHARE PORTFOLIO
  ========================== */

  const portfolioUrl =
    window.location.origin;

  const shareText =
    "Check out Vishal Sharma's Portfolio 🚀";


  /* ==========================
     NATIVE SHARE
  ========================== */

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
        // User closed share dialog
      }
    } else {
      copyLink();
    }
  };


  /* ==========================
     COPY LINK
  ========================== */

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


  /* ==========================
     WHATSAPP
  ========================== */

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


  /* ==========================
     LINKEDIN
  ========================== */

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

      {/* ==========================
          BACKGROUND BLUR
      ========================== */}

      <div className="hero-blur"></div>


      {/* ==========================
          LEFT
      ========================== */}

      <div className="hero-left">

        <div className="photo-card">

          <img
            src={profile}
            alt="Vishal Sharma"
          />

          <div className="online-dot"></div>

        </div>


        <div className="experience-card">

          <h2>7+</h2>

          <span>
            Projects Completed
          </span>

        </div>

      </div>


      {/* ==========================
          RIGHT
      ========================== */}

      <div className="hero-right">

        {/* STATUS */}

        <div className="badge">

          <span className="live-dot"></span>

          <span>
            Available for Internship
          </span>

        </div>


        {/* LIVE CLOCK */}

        <div className="live-clock">

          <div className="clock-dot"></div>

          <div>

            <h3>
              {time}
            </h3>

            <span>
              📍 India
            </span>

          </div>

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


        {/* ==========================
            BUTTONS
        ========================== */}

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


          {/* SHARE BUTTON */}

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


          {/* ==========================
              SHARE MENU
          ========================== */}

          {shareOpen && (

            <div className="share-menu">

              {/* HEADER */}

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
                  title="Close"
                  type="button"
                >
                  <FaTimes />
                </button>

              </div>


              {/* NATIVE SHARE */}

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


              {/* COPY LINK */}

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


              {/* URL */}

              <div className="share-url">
                {portfolioUrl}
              </div>

            </div>

          )}

        </div>


        {/* ==========================
            SOCIAL
        ========================== */}

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


      {/* ==========================
          FLOATING WIDGETS
      ========================== */}

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