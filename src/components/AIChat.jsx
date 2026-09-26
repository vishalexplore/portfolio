import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaExternalLinkAlt,
  FaTrash,
  FaUser,
  FaMagic,
} from "react-icons/fa";

import aiData from "../data/aiData";
import "../styles/aiChat.css";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMessage = {
    sender: "bot",
    text:
      "👋 Hi! I'm Vishal AI.\nI'm Vishal's portfolio assistant. Ask me about his skills, projects, education, resume or contact details.",
  };

  const [messages, setMessages] = useState([welcomeMessage]);

  /* ==========================
     OPEN / CLOSE
  ========================== */

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => clearTimeout(timer);
  }, [open]);

  /* ==========================
     AUTO SCROLL
  ========================== */

  useEffect(() => {
    if (!open) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, typing, open]);

  /* ==========================
   AI CHAT CLOSE CONTROLS
========================== */

useEffect(() => {
  if (!open) return;

  window.history.pushState(
    { aiChatOpen: true },
    ""
  );

  const handleBack = () => {
    setOpen(false);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleOutsideClick = (event) => {
    const chatBox = document.querySelector(".ai-chat");
    const aiButton = document.querySelector(".ai-button");

    if (!chatBox || !aiButton) return;

    if (
      !chatBox.contains(event.target) &&
      !aiButton.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  window.addEventListener("popstate", handleBack);
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", handleOutsideClick);
  document.addEventListener("touchstart", handleOutsideClick);

  return () => {
    window.removeEventListener("popstate", handleBack);
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  };
}, [open]);

  /* ==========================
     SMART INTENT MATCHING
  ========================== */

  const getReply = (userText) => {
    const question = userText.toLowerCase().trim();

    /* Greeting */

    if (
      /^(hi|hii|hello|hey|helo|namaste|hy)\b/.test(question)
    ) {
      return aiData.hello;
    }

    /* About */

    if (
      question.includes("who is vishal") ||
      question.includes("about vishal") ||
      question.includes("tell me about vishal") ||
      question.includes("about him") ||
      question.includes("who are you") ||
      question.includes("introduce vishal")
    ) {
      return aiData.about;
    }

    /* Name */

    if (
      question.includes("your name") ||
      question.includes("his name") ||
      question.includes("vishal name") ||
      question === "name"
    ) {
      return aiData.name;
    }

    /* Skills */

    if (
      question.includes("skill") ||
      question.includes("technology") ||
      question.includes("technologies") ||
      question.includes("tech stack") ||
      question.includes("what can he code") ||
      question.includes("what does he know") ||
      question.includes("programming") ||
      question.includes("technical")
    ) {
      return aiData.skills;
    }

    /* Projects */

    if (
      question.includes("project") ||
      question.includes("projects") ||
      question.includes("built") ||
      question.includes("build") ||
      question.includes("portfolio projects") ||
      question.includes("what has he made") ||
      question.includes("work")
    ) {
      return aiData.projects;
    }

    /* Education */

    if (
      question.includes("education") ||
      question.includes("college") ||
      question.includes("university") ||
      question.includes("degree") ||
      question.includes("study") ||
      question.includes("studying") ||
      question.includes("btech") ||
      question.includes("b.tech")
    ) {
      return aiData.education;
    }

    /* Certificates */

    if (
      question.includes("certificate") ||
      question.includes("certificates") ||
      question.includes("certification") ||
      question.includes("achievement")
    ) {
      return aiData.certificates;
    }

    /* Internship / Hire */

    if (
      question.includes("internship") ||
      question.includes("intern") ||
      question.includes("hire") ||
      question.includes("freelance") ||
      question.includes("work with vishal") ||
      question.includes("available") ||
      question.includes("job")
    ) {
      return aiData.hire;
    }

    /* GitHub */

    if (
      question.includes("github") ||
      question.includes("source code") ||
      question.includes("code repository") ||
      question.includes("repositories") ||
      question.includes("repo")
    ) {
      return aiData.github;
    }

    /* LinkedIn */

    if (
      question.includes("linkedin") ||
      question.includes("professional profile") ||
      question.includes("professional account")
    ) {
      return aiData.linkedin;
    }

    /* Instagram */

    if (
      question.includes("instagram") ||
      question.includes("insta") ||
      question.includes("social media")
    ) {
      return aiData.instagram;
    }

    /* Resume */

    if (
      question.includes("resume") ||
      question.includes("cv") ||
      question.includes("curriculum vitae")
    ) {
      return aiData.resume;
    }

    /* Email */

    if (
      question.includes("email") ||
      question.includes("mail") ||
      question.includes("email address")
    ) {
      return aiData.email;
    }

    /* Phone */

    if (
      question.includes("phone") ||
      question.includes("mobile") ||
      question.includes("number") ||
      question.includes("contact number")
    ) {
      return aiData.phone;
    }

    /* Contact */

    if (
      question.includes("contact") ||
      question.includes("reach him") ||
      question.includes("reach vishal") ||
      question.includes("how can i contact")
    ) {
      return aiData.contact;
    }

    /* Location */

    if (
      question.includes("location") ||
      question.includes("where is vishal") ||
      question.includes("where does he live") ||
      question.includes("from where") ||
      question.includes("city") ||
      question.includes("state")
    ) {
      return aiData.location;
    }

    /* Default */

    return aiData.default;
  };

  /* ==========================
     SEND MESSAGE
  ========================== */

  const processMessage = (text) => {
    if (!text.trim() || typing) return;

    const userText = text.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");
    setTyping(true);

    const reply = getReply(userText);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
        },
      ]);
    }, 850);
  };

  const sendMessage = () => {
    processMessage(input);
  };

  /* ==========================
     QUICK QUESTIONS
  ========================== */

  const askQuickQuestion = (question) => {
    if (typing) return;

    processMessage(question);
  };

  /* ==========================
     CLEAR CHAT
  ========================== */

  const clearChat = () => {
    if (typing) return;

    setMessages([welcomeMessage]);
    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  /* ==========================
     RENDER MESSAGE
  ========================== */

  const renderMessage = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {
      const urlMatch = line.match(
        /(https?:\/\/[^\s]+)/i
      );

      if (urlMatch) {
        const rawUrl = urlMatch[0];

        const url = rawUrl.replace(
          /[),.!?]+$/,
          ""
        );

        const beforeUrl = line.substring(
          0,
          line.indexOf(rawUrl)
        );

        const afterUrl = line.substring(
          line.indexOf(rawUrl) + rawUrl.length
        );

        return (
          <div
            key={index}
            className="ai-message-line"
          >
            {beforeUrl}

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-open-link"
            >
              <FaExternalLinkAlt />
              Open Link
            </a>

            {afterUrl}

            {index < lines.length - 1 && <br />}
          </div>
        );
      }

      return (
        <div
          key={index}
          className="ai-message-line"
        >
          {line}

          {index < lines.length - 1 && <br />}
        </div>
      );
    });
  };

  return (
    <>
      {/* =========================
          FLOATING AI BUTTON
      ========================== */}

      <button
        className={`ai-button ${
          open ? "ai-button-open" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={
          open
            ? "Close AI Assistant"
            : "Open AI Assistant"
        }
      >
        {open ? (
          <FaTimes className="ai-icon" />
        ) : (
          <FaRobot className="ai-icon" />
        )}
      </button>

      {/* =========================
          AI CHAT
      ========================== */}

      {open && (
        <div className="ai-chat">

          {/* HEADER */}

          <div className="ai-header">

            <div className="ai-header-title">

              <div className="ai-header-icon">
                <FaRobot />
              </div>

              <div className="ai-header-text">
                <strong>Vishal AI</strong>
                <small>
                  Portfolio Assistant
                </small>
              </div>

              <span className="ai-status">
                <span></span>
                Online
              </span>

            </div>

            <button
              className="ai-clear"
              onClick={clearChat}
              disabled={typing}
              title="Clear Chat"
              aria-label="Clear Chat"
            >
              <FaTrash />
            </button>

          </div>

          {/* BODY */}

          <div className="ai-body">

            {/* WELCOME AREA */}

            {messages.length === 1 &&
              !typing && (
                <div className="ai-welcome">

                  <div className="ai-welcome-icon">
                    <FaMagic />
                  </div>

                  <h3>
                    How can I help?
                  </h3>

                  <p>
                    Ask me anything about
                    Vishal's portfolio.
                  </p>

                </div>
              )}

            {/* QUICK ACTIONS */}

            <div className="quick-actions">

              <button
                onClick={() =>
                  askQuickQuestion("skills")
                }
                disabled={typing}
              >
                💻 Skills
              </button>

              <button
                onClick={() =>
                  askQuickQuestion("projects")
                }
                disabled={typing}
              >
                🚀 Projects
              </button>

              <button
                onClick={() =>
                  askQuickQuestion("education")
                }
                disabled={typing}
              >
                🎓 Education
              </button>

              <button
                onClick={() =>
                  askQuickQuestion("resume")
                }
                disabled={typing}
              >
                📄 Resume
              </button>

              <button
                onClick={() =>
                  askQuickQuestion("github")
                }
                disabled={typing}
              >
                🐙 GitHub
              </button>

              <button
                onClick={() =>
                  askQuickQuestion("contact")
                }
                disabled={typing}
              >
                📧 Contact
              </button>

            </div>

            {/* MESSAGES */}

            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? "user-msg"
                    : "bot-msg"
                }
              >

                <div className="message-avatar">

                  {message.sender === "user" ? (
                    <FaUser />
                  ) : (
                    <FaRobot />
                  )}

                </div>

                <div className="message-content">
                  {renderMessage(message.text)}
                </div>

              </div>
            ))}

            {/* TYPING */}

            {typing && (
              <div className="bot-msg typing">

                <div className="message-avatar">
                  <FaRobot />
                </div>

                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

          {/* FOOTER */}

          <div className="ai-footer">

            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about Vishal..."
              value={input}
              disabled={typing}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={
                !input.trim() || typing
              }
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default AIChat;