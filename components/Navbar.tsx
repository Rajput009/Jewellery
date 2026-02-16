import React from 'react';
import { ShoppingBag, User, Menu, X, Triangle, Heart, Search } from 'lucide-react';
import { BRAND_NAME } from '../constants';

type NavbarProps = {
  onCollectionsClick?: () => void;
  onNewArrivalsClick?: () => void;
  onAboutClick?: () => void;
  onSupportClick?: () => void;
  onHomeClick?: () => void;
  onCheckoutClick?: () => void;
  onWishlistClick?: () => void;
  onAccountClick?: () => void;
  onSearchClick?: () => void;
  activeNav?: 'collections' | 'new-arrivals' | 'about' | 'support' | null;
};

const Navbar: React.FC<NavbarProps> = ({
  onCollectionsClick,
  onNewArrivalsClick,
  onAboutClick,
  onSupportClick,
  onHomeClick,
  onCheckoutClick,
  onWishlistClick,
  onAccountClick,
  onSearchClick,
  activeNav = null,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleCollectionsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onCollectionsClick?.();
  };

  const handleNewArrivalsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onNewArrivalsClick?.();
  };

  const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onAboutClick?.();
  };

  const handleSupportClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onSupportClick?.();
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onHomeClick?.();
  };

  const handleCheckoutClick = () => {
    setIsMenuOpen(false);
    onCheckoutClick?.();
  };

  const handleWishlistClick = () => {
    setIsMenuOpen(false);
    onWishlistClick?.();
  };

  const handleAccountClick = () => {
    setIsMenuOpen(false);
    onAccountClick?.();
  };

  const handleSearchClick = () => {
    setIsMenuOpen(false);
    onSearchClick?.();
  };

  return (
    <nav className="w-full py-4 md:py-5 px-6 md:px-12 flex justify-between items-center z-50 relative bg-[#0A3F30]">
      {/* Logo */}
      <div className="flex items-baseline gap-3">
         {/* Abstract Triangle Logo Icon */}
        <a href="#" onClick={handleHomeClick} className="flex items-center gap-2">
            <div className="w-8 h-8 relative flex items-center justify-center">
                <Triangle className="fill-[#F6F1E8] text-[#F6F1E8] rounded-sm" size={24} strokeWidth={2.5} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-2.5 h-2.5 bg-[#C6A75E] rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#F6F1E8] font-sans">{BRAND_NAME}</span>
        </a>
        <span className="text-[#C6A75E]/90 text-sm font-medium hidden md:inline-block border-b border-[rgba(198,167,94,0.2)]">[ Since 2010 ]</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 text-sm font-medium text-[#F6F1E8] absolute left-1/2 -translate-x-1/2">
        <a href="#" onClick={handleCollectionsClick} className={`transition-colors border-b ${activeNav === 'collections' ? 'text-[#C6A75E] border-[#C6A75E]' : 'border-transparent hover:text-[#B8954C] hover:border-[#C6A75E]'}`}>Collections</a>
        <a href="#" onClick={handleNewArrivalsClick} className={`transition-colors border-b ${activeNav === 'new-arrivals' ? 'text-[#C6A75E] border-[#C6A75E]' : 'border-transparent hover:text-[#B8954C] hover:border-[#C6A75E]'}`}>New Arrivals</a>
        <a href="#" onClick={handleAboutClick} className={`transition-colors border-b ${activeNav === 'about' ? 'text-[#C6A75E] border-[#C6A75E]' : 'border-transparent hover:text-[#B8954C] hover:border-[#C6A75E]'}`}>About</a>
        <a href="#" onClick={handleSupportClick} className={`transition-colors border-b ${activeNav === 'support' ? 'text-[#C6A75E] border-[#C6A75E]' : 'border-transparent hover:text-[#B8954C] hover:border-[#C6A75E]'}`}>Support</a>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <button aria-label="Open search" onClick={handleSearchClick} className="w-10 h-10 rounded-full border border-[rgba(198,167,94,0.2)] flex items-center justify-center hover:text-[#B8954C] transition-colors text-[#F6F1E8]">
            <Search size={18} />
          </button>
          <button aria-label="Open wishlist" onClick={handleWishlistClick} className="w-10 h-10 rounded-full border border-[rgba(198,167,94,0.2)] flex items-center justify-center hover:text-[#B8954C] transition-colors text-[#F6F1E8] relative">
            <Heart size={18} />
            <span className="absolute -top-1 -right-1 bg-[#C6A75E] text-[#1C1C1C] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">6</span>
          </button>
          <button aria-label="Open account" onClick={handleAccountClick} className="w-10 h-10 rounded-full border border-[rgba(198,167,94,0.2)] flex items-center justify-center hover:text-[#B8954C] transition-colors text-[#F6F1E8]">
            <User size={18} />
          </button>
          <button aria-label="Open cart" onClick={handleCheckoutClick} className="w-10 h-10 rounded-full border border-[rgba(198,167,94,0.2)] flex items-center justify-center hover:text-[#B8954C] transition-colors text-[#F6F1E8]">
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden w-10 h-10 flex items-center justify-center text-[#F6F1E8]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0A3F30] border-t border-[rgba(198,167,94,0.2)] p-6 flex flex-col gap-4 md:hidden shadow-xl">
          <a href="#" onClick={handleCollectionsClick} className="text-[#F6F1E8] py-2 border-b border-[#C6A75E]/20">Collections</a>
          <a href="#" onClick={handleNewArrivalsClick} className="text-[#F6F1E8] py-2 border-b border-[#C6A75E]/20">New Arrivals</a>
          <a href="#" onClick={handleAboutClick} className="text-[#F6F1E8] py-2 border-b border-[#C6A75E]/20">About</a>
          <a href="#" onClick={handleSupportClick} className="text-[#F6F1E8] py-2 border-b border-[#C6A75E]/20">Support</a>
          <button onClick={handleSearchClick} className="text-left text-[#F6F1E8] py-2 border-b border-[#C6A75E]/20">Search</button>
          <button onClick={handleWishlistClick} className="text-left text-[#F6F1E8] py-2 border-b border-[#C6A75E]/20">Wishlist</button>
          <div className="flex gap-4 mt-2">
            <button onClick={handleAccountClick} className="flex items-center gap-2 text-[#F6F1E8] text-sm"><User size={16}/> Account</button>
            <button onClick={handleCheckoutClick} className="flex items-center gap-2 text-[#F6F1E8] text-sm"><ShoppingBag size={16}/> Cart (0)</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
