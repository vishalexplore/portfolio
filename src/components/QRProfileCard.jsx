import { QRCodeSVG } from "qrcode.react";

function QRProfileCard() {
  const portfolioUrl = window.location.origin;

  return (
    <section className="qr-profile-section">

      <div className="section-title">
        <span>SCAN & CONNECT</span>
        <h2>My Portfolio QR</h2>
      </div>

      <div className="qr-profile-card">

        <div className="qr-profile-info">
          <span className="qr-badge">
            🔗 DIGITAL PROFILE
          </span>

          <h3>Vishal</h3>

          <p className="qr-role">
            Full Stack Developer
          </p>

          <p className="qr-description">
            Scan this QR code to visit my
            portfolio and explore my
            projects, skills and certificates.
          </p>

          <div className="qr-url">
            {portfolioUrl}
          </div>
        </div>


        <div className="qr-code-wrapper">

          <div className="qr-code-box">

            <QRCodeSVG
              value={portfolioUrl}
              size={220}
              bgColor="#ffffff"
              fgColor="#111111"
              level="H"
              includeMargin={true}
            />

          </div>

          <p>
            📱 Scan to visit my portfolio
          </p>

        </div>

      </div>

    </section>
  );
}

export default QRProfileCard;