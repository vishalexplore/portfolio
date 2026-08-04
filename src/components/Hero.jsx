import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDownload,
} from "react-icons/fa";

import profile from "../assets/profile.png";

function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const currentTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setTime(currentTime);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background Blur */}
      <div className="hero-blur blur-one"></div>
      <div className="hero-blur blur-two"></div>

      {/* LEFT */}
      <div className="hero-left">
        <div className="photo-card">
          <img src={profile} alt="Vishal Sharma" />
          <div className="online-dot"></div>
        </div>

        <div className="experience-card">
          <h2>7+</h2>
          <span>Projects Completed</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div className="badge">
    <span className="live-dot"></span>
    <span>Available for Internship</span>
</div>

        {/* LIVE CLOCK */}
        <div className="live-clock">
          <div className="clock-dot"></div>

          <div>
            <h3>{time}</h3>
            <span>📍 India</span>
          </div>
        </div>

        <h1>
          Hi, I'm <span>Vishal</span>
        </h1>

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

        <p className="hero-desc">
          I design premium digital experiences using React,
          JavaScript, Firebase and modern UI with smooth
          animations and high performance.
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="primary-btn">
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
        </div>

        <div className="hero-social">
          <a
            href="https://github.com/vishalexplore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://instagram.com/hacknexplain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* FLOATING WIDGETS */}
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