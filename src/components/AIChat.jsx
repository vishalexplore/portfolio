import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaExternalLinkAlt,
  FaTrash,
  FaMicrophone,
  FaVolumeUp,
  FaStop,
  FaArrowRight,
} from "react-icons/fa";

import aiData from "../data/aiData";
import "../styles/aiChat.css";

const STORAGE_KEY = "vishal-ai-chat-v2";

const QUICK_ACTIONS = [
  { label: "About", query: "about vishal", icon: "👋" },
  { label: "Skills", query: "skills", icon: "💻" },
  { label: "Projects", query: "projects", icon: "🚀" },
  { label: "Resume", query: "resume", icon: "📄" },
  { label: "GitHub", query: "github", icon: "🐙" },
  { label: "Contact", query: "contact", icon: "📧" },
];

const SUGGESTIONS = [
  "What projects has Vishal built?",
  "What is Vishal's tech stack?",
  "Is Vishal available for internship?",
  "Show me Vishal's GitHub",
];

const normalize = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const replyTimerRef = useRef(null);

  const welcomeMessage = useMemo(
    () => ({
      id: "welcome",
      sender: "bot",
      text:
        "👋 Hi! I'm Vishal AI.\n\nI can help you explore Vishal's skills, projects, education, resume, GitHub and contact information.\n\nTry asking me something or use the quick actions below.",
      time: Date.now(),
    }),
    []
  );

  useEffect(() => {
    if (!messages.length) {
      setMessages([welcomeMessage]);
    }
  }, [messages.length, welcomeMessage]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (!open) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    if (!typing) {
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [messages, typing, open]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handlePopState = () => {
      if (open) setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    window.history.pushState(
      { vishalAI: true },
      "",
      window.location.href
    );

    const handleOutside = (event) => {
      const chat = document.querySelector(".ai-chat");
      const button = document.querySelector(".ai-button");

      if (
        chat &&
        button &&
        !chat.contains(event.target) &&
        !button.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
      recognitionRef.current?.stop?.();
      window.speechSynthesis?.cancel?.();
    };
  }, []);

  const findIntent = (rawText) => {
    const question = normalize(rawText);

    const intents = [
      {
        key: "hello",
        words: ["hi", "hello", "hey", "namaste", "hii", "helo"],
        reply: aiData.hello,
      },
      {
        key: "about",
        words: ["who", "about", "vishal", "yourself", "profile", "introduction"],
        reply: aiData.about,
      },
      {
        key: "name",
        words: ["name"],
        reply: aiData.name,
      },
      {
        key: "skills",
        words: [
          "skill",
          "skills",
          "technology",
          "technologies",
          "tech stack",
          "programming",
          "coding",
          "language",
          "languages",
        ],
        reply: aiData.skills,
      },
      {
        key: "projects",
        words: [
          "project",
          "projects",
          "built",
          "build",
          "made",
          "portfolio projects",
          "work",
        ],
        reply: aiData.projects,
      },
      {
        key: "education",
        words: [
          "education",
          "college",
          "university",
          "degree",
          "study",
          "studying",
          "btech",
          "b.tech",
        ],
        reply: aiData.education,
      },
      {
        key: "certificates",
        words: [
          "certificate",
          "certificates",
          "certification",
          "achievement",
        ],
        reply: aiData.certificates,
      },
      {
        key: "hire",
        words: [
          "internship",
          "intern",
          "hire",
          "hiring",
          "freelance",
          "available",
          "work with",
          "opportunity",
        ],
        reply: aiData.hire,
      },
      {
        key: "github",
        words: [
          "github",
          "source code",
          "repository",
          "repositories",
          "repo",
        ],
        reply: aiData.github,
      },
      {
        key: "linkedin",
        words: ["linkedin", "professional profile"],
        reply: aiData.linkedin,
      },
      {
        key: "instagram",
        words: ["instagram", "insta", "social media"],
        reply: aiData.instagram,
      },
      {
        key: "resume",
        words: ["resume", "cv", "curriculum vitae"],
        reply: aiData.resume,
      },
      {
        key: "email",
        words: ["email", "mail", "email address"],
        reply: aiData.email,
      },
      {
        key: "phone",
        words: ["phone", "mobile", "number", "contact number"],
        reply: aiData.phone,
      },
      {
        key: "contact",
        words: ["contact", "reach", "connect", "message"],
        reply: aiData.contact,
      },
      {
        key: "location",
        words: ["location", "where", "city", "state", "from"],
        reply: aiData.location,
      },
    ];

    let best = null;
    let bestScore = 0;

    intents.forEach((intent) => {
      let score = 0;

      intent.words.forEach((word) => {
        const cleanWord = normalize(word);

        if (question === cleanWord) score += 8;
        if (question.includes(cleanWord)) score += cleanWord.includes(" ") ? 5 : 2;
      });

      if (
        intent.key === "about" &&
        (question.includes("who is") || question.includes("tell me about"))
      ) {
        score += 7;
      }

      if (
        intent.key === "contact" &&
        (question.includes("how can i") || question.includes("reach"))
      ) {
        score += 5;
      }

      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    });

    return bestScore >= 2 ? best : null;
  };

  const getReply = (text) => {
    const result = findIntent(text);

    if (result?.reply) {
      return {
        text: result.reply,
        intent: result.key,
      };
    }

    return {
      text:
        aiData.default ||
        "I can help you explore Vishal's portfolio. Try asking about his skills, projects, education, resume, GitHub or contact details.",
      intent: "default",
    };
  };

  const navigateTo = (path) => {
    setOpen(false);

    if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = path;
  };

  const getActionForIntent = (intent) => {
    const actions = {
      projects: { label: "View Projects", path: "/#projects" },
      skills: { label: "View Skills", path: "/#skills" },
      education: { label: "View Education", path: "/#education" },
      certificates: { label: "View Certificates", path: "/certificates" },
      resume: { label: "Open Resume", path: "/resume" },
      github: {
        label: "Open GitHub",
        path: "https://github.com/vishalexplore",
      },
      linkedin: {
        label: "Open LinkedIn",
        path: "https://www.linkedin.com/",
      },
      instagram: {
        label: "Open Instagram",
        path: "https://www.instagram.com/hacknexplain/",
      },
      contact: { label: "Contact Vishal", path: "/#contact" },
    };

    return actions[intent] || null;
  };

  const processMessage = (rawText) => {
    if (!rawText.trim() || typing) return;

    const userText = rawText.trim();
    const answer = getReply(userText);
    const action = getActionForIntent(answer.intent);

    const userMessage = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: userText,
      time: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    const delay = Math.min(
      1500,
      Math.max(550, answer.text.length * 7)
    );

    replyTimerRef.current = setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          sender: "bot",
          text: answer.text,
          intent: answer.intent,
          action,
          time: Date.now(),
        },
      ]);
    }, delay);
  };

  const clearChat = () => {
    if (typing) return;

    localStorage.removeItem(STORAGE_KEY);

    setMessages([
      {
        ...welcomeMessage,
        id: `welcome-${Date.now()}`,
        time: Date.now(),
      },
    ]);

    setInput("");
    window.speechSynthesis?.cancel?.();
    setSpeaking(false);

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const toggleSpeech = (text) => {
    if (!("speechSynthesis" in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      text.replace(/https?:\/\/\S+/g, "")
    );

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setInput("Voice input is not supported in this browser.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join("");

      setInput(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const renderMessage = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/i);

      if (urlMatch) {
        const rawUrl = urlMatch[0];
        const url = rawUrl.replace(/[),.!?]+$/, "");

        const beforeUrl = line.substring(
          0,
          line.indexOf(rawUrl)
        );

        const afterUrl = line.substring(
          line.indexOf(rawUrl) + rawUrl.length
        );

        return (
          <div key={index} className="ai-message-line">
            {beforeUrl}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-open-link"
            >
              <FaExternalLinkAlt className="ai-original-icon" />
              Open Link
            </a>
            {afterUrl}
            {index < lines.length - 1 && <br />}
          </div>
        );
      }

      return (
        <div key={index} className="ai-message-line">
          {line}
          {index < lines.length - 1 && <br />}
        </div>
      );
    });
  };

  return (
    <>
      <button
        className={`ai-button ${open ? "ai-button-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {open ? (
          <>
            <FaTimes className="ai-icon ai-original-icon" />
            <span className="ai-label">Close</span>
          </>
        ) : (
          <>
            <FaRobot className="ai-icon ai-original-icon" />
            <span className="ai-label">Ask AI</span>
          </>
        )}
      </button>

      {open && (
        <div className="ai-chat" role="dialog" aria-label="Vishal AI Assistant">
          <div className="ai-header">
            <div className="ai-header-title">
              <div className="ai-avatar">
                <FaRobot className="ai-original-icon" />
                <span />
              </div>

              <div>
                <strong>Vishal AI</strong>
                <small>
                  <i /> Portfolio Assistant
                </small>
              </div>
            </div>

            <button
              className="ai-clear"
              onClick={clearChat}
              disabled={typing}
              title="Clear Chat"
              aria-label="Clear Chat"
            >
              <FaTrash className="ai-original-icon" />
            </button>
          </div>

          <div className="ai-body">
            <div className="ai-status-card">
              <div className="ai-status-dot" />
              <div>
                <strong>Ask me anything</strong>
                <span>I know Vishal's portfolio, projects and profile.</span>
              </div>
            </div>

            <div className="quick-actions">
              {QUICK_ACTIONS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => processMessage(item.query)}
                  disabled={typing}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message-row ${message.sender}`}
              >
                <div className="ai-message-avatar">
                  {message.sender === "bot" ? <FaRobot className="ai-original-icon" /> : "V"}
                </div>

                <div className="ai-message-wrap">
                  <div className="ai-message">
                    {renderMessage(message.text)}
                  </div>

                  <div className="ai-message-meta">
                    <span>
                      {new Date(message.time || Date.now()).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>

                    {message.sender === "bot" && (
                      <button
                        className="ai-speak"
                        onClick={() => toggleSpeech(message.text)}
                        title="Read aloud"
                        aria-label="Read aloud"
                      >
                        {speaking ? <FaStop className="ai-original-icon" /> : <FaVolumeUp className="ai-original-icon" />}
                      </button>
                    )}
                  </div>

                  {message.sender === "bot" && message.action && (
                    <button
                      className="ai-action"
                      onClick={() => navigateTo(message.action.path)}
                    >
                      {message.action.label}
                      <FaArrowRight className="ai-original-icon" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && !typing && (
              <div className="ai-suggestions">
                <span>Try asking</span>

                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => processMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div className="ai-message-row bot">
                <div className="ai-message-avatar">
                  <FaRobot className="ai-original-icon" />
                </div>

                <div className="ai-message typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="ai-footer">
            <button
              className={`ai-voice ${listening ? "listening" : ""}`}
              onClick={toggleVoiceInput}
              title={listening ? "Stop listening" : "Voice input"}
              aria-label={listening ? "Stop listening" : "Voice input"}
            >
              {listening ? <FaStop className="ai-original-icon" /> : <FaMicrophone className="ai-original-icon" />}
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder={
                listening ? "Listening..." : "Ask about Vishal..."
              }
              value={input}
              disabled={typing}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  processMessage(input);
                }
              }}
            />

            <button
              className="ai-send"
              onClick={() => processMessage(input)}
              disabled={!input.trim() || typing}
              aria-label="Send message"
            >
              <FaPaperPlane className="ai-original-icon" />
            </button>
          </div>

          <div className="ai-footer-note">
            Vishal AI • Portfolio assistant
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
