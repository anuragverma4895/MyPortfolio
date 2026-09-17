import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ──────────────────────────────────────────────────
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// ── Constants ──────────────────────────────────────────────
const STARTER_SUGGESTIONS = [
  'Who is Anurag?',
  'What are his skills?',
  'Tell me about his projects',
  'What are his achievements?',
  'How can I contact him?',
];

const MAX_HISTORY = 20;

// ── Sparkle SVG Icon ───────────────────────────────────────
const SparkleIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Typing Indicator ───────────────────────────────────────
const TypingIndicator = () => (
  <div className="ai-chat-typing-indicator">
    <span />
    <span />
    <span />
  </div>
);

// ── Markdown-lite renderer ─────────────────────────────────
function renderMarkdownLite(text: string) {
  // Split by lines, process bold (**text**) and inline code (`code`)
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={j} className="ai-chat-inline-code">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ── Main Component ─────────────────────────────────────────
const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Send message to backend
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      setInput('');

      const userMsg: ChatMessage = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Build history for the API (exclude the current message)
        const history = [...messages, userMsg].slice(-MAX_HISTORY).map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: history.slice(0, -1), // exclude the current message from history
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || `Server error (${res.status})`);
        }

        const data = await res.json();
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: data.reply || 'Sorry, I could not generate a response.',
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to get response. Please try again.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <>
      {/* ── Floating AI Button ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed right-5 bottom-24 z-[100] flex flex-col items-end gap-3"
        style={{ display: isOpen ? 'none' : undefined }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.4, type: 'spring' }}
          className="bg-black/80 backdrop-blur-md text-white text-sm px-4 py-2 rounded-2xl shadow-xl border border-white/10 relative mr-1 pointer-events-none"
        >
          Anurag's Personal AI Assistant ✨
          <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-black/80 border-b border-r border-white/10 rotate-45"></div>
        </motion.div>
        <motion.button
          type="button"
          onClick={toggleChat}
          aria-label="Open AI Assistant"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="ai-assistant-fab group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-white"
        >
          {/* Animated glow ring */}
          <span className="ai-assistant-fab-ring" />
          <span className="relative z-10 flex items-center justify-center">
            <SparkleIcon className="h-7 w-7" />
          </span>
        </motion.button>
      </motion.div>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="ai-chat-window"
            role="dialog"
            aria-label="AI Assistant chat"
            aria-modal="false"
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="flex items-center gap-2.5">
                <div className="ai-chat-header-icon">
                  <SparkleIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="ai-chat-header-title">Ask Anurag's AI</h3>
                  <p className="ai-chat-header-subtitle">Portfolio Assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleChat}
                aria-label="Close AI Assistant"
                className="ai-chat-close-btn"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="ai-chat-messages">
              {/* Welcome message */}
              {showSuggestions && (
                <div className="ai-chat-welcome">
                  <div className="ai-chat-welcome-icon">
                    <SparkleIcon className="h-8 w-8" />
                  </div>
                  <p className="ai-chat-welcome-text">
                    Hi! I'm Anurag's AI assistant. Ask me anything about his skills, projects,
                    achievements, or background.
                  </p>
                  <div className="ai-chat-suggestions">
                    {STARTER_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSuggestionClick(s)}
                        className="ai-chat-suggestion-chip"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`ai-chat-bubble ${msg.role === 'user' ? 'ai-chat-bubble-user' : 'ai-chat-bubble-ai'}`}
                >
                  {msg.role === 'assistant' && (
                    <span className="ai-chat-bubble-avatar">
                      <SparkleIcon className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <div className="ai-chat-bubble-content">
                    {msg.role === 'assistant' ? renderMarkdownLite(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ai-chat-bubble ai-chat-bubble-ai"
                >
                  <span className="ai-chat-bubble-avatar">
                    <SparkleIcon className="h-3.5 w-3.5" />
                  </span>
                  <TypingIndicator />
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ai-chat-error"
                >
                  <span>⚠</span> {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="ai-chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Anurag..."
                className="ai-chat-input"
                disabled={isLoading}
                maxLength={500}
                aria-label="Type your message"
                id="ai-chat-input"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="ai-chat-send-btn"
                aria-label="Send message"
                id="ai-chat-send"
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
