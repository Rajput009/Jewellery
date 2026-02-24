import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import svgPaths from "../../imports/svg-d54qywi353";
import imgSculptedHandDisplayingGoldRings from "figma:asset/9f301f4547bd8931f4b7f264431e1234abfbaaf7.png";
import imgDiamondGoldRing from "figma:asset/aac1fd9a5dea43df921706f7c3575247ea3129be.png";
import imgRightSideImage from "figma:asset/3eb929673a56e4749d357b10505d6427505d1db8.png";

function Svg() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p15121880} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3c6a6700} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="flex items-center gap-2" data-name="Paragraph">
      <div className="font-['Inter:Bold',sans-serif] font-bold text-white text-lg sm:text-xl tracking-[-0.5px]">
        <p className="whitespace-nowrap">Eveangle</p>
      </div>
      <div className="hidden sm:flex font-['Inter:Light',sans-serif] font-light text-[#9ca3af] text-xs sm:text-sm tracking-[0.35px]">
        <p className="whitespace-nowrap">[ Since 2010 ]</p>
      </div>
    </div>
  );
}

function LogoSection() {
  return (
    <div className="flex gap-2 items-center" data-name="Logo Section">
      <Svg />
      <Paragraph />
    </div>
  );
}

function NavigationMenu({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const linkClass = mobile 
    ? "font-['Inter:Medium',sans-serif] font-medium text-[#e5e7eb] text-lg py-3 hover:text-white transition"
    : "font-['Inter:Medium',sans-serif] font-medium text-[#e5e7eb] text-sm hover:text-white transition";
  
  return (
    <div className={mobile ? "flex flex-col gap-2 w-full" : "flex gap-8"} data-name="Navigation Menu">
      <a href="#" className={linkClass} onClick={onClose}>Collection</a>
      <a href="#" className={linkClass} onClick={onClose}>New Arrivals</a>
      <a href="#" className={linkClass} onClick={onClose}>About</a>
    </div>
  );
}

function UserActions() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(0,56,37,0.3)] flex gap-3 sm:gap-4 items-center px-3 sm:px-4 py-2 rounded-full shrink-0 border border-[rgba(255,255,255,0.3)]" data-name="User Actions">
      <button className="text-white hover:opacity-80 transition">
        <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p21fc4800} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </svg>
      </button>
      <div className="bg-[rgba(255,255,255,0.3)] h-4 w-px" />
      <button className="text-white hover:opacity-80 transition">
        <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p1ec09680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </svg>
      </button>
    </div>
  );
}

function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-[2]" data-name="MainHeader">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <LogoSection />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu />
        </div>
        
        <div className="flex items-center gap-3">
          <UserActions />
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003825] border-t border-white/20 px-4 py-4">
          <NavigationMenu mobile onClose={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}

function Heading() {
  return (
    <div className="w-full" data-name="Heading 1">
      <div className="font-['Oswald:Bold',sans-serif] font-bold text-white uppercase">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[120px] leading-tight mb-0">CELEBRATE</p>
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[120px] leading-tight mb-0">EVERY MOMENT</p>
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[120px] leading-tight">IN STYLE</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-full lg:max-w-[512px]" data-name="Container">
      <div className="font-['Inter:Light',sans-serif] font-light text-[#d1d5db] text-sm sm:text-base lg:text-lg leading-relaxed">
        <p className="mb-0">Explore fine jewelry that reflects your style and celebrates</p>
        <p>life's special moments.</p>
      </div>
    </div>
  );
}

function SectionHeroText() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full pt-4 sm:pt-8" data-name="Section - Hero Text">
      <Heading />
      <Container />
    </div>
  );
}

function GoldPlatedRingCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] w-full">
      <div className="relative min-h-[300px] sm:min-h-[380px] flex">
        <div className="flex flex-col justify-between p-6 sm:p-8 relative z-[2] w-full sm:w-2/5">
          <div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#6b7280] text-xs tracking-[1px] uppercase mb-2">
              Premium-quality
            </p>
            <h2 className="font-['Oswald:Bold',sans-serif] font-bold text-black uppercase text-3xl sm:text-4xl lg:text-5xl leading-tight">
              <p className="mb-0">GOLD</p>
              <p className="mb-0">PLATED</p>
              <p>RING</p>
            </h2>
          </div>
          
          <div className="mt-8">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#6b7280] text-xs mb-1">From</p>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-black text-2xl tracking-[-0.6px]">$16,250</p>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-3/5 h-3/4 sm:w-[60%] sm:h-[70%]">
          <img 
            alt="Sculpted hand displaying gold rings" 
            className="w-full h-full object-cover shadow-[0px_8px_5px_0px_rgba(0,0,0,0.08),0px_20px_13px_0px_rgba(0,0,0,0.03)]" 
            src={imgSculptedHandDisplayingGoldRings} 
          />
        </div>
        
        <button className="absolute bottom-0 right-0 bg-black text-white size-12 sm:size-16 flex items-center justify-center hover:bg-gray-800 transition z-[3]">
          <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.p3319d890} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DiamondRingCard() {
  return (
    <div className="bg-white rounded-lg shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[320px] relative">
      <div className="flex items-center p-4 sm:p-6 relative min-h-[140px] sm:min-h-[176px] -top-8 right-4">
        <div className="flex-1 pr-4">
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#6b7280] text-xs tracking-[0.5px] uppercase mb-2">
            PREMIUM
          </p>
          <h3 className="font-['Oswald:Bold',sans-serif] font-bold text-black uppercase text-base sm:text-lg leading-tight">
            <p className="mb-0">DIAMOND</p>
            <p>GOLD RING</p>
          </h3>
        </div>
        
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
          <img 
            alt="Diamond Gold Ring" 
            className="max-w-full max-h-full object-contain mix-blend-multiply scale-110" 
            src={imgDiamondGoldRing} 
          />
        </div>
        
        <button className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-black text-white size-10 sm:size-12 flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-gray-800 transition">
          <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
            <path d={svgPaths.p3fe91380} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ExclusiveSetCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-full">
      <div className="relative h-[200px] sm:h-[240px] flex">
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between relative z-[2]">
          <div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-black text-xs tracking-[0.5px] uppercase mb-1">
              EXCLUSIVE SET
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#4b5563] text-xs leading-snug mb-3">
              Forever begins with this<br />jewelry
            </p>
            <button className="border border-[#004d33] rounded-full size-7 sm:size-8 flex items-center justify-center hover:bg-[#004d33] hover:text-white transition">
              <svg className="size-3" fill="none" viewBox="0 0 12 12">
                <path clipRule="evenodd" d={svgPaths.pefe97} fill="currentColor" fillRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-[#004d33] h-8 w-px" />
            <div>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-black text-lg sm:text-xl leading-none">18k</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6b7280] text-xs uppercase">Gold Plated</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <img 
            alt="Model wearing jewelry" 
            className="absolute inset-0 w-full h-full object-cover" 
            src={imgRightSideImage} 
          />
        </div>
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="flex items-end justify-end gap-4 pt-8 sm:pt-12 w-full">
      <div className="font-['Oswald:Bold',sans-serif] font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-none">
        14+
      </div>
      <div className="font-['Inter:Bold',sans-serif] font-bold text-[#d1d5db] text-xs tracking-[2px] uppercase text-right leading-tight pb-1">
        <p className="mb-0">INNOVATION EXCELLENCE</p>
        <p>CELEBRATION</p>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="w-full z-[1] px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
      {/* Mobile & Tablet: Stack everything */}
      <div className="flex flex-col gap-8 sm:gap-12 lg:hidden">
        <SectionHeroText />
        <GoldPlatedRingCard />
        <DiamondRingCard />
        <ExclusiveSetCard />
        <StatCard />
      </div>

      {/* Desktop: Two column layout */}
      <div className="hidden lg:flex gap-8">
        {/* Left Column */}
        <div className="flex-1 max-w-[800px] flex flex-col">
          <div className="pb-24">
            <SectionHeroText />
          </div>
          <div className="flex-1 flex items-end">
            <GoldPlatedRingCard />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 max-w-[565px] flex flex-col gap-8 pt-16">
          <DiamondRingCard />
          <ExclusiveSetCard />
          <div className="flex-1 flex items-end">
            <StatCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResponsiveBody() {
  return (
    <div className="bg-[#004d33] min-h-screen w-full" data-name="Body">
      <MainHeader />
      <MainContent />
    </div>
  );
}