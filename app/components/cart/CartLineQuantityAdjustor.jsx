import React from 'react';
import CartLineUpdateButton from './CartLineUpdateButton';
import CartLineRemoveButton from './CartLineRemoveButton';
import {Minus, Plus} from 'lucide-react';

const CartLineQuantityAdjustor = ({line}) => {
  if (!line || typeof line.quantity === 'undefined') return null;

  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number(Math.round(quantity) + 1);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            disabled={quantity <= 1}
            className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${
              quantity <= 1
                ? 'border-gray-200 text-gray-300'
                : 'border-gray-200'
            }`}
          >
            <Minus className="w-4 h-4" />
          </button>
        </CartLineUpdateButton>

        <span className="w-8 text-center">{quantity}</span>

        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button className="w-8 h-8 flex items-center justify-center rounded border transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </CartLineUpdateButton>
      </div>

      <CartLineRemoveButton
        lineIds={[lineId]}
        disabled={isOptimistic === true}
      />
    </div>
  );
};

export default CartLineQuantityAdjustor;
