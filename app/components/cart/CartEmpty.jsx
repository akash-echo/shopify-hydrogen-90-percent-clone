import React from 'react';

const CartEmpty = ({hidden = false}) => {
  if (hidden) return;

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-md space-y-4 text-gray-600">
        <h2>Your cart is currently empty</h2>
      </div>
    </div>
  );
};

export default CartEmpty;
