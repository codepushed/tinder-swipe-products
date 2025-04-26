import React, { useState } from "react";

const Cart = ({ cart = [], onCheckout }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setSuccess(true);
      if (onCheckout) onCheckout();
    }, 1400);
  };

  if (success) {
    return (
      <div className="w-full min-h-screen bg-[#232323] flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-[#FF444F] mb-4">Thank you!</div>
        <div className="text-white text-lg mb-6">Your order has been placed.</div>
        <button className="w-full py-[10px] border-none text-[600] bg-[#FF444F] text-[#fff] rounded-full font-bold mt-2 text-[18px] disabled:opacity-60" onClick={() => setSuccess(false)}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#232323] flex flex-col items-center pt-8">
      <h1 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>
        Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-gray-400 text-lg mt-10">Your cart is empty.</div>
      ) : (
        <div className="w-full max-w-md px-4 flex flex-col gap-[20px] relative" style={{height: '70vh'}}>
          <div className="overflow-y-auto overflow-x-hidden pr-2" style={{maxHeight: 'calc(70vh - 100px)'}}>
            {cart.map((product) => (
              <div key={product.id} className="mb-[15px]  py-[10px] flex items-center gap-4 bg-[#000] rounded-[10px] p-3 shadow border border-[#232323]">
                <div className="w-[100px] h-[90px]">
                <img src={product.imageUrl} alt={product.name} className="w-[100%] h-[100%] object-cover rounded-[10px] bg-[#18191A]" />

                </div>
                <div className="flex-1 flex flex-col ml-[10px]">
                  <span className="text-white font-bold text-lg truncate" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</span>
                  <span className="text-[#FF444F] text-sm ">{product.brand}</span>
                  <span className="text-white font-bold text-base mt-1">₹{product.price}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="w-full absolute bottom-[0%] py-[10px] border-none text-[600] bg-[#FF444F] text-[#fff] rounded-full font-bold mt-2 text-[18px] disabled:opacity-60"
            onClick={handleCheckout}
            disabled={checkingOut}
          >
            {checkingOut  ? 'Processing...' : `Checkout ₹${total}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
