import React from "react";

const CollectionGrid = ({ products, onCardClick }) => {
  return (
    <div className="grid grid-cols-2 gap-[10px] w-full p-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#18191A] rounded-[12px] shadow-lg border border-[rgba(192,192,192,0.22)] flex flex-col overflow-hidden hover:scale-105 transition-transform cursor-pointer mb-2"
          onClick={() => onCardClick && onCardClick(product)}
        >
          <div className="w-[100%] h-[200px] bg-[#232323] flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-[100%] h-[100%] rounded-[12px]"
              loading="lazy"
            />
          </div>
          <div className="p-[10px] flex flex-col gap-1">
            <div className="font-semibold text-white text-sm truncate capitalize">{product.name}</div>
            <div className="text-xs text-[#FF444F] font-medium capitalize">{product.brand}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white font-bold text-base mt-[10px]">₹{product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-gray-400 line-through mt-[10px] ml-[10px]">₹{product.originalPrice}</span>
              )}
            </div>
            {product.discountPercentage > 0 && (
                <span className="text-[10px] text-[#808080] font-bold">{product.discountPercentage}% OFF</span>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionGrid;
