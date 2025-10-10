import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm} from '@shopify/hydrogen';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Input} from '~/components/Input';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
import {EmailCapture} from '~/components/EmailCapture';
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}
        <main role="main" id="mainContent" className="flex-grow pt-[var(--height-nav)]">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  // Blueprint navigation items
  const navItems = [
    {title: 'Home', to: '/'},
    {title: 'Shop', to: '/collections/all'},
    {title: 'Education', to: '/pages/education'},
    {title: 'Customer Care', to: '/pages/customer-care'},
  ];

  return (
    <nav className="grid gap-2 p-6 sm:gap-3 sm:px-12 sm:py-8">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onClose}
          className={({isActive}) =>
            isActive
              ? 'glass rounded-lg px-4 py-3 border-l-4 border-[rgb(var(--color-accent))] font-semibold text-lg bg-[rgb(var(--color-accent))]/10'
              : 'px-4 py-3 text-lg hover:text-[rgb(var(--color-accent))] hover:bg-white/5 rounded-lg transition-all'
          }
        >
          <Text as="span" size="copy">
            {item.title}
          </Text>
        </Link>
      ))}
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  const {y} = useWindowScroll();

  return (
    <header
      role="banner"
      className={`${
        y > 80 ? 'glass-strong bg-black/80 border-b border-white/10 shadow-lg' : 'bg-black/95'
      } flex lg:hidden items-center h-nav sticky z-50 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8 text-white transition-all duration-300`}
    >
      <div className="flex items-center justify-start gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 hover:text-[rgb(var(--color-accent))] transition-all"
          aria-label="Open menu"
        >
          <IconMenu />
        </button>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center"
        to="/"
      >
        <Heading
          className="font-bold text-center leading-none text-xl tracking-tight"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end gap-2">
        <AccountLink className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 hover:text-[rgb(var(--color-accent))] transition-all" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();

  // Blueprint navigation items
  const navItems = [
    {title: 'Home', to: '/'},
    {title: 'Shop', to: '/collections/all'},
    {title: 'Education', to: '/pages/education'},
    {title: 'Customer Care', to: '/pages/customer-care'},
  ];

  return (
    <header
      role="banner"
      className={`${
        y > 80 ? 'glass-strong bg-black/80 border-b border-white/10 shadow-lg' : 'bg-black/95 border-b border-white/5'
      } hidden h-nav lg:flex items-center fixed transition-all duration-300 z-50 top-0 justify-between w-full leading-none gap-8 px-8 xl:px-12 py-4 text-white`}
    >
      <div className="flex gap-8 xl:gap-12 items-center">
        <Link className="font-bold text-xl tracking-tight hover:text-[rgb(var(--color-accent))] transition-colors" to="/" prefetch="intent">
          {title}
        </Link>
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              prefetch="intent"
              className={({isActive}) =>
                isActive
                  ? 'relative pb-1.5 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[rgb(var(--color-accent))] after:rounded-full'
                  : 'relative pb-1.5 hover:text-[rgb(var(--color-accent))] transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[rgb(var(--color-accent))] after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200'
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <AccountLink className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 focus:ring-2 focus:ring-[rgb(var(--color-accent))]/50 hover:text-[rgb(var(--color-accent))] transition-all" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className="absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px bg-[rgb(var(--color-accent))] text-white"
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 focus:ring-2 focus:ring-[rgb(var(--color-accent))]/50 hover:text-[rgb(var(--color-accent))] transition-all"
      aria-label="Open cart"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 focus:ring-2 focus:ring-[rgb(var(--color-accent))]/50 hover:text-[rgb(var(--color-accent))] transition-all"
      aria-label="View cart"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className="bg-[#171717] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <Heading size="lead" as="h3" className="text-white mb-4">
              Quick Links
            </Heading>
            <nav className="grid gap-2">
              <Link to="/pages/customer-care" className="text-gray-400 hover:text-white transition-colors text-sm">
                FAQs
              </Link>
              <Link to="/pages/customer-care#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <Link to="/search" className="text-gray-400 hover:text-white transition-colors text-sm">
                Search
              </Link>
            </nav>
          </div>

          {/* Information */}
          <div>
            <Heading size="lead" as="h3" className="text-white mb-4">
              Information
            </Heading>
            <nav className="grid gap-2">
              <Link to="/policies/shipping-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Shipping Policy
              </Link>
              <Link to="/policies/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/policies/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/policies/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Refund Policy
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <Heading size="lead" as="h3" className="text-white mb-4">
              Resources
            </Heading>
            <nav className="grid gap-2">
              <Link to="/pages/education" className="text-gray-400 hover:text-white transition-colors text-sm">
                Education Hub
              </Link>
              <Link to="/pages/education/workouts" className="text-gray-400 hover:text-white transition-colors text-sm">
                Workouts
              </Link>
              <Link to="/pages/education/habit-builder" className="text-gray-400 hover:text-white transition-colors text-sm">
                Habit Builder
              </Link>
              <Link to="/pages/education/product-reviews" className="text-gray-400 hover:text-white transition-colors text-sm">
                Reviews
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <Heading size="lead" as="h3" className="text-white mb-4">
              Stay Connected
            </Heading>
            <p className="text-gray-400 text-sm mb-4">
              Get fitness tips & exclusive deals
            </p>
            <Form method="post" action="/api/newsletter" className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full rounded-md btn-accent !py-2 !px-3 text-sm font-semibold"
              >
                Subscribe
              </button>
            </Form>
          </div>
        </div>

        {/* Payment Icons and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Trahere. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Payment methods:</span>
              <div className="flex gap-2">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">PayPal</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Venmo</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
