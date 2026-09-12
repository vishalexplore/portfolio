import { useState, useEffect } from "react";

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const openVoice = () => {
      startListening();
    };

    window.addEventListener(
      "open-voice-assistant",
      openVoice
    );

    return () => {
      window.removeEventListener(
        "open-voice-assistant",
        openVoice
      );
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("Voice recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setMessage("I'm listening...");
    };

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript.toLowerCase();

      setMessage(`You said: "${text}"`);

      handleCommand(text);
    };

    recognition.onerror = () => {
      setListening(false);
      setMessage("Sorry, I couldn't hear you.");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const handleCommand = (text) => {
    if (
      text.includes("hello") ||
      text.includes("hi")
    ) {
      speak(
        "Hello! Nice to meet you. How can I help you?"
      );
      return;
    }

    if (text.includes("about")) {
      speak(
        "Hi! I'm Vishal's portfolio assistant. Vishal is a Full Stack Developer who works with React, JavaScript, Node.js and AI technologies."
      );
      return;
    }

    if (text.includes("skill")) {
      speak(
        "Vishal works with React, JavaScript, Node.js, Python, Java, C and C plus plus."
      );

      document
        .getElementById("skills")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      return;
    }

    if (text.includes("project")) {
      speak(
        "Here are Vishal's projects."
      );

      document
        .getElementById("projects")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      return;
    }

    if (text.includes("contact")) {
      speak(
        "You can contact Vishal using the contact section."
      );

      document
        .getElementById("contact")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      return;
    }

    speak(
      "Sorry, I don't understand that command yet. Try saying about me, skills, projects, or contact."
    );
  };

  return null;
}