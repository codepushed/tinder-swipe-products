import React, { useRef, forwardRef } from 'react';
import TinderCard from 'react-tinder-card';

const SWIPE_THRESHOLD = 80;

function useDominantColor(imageUrl) {
  const [color, setColor] = React.useState('rgba(40,40,40,0.6)');
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

const SwipeCard = forwardRef(function SwipeCard({ product, onSwipe, style, canDrag }, ref) {
  const dominantColor = useDominantColor(product.imageUrl);
  const cardRef = useRef();

  React.useImperativeHandle(ref, () => ({
    swipe: (dir) => cardRef.current?.swipe(dir)
  }));

  const handleButtonClick = (dir) => {
    if (!canDrag) return;
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.swipe(dir);
    } else if (cardRef.current) {
      cardRef.current.swipe(dir);
    }
  };

  return (
    <div className="absolute w-full h-full flex items-center justify-center" style={{ zIndex: style?.zIndex, pointerEvents: 'auto' }}>
      <TinderCard
        ref={cardRef}
        className="w-full h-full flex items-center justify-center"
        onSwipe={(dir) => onSwipe(dir, product)}
        preventSwipe={canDrag ? [] : ['up', 'down', 'left', 'right']}
        swipeRequirementType="position"
        swipeThreshold={SWIPE_THRESHOLD}
      >
        <div
          className={
            `w-full h-full flex flex-col overflow-hidden z-10 select-none border-6 border-[#F3CFC6]/60 bg-transparent` +
            (canDrag ? ' cursor-grab active:shadow-2xl' : '')
          }
          style={{
            width: '92vw', maxWidth: 340, height: 620,
            background: `linear-gradient(to bottom, rgba(80,80,80,0.45) 0%, rgba(80,80,80,0.15) 40%, rgba(80,80,80,0.00) 60%, ${dominantColor} 100%)`,
            borderRadius: 32,
            padding: 4,
            boxSizing: 'border-box',
          }}
          tabIndex={-1}
          draggable={false}
          data-testid="swipe-card"
        >
          <div className="relative w-full h-[80%] flex flex-col justify-between">
            <div className="relative z-20 flex flex-col gap-3 px-4 pt-4">
              <div className="flex items-center justify-between p-[10px]">
                <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[50px] border-none bg-[#000]/40">
                  <img src="/dots-white.png" className="w-[18px] h-[18px]" />
                </button>
                <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[50px] border-none bg-[#000]/40">
                  <img src="/bookmark-white.png" className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center rounded-[20px] z-0 absolute inset-0"
              draggable={false}
              style={{ padding: 0, background: 'transparent' }}
            />
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
          <div className='w-full flex items-center justify-center mt-[30px]'>
            <div className="flex items-center justify-center gap-[12px] mt-1 bg-[#232323]/70 w-[110px] rounded-[100px] px-[3px] py-[3px]">
              <button
                className="w-[50px] h-[50px] flex items-center justify-center rounded-[100px] bg-[#808080]/20 border-none active:scale-90 transition-transform duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick('left');
                }}
                aria-label="Dislike"
              >
                <img src="/close-white.png" className="w-[30px] h-[30px]" alt="Dislike" />
              </button>
              <button
                className="w-[50px] h-[50px] flex items-center justify-center rounded-[100px] bg-[#F16DAE] border-none active:scale-90 transition-transform duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick('right');
                }}
                aria-label="Like"
              >
                <img src="/heart-filled-white.png" className="w-[30px] h-[30px]" alt="Like" />
              </button>
            </div>
          </div>
        </div>
      </TinderCard>
    </div>
  );
});

export default SwipeCard;
