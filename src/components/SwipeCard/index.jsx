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

  function useDominantColor(imageUrl) {
    const [color, setColor] = useState('rgba(40,40,40,0.6)');
    React.useEffect(() => {
      if (!imageUrl) return;
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        setColor(`rgba(${r},${g},${b},0.85)`);
      };
    }, [imageUrl]);
    return color;
  }

  const dominantColor = useDominantColor(product.imageUrl);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: '92vw', maxWidth: 340, height: 620,
        background: `linear-gradient(to bottom, rgba(80,80,80,0.45) 0%, rgba(80,80,80,0.15) 40%, rgba(80,80,80,0.00) 60%, ${dominantColor} 100%)`,
        borderRadius: 32,
      }}
    >
      <div
        ref={cardRef}
        className={
          `w-full h-full flex flex-col overflow-hidden z-10 select-none border-6 border-[#bfa95a]/60 bg-transparent` +
          (canDrag ? ' cursor-grab active:shadow-2xl' : ' pointer-events-none')
        }
        style={{
          ...style,
          transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.07}deg)` + (style?.transform ? ` ${style.transform}` : ''),
          transition,
          touchAction: canDrag ? 'pan-y' : 'none',
          padding: 4,
          borderRadius: 32,
          boxSizing: 'border-box',
        }}
        onPointerDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        tabIndex={-1}
        draggable={false}
        data-testid="swipe-card"
      >
        <div className="relative w-full h-[80%] flex flex-col justify-between">
          {/* Top row: two rows of buttons */}
          <div className="relative z-20 flex flex-col gap-3 px-4 pt-4">
            {/* First row: menu/bookmark */}
            <div className="flex items-center justify-between p-[10px]">
              <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[50px] border-none bg-[#000]/40">
                <img src="/dots-white.png" className="w-[18px] h-[18px]" />
              </button>
              <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[50px] border-none bg-[#000]/40">
                <img src="/bookmark-white.png" className="w-[18px] h-[18px]" />
              </button>
            </div>
            {/* Second row: Like/Dislike */}
            <div className="flex items-center justify-center gap-6 mt-1">
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-[#232323]/70 border-4 border-white/10 shadow-xl">
                <img src="/close-x.png" className="w-7 h-7" alt="Dislike" />
              </button>
              <button className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-500 shadow-xl border-4 border-white/10">
                <img src="/heart-white.png" className="w-9 h-9" alt="Like" />
              </button>
            </div>
          </div>
          {/* Card image (background) */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-[20px] z-0 absolute inset-0"
            draggable={false}
            style={{ padding: 0, background: 'transparent' }}
          />
          {/* Bottom content: name, age, verified, status */}
          <div className="relative z-20 flex flex-col gap-2 px-7 pb-7 mt-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white text-3xl font-bold drop-shadow-lg">{product.name}</span>
              <span className="text-white text-2xl font-semibold opacity-70">, {product.age || 23}</span>
              <span className="ml-1"><svg className="inline-block" width="22" height="22" viewBox="0 0 24 24" fill="#4fd1c5"><circle cx="12" cy="12" r="10" fill="#4fd1c5" /><path d="M9.5 12.5l2 2 3-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              <span className="text-green-200 text-sm font-semibold">In real time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
