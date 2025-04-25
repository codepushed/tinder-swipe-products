import React, { useState } from 'react';
import { SwipeCard } from './components';
import { demoProducts } from './data';
import TopNavBar from './components/TopNavBar';

function App() {
  const [products, setProducts] = useState(demoProducts);
  const [swiped, setSwiped] = useState([]);
  const [activeTab, setActiveTab] = useState('forYou');

  const handleSwipe = (direction, product) => {
    setProducts((prev) => prev.slice(1));
    setSwiped((prev) => [...prev, { ...product, direction }]);
  };

  return (
    <div className="min-h-screen w-full bg-[#191919] flex flex-col items-center justify-center">
  <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 z-20">
    <TopNavBar activeTab={activeTab} onTabChange={setActiveTab} />
  </div>

  <div className="w-full max-w-xs h-[70vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
    {products.length === 0 ? (
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
</div>

  );
}

export default App;
