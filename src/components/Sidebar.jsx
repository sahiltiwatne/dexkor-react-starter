import React, { useState, useEffect } from "react";

function Sidebar({ darkMode, activeSection, setActiveSection }) {
  const [slideIn, setSlideIn] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Main menu items (excluding Settings' children)
  const menuItems = ["New Chat", "Chat History", "Top Searches"];

  // Settings sub-menu items
  const settingsItems = ["Tickets", "Knowledge Base URL"];

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transform transition-transform duration-700 ease-out ${
        slideIn ? "translate-x-0" : "-translate-x-full"
      } w-full rounded-2xl p-4 space-y-4`}
    >
      {/* Main menu items */}
      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() =>
            setActiveSection((prev) => (prev === item ? "" : item))
          }
          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
            activeSection === item
              ? darkMode
                ? "bg-gray-300 text-black font-semibold"
                : "bg-black text-white font-semibold"
              : darkMode
              ? "text-white hover:bg-gray-700"
              : "text-black hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}

      {/* Settings collapsible section */}
      <div>
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 flex justify-between items-center ${
            darkMode
              ? "text-white hover:bg-gray-700"
              : "text-black hover:bg-gray-200"
          }`}
        >
          <span>Settings</span>
          <span>{settingsOpen ? "▲" : "▼"}</span>
        </button>

        {/* Animated Dropdown Wrapper */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            settingsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {settingsItems.map((item) => (
            <button
              key={item}
              onClick={() =>
                setActiveSection((prev) => (prev === item ? "" : item))
              }
              className={`ml-4 mt-2 w-[85%] text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === item
                  ? darkMode
                    ? "bg-gray-300 text-black font-semibold"
                    : "bg-black text-white font-semibold"
                  : darkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
