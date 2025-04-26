import React, { useState, useEffect } from 'react';
import { SwipeCard } from './components';
import { demoProducts } from './data';
import TopNavBar from './components/TopNavBar';
import BottomNavBar from './components/BottomNavBar';
import SplashScreen from './components/SplashScreen';
import CollectionGrid from './components/CollectionGrid';
import Explore from './pages/Explore';

const notifications = [
  { id: 1, user: 'Ava', msg: 'liked your product', time: '2m ago', avatar: '/avatar1.jpg' },
  { id: 2, user: 'Liam', msg: 'liked your product', time: '7m ago', avatar: '/avatar2.jpg' },
  { id: 3, user: 'Olivia', msg: 'liked your product', time: '14m ago', avatar: '/avatar3.jpg' },
  { id: 4, user: 'Noah', msg: 'liked your product', time: '30m ago', avatar: '/avatar4.jpg' },
  { id: 5, user: 'Emma', msg: 'liked your product', time: '1h ago', avatar: '/avatar5.jpg' },
];

function App() {
  const [products, setProducts] = useState(demoProducts);
  const [swiped, setSwiped] = useState([]);
  const [activeTab, setActiveTab] = useState('forYou');
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSwipe = (direction, product) => {
    setProducts((prev) => prev.slice(1));
    setSwiped((prev) => [...prev, { ...product, direction }]);
  };

  const handleCardClick = (product) => {
    console.log('Card clicked:', product);
    setModalProduct(product);
  };

  const handleCloseModal = () => {
    setModalProduct(null);
  };

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className={`min-h-screen w-full bg-[#191919] flex flex-col items-center justify-center${showSplash ? ' pointer-events-none select-none' : ''}`}>
        {activeBottomTab === 'home' && (
          <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 z-20">
            <TopNavBar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
        <div className="w-[95%] max-w-xs h-[70vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {activeBottomTab === 'likes' ? (
            <div className="w-full h-full bg-[#232323]/80 rounded-2xl px-2 py-2 flex flex-col gap-4 overflow-y-auto">
              <h2 className="text-lg font-semibold px-[10px] text-white mb-3 ml-2">Notifications</h2>
              {notifications.map(n => (
                <div key={n.id} className=" mb-[10px] px-[10px] py-[10px] flex items-center gap-[10px] bg-[#18191A]/90 rounded-[100px] border border-[rgba(192,192,192,0.22)] px-4 py-3 shadow-sm transition hover:shadow-lg mt-2 first:mt-0">
                  <img src="/profile.jpeg" alt={n.user} className="w-[50px] h-[50px] rounded-full object-cover" />
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <span className="font-semibold text-white text-base leading-tight truncate">{n.user} <span className="ml-2 text-[#FF444F] font-normal whitespace-nowrap">{n.msg}</span></span>
                    <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'nearby' ? (
            <div className="w-full h-full flex items-start justify-center overflow-y-auto mt-[80px] pb-[120px]">
              <CollectionGrid products={products} onCardClick={handleCardClick} />
            </div>
          ) : activeBottomTab === 'explore' ? (
            <div className="w-full h-full flex items-start justify-center overflow-y-auto mt-0 pb-[300px]">
              <Explore />
            </div>
          ) : products.length === 0 ? (
            <div className="text-lg font-semibold text-center bg-black/20 text-white rounded-xl p-8">
              No more products!
            </div>
          ) : (
            products.map((product, idx) => (
              <SwipeCard
                key={product.id}
                product={product}
                onSwipe={idx === 0 ? handleSwipe : () => {}}
                canDrag={idx === 0}
                style={{ zIndex: products.length - idx }}
              />
            ))
          )}
        </div>
        <BottomNavBar activeTab={activeBottomTab} onTabChange={setActiveBottomTab} />
      </div>
      {!!modalProduct && (
        <ProductModal product={modalProduct} open={true} onClose={handleCloseModal} />
      )}
    </>
  );
}

import ProductModal from './components/ProductModal';
export default App;
