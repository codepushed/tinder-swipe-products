import React from "react";

/**
 * @param {Object[]} products 
 * @param {function} [onImageClick] 
 */
const ExploreGrid = ({ products, onImageClick }) => {
  const getRandomHeight = (idx) => {
    const heights = [220, 180, 260, 320, 200, 240, 280, 300, 170, 210];
    return heights[idx % heights.length];
  };

  return (
    <div className="columns-2 md:columns-3 w-full p-0 m-0" style={{ columnGap: 0 }}>
      {products.map((product, idx) => (
        <div
          key={product.id}
          className="overflow-hidden cursor-pointer hover:scale-105 transition-transform p-0 m-0"
          style={{ breakInside: 'avoid', margin: 0, padding: 0 }}
          onClick={() => onImageClick && onImageClick(product)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full object-cover block bg-[#232323] p-0 m-0"
            loading={idx < 8 ? 'eager' : 'lazy'}
            style={{
              display: 'block',
              width: '100%',
              height: getRandomHeight(idx) + 'px',
              margin: 0,
              padding: 0,
              border: 0,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ExploreGrid;
