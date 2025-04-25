// This file is now obsolete. Please use src/components/SwipeCard.jsx instead.

import React, { useRef, useState } from 'react';
import './SwipeCard.css';

const SWIPE_THRESHOLD = 120; // px

export default function SwipeCard({ product, onSwipe, style }) {
  const cardRef = useRef(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, isDragging: false });
  const [transition, setTransition] = useState('');

  const handlePointerDown = (e) => {
    setDrag({ ...drag, isDragging: true, startX: e.clientX || e.touches[0].clientX, startY: e.clientY || e.touches[0].clientY });
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('touchmove', handlePointerMove, { passive: false });
    document.addEventListener('touchend', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!drag.isDragging) return;
    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    setDrag((prev) => ({ ...prev, x: clientX - prev.startX, y: clientY - prev.startY }));
  };

  const handlePointerUp = () => {
    if (!drag.isDragging) return;
    if (Math.abs(drag.x) > SWIPE_THRESHOLD) {
      setTransition('transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)');
      setDrag((prev) => ({ ...prev, x: drag.x > 0 ? 1000 : -1000, y: prev.y }));
      setTimeout(() => {
        onSwipe(drag.x > 0 ? 'right' : 'left', product);
      }, 350);
    } else {
      setTransition('transform 0.3s');
      setDrag((prev) => ({ ...prev, x: 0, y: 0 }));
      setTimeout(() => setTransition(''), 300);
    }
    setDrag((prev) => ({ ...prev, isDragging: false }));
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
    document.removeEventListener('touchmove', handlePointerMove);
    document.removeEventListener('touchend', handlePointerUp);
  };

  return (
    <div
      ref={cardRef}
      className="swipe-card"
      style={{
        ...style,
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.05}deg)`,
        transition,
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      <img src={product.image} alt={product.name} className="swipe-card-img" />
      <div className="swipe-card-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <span className="swipe-card-price">${product.price}</span>
      </div>
    </div>
  );
}
