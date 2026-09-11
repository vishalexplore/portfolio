import { useEffect, useState } from "react";

export default function IntroScreen({ onFinish }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setClosing(true);
    }, 2100);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2900);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`intro-screen ${closing ? "intro-closing" : ""}`}>
      <div className="intro-hello">
        Hello
      </div>
    </div>
  );
}