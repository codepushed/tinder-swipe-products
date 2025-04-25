import React, { useState } from 'react';
import './App.css';
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
    <div className="app-mobile-bg">
      <div className="swipe-stack">
        {products.length === 0 ? (
          <div className="no-more-cards">No more products!</div>
        ) : (
          products.map((product, idx) => (
            <SwipeCard
              key={product.id}
              product={product}
              onSwipe={handleSwipe}
              style={{ zIndex: products.length - idx }}
              canDrag={idx === 0}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
