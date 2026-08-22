import { Link } from "react-router-dom";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";

import {
  SiC,
  SiCplusplus,
  SiFirebase,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiExpress,
} from "react-icons/si";
function Sections() {

  const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_dsxso57",
      "template_3l3s268",
      form.current,
      "v4eFm7ZlT-h639THZ"
    )
    .then(() => {
      alert("✅ Message Sent Successfully!");
      form.current.reset();
    })
    .catch((error) => {
      console.log(error);
      alert("❌ Failed to send message.");
    });
};
  return (
    <>
      {/* ================= ABOUT ================= */}

      <section className="skills" id="skills">

  <div className="section-title">
    <span>MY EXPERTISE</span>
    <h2>Skills & Technologies</h2>
  </div>

  <div className="skills-grid">

    {/* Programming */}

    <div className="skill-card">

      <div className="skill-header">
        <div>
          <h3>💻 Programming Languages</h3>
          <p>Problem Solving & Core Development</p>
        </div>

        <span className="skill-badge advanced">
          Advanced
        </span>
      </div>

      <div className="skill-tags">

        <span className="skill-item">
          <SiC className="icon c"/>
          C
        </span>

        <span className="skill-item">
          <SiCplusplus className="icon cpp"/>
          C++
        </span>

        <span className="skill-item">
          <FaJava className="icon java"/>
          Java
        </span>

        <span className="skill-item">
          <FaPython className="icon python"/>
          Python
        </span>

        <span className="skill-item">
          <FaJs className="icon js"/>
          JavaScript
        </span>

        <span className="skill-item">
          <FaHtml5 className="icon html"/>
          HTML5
        </span>

        <span className="skill-item">
          <FaCss3Alt className="icon css"/>
          CSS3
        </span>

      </div>

    </div>

    {/* Frontend */}

    <div className="skill-card">

      <div className="skill-header">
        <div>
          <h3>⚛ Frontend Development</h3>
          <p>Modern Responsive Interfaces</p>
        </div>

        <span className="skill-badge advanced">
          Advanced
        </span>
      </div>

      <div className="skill-tags">

        <span className="skill-item">
          <FaReact className="icon react"/>
          React
        </span>

        <span className="skill-item">
          ⚡ Vite
        </span>

        <span className="skill-item">
          🎨 Tailwind CSS
        </span>

        <span className="skill-item">
          📱 Responsive UI
        </span>

        <span className="skill-item">
          🎬 Framer Motion
        </span>

      </div>

    </div>

    {/* Backend */}

    <div className="skill-card">

      <div className="skill-header">
        <div>
          <h3>🚀 Backend & Database</h3>
          <p>Server & Cloud Development</p>
        </div>

        <span className="skill-badge intermediate">
          Intermediate
        </span>
      </div>

      <div className="skill-tags">

        <span className="skill-item">
          <FaNodeJs className="icon node"/>
          Node.js
        </span>

        <span className="skill-item">
          <SiExpress className="icon"/>
          Express
        </span>

        <span className="skill-item">
          <SiFirebase className="icon firebase"/>
          Firebase
        </span>

        <span className="skill-item">
          🔗 REST API
        </span>

      </div>

    </div>

    {/* Tools */}

    <div className="skill-card">

      <div className="skill-header">
        <div>
          <h3>🛠 Tools & Platforms</h3>
          <p>Development Workflow</p>
        </div>

        <span className="skill-badge">
          Daily Use
        </span>
      </div>

      <div className="skill-tags">

        <span className="skill-item">
          <FaGitAlt className="icon git"/>
          Git
        </span>

        <span className="skill-item">
          <FaGithub className="icon github"/>
          GitHub
        </span>

        <span className="skill-item">
          💻 VS Code
        </span>

        <span className="skill-item">
          <SiPostman className="icon"/>
          Postman
        </span>

        <span className="skill-item">
          <SiNetlify className="icon"/>
          Netlify
        </span>

        <span className="skill-item">
          <SiVercel className="icon"/>
          Vercel
        </span>

        <span className="skill-item">
          <FaFigma className="icon"/>
          Figma
        </span>

      </div>

    </div>

  </div>

</section>
    {/* ================= EDUCATION ================= */}

<section className="education" id="education">

  <div className="section-title">
    <span>EDUCATION</span>
    <h2>Academic Journey</h2>
  </div>

  <div className="education-grid">

    <div className="education-card">

      <div className="education-year">
        2024 - 2028
      </div>

      <h3>Bachelor of Technology</h3>

      <h4>Computer Science & Engineering</h4>

      <p>
        Dr. A.P.J. Abdul Kalam Technical University (AKTU)
      </p>

      <div className="education-tags">
        <span>Web Development</span>
        <span>DSA</span>
        <span>Java</span>
        <span>React</span>
        <span>AI</span>
      </div>

    </div>

    <div className="education-card">

      <div className="education-year">
        2022 - 2023
      </div>

      <h3>Higher Secondary (Class 12)</h3>

      <h4>Science Stream</h4>

      <p>
        Mathematics • Physics • Chemistry
      </p>

    </div>

    <div className="education-card">

      <div className="education-year">
        2020 - 2021
      </div>

      <h3>Secondary School (Class 10)</h3>

      <h4>General Education</h4>

      <p>
        Built strong fundamentals and developed interest in technology.
      </p>

    </div>

  </div>

</section> 

{/* ================= CERTIFICATES ================= */}

<section className="certificates" id="certificates">

  <div className="section-title">
    <span>ACHIEVEMENTS</span>
    <h2>Professional Certificates</h2>
  </div>

  <div className="certificate-card">

    <div style={{fontSize:"70px"}}>🏆</div>

    <h3>Professional Certifications</h3>

    <p>
      I continuously improve my skills by participating in
      hackathons, AI challenges, and technical certification
      programs.
    </p>

    <div className="certificate-stats">

      <div>
        <h2>2+</h2>
        <span>Certificates</span>
      </div>

      <div>
        <h2>2026</h2>
        <span>Latest</span>
      </div>

      <div>
        <h2>H2Skill</h2>
        <span>Issuer</span>
      </div>

    </div>

    <Link
      to="/certificates"
      className="project-btn live-btn"
    >
      📜 View All Certificates
    </Link>

  </div>

</section>

      {/* Projects */}

      <section className="projects" id="projects">

  <div className="section-title">
    <span>MY WORK</span>
    <h2>Featured Projects</h2>
  </div>

  <div className="projects-grid">

    <div className="project-card">

      <div className="project-image">
        🌾
      </div>

      <h3>GramSeva</h3>

      <p>
        Smart village management platform with citizen,
        admin and panchayat dashboard.
      </p>

      <div className="tech-stack">
        <span>React</span>
        <span>Firebase</span>
        <span>PWA</span>
      </div>

      <div className="project-buttons">
        <button>Coming soon</button>
        <button>GitHub</button>
      </div>

    </div>

    <div className="project-card">

      <div className="project-image">
        🌦️
      </div>

      <h3>Weather Dashboard</h3>

      <p>
        Responsive weather application with live forecast
        and modern UI.
      </p>

      <div className="tech-stack">
        <span>React</span>
        <span>API</span>
        <span>CSS</span>
      </div>

      <div className="project-buttons">

  <a
    href="https://weathervishalweb.netlify.app"
    target="_blank"
    rel="noopener noreferrer"
    className="project-btn live-btn"
  >
    Live
  </a>

  <a
    href="https://github.com/YOUR_GITHUB_USERNAME/YOUR_WEATHER_REPO"
    target="_blank"
    rel="noopener noreferrer"
    className="project-btn github-btn"
  >
    GitHub
  </a>

</div>

    </div>

    <div className="project-card">

      <div className="project-image">
        💼
      </div>

      <h3>Personal Portfolio</h3>

      <p>
        Premium skeuomorphic portfolio with Dark & Light
        mode and PWA support.
      </p>

      <div className="tech-stack">
        <span>React</span>
        <span>PWA</span>
        <span>Framer</span>
      </div>

      <div className="project-buttons">
        <button>Live</button>
        <button>GitHub</button>
      </div>

    </div>

  </div>

</section>
      {/* ================= CONTACT ================= */}

<section className="contact" id="contact">

  <div className="section-title">
    <span>CONTACT</span>
    <h2>Let's Build Something Amazing</h2>
  </div>

  <div className="contact-wrapper">

    {/* Left Side */}

    <div className="contact-info">

      <div className="info-card">
        <h3>📧 Email</h3>
        <p>
  <a
    href="mailto:vishal9598sharma@gmail.com"
    className="contact-link"
  >
    vishal9598sharma@gmail.com
  </a>
</p>
      </div>

      <div className="info-card">
        <h3>📱 Phone</h3>
        <p>
  <a
    href="tel:+919598015714"
    className="contact-link"
  >
    +91 9598015714
  </a>
</p>
      </div>

      <div className="info-card">
        <h3>📍 Location</h3>
        <p>Uttar Pradesh, India</p>
      </div>

    </div>

    {/* Right Side */}

    <form
      ref={form}
      onSubmit={sendEmail}
      className="contact-form"
    >

      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        required
      />

      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        required
      />

      <textarea
        name="message"
        rows="6"
        placeholder="Write your message..."
        required
      ></textarea>

      <button type="submit">
        🚀 Send Message
      </button>

    </form>

  </div>

</section>


<footer className="footer">

  <h3>VISHAL</h3>

  <p>
    Designed & Developed with ❤️ using React
  </p>

</footer>


    </>
  );
}

export default Sections;