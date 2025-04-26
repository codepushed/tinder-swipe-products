import React from "react";

const CollectionGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full p-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#18191A] rounded-2xl shadow-lg border border-[#232323]/40 flex flex-col overflow-hidden hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="w-full aspect-square bg-[#232323] flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="p-2 flex flex-col gap-1">
            <div className="font-semibold text-white text-sm truncate">{product.name}</div>
            <div className="text-xs text-[#FF444F] font-medium">{product.brand}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white font-bold text-base">₹{product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs text-green-400 font-bold">{product.discountPercentage}% OFF</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionGrid;
