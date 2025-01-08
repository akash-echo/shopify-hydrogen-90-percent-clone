import {Suspense, useState, useEffect} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Menu, Search, ShoppingBag, User} from 'lucide-react';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {type: asideType} = useAside();

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty(
      '--announcement-height',
      isScrolled ? '0px' : '40px',
    );

    root.style.setProperty('--header-height', isScrolled ? '64px' : '80px');

    const handleScroll = () => {
      if (asideType !== 'closed') return;

      const currentScrollY = window.scrollY;

      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);

      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isScrolled, asideType]);

  return (
    <div
      className={`fixed w-full z-40 transition-transform duration-500 ease-in-out ${
        !isScrollingUp && isScrolled && asideType === 'closed'
          ? '-translate-y-full'
          : 'translate-y-0'
      }`}
    >
      {/* Announcement Bar */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out bg-slate-100 text-black ${
          isScrolled ? 'max-h-0' : 'max-h-12'
        }`}
      >
        <div className="container mx-auto text-center py-2.5 px-4">
          <p className="text-[13px] leading-tight sm:text-xs font-light tracking-wider">
            Complimentary Shipping on Orders Above €500
          </p>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-sm border-transparent'
            : 'bg-white border-gray-100'
        }`}
      >
        <div className="container mx-auto max-w-[calc(100%-80px)]">
          {/* Mobile logo (550px and below) */}
          <div
            className={`hidden max-[550px]:block text-center border-b border-gray-100 transition-all duration-300 ease-in-out ${
              isScrolled ? 'py-1' : 'py-2'
            }`}
          >
            <NavLink
              prefetch="intent"
              to="/"
              className="text-2xl tracking-normal inline-block"
            >
              <h1 className="font-medium my-0">90 PERCENT</h1>
            </NavLink>
          </div>

          {/* Header Content */}
          <div
            className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ease-in-out ${
              isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'
            }`}
          >
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <HeaderMenuMobileToggle />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <HeaderMenu
                menu={menu}
                viewport="desktop"
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            </div>

            {/* Logo (Above 550px) */}
            <NavLink
              prefetch="intent"
              to="/"
              className={`tracking-wider text-center max-[550px]:hidden absolute mr-[15%] left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:text-left transition-all duration-300 ease-in-out ${
                isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[28px]'
              }`}
            >
              <h1 className="font-medium">90 PERCENT</h1>
            </NavLink>

            {/* CTAS */}
            <div className="flex items-center">
              <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  const baseClassName =
    'text-[#2b2725] font-light tracking-[0.52px] transition-all duration-200 relative after:content-[""] after:absolute after:bottom-[-8px] after:left-0 after:h-[1px] after:bg-[#2b2725] after:transition-all after:duration-300 hover:after:w-full';
  const desktopClassName =
    'flex items-center justify-center space-x-8 text-sm uppercase tracking-wider';
  const mobileClassName = 'flex flex-col px-6';

  return (
    <nav
      className={viewport === 'desktop' ? desktopClassName : mobileClassName}
      role="navigation"
    >
      {viewport === 'mobile' && (
        <>
          {/* Mobile navigation Link */}
          <div className="space-y-6 py-4">
            {menu?.items.map((item) => {
              if (!item.url) return null;

              const url =
                item.url.includes('myshopify.com') ||
                item.url.includes(publicStoreDomain) || // 90percent.com/collections
                item.url.includes(primaryDomainUrl) // store.90percent.com/collections
                  ? new URL(item.url).pathname // /collections
                  : item.url; // google.com

              return (
                <NavLink
                  className={({isActive}) =>
                    `${baseClassName} text-[13px] py-2 block ${
                      isActive ? 'text-blue-400' : 'text-[#2b2725]'
                    }`
                  }
                  end
                  key={item.id}
                  onClick={close}
                  prefetch="intent"
                  to={url}
                >
                  {item.title}
                </NavLink>
              );
            })}
          </div>
          {/* Mobile footer Link */}
          <div className="mt-auto border-t border-gray-100 py-6">
            <div className="space-y-4">
              <NavLink
                to="/account"
                className="flex items-center space-x-2 text-blue-300 hover:text-blue-600"
              >
                <User className="w-5 h-5" />
                <span className="text-base">Account</span>
              </NavLink>
              <button
                onClick={() => {
                  close();

                  // todo - search logic
                }}
                className="flex items-center space-x-2 text-blue-300 hover:text-blue-600 w-full text-left"
              >
                <Search className="w-5 h-5" />
                <span className="text-base">Search</span>
              </button>
            </div>
          </div>
        </>
      )}

      {viewport === 'desktop' &&
        // Desktop Menu
        menu?.items.map((item) => {
          if (!item.url) return null;

          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) || // 90percent.com/collections
            item.url.includes(primaryDomainUrl) // store.90percent.com/collections
              ? new URL(item.url).pathname // /collections
              : item.url; // google.com

          return (
            <NavLink
              className={baseClassName}
              end
              key={item.id}
              onClick={close}
              prefetch="intent"
              to={url}
            >
              {item.title}
            </NavLink>
          );
        })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav
      className="flex items-center space-x-1 sm:space-x-2 lg:space-x-5"
      role="navigation"
    >
      <NavLink prefetch="intent" to="/account" className="p-2">
        <span className="sr-only">Account</span>
        <User className="w-5 h-5" />
      </NavLink>

      <SearchToggle />

      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="p-2 -ml-2 hover:text-green-500 transition-colors duration-200"
      onClick={() => open('mobile')}
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="p-2" onClick={() => open('search')}>
      <Search className="w-5 h-5" />
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="relative p-2"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          shop,
          prevCart,
          url: window.location.href || '',
        });
      }}
    >
      <ShoppingBag w-5 h-5 />
      {count !== null && count > 0 && (
        <span className="absolute top-1 right-1 bg-slate-700 text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
