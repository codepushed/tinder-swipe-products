import React, { useRef, useState } from 'react';

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
      className={
        `absolute w-full max-w-xs h-[60vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 select-none will-change-transform ` +
        (canDrag ? 'cursor-grab' : 'pointer-events-none')
      }
      style={{
        ...style,
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.05}deg)` + (style?.transform ? ` ${style.transform}` : ''),
        transition,
        touchAction: canDrag ? 'pan-y' : 'none',
      }}
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      tabIndex={-1}
      draggable={false}
    >
      <img src={product.imageUrl} alt={product.name} className="w-full h-[55%] object-cover rounded-t-3xl" draggable={false} />
      <div className="flex-1 flex flex-col justify-between p-5">
        <h2 className="text-2xl font-bold mb-1 text-gray-900">{product.name}</h2>
        <p className="flex-1 text-gray-600 text-base mb-2">{product.description}</p>
        <span className="font-bold text-xl text-pink-500 self-end">${product.price}</span>
      </div>
    </div>
  );
}
