import {
  FaEye,
  FaDownload,
  FaFilePdf,
} from "react-icons/fa";

function Resume() {
  return (
    <section className="resume-page">
      <div className="resume-container">

        <div className="resume-icon">
          <FaFilePdf />
        </div>

        <h1>My Resume</h1>

        <p>
          View or download my latest resume to learn more
          about my skills, projects, education, and
          professional profile.
        </p>

        <div className="resume-buttons">

          {/* VIEW RESUME */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn view-resume"
          >
            <FaEye />
            <span>View Resume</span>
          </a>

          {/* DOWNLOAD RESUME */}
          <a
            href="/resume.pdf"
            download="Vishal_Sharma_Resume.pdf"
            className="resume-btn download-resume"
          >
            <FaDownload />
            <span>Download Resume</span>
          </a>

        </div>

      </div>
    </section>
  );
}

export default Resume;