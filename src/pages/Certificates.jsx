import { useState } from "react";
import { Link } from "react-router-dom";
import certificates from "../data/certificates";

function Certificates() {
  const [search, setSearch] = useState("");

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.title.toLowerCase().includes(search.toLowerCase()) ||
    certificate.category.toLowerCase().includes(search.toLowerCase()) ||
    certificate.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="certificates-page">

      <div className="section-title">
        <span>MY ACHIEVEMENTS</span>
        <h2>Professional Certificates</h2>
      </div>

      {/* Counter */}

      <div className="certificate-top">

        <h3>
          🏆 Total Certificates: {filteredCertificates.length}
        </h3>

      </div>

      {/* Search */}

      <div className="certificate-search">

        <input
          type="text"
          placeholder="🔍 Search certificates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Cards */}

      <div className="certificate-grid">

        {filteredCertificates.map((certificate) => (

          <div
            className="certificate-card"
            key={certificate.id}
          >

            <div className="certificate-icon">
              🏆
            </div>

            <h3>{certificate.title}</h3>

            <p>
              Issued by <strong>{certificate.issuer}</strong>
            </p>

            <div className="certificate-info">

              <p>
                <strong>Category:</strong>{" "}
                {certificate.category}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {certificate.date}
              </p>

            </div>

            <div className="certificate-buttons">

              <a
                href={certificate.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn live-btn"
              >
                📄 View
              </a>

              <a
                href={certificate.verify}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn github-btn"
              >
                ✅ Verify
              </a>

            </div>

          </div>

        ))}

      </div>

      <div
        style={{
          marginTop: "60px",
          textAlign: "center",
        }}
      >
        <Link
          to="/"
          className="project-btn live-btn"
        >
          ← Back to Portfolio
        </Link>
      </div>

    </section>
  );
}

export default Certificates;