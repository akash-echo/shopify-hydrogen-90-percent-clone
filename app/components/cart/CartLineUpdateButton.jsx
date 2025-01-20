import {useEffect, useState} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {Loader2} from 'lucide-react';

const CartLineUpdateButton = ({lines, children}) => {
  const [updating, setUpdating] = useState(false);

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {(fetcher) => {
        useEffect(() => {
          if (fetcher.state === 'loading') {
            setUpdating(true);
          } else if (fetcher.state === 'idle') {
            setTimeout(() => {
              setUpdating(false);
            }, 200);
          }
        }, []);

        if (updating) {
          // Loading state
          return (
            <div className="relative inline-flex items-center justify-center">
              <div className="opacity-50 pointer-events-none">{children}</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
              </div>
            </div>
          );
        }

        return children;
      }}
    </CartForm>
  );
};

export default CartLineUpdateButton;
