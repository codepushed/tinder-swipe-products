import React, { useRef, useState } from 'react';
import './SwipeCard.css';

const SWIPE_THRESHOLD = 100; // px

export default function SwipeCard({ product, onSwipe, style, canDrag }) {
  const cardRef = useRef(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, isDragging: false });
  const [transition, setTransition] = useState('');

  const startDrag = (clientX, clientY) => {
    setDrag({ ...drag, isDragging: true, startX: clientX, startY: clientY });
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('touchend', endDrag);
  };

  const handlePointerDown = (e) => {
    if (!canDrag) return;
    if (e.touches) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      startDrag(e.clientX, e.clientY);
    }
  };

  const onDrag = (e) => {
    if (!drag.isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDrag((prev) => ({ ...prev, x: clientX - prev.startX, y: clientY - prev.startY }));
  };

  const endDrag = () => {
    if (!drag.isDragging) return;
    if (Math.abs(drag.x) > SWIPE_THRESHOLD) {
      setTransition('transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)');
      setDrag((prev) => ({ ...prev, x: drag.x > 0 ? 1000 : -1000, y: prev.y }));
      setTimeout(() => {
        onSwipe(drag.x > 0 ? 'right' : 'left', product);
        setTransition('');
        setDrag({ x: 0, y: 0, isDragging: false });
      }, 350);
    } else {
      setTransition('transform 0.3s');
      setDrag((prev) => ({ ...prev, x: 0, y: 0 }));
      setTimeout(() => setTransition(''), 300);
    }
    setDrag((prev) => ({ ...prev, isDragging: false }));
    window.removeEventListener('pointermove', onDrag);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', endDrag);
  };

  return (
    <div
      ref={cardRef}
      className="swipe-card"
      style={{
        ...style,
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.05}deg)`,
        transition,
        touchAction: canDrag ? 'pan-y' : 'none',
        pointerEvents: canDrag ? 'auto' : 'none',
      }}
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      tabIndex={-1}
      draggable={false}
    >
      <img src={product.image} alt={product.name} className="swipe-card-img" draggable={false} />
      <div className="swipe-card-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <span className="swipe-card-price">${product.price}</span>
      </div>
    </div>
  );
}
