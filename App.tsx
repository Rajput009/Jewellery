import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ForgottenTreasures from './components/ForgottenTreasures';
import HomeFooter from './components/HomeFooter';
import ChatBot from './components/ChatBot';
import LocationMeta from './components/LocationMeta';

const CollectionsPage = React.lazy(() => import('./components/CollectionsPage'));
const CheckoutPage = React.lazy(() => import('./components/CheckoutPage'));
const WishlistPage = React.lazy(() => import('./components/WishlistPage'));
const ConfirmationPage = React.lazy(() => import('./components/ConfirmationPage'));
const AccountDashboardPage = React.lazy(() => import('./components/AccountDashboardPage'));
const NewArrivalsPage = React.lazy(() => import('./components/NewArrivalsPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const ProductDetailPage = React.lazy(() => import('./components/ProductDetailPage'));
const CartPage = React.lazy(() => import('./components/CartPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const ShippingReturnsPage = React.lazy(() => import('./components/ShippingReturnsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('./components/TermsOfServicePage'));
const FaqPage = React.lazy(() => import('./components/FaqPage'));
const SearchResultsPage = React.lazy(() => import('./components/SearchResultsPage'));
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./components/ForgotPasswordPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const LocationIndexPage = React.lazy(() => import('./components/LocationIndexPage'));
const LocationPage = React.lazy(() => import('./components/LocationPage'));

const RouteFallback: React.FC = () => (
  <div className="m-4 md:m-8 rounded-lg bg-[#F6F1E8] text-[#1C1C1C] min-h-[40vh] flex items-center justify-center text-sm uppercase tracking-[0.2em]">
    Loading...
  </div>
);

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const preloadRoutes = () => {
      void import('./components/CollectionsPage');
      void import('./components/ProductDetailPage');
      void import('./components/CartPage');
      void import('./components/CheckoutPage');
    };

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) {
      idle(preloadRoutes);
      return;
    }

    const timer = window.setTimeout(preloadRoutes, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const activeNav: 'collections' | 'new-arrivals' | 'about' | 'support' | null =
    location.pathname.startsWith('/collections') ||
    location.pathname.startsWith('/product/') ||
    location.pathname.startsWith('/search')
      ? 'collections'
      : location.pathname.startsWith('/new-arrivals')
        ? 'new-arrivals'
        : location.pathname.startsWith('/about')
          ? 'about'
          : location.pathname.startsWith('/contact') ||
              location.pathname.startsWith('/shipping-returns') ||
              location.pathname.startsWith('/faq')
            ? 'support'
            : null;

  const showSecondaryFooter = !['/', '/checkout', '/confirmation', '/account'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A3F30] via-[#0E4F3C] to-[#115A46] font-sans overflow-x-hidden selection:bg-[#C6A75E]/30 selection:text-[#F6F1E8]">
      <LocationMeta />
      <div className="max-w-[1600px] mx-auto relative shadow-2xl">
        <Navbar
          onCollectionsClick={() => navigate('/collections')}
          onNewArrivalsClick={() => navigate('/new-arrivals')}
          onAboutClick={() => navigate('/about')}
          onSupportClick={() => navigate('/contact')}
          onHomeClick={() => navigate('/')}
          onCheckoutClick={() => navigate('/cart')}
          onWishlistClick={() => navigate('/wishlist')}
          onAccountClick={() => navigate('/login')}
          onSearchClick={() => navigate('/search')}
          activeNav={activeNav}
        />

        <React.Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <BentoGrid />
                  <ForgottenTreasures onOpenProduct={(productId) => navigate(`/product/${productId}`)} />
                  <HomeFooter
                    currentPath={location.pathname}
                    onOpenCollections={() => navigate('/collections')}
                    onOpenContact={() => navigate('/contact')}
                    onOpenShippingReturns={() => navigate('/shipping-returns')}
                    onOpenFaq={() => navigate('/faq')}
                    onOpenPrivacy={() => navigate('/privacy-policy')}
                    onOpenTerms={() => navigate('/terms-of-service')}
                    onOpenWishlist={() => navigate('/wishlist')}
                    onOpenLogin={() => navigate('/login')}
                  />
                </>
              }
            />
            <Route path="/collections" element={<CollectionsPage onViewProduct={(productId) => navigate(`/product/${productId}`)} onOpenSearch={() => navigate('/search')} />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route
              path="/product/:productId"
              element={
                <ProductDetailPage
                  onBackToCollections={() => navigate('/collections')}
                  onAddToBag={() => navigate('/cart')}
                  onOpenProduct={(productId) => navigate(`/product/${productId}`)}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  onContinueShopping={() => navigate('/collections')}
                  onProceedToCheckout={() => navigate('/checkout')}
                  onOpenProduct={(productId) => navigate(`/product/${productId}`)}
                />
              }
            />
            <Route path="/checkout" element={<CheckoutPage onCompletePurchase={(orderNumber) => navigate(`/confirmation${orderNumber ? `?order=${encodeURIComponent(orderNumber)}` : ''}`)} />} />
            <Route
              path="/confirmation"
              element={
                <ConfirmationPage
                  onContinueShopping={() => navigate('/collections')}
                  onTrackOrder={() => navigate('/account')}
                  onOpenProduct={(productId) => navigate(`/product/${productId}`)}
                />
              }
            />
            <Route path="/account" element={<AccountDashboardPage />} />
            <Route path="/contact" element={<ContactPage onOpenFaq={() => navigate('/faq')} />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage onContact={() => navigate('/contact')} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/faq" element={<FaqPage onContact={() => navigate('/contact')} />} />
            <Route path="/search" element={<SearchResultsPage onSelectProduct={(productId) => navigate(`/product/${productId}`)} />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  onLoginSuccess={() => navigate('/account')}
                  onOpenRegister={() => navigate(`/register${location.search}`)}
                  onOpenForgotPassword={() => navigate(`/forgot-password${location.search}`)}
                />
              }
            />
            <Route path="/register" element={<RegisterPage onOpenLogin={() => navigate(`/login${location.search}`)} />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage onOpenLogin={() => navigate(`/login${location.search}`)} />} />
            <Route path="/pakistan" element={<LocationIndexPage />} />
            <Route path="/pakistan/:citySlug" element={<LocationPage />} />
            <Route path="/404" element={<NotFoundPage onGoHome={() => navigate('/')} />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </React.Suspense>

        {showSecondaryFooter ? (
          <HomeFooter
            currentPath={location.pathname}
            onOpenCollections={() => navigate('/collections')}
            onOpenContact={() => navigate('/contact')}
            onOpenShippingReturns={() => navigate('/shipping-returns')}
            onOpenFaq={() => navigate('/faq')}
            onOpenPrivacy={() => navigate('/privacy-policy')}
            onOpenTerms={() => navigate('/terms-of-service')}
            onOpenWishlist={() => navigate('/wishlist')}
            onOpenLogin={() => navigate('/login')}
          />
        ) : null}
      </div>

      <ChatBot onOpenProduct={(productId) => navigate(`/product/${productId}`)} onOpenCollections={() => navigate('/collections')} />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#115A46] rounded-full blur-[120px] opacity-35 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0A3F30] rounded-full blur-[120px] opacity-28 mix-blend-screen" />
      </div>
    </div>
  );
};

export default App;
