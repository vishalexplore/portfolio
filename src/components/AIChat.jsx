import { useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import aiData from "../data/aiData";
import "../styles/aiChat.css";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm Vishal AI.\nAsk me anything about Vishal.",
    },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();

    const userMessage = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setTyping(true);

    let reply = aiData.default;

    const question = userText.toLowerCase();

    for (const key in aiData) {
      if (question.includes(key)) {
        reply = aiData[key];
        break;
      }
    }

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

  return (
    <>
      {/* Floating Button */}

      <button
  className="ai-button"
  onClick={() => setOpen(!open)}
>
  {open ? (
    <>
      <FaTimes className="ai-icon" />
      <span className="ai-label">Close</span>
    </>
  ) : (
    <>
      <FaRobot className="ai-icon" />
      <span className="ai-label">Ask AI</span>
    </>
  )}
</button>

      {/* Chat */}

      {open && (
        <div className="ai-chat">

          <div className="ai-header">
            🤖 Ask Vishal AI
          </div>

          <div className="ai-body">
<div className="quick-actions">

  <button onClick={() => setInput("skills")}>
    💻 Skills
  </button>

  <button onClick={() => setInput("projects")}>
    🚀 Projects
  </button>

  <button onClick={() => setInput("education")}>
    🎓 Education
  </button>

  <button onClick={() => setInput("github")}>
    🐙 GitHub
  </button>

  <button onClick={() => setInput("linkedin")}>
    💼 LinkedIn
  </button>

  <button onClick={() => setInput("instagram")}>
    📸 Instagram
  </button>

  <button onClick={() => setInput("resume")}>
    📄 Resume
  </button>

  <button onClick={() => setInput("email")}>
    📧 Email
  </button>

  <button onClick={() => setInput("phone")}>
    📞 Phone
  </button>

</div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-msg"
                    : "bot-msg"
                }
              >
                {msg.text.startsWith("http") ||
msg.text.startsWith("mailto:") ||
msg.text.startsWith("tel:") ||
msg.text.startsWith("/") ? (
  <a
    href={msg.text}
    target={
      msg.text.startsWith("http")
        ? "_blank"
        : "_self"
    }
    rel="noopener noreferrer"
    className="chat-link"
  >
    {msg.text.startsWith("mailto:")
      ? "📧 Send Email"
      : msg.text.startsWith("tel:")
      ? "📞 Call Now"
      : msg.text.startsWith("/")
      ? "📄 Download Resume"
      : "🔗 Open Link"}
  </a>
) : (
  msg.text
)}
              </div>
            ))}

            {typing && (
              <div className="bot-msg typing">

                <span></span>

                <span></span>

                <span></span>

              </div>
            )}

          </div>

          <div className="ai-footer">

            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>

          </div>

        </div>
      )}

    </>
  );
}

export default AIChat;