import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = {
    background: darkMode ? '#1f1f1f' : '#f5f7fa',
    color: darkMode ? '#f5f5f5' : '#1a1a1a',
    cardBg: darkMode ? '#2c2c2c' : '#ffffff',
    font: 'Poppins, sans-serif'
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    margin: '20px auto',
    maxWidth: '800px',
    width: '90%',
    textAlign: 'left',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{
      background: theme.background,
      color: theme.color,
      minHeight: '100vh',
      fontFamily: theme.font,
      paddingBottom: '40px',
      transition: 'all 0.3s ease'
    }}>

      {/* Navbar */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: theme.cardBg,
        padding: '10px 20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Vishal.explore</div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginTop: '10px'
        }}>
          <a href="#home" style={{ textDecoration: 'none', color: theme.color }}>Home</a>
          <a href="#about" style={{ textDecoration: 'none', color: theme.color }}>About</a>
          <a href="#skills" style={{ textDecoration: 'none', color: theme.color }}>Skills</a>
          <a href="#projects" style={{ textDecoration: 'none', color: theme.color }}>Projects</a>
        </div>
        <button onClick={toggleTheme} style={{
          background: 'transparent',
          border: '2px solid',
          color: theme.color,
          padding: '6px 14px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: '600',
          marginTop: '10px'
        }}>
          {darkMode ? '☀' : '🌙'}
        </button>
      </div>

      {/* Home Section */}
      <div id="home" style={cardStyle}>
        <img src="profile.jpg" alt="Vishal Profile" style={{
          borderRadius: '70%',
          width: '200px',
          height: '200px',
          display: 'block',
          margin: 'auto'
        }} />
        <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Hello, I’m Vishal 👋</h1>
        <p style={{ textAlign: 'center' }}>I’m a B.Tech CSE student who loves coding and building digital things.</p>
        <div style={{ textAlign: 'center' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Download Resume
          </button>
        </div>
      </div>

      {/* About Section */}
      <div id="about" style={cardStyle}>
        <h2>About Me</h2>
        <p>I’m currently in my 1st year of B.Tech in Computer Science and Engineering.</p>
        <p>I enjoy solving problems, exploring new technologies, and I aim to become a skilled developer who builds things that help people.</p>
      </div>

      {/* Skills Section */}
      <div id="skills" style={cardStyle}>
        <h2>My Skills</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>C Programming</li>
          <li>HTML & CSS</li>
          <li>JavaScript (Basics)</li>
          <li>React.js (Learning)</li>
          <li>Python (Basics)</li>
          <li>Problem Solving</li>
          <li>Sketch Artist 🎨</li>
        </ul>
      </div>

      {/* Projects Section */}
      <div id="projects" style={cardStyle}>
        <h2>My Projects</h2>

        <h3>1. VisionGuard AI 🔐</h3>
        <p>An AI-powered surveillance system that uses real-time video input and machine learning to detect security threats.</p>

        <h3>2. 3D AI Gaming App 🎮</h3>
        <p>A multiplayer mobile game with 3D graphics and smart AI logic. Built using Unity and C#.</p>

        <h3>3. hacknexplain Instagram Series 📱</h3>
        <p>An educational short-reels project explaining tech topics visually in 30 seconds.</p>
        <a href="https://www.instagram.com/hacknexplain?igsh=NGdid3RpNHB3NHJ0" target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>Visit Instagram</a>
      </div>
      
{/* Contact Me */}
<div style={{
  backgroundColor: theme.card,
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  marginTop: '40px'
}}>
  <h2>Contact Me</h2>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      alert('Message sent! ✅ (This is a demo)');
    }}
    style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
  >
    <input
      type="text"
      placeholder="Your Name"
      required
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: `1px solid ${theme.color}`,
        backgroundColor: darkMode ? '#2b2b2b' : '#fff',
        color: theme.color
      }}
    />
    <input
      type="email"
      placeholder="Your Email"
      required
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: `1px solid ${theme.color}`,
        backgroundColor: darkMode ? '#2b2b2b' : '#fff',
        color: theme.color
      }}
    />
    <textarea
      placeholder="Your Message"
      required
      rows="4"
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: `1px solid ${theme.color}`,
        backgroundColor: darkMode ? '#2b2b2b' : '#fff',
        color: theme.color
      }}
    ></textarea>
    <button type="submit" style={{
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }}>
      Send Message
    </button>
  </form>
</div>
      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        padding: '20px 10px',
        borderTop: `1px solid ${theme.color}`,
        fontSize: '14px',
      }}>
        <p>Made with ❤ by Vishal Sharma</p>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <a href="https://www.instagram.com/hacknexplain" target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>Instagram</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default App;