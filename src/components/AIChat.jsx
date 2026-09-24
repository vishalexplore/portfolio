import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";

import aiData from "../data/aiData";
import "../styles/aiChat.css";

function AIChat() {
  const [open, setOpen] = useState(false);
  // CLOSE AI ON OUTSIDE CLICK + MOBILE BACK
useEffect(() => {
  if (!open) return;

  // Browser history me temporary entry
  window.history.pushState({ aiOpen: true }, "");

  // Mobile Back button
  const handleBack = () => {
    setOpen(false);
  };

  // Chat ke bahar click/tap
  const handleOutsideClick = (event) => {
    const chat = document.querySelector(".ai-chat");
    const button = document.querySelector(".ai-button");

    if (!chat || !button) return;

    if (
      !chat.contains(event.target) &&
      !button.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  window.addEventListener("popstate", handleBack);

  document.addEventListener(
    "mousedown",
    handleOutsideClick
  );

  document.addEventListener(
    "touchstart",
    handleOutsideClick
  );

  return () => {
    window.removeEventListener("popstate", handleBack);

    document.removeEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.removeEventListener(
      "touchstart",
      handleOutsideClick
    );
  };
}, [open]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm Vishal AI.\nAsk me anything about Vishal.",
    },
  ]);

  /* ==========================
     AUTO SCROLL + AUTO FOCUS
  ========================== */

  useEffect(() => {
    if (!open) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    // Answer complete hone ke baad input par focus
    if (!typing) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [messages, typing, open]);


  /* ==========================
     SMART INTENT MATCHING
  ========================== */

  const getReply = (userText) => {
    const question = userText.toLowerCase().trim();

    // Greeting
    if (
      /^(hi|hii|hello|hey|helo|namaste|hy)\b/.test(
        question
      )
    ) {
      return aiData.hello;
    }

    // About
    if (
      question.includes("who is vishal") ||
      question.includes("about vishal") ||
      question.includes("tell me about vishal") ||
      question.includes("about him") ||
      question.includes("who are you")
    ) {
      return aiData.about;
    }

    // Name
    if (
      question.includes("your name") ||
      question.includes("his name") ||
      question.includes("vishal name")
    ) {
      return aiData.name;
    }

    // Skills
    if (
      question.includes("skill") ||
      question.includes("technology") ||
      question.includes("technologies") ||
      question.includes("tech stack") ||
      question.includes("what can he code") ||
      question.includes("what does he know") ||
      question.includes("programming")
    ) {
      return aiData.skills;
    }

    // Projects
    if (
      question.includes("project") ||
      question.includes("projects") ||
      question.includes("built") ||
      question.includes("build") ||
      question.includes("portfolio projects") ||
      question.includes("what has he made")
    ) {
      return aiData.projects;
    }

    // Education
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

    // Certificates
    if (
      question.includes("certificate") ||
      question.includes("certificates") ||
      question.includes("certification") ||
      question.includes("achievement")
    ) {
      return aiData.certificates;
    }

    // Internship / Hire
    if (
      question.includes("internship") ||
      question.includes("intern") ||
      question.includes("hire") ||
      question.includes("freelance") ||
      question.includes("work with vishal") ||
      question.includes("available")
    ) {
      return aiData.hire;
    }

    // GitHub
    if (
      question.includes("github") ||
      question.includes("source code") ||
      question.includes("code repository") ||
      question.includes("repositories") ||
      question.includes("repo")
    ) {
      return aiData.github;
    }

    // LinkedIn
    if (
      question.includes("linkedin") ||
      question.includes("professional profile") ||
      question.includes("professional account")
    ) {
      return aiData.linkedin;
    }

    // Instagram
    if (
      question.includes("instagram") ||
      question.includes("insta") ||
      question.includes("social media")
    ) {
      return aiData.instagram;
    }

    // Resume
    if (
      question.includes("resume") ||
      question.includes("cv") ||
      question.includes("curriculum vitae")
    ) {
      return aiData.resume;
    }

    // Email
    if (
      question.includes("email") ||
      question.includes("mail") ||
      question.includes("email address")
    ) {
      return aiData.email;
    }

    // Phone
    if (
      question.includes("phone") ||
      question.includes("mobile") ||
      question.includes("number") ||
      question.includes("contact number")
    ) {
      return aiData.phone;
    }

    // Contact
    if (
      question.includes("contact") ||
      question.includes("reach him") ||
      question.includes("reach vishal") ||
      question.includes("how can i contact")
    ) {
      return aiData.contact;
    }

    // Location
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
    }, 1200);
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

    setMessages([
      {
        sender: "bot",
        text: "👋 Hi! I'm Vishal AI.\nAsk me anything about Vishal.",
      },
    ]);

    setInput("");

    // Clear ke baad bhi input focused rahe
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

            {index < lines.length - 1 && (
              <br />
            )}
          </div>
        );
      }

      return (
        <div
          key={index}
          className="ai-message-line"
        >
          {line}

          {index < lines.length - 1 && (
            <br />
          )}
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
        className="ai-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={
          open
            ? "Close AI Assistant"
            : "Open AI Assistant"
        }
      >
        {open ? (
          <>
            <FaTimes className="ai-icon" />

            <span className="ai-label">
              Close
            </span>
          </>
        ) : (
          <>
            <FaRobot className="ai-icon" />

            <span className="ai-label">
              Ask AI
            </span>
          </>
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
              <FaRobot />

              <span>
                Ask Vishal AI
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
                  askQuickQuestion("certificates")
                }
                disabled={typing}
              >
                🏆 Certificates
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
                  askQuickQuestion("linkedin")
                }
                disabled={typing}
              >
                💼 LinkedIn
              </button>

              <button
                onClick={() =>
                  askQuickQuestion("instagram")
                }
                disabled={typing}
              >
                📸 Instagram
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
                {renderMessage(message.text)}
              </div>
            ))}


            {/* TYPING */}

            {typing && (
              <div className="bot-msg typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}


            {/* AUTO SCROLL */}

            <div ref={messagesEndRef}></div>

          </div>


          {/* FOOTER */}

          <div className="ai-footer">

            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything..."
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