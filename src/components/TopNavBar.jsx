import React from "react";

const TopNavBar = ({ activeTab = "forYou", onTabChange }) => {
  return (
    <nav className="w-full flex items-center justify-between pt-6 pb-3 gap-[25px] mt-[5px]">
      <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[50px] border-none bg-[#808080]/10">
        <img src="/menu-white.png" className="w-[18px] h-[18px]" />
      </button>
      <div className="flex items-center justify-center rounded-full bg-[#18191A] px-1 py-1 shadow gap-1 border border-[#232323]">
        <button
          className={`w-[110px] h-[38px] flex items-center gap-[10px] justify-center rounded-full border-none transition-all duration-200 text-base font-semibold ${activeTab === "forYou" ? "bg-white text-[#18191A]" : "bg-transparent text-[#A3A3A3]"}`}
          onClick={() => onTabChange && onTabChange("forYou")}
        >
          <img src="/trending-white.png" className={`w-[18px] h-[18px] ${activeTab === "forYou" ? "filter invert" : ""}`} />
          For You
        </button>
        <button
          className={`w-[110px] h-[38px] flex items-center gap-[10px] justify-center rounded-full border-none transition-all duration-200 text-base font-semibold ${activeTab === "nearby" ? "bg-white text-[#18191A]" : "bg-transparent text-[#A3A3A3]"}`}
          onClick={() => onTabChange && onTabChange("nearby")}
        >
          <img src="/collections-white.png" className={`w-[18px] h-[18px] ${activeTab === "nearby" ? "filter invert" : ""}`} />
          Collections
        </button>
      </div>
      <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[50px] border-none bg-[#808080]/10">
        <img src="/control-white.png" className="w-[18px] h-[18px]" />
      </button>
    </nav>
  );
}

export default TopNavBar;
