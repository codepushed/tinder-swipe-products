import React from "react";

export default function TopNavBar({ activeTab = "forYou", onTabChange }) {
  return (
    <nav className="w-full flex items-center justify-between px-4 pt-6 pb-3">
      {/* Left: Hamburger/Menu Icon */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#232323] text-gray-300 shadow">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {/* Center: Toggle */}
      <div className="flex items-center gap-2 bg-[#232323] rounded-full px-1 py-1 shadow">
        <button
          className={`px-4 py-1 rounded-full text-sm font-semibold focus:outline-none transition-all duration-200 ${activeTab === "forYou" ? "bg-[#181818] text-white shadow" : "text-gray-400"}`}
          onClick={() => onTabChange && onTabChange("forYou")}
        >
          <span className="inline-block align-middle mr-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-3-3m3 3l3-3"/></svg>
          </span>
          For You
        </button>
        <button
          className={`px-4 py-1 rounded-full text-sm font-semibold focus:outline-none transition-all duration-200 ${activeTab === "nearby" ? "bg-[#181818] text-white shadow" : "text-gray-400"}`}
          onClick={() => onTabChange && onTabChange("nearby")}
        >
          Nearby
        </button>
      </div>
      {/* Right: Filter/Settings Icon */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#232323] text-gray-300 shadow">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c.03.63.38 1.19 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.63.03 1.19.38 1.51 1H21a2 2 0 0 1 0 4h-.09c-.32.03-.62.16-.86.4z"/></svg>
      </button>
    </nav>
  );
}
