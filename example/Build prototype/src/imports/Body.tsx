import svgPaths from "./svg-d54qywi353";
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
    <div className="h-[28px] leading-[0] not-italic relative shrink-0 w-[192.33px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center left-0 text-[20px] text-white top-[14px] tracking-[-0.5px] w-[90.17px]">
        <p className="leading-[28px] whitespace-pre-wrap">{`Eveangle `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Light',sans-serif] font-light h-[20px] justify-center left-[98.17px] text-[#9ca3af] text-[14px] top-[15.5px] tracking-[0.35px] w-[94.16px]">
        <p className="leading-[20px] whitespace-pre-wrap">[ Since 2010 ]</p>
      </div>
    </div>
  );
}

function LogoSection() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Logo Section">
      <Svg />
      <Paragraph />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e7eb] text-[14px] tracking-[0.35px] w-[70.77px]">
        <p className="leading-[20px] whitespace-pre-wrap">Collection</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e7eb] text-[14px] tracking-[0.35px] w-[89.67px]">
        <p className="leading-[20px] whitespace-pre-wrap">New Arrivals</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e7eb] text-[14px] tracking-[0.35px] w-[41.98px]">
        <p className="leading-[20px] whitespace-pre-wrap">About</p>
      </div>
    </div>
  );
}

function NavigationMenu() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Navigation Menu">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p21fc4800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function ButtonUserProfile() {
  return (
    <div className="relative shrink-0" data-name="Button - User Profile">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg1 />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p1ec09680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function ButtonShoppingCart() {
  return (
    <div className="relative shrink-0" data-name="Button - Shopping Cart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg2 />
      </div>
    </div>
  );
}

function UserActions() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(0,56,37,0.3)] content-stretch flex gap-[16px] items-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="User Actions">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <ButtonUserProfile />
      <div className="bg-[rgba(255,255,255,0.3)] h-[16px] shrink-0 w-px" data-name="Vertical Divider" />
      <ButtonShoppingCart />
    </div>
  );
}

function MainHeader() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="MainHeader">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[24px] relative w-full">
          <LogoSection />
          <NavigationMenu />
          <UserActions />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold justify-center leading-[120px] relative shrink-0 text-[120px] text-white tracking-[-3px] uppercase w-full whitespace-pre-wrap">
        <p className="mb-0">CELEBRATE</p>
        <p className="mb-0 text-[130px]">EVERY MOMENT</p>
        <p>IN STYLE</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[512px] relative shrink-0 w-[512px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light h-[59px] justify-center leading-[29.25px] not-italic relative shrink-0 text-[#d1d5db] text-[18px] w-[483.52px] whitespace-pre-wrap">
        <p className="mb-0">Explore fine jewelry that reflects your style and celebrates</p>
        <p>{`life's special moments.`}</p>
      </div>
    </div>
  );
}

function SectionHeroText() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] relative shrink-0 w-full" data-name="Section - Hero Text">
      <Heading />
      <Container />
    </div>
  );
}

function SectionHeroTextMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[96px] relative shrink-0 w-full" data-name="Section - Hero Text:margin">
      <SectionHeroText />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p3319d890} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BlackArrowButtonAbsolute() {
  return (
    <div className="absolute bg-black bottom-0 content-stretch flex items-center justify-center right-0 size-[64px] z-[3]" data-name="Black Arrow Button (Absolute)">
      <Svg3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px] whitespace-pre-wrap">Premium-quality</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.595px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold justify-center leading-[40.8px] relative shrink-0 text-[48px] text-black uppercase w-full whitespace-pre-wrap">
        <p className="mb-0">GOLD</p>
        <p className="mb-0">PLATED</p>
        <p>RING</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[10.795px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Heading1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">From</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.6px] w-[90.98px]">
        <p className="leading-[32px] whitespace-pre-wrap">$16,250</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container3 />
    </div>
  );
}

function ContentLeftSideText() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between p-[32px] relative shrink-0 w-[208.86px] z-[2]" data-name="Content Left Side (Text)">
      <Container1 />
      <Margin />
    </div>
  );
}

function SculptedHandDisplayingGoldRings() {
  return (
    <div className="absolute inset-[4.66%_-5%] shadow-[0px_8px_5px_0px_rgba(0,0,0,0.08),0px_20px_13px_0px_rgba(0,0,0,0.03)]" data-name="Sculpted hand displaying gold rings">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSculptedHandDisplayingGoldRings} />
      </div>
    </div>
  );
}

function RightSideImageContainer() {
  return (
    <div className="bg-[#f9fafb] h-full overflow-clip relative shrink-0 w-[313.28px] z-[1]" data-name="Right Side (Image Container)">
      <SculptedHandDisplayingGoldRings />
    </div>
  );
}

function TheWhiteCardBackground() {
  return (
    <div className="bg-white content-stretch flex isolate items-start min-h-[380px] relative self-stretch shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] shrink-0 w-[522.16px]" data-name="The White Card Background">
      <BlackArrowButtonAbsolute />
      <ContentLeftSideText />
      <RightSideImageContainer />
    </div>
  );
}

function SectionProductFeatureGoldPlatedRingHandSculpture() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Section - Product Feature: Gold Plated Ring (Hand Sculpture)">
      <TheWhiteCardBackground />
    </div>
  );
}

function SectionProductFeatureGoldPlatedRingHandSculptureMargin() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-end min-h-[380px] min-w-px pt-[157.5px] relative w-full" data-name="Section - Product Feature: Gold Plated Ring (Hand Sculpture):margin">
      <SectionProductFeatureGoldPlatedRingHandSculpture />
    </div>
  );
}

function LeftColumnTypographyHandFeature() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative self-stretch shrink-0 w-[803.33px]" data-name="Left Column: Typography & Hand Feature">
      <SectionHeroTextMargin />
      <SectionProductFeatureGoldPlatedRingHandSculptureMargin />
    </div>
  );
}

function DiamondGoldRing() {
  return (
    <div className="max-h-[149.60000610351562px] max-w-[192px] mix-blend-multiply relative shrink-0 size-[149.59px]" data-name="Diamond Gold Ring">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDiamondGoldRing} />
      </div>
    </div>
  );
}

function RingImage() {
  return (
    <div className="absolute content-stretch flex inset-[0_0_0_40%] items-center justify-center" data-name="Ring Image">
      <DiamondGoldRing />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px] whitespace-pre-wrap">PREMIUM</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold justify-center leading-[22.5px] relative shrink-0 text-[18px] text-black uppercase w-full whitespace-pre-wrap">
        <p className="mb-0">DIAMOND</p>
        <p>GOLD RING</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[136px]" data-name="Text">
      <Margin1 />
      <Heading2 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p3fe91380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function HangingButton() {
  return (
    <div className="absolute bg-black bottom-[-24px] content-stretch flex items-center justify-center right-[-24px] size-[48px]" data-name="Hanging Button">
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[48px]" data-name="Hanging Button:shadow" />
      <Svg4 />
    </div>
  );
}

function TopCardDiamondRing() {
  return (
    <div className="bg-white h-[176px] max-w-[320px] relative shrink-0 w-full" data-name="Top Card: Diamond Ring">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center max-w-[inherit] p-[24px] relative size-full">
          <div className="absolute bg-[rgba(255,255,255,0)] h-[176px] left-0 right-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0" data-name="Overlay+Shadow" />
          <RingImage />
          <Text />
          <HangingButton />
        </div>
      </div>
    </div>
  );
}

function TopCardDiamondRingMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Top Card: Diamond Ring:margin">
      <div className="content-stretch flex flex-col items-start pb-[64px] pl-[196.67px] pr-[48px] relative w-full">
        <TopCardDiamondRing />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black tracking-[0.5px] uppercase w-full">
        <p className="leading-[15px] whitespace-pre-wrap">EXCLUSIVE SET</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9.45px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16.5px] not-italic relative shrink-0 text-[#4b5563] text-[12px] w-full whitespace-pre-wrap">
        <p className="mb-0">Forever begins with this</p>
        <p>jewelry</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.pefe97} fill="var(--fill-0, #004D33)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonPlayIcon() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[11px] pr-[9px] py-px relative rounded-[9999px] shrink-0 size-[32px]" data-name="Button - Play Icon">
      <div aria-hidden="true" className="absolute border border-[#004d33] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[3.3px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
      <ButtonPlayIcon />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.5px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-[33.25px]">
        <p className="leading-[20px] whitespace-pre-wrap">18k</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.5px] relative shrink-0" data-name="Container">
      <Heading3 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] mb-[-0.5px] not-italic relative shrink-0 text-[#6b7280] text-[10px] uppercase w-[68.58px]">
        <p className="leading-[15px] whitespace-pre-wrap">Gold Plated</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#004d33] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container10 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container9 />
    </div>
  );
}

function LeftSideContent() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative z-[2]" data-name="Left Side Content">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Container6 />
        <Margin2 />
      </div>
    </div>
  );
}

function RightSideImage() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[1]" data-name="Right Side Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-12.5%] max-w-none top-0 w-[125%]" src={imgRightSideImage} />
      </div>
    </div>
  );
}

function MiddleCardModelExclusiveSet() {
  return (
    <div className="bg-white content-stretch flex h-[240px] isolate items-start overflow-clip relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Middle Card: Model / Exclusive Set">
      <LeftSideContent />
      <RightSideImage />
    </div>
  );
}

function MiddleCardModelExclusiveSetMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Middle Card: Model / Exclusive Set:margin">
      <div className="content-stretch flex flex-col items-start pl-[132.672px] pr-[48px] relative w-full">
        <MiddleCardModelExclusiveSet />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Oswald:Bold',sans-serif] font-bold h-[72px] justify-center leading-[0] relative shrink-0 text-[72px] text-white w-[97.78px]">
        <p className="leading-[72px] whitespace-pre-wrap">14+</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[33px] justify-center leading-[16.25px] not-italic relative shrink-0 text-[#d1d5db] text-[10px] text-right tracking-[2px] uppercase w-[172.67px] whitespace-pre-wrap">
        <p className="mb-0">INNOVATION EXCELLENCE</p>
        <p>CELEBRATION</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container12 />
    </div>
  );
}

function BottomStat() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-end pt-[64px] relative shrink-0 w-full" data-name="Bottom Stat">
      <Container11 />
      <Margin3 />
    </div>
  );
}

function BottomStatMargin() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-end min-h-[136px] min-w-px pt-[372px] relative w-full" data-name="Bottom Stat:margin">
      <BottomStat />
    </div>
  );
}

function RightColumnSecondaryCardsStats() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start pt-[64px] relative self-stretch shrink-0 w-[564.67px]" data-name="Right Column: Secondary Cards & Stats">
      <TopCardDiamondRingMargin />
      <MiddleCardModelExclusiveSetMargin />
      <BottomStatMargin />
    </div>
  );
}

function HeroGridLayout() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Hero Grid Layout">
      <LeftColumnTypographyHandFeature />
      <RightColumnSecondaryCardsStats />
    </div>
  );
}

function MainContent() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="MainContent">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[80px] pt-[16px] px-[64px] relative w-full">
          <HeroGridLayout />
        </div>
      </div>
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#004d33] content-stretch flex flex-col isolate items-start relative size-full" data-name="Body">
      <MainHeader />
      <MainContent />
    </div>
  );
}