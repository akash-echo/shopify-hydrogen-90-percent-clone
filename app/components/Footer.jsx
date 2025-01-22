import {Suspense} from 'react';
import {Await, Form, NavLink} from '@remix-run/react';
import {Facebook, Instagram} from 'lucide-react';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-gray-600 mt-28 pt-10 pb-5">
            <div className="w-full">
              {/* Newsletter Signup section */}
              <div className="max-w-xl mx-auto">
                <p className="text-sm text-white font-medium text-[12.5px] mb-6 text-center tracking-[0.25px]">
                  Sign up below for updates about the world of Ninety Percent,
                  including collection launches, early access and 10% off your
                  first order.
                </p>

                <Form className="flex justify-center gap-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 bg-white/20 border border-gray-100 text-white placeholder:text-gray-400"
                    required
                  />

                  <button className="px-6 py-3 border border-gray-100 text-white">
                    Subscribe
                  </button>
                </Form>
              </div>
            </div>

            {/* Footer Bottom section */}
            <div className="flex justify-between items-center mt-20 mx-28">
              <p className="text-sm text-white font-medium text-[12.5px] mb-6 text-center tracking-[0.25px] m-o">
                Copyright © {new Date().getFullYear()} Ninety Percent
              </p>

              <NavLink
                prefetch="intent"
                to="/"
                className="tracking-wider text-center"
              >
                <h1 className="font-medium text-lg text-white sm:text-2xl">
                  90 PERCENT
                </h1>
              </NavLink>

              <div className="flex">
                <NavLink
                  prefetch="intent"
                  to="https://www.instagram.com/ninety_percent/"
                  className="mx-5"
                >
                  <Instagram className="w-5 y-5 text-white" />
                </NavLink>

                <NavLink
                  prefetch="intent"
                  to="https://www.facebook.com/ninetypercentlabel/"
                >
                  <Facebook className="w-5 y-5 text-white" />
                </NavLink>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
