import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  sendWeddingChatMessage,
  getWeddingChatHistory,
} from "../services/ai.api";

function WeddingChatbot() {
  const { weddingId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  // ======================================================
  // SCROLL TO BOTTOM
  // ======================================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ======================================================
  // LOAD SAVED CHAT
  // ======================================================

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setLoading(true);

        const response =
          await getWeddingChatHistory(weddingId);

        const history =
          response.data?.data?.history || [];

        setMessages(history);
      } catch (error) {
        console.error(
          "Failed to load chat history:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load chat history."
        );
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      loadChatHistory();
    }
  }, [weddingId]);

  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const handleSendMessage = async () => {
    const message = input.trim();

    if (!message || sending) {
      return;
    }

    // ---------------------------------------------
    // Immediately show user message
    // ---------------------------------------------

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        message,
      },
    ]);

    setInput("");
    setSending(true);

    try {
      const response =
        await sendWeddingChatMessage(
          weddingId,
          message
        );

      const aiResponse =
        response.data?.data?.response || "";

      if (!aiResponse) {
        throw new Error(
          "AI returned an empty response."
        );
      }

      // ---------------------------------------------
      // Add AI response
      // ---------------------------------------------

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          message: aiResponse,
        },
      ]);
    } catch (error) {
      console.error(
        "Wedding chatbot error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to get AI response."
      );

      // ---------------------------------------------
      // Remove optimistic user message if request
      // completely failed
      // ---------------------------------------------

      setMessages((previous) => {
        const updated = [...previous];

        const lastIndex =
          updated.length - 1;

        if (
          updated[lastIndex]?.role === "user" &&
          updated[lastIndex]?.message === message
        ) {
          updated.pop();
        }

        return updated;
      });
    } finally {
      setSending(false);
    }
  };

  // ======================================================
  // ENTER KEY
  // ======================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // ======================================================
  // SUGGESTED QUESTIONS
  // ======================================================

  const suggestions = [
    "What should I prioritize right now?",
    "How much do I still need to pay my vendors?",
    "How many guests have not responded?",
    "Which tasks are still incomplete?",
  ];

  const handleSuggestion = (question) => {
    if (sending) {
      return;
    }

    setInput(question);
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[75vh] flex items-center justify-center">

          <div className="text-center">

            <div className="w-14 h-14 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-gray-500 font-medium">
              Loading your wedding assistant...
            </p>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pb-10">

        {/* ==================================================
            BACK
        ================================================== */}

        <Link
          to={`/weddings/${weddingId}`}
          className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 hover:underline mb-5"
        >
          ← Back to Wedding
        </Link>


        {/* ==================================================
            CHAT CONTAINER
        ================================================== */}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 px-6 md:px-8 py-7 text-white">

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-4xl border border-white/20">
                💬
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="text-2xl md:text-3xl font-bold">
                    AI Wedding Assistant
                  </h1>

                  <span className="bg-white/15 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                    AI
                  </span>

                </div>

                <p className="text-white/80 mt-1">
                  Your personal assistant for wedding planning
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              CHAT AREA
          ================================================== */}

          <div className="bg-gray-50">

            <div className="h-[55vh] min-h-[420px] overflow-y-auto px-4 md:px-8 py-6">

              {/* EMPTY CHAT */}

              {messages.length === 0 && (

                <div className="max-w-2xl mx-auto text-center pt-8">

                  <div className="w-24 h-24 mx-auto rounded-3xl bg-purple-100 flex items-center justify-center text-5xl">
                    💍
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-6">
                    How can I help with your wedding?
                  </h2>

                  <p className="text-gray-500 mt-3 leading-7">
                    Ask me about your tasks, guests,
                    vendors, expenses, budget or wedding
                    planning.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mt-7 text-left">

                    {suggestions.map((question) => (
                      <button
                        key={question}
                        onClick={() =>
                          handleSuggestion(question)
                        }
                        className="bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl p-4 text-sm text-gray-700 text-left transition"
                      >
                        {question}
                      </button>
                    ))}

                  </div>

                </div>
              )}


              {/* ==================================================
                  MESSAGES
              ================================================== */}

              <div className="max-w-4xl mx-auto space-y-5">

                {messages.map((chat, index) => {

                  const isUser =
                    chat.role === "user";

                  return (
                    <div
                      key={`${chat.role}-${index}`}
                      className={`flex ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`flex gap-3 max-w-[90%] md:max-w-[78%] ${
                          isUser
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >

                        {/* Avatar */}

                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                            isUser
                              ? "bg-pink-100"
                              : "bg-purple-100"
                          }`}
                        >
                          {isUser ? "👤" : "🤖"}
                        </div>


                        {/* Message */}

                        <div>

                          <div
                            className={`rounded-2xl px-5 py-4 whitespace-pre-wrap leading-7 ${
                              isUser
                                ? "bg-pink-600 text-white rounded-tr-sm"
                                : "bg-white text-gray-700 border border-gray-200 shadow-sm rounded-tl-sm"
                            }`}
                          >
                            {chat.message}
                          </div>

                          <p
                            className={`text-xs text-gray-400 mt-1 ${
                              isUser
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {isUser
                              ? "You"
                              : "AI Wedding Assistant"}
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                })}


                {/* ==================================================
                    AI TYPING
                ================================================== */}

                {sending && (

                  <div className="flex justify-start">

                    <div className="flex gap-3">

                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-lg">
                        🤖
                      </div>

                      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4">

                        <div className="flex gap-1">

                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />

                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{
                              animationDelay:
                                "150ms",
                            }}
                          />

                          <span
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{
                              animationDelay:
                                "300ms",
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                )}

                <div ref={messagesEndRef} />

              </div>

            </div>


            {/* ==================================================
                SUGGESTIONS WHEN CHAT EXISTS
            ================================================== */}

            {messages.length > 0 && !sending && (

              <div className="px-4 md:px-8 pb-3">

                <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto pb-1">

                  {suggestions.slice(0, 3).map(
                    (question) => (
                      <button
                        key={question}
                        onClick={() =>
                          handleSuggestion(question)
                        }
                        className="flex-shrink-0 bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-600 px-4 py-2 rounded-full text-xs transition"
                      >
                        {question}
                      </button>
                    )
                  )}

                </div>

              </div>
            )}


            {/* ==================================================
                INPUT
            ================================================== */}

            <div className="border-t border-gray-200 bg-white p-4 md:p-6">

              <div className="max-w-4xl mx-auto">

                <div className="flex items-end gap-3">

                  <textarea
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    disabled={sending}
                    rows={1}
                    placeholder="Ask anything about your wedding..."
                    className="flex-1 resize-none border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 rounded-2xl px-5 py-4 outline-none text-gray-700 disabled:bg-gray-100"
                  />

                  <button
                    onClick={handleSendMessage}
                    disabled={
                      sending ||
                      !input.trim()
                    }
                    className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center text-xl shadow-lg transition"
                  >
                    {sending ? "⏳" : "➤"}
                  </button>

                </div>

                <p className="text-xs text-gray-400 mt-2 text-center">
                  Press Enter to send • Shift + Enter for a new line
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default WeddingChatbot;