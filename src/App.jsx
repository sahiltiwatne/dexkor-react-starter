import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Toggle from "./components/Toggle";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const fullText = "Dexkor.Ai";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("New Chat");
  const [knowledgeURL, setKnowledgeURL] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  

  useEffect(() => {
    setTimeout(() => {
      setMainContentVisible(true);
    }, 200);
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setTypedText(fullText.slice(0, index + 1));
        setIndex((prev) => {
          if (prev < fullText.length - 1) return prev + 1;
          else {
            setIsTyping(false);
            return prev;
          }
        });
      }, 100);
    } else {
      const timeout = setTimeout(() => {
        setTypedText("");
        setIndex(0);
        setIsTyping(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [index, isTyping]);

  return (
    <div
      className={`min-h-screen flex transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`transition-all duration-500 ${
          sidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0"
        } overflow-hidden`}
      >
        <div
          className={`h-full flex flex-col p-4 transition-all duration-700 ${
            darkMode ? "bg-[#1f1f1f]" : "bg-[#f2f2f2]"
          }`}
        >
          <h1
            className={`text-2xl font-bold mb-6 whitespace-nowrap ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {typedText}
            <span className="animate-pulse">{isTyping ? "|" : ""}</span>
          </h1>
          <div className="flex-1 flex items-center">
            <Sidebar
              darkMode={darkMode}
              activeSection={activeItem}
              setActiveSection={setActiveItem}
            />
          </div>
        </div>
      </div>

      {/* Secondary Sidebar */}
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          activeItem === "Tickets" || activeItem === "Knowledge Base URL"
            ? "translate-x-0 opacity-100 w-64"
            : "translate-x-10 opacity-0 w-0"
        } overflow-hidden p-4 ${
          darkMode ? "bg-[#2a2a2a] text-white" : "bg-[#e8e8e8] text-black"
        }`}
      >
        {/* TICKETS */}
        {activeItem === "Tickets" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Tickets</h2>
            <ul className="space-y-2">
  {["Ticket #1", "Ticket #2", "Ticket #3"].map((ticket, idx) => (
    <li
      key={idx}
      onClick={() => setSelectedTicket(ticket)}
      className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-200 ${
        selectedTicket === ticket
          ? `${darkMode ? "bg-white text-black" : "bg-black text-white"} shadow-md border`
          : "bg-gray-500/10 hover:bg-gray-500/20"
      }`}
    >
      {ticket}
    </li>
  ))}
</ul>

          </>
        )}

        {/* KNOWLEDGE URL */}
        {activeItem === "Knowledge Base URL" && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Enter Knowledge Based URL
            </h2>
            <input
              type="text"
              value={knowledgeURL}
              onChange={(e) => setKnowledgeURL(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 rounded-md bg-white text-black"
            />
            <button
              onClick={() => {
                try {
                  const url = new URL(knowledgeURL);
                  window.open(url.toString(), "_blank");
                } catch {
                  alert("Please enter a valid URL.");
                }
              }}
              className={`mt-3 px-4 py-2 rounded-md ${
                darkMode ? "bg-[#444] text-white" : "bg-black text-white"
              }`}
            >
              Open URL
            </button>
          </>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col justify-between px-8 py-6 transition-all duration-700 transform ${
          mainContentVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-10 opacity-0"
        }`}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`px-3 py-1 rounded-full ${
              darkMode ? "bg-[#333] text-white" : "bg-gray-200 text-black"
            } ml-1`}
          >
            {sidebarOpen ? "⬅️" : "➡️"}
          </button>

          <div className="flex gap-4 items-center">
            <Toggle enabled={darkMode} setEnabled={setDarkMode} />
            <button
              className={`px-4 py-2 rounded-full ${
                darkMode ? "bg-[#333] text-white" : "bg-gray-200 text-black"
              }`}
            >
              Log in
            </button>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center justify-center text-center flex-1">
          {!selectedTicket ? (
            <>
              <h6 className="text-1xl mb-0">Dexkor.AI</h6>
              <h1 className="text-6xl mb-2">Ask Anything.</h1>
              <h1 className="text-6xl mb-6">Know Everything.</h1>

              <div
                className={`flex items-center rounded-full px-4 py-2 w-72 mb-4 ${
                  darkMode ? "bg-white text-black" : "bg-gray-200 text-black"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none flex-1"
                />
                <span className="text-xl">🔍</span>
              </div>

              <button
                className={`px-6 py-2 rounded-full ${
                  darkMode ? "bg-[#444] text-white" : "bg-black text-white"
                }`}
              >
                Start now
              </button>
            </>
          ) : (
            <div
              className={`w-full max-w-xl text-left p-6 rounded-xl shadow-lg ${
                darkMode ? "bg-white text-black" : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedTicket}</h2>
              <p>
                This is detailed information shown in the center area about{" "}
                <strong>{selectedTicket}</strong>. You can customize this section
                to show status, history, updates, etc.
              </p>
              <button
                className="mt-4 px-4 py-2 rounded-full bg-red-500 text-white"
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
