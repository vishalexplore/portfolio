import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  FaShareAlt,
  FaLink,
  FaCheck,
} from "react-icons/fa";

function QRProfileCard() {
  const portfolioUrl = window.location.origin;

  const [qrScale, setQrScale] = useState(0.72);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(
        ".qr-scroll-section"
      );

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress =
        (windowHeight - rect.top) /
        (windowHeight + rect.height);

      const clampedProgress = Math.min(
        1,
        Math.max(0, progress)
      );

      const scale =
        0.72 + clampedProgress * 0.28;

      setQrScale(scale);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /* ==========================
     SHARE QR / PROFILE
  ========================== */

  const shareQR = async () => {
    const shareText =
      "Scan Vishal's portfolio QR and check out his profile 🚀";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vishal Sharma | Portfolio",
          text: shareText,
          url: portfolioUrl,
        });
      } catch (error) {
        // User closed share menu
      }
    } else {
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
          "Unable to copy portfolio link",
          error
        );
      }
    }
  };


  return (
    <section className="qr-profile-section qr-scroll-section">

      {/* ==========================
          SECTION TITLE
      ========================== */}

      <div className="section-title">

        <span>
          SCAN & CONNECT
        </span>

        <h2>
          My Portfolio QR
        </h2>

      </div>


      {/* ==========================
          QR PROFILE CARD
      ========================== */}

      <div className="qr-profile-card">


        {/* ==========================
            PROFILE INFO
        ========================== */}

        <div className="qr-profile-info">

          <span className="qr-badge">
            🔗 DIGITAL PROFILE
          </span>


          <h3>
            Vishal
          </h3>


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


          {/* ==========================
              SHARE BUTTON
          ========================== */}

          <button
            className="qr-share-btn"
            onClick={shareQR}
            type="button"
          >

            {copied ? (
              <>
                <FaCheck />
                Link Copied!
              </>
            ) : (
              <>
                <FaShareAlt />
                Share QR
              </>
            )}

          </button>

        </div>


        {/* ==========================
            QR CODE
        ========================== */}

        <div className="qr-code-wrapper">

          <div
            className="qr-code-box qr-scroll-box"
            style={{
              transform: `scale(${qrScale})`,
            }}
          >

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