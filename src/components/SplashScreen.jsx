import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#18191A] animate-fadeinout">
      <img src="/logo.jpg" alt="App Logo" className="w-24 h-24 mb-6 drop-shadow-lg animate-pop" />
      <h1 className="text-3xl font-bold text-[#FF444F] tracking-wide animate-pop-delay">Shoppin'</h1>
    </div>
  );
}

export default SplashScreen;