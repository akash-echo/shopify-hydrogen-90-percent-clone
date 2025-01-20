import {CartForm} from '@shopify/hydrogen';
import {Check, Loader2, ShoppingBag} from 'lucide-react';
import {useEffect, useState} from 'react';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   onClick?: () => void;
 * }}
 */
export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  afterAddToCart,
}) {
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    let timeout;

    if (addedToCart) {
      timeout = setTimeout(() => {
        setAddedToCart(false);
      }, 2500);
    }

    return () => clearTimeout(timeout);
  }, [addedToCart]);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        const isLoading = fetcher.state !== 'idle';

        useEffect(() => {
          if (
            fetcher.state === 'idle' &&
            fetcher.data &&
            !fetcher.data.errors
          ) {
            setAddedToCart(true);

            if (afterAddToCart) {
              afterAddToCart();
            }
          }
        }, [fetcher.state, fetcher.data]);

        return (
          <div className="relative">
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              type="submit"
              onClick={onClick}
              disabled={disabled ?? isLoading}
              className="w-full py-5 px-8 text-white text-base tracking-wider transition-all duration-300 ease-in-out items-center flex justify-center gap-3 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 disabled:before:hidden bg-gray-600 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">{children}</span>
                </>
              )}
            </button>

            {/* Premium loading indicator */}
            {isLoading && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-600">
                <div className="h-full bg-gradient-to-r from-slate-900 to-slate-400 animate-progress" />
              </div>
            )}
          </div>
        );
      }}
    </CartForm>
  );
}

/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
