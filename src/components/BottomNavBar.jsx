import React from "react";

const BottomNavBar = ({ activeTab = "home", onTabChange, cart }) => {
  return (
    <nav className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[68vw] max-w-md z-30">
      <div className="flex items-center justify-between bg-[#18191A] rounded-full px-[5px] py-[5px] shadow-lg border-none">
        <button
          className={`flex items-center justify-center w-[68px] h-[48px] bg-[#808080]/20 border-none rounded-full transition-all duration-200 ${activeTab === "home" ? "bg-[#fff] text-[#18191A] -mt-4" : "bg-transparent text-[#A3A3A3]"}`}
          onClick={() => onTabChange && onTabChange("home")}
        >
          <img
            src={activeTab === "home" ? "/home-black.png" : "/home-white.png"}
            className="w-[24px] h-[24px] transition-all duration-200"
            alt="Home"
          />
        </button>
        <button
          className={`flex items-center justify-center w-[48px] h-[48px] bg-[#808080]/20 border-none rounded-full transition-all duration-200 ${activeTab === "explore" ? "bg-[#fff] text-[#18191A]" : "bg-transparent text-[#A3A3A3]"}`}
          onClick={() => onTabChange && onTabChange("explore")}
        >
          <img src={activeTab === "explore" ? "/explore-black.png" : "/explore-white.png"} className="w-[24px] h-[24px] transition-all duration-200" alt="Explore" />
        </button>
        <button
          className={`flex items-center justify-center w-[48px] h-[48px] bg-[#808080]/20 border-none rounded-full transition-all duration-200 ${activeTab === "likes" ? "bg-[#fff] text-[#18191A]" : "bg-transparent text-[#A3A3A3]"}`}
          onClick={() => onTabChange && onTabChange("likes")}
        >
          <span className="relative">
            <img src={activeTab === "likes" ? "/heart-black.png" : "/like-white.png"} className="w-[24px] h-[24px] transition-all duration-200" alt="Likes" />
            <span className="absolute text-[#fff] -top-2 -right-2 bg-[#FF444F] text-white text-xs font-bold rounded-[100px] text-center w-[10px] h-[16px] px-[5px] py-[2px]">5</span>
          </span>
        </button>
        <button
          className={`flex items-center justify-center w-[48px] h-[48px] bg-[#808080]/20 border-none rounded-full transition-all duration-200 ${activeTab === "chat" ? "bg-[#fff] text-[#18191A]" : "bg-transparent text-[#A3A3A3]"}`}
          onClick={() => onTabChange && onTabChange("chat")}
        >
          <img src={activeTab === "chat" ? "/cart-black.png" : "/cart-white.png"} className="w-[24px] h-[24px] transition-all duration-200" alt="Cart" />
          {cart && cart.length > 0 && (
            <span className="absolute top-1 right-1 bg-[#FF444F] text-white text-xs font-bold rounded-full px-2 py-0.5 z-10">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default BottomNavBar;
