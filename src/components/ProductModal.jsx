import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CollectionGrid from "./CollectionGrid";
import { demoProducts } from "../data";

const ProductModal = ({ product, open, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const startY = useRef(null);
  const currentY = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setIsClosing(false);
      return;
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line
  }, [open]);

  // Touch events for swipe down to close
  useEffect(() => {
    if (!open) return;
    const modal = modalRef.current;
    if (!modal) return;

    let isDragging = false;

    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
      currentY.current = e.touches[0].clientY;
      modal.style.transition = '';
      isDragging = true;
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;
      if (deltaY > 0) {
        modal.style.transform = `translateY(${deltaY}px)`;
        modal.style.boxShadow = `0 8px 32px 0 rgba(0,0,0,${Math.min(0.5, 0.2 + deltaY/600)})`;
      }
    };
    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      const deltaY = currentY.current - startY.current;
      if (deltaY > 100) {
        modal.style.transition = 'transform 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.28s';
        modal.style.transform = 'translateY(100%)';
        modal.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0)';
        setTimeout(() => {
          modal.style.transform = '';
          modal.style.boxShadow = '';
          setIsClosing(false);
          onClose();
        }, 250);
        setIsClosing(true);
      } else {
        modal.style.transition = 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s';
        modal.style.transform = 'translateY(0)';
        modal.style.boxShadow = '';
      }
      startY.current = null;
      currentY.current = null;
    };
    modal.addEventListener('touchstart', handleTouchStart);
    modal.addEventListener('touchmove', handleTouchMove);
    modal.addEventListener('touchend', handleTouchEnd);
    return () => {
      modal.removeEventListener('touchstart', handleTouchStart);
      modal.removeEventListener('touchmove', handleTouchMove);
      modal.removeEventListener('touchend', handleTouchEnd);
    };
  }, [open, onClose]);

  // Animate close when clicking background or close button
  const handleClose = () => {
    setIsClosing(true);
    const modal = modalRef.current;
    if (modal) {
      modal.style.transition = 'transform 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.28s';
      modal.style.transform = 'translateY(100%)';
      modal.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0)';
    }
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  if ((!open && !isClosing) || !product) return null;

  // Filter out the opened product
  const similarProducts = demoProducts.filter((p) => p.id !== product.id);

  const modalContent = (
    <div className="fixed w-[100%] h-[100%] inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto" onClick={handleClose}>
      <div
        ref={modalRef}
        className="w-[100%] h-auto bg-[#18191A] rounded-2xl shadow-2xl p-4 relative animate-center-modal flex flex-col max-w-[520px] max-h-[98vh]"
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-[10px] right-[10px] w-[30px] h-[30px] flex items-center justify-center rounded-[50px] border-none bg-[#000]/40" onClick={handleClose}>
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

        <div className="mt-4 bg-[#18191A] p-[10px]">
          <h2 className="text-white text-lg font-semibold mb-2 px-2">Similar Products</h2>
          <CollectionGrid products={similarProducts} onCardClick={() => {}} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProductModal;
