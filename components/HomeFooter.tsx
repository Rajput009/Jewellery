import React from 'react';
import { Diamond } from 'lucide-react';

type HomeFooterProps = {
  currentPath?: string;
  onOpenCollections?: () => void;
  onOpenContact?: () => void;
  onOpenShippingReturns?: () => void;
  onOpenFaq?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenWishlist?: () => void;
  onOpenLogin?: () => void;
};

const HomeFooter: React.FC<HomeFooterProps> = ({
  currentPath = '/',
  onOpenCollections,
  onOpenContact,
  onOpenShippingReturns,
  onOpenFaq,
  onOpenPrivacy,
  onOpenTerms,
  onOpenWishlist,
  onOpenLogin,
}) => {
  const isActive = (matcher: (path: string) => boolean) =>
    matcher(currentPath) ? 'text-[#F6F1E8] underline underline-offset-4' : 'hover:text-[#F6F1E8] transition-colors';

  return (
    <footer className="bg-[#0A3F30] text-[#E4DBCE] px-6 md:px-12 py-14 border-t border-[rgba(198,167,94,0.15)]">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-[#F6F1E8] mb-4">
              <Diamond size={20} />
              <h3 className="font-serif text-xl font-bold uppercase tracking-tight">Eluxee</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#E4DBCE]">
              Timeless jewelry crafted with precision, heritage, and modern elegance.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold mb-4 text-[#F6F1E8]">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><button type="button" onClick={onOpenCollections} className={isActive((path) => path.startsWith('/collections') || path.startsWith('/product/'))}>Rings</button></li>
              <li><button type="button" onClick={onOpenCollections} className={isActive((path) => path.startsWith('/collections') || path.startsWith('/product/'))}>Necklaces</button></li>
              <li><button type="button" onClick={onOpenCollections} className={isActive((path) => path.startsWith('/collections') || path.startsWith('/product/'))}>Earrings</button></li>
              <li><button type="button" onClick={onOpenCollections} className={isActive((path) => path.startsWith('/collections') || path.startsWith('/product/'))}>Bracelets</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold mb-4 text-[#F6F1E8]">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button type="button" onClick={onOpenShippingReturns} className={isActive((path) => path.startsWith('/shipping-returns'))}>Shipping & Returns</button></li>
              <li>Care Guide</li>
              <li><button type="button" onClick={onOpenContact} className={isActive((path) => path.startsWith('/contact'))}>Concierge</button></li>
              <li><button type="button" onClick={onOpenContact} className={isActive((path) => path.startsWith('/contact'))}>Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold mb-4 text-[#F6F1E8]">Newsletter</h4>
            <p className="text-sm mb-3">Get private drops and early access updates.</p>
            <div className="flex border-b border-[rgba(198,167,94,0.2)] pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none w-full text-sm text-[#F6F1E8] placeholder:text-[#E4DBCE]/70"
              />
              <button className="text-xs font-bold uppercase tracking-widest text-[#C6A75E] hover:text-[#B8954C] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(198,167,94,0.15)] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-[#E4DBCE]/80">
          <p>© 2026 Eluxee Jewelry. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button type="button" onClick={onOpenFaq} className={isActive((path) => path.startsWith('/faq'))}>FAQ</button>
            <button type="button" onClick={onOpenPrivacy} className={isActive((path) => path.startsWith('/privacy-policy'))}>Privacy</button>
            <button type="button" onClick={onOpenTerms} className={isActive((path) => path.startsWith('/terms-of-service'))}>Terms</button>
            <button type="button" onClick={onOpenWishlist} className={isActive((path) => path.startsWith('/wishlist'))}>Wishlist</button>
            <button type="button" onClick={onOpenLogin} className={isActive((path) => path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/forgot-password'))}>Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
