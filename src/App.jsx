import React, { useState } from 'react';
import { SwipeCard } from './components';
import { demoProducts } from './data';

function App() {
  const [products, setProducts] = useState(demoProducts);
  const [swiped, setSwiped] = useState([]);

  const handleSwipe = (direction, product) => {
    setProducts((prev) => prev.slice(1));
    setSwiped((prev) => [...prev, { ...product, direction }]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-blue-100 to-blue-300 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs h-[70vh] flex items-center justify-center">
        {products.length === 0 ? (
          <div className="text-lg font-semibold text-center bg-black/20 text-white rounded-xl p-8">No more products!</div>
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
