import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const ProductModal = ({ product, open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open || !product) return null;

  const modalContent = (
    <div className="fixed w-[100%] h-[100%] inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div className="w-[100%] h-[100%] bg-[#18191A] rounded-2xl shadow-2xl p-4 relative animate-center-modal flex flex-col max-w-[520px] max-h-[98vh]" onClick={e => e.stopPropagation()}>
        <button className="absolute top-[10px] right-[10px] w-[30px] h-[30px] flex items-center justify-center rounded-[50px] border-none bg-[#000]/40" onClick={onClose}>
          <img src="/close-white.png" className="w-[18px] h-[18px]" />
        </button>


        <div className="w-full h-[40vw] max-h-[600px] min-h-[600px] bg-[#232323] flex items-center justify-center rounded-xl overflow-hidden mb-3 mx-auto">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col gap-2 p-[20px]">
          <h1 className="font-bold text-white text-bold mb-[0px] text-[20px] capitalize">{product.name}</h1>
          <div className="text-base text-[18px] text-[#FF444F] font-medium capitalize mb-2">{product.brand}</div>
          <div className="flex items-center gap-2 mb-2 mt-[10px]">
            <span className="w-full text-white font-bold text-xl flex items-center justify-space-between">₹{product.price}

            {product.discountPercentage > 0 && (
              <span className="text-sm text-[#808080] line-through ml-[10px]">₹{product.originalPrice}</span>
            )}
            </span>
            
            {product.discountPercentage > 0 && (
              <span className="text-[12px] text-[#fff] font-bold text-center bg-[#FF444F]/70 rounded-[50px] h-[50px] w-[60px]"><p className="text-center m-[8px]">{product.discountPercentage}% OFF</p></span>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProductModal;
