import React, { useRef, useState } from 'react';

const SWIPE_THRESHOLD = 80; // px - smaller for easier swipe

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
      setDrag((prev) => ({ ...prev, x: drag.x > 0 ? 600 : -600, y: prev.y }));
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
      className={
        `absolute w-[90vw] max-w-[340px] h-[410px] sm:w-[340px] sm:h-[420px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden z-10 select-none will-change-transform transition-shadow ` +
        (canDrag ? 'cursor-grab active:shadow-2xl' : 'pointer-events-none')
      }
      style={{
        ...style,
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.07}deg)` + (style?.transform ? ` ${style.transform}` : ''),
        transition,
        touchAction: canDrag ? 'pan-y' : 'none',
      }}
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      tabIndex={-1}
      draggable={false}
      data-testid="swipe-card"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover object-top rounded-t-2xl border-b border-gray-100"
        draggable={false}
      />
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-lg font-bold mb-1 text-gray-900 truncate">{product.name}</h2>
          <p className="text-xs text-gray-500 mb-2 truncate">{product.brand}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-base text-pink-500">₹{product.price}</span>
          {product.discountPercentage > 0 && (
            <span className="ml-2 text-xs text-green-600 font-semibold bg-green-100 rounded px-2 py-0.5">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>
        {product.originalPrice > product.price && (
          <span className="text-gray-400 text-xs line-through">₹{product.originalPrice}</span>
        )}
      </div>
    </div>
  );
}
