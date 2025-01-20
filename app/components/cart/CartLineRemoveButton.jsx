import {CartForm} from '@shopify/hydrogen';
import React from 'react';

const CartLineRemoveButton = ({lineIds, disabled}) => {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        className={`ml-3 text-gray-400 text-sm ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={disabled}
      >
        REMOVE
      </button>
    </CartForm>
  );
};

export default CartLineRemoveButton;
