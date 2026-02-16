import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { HERO_IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <main className="relative w-full px-4 sm:px-6 md:px-12 pb-14 pt-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A3F30] via-[#0E4F3C] to-[#115A46]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F6F1E8_0.6px,transparent_0.6px)] [background-size:3px_3px]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-12 h-[320px] w-[320px] rounded-full bg-[#115A46]/25 blur-[90px]" />
        <div className="absolute bottom-10 right-10 h-[280px] w-[280px] rounded-full bg-[#0A3F30]/55 blur-[80px]" />
      </div>

      <div className="relative border-t border-[rgba(198,167,94,0.2)] pt-6 sm:pt-8 lg:hidden">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="pt-2">
            <h1 className="font-sans text-4xl sm:text-5xl font-black uppercase tracking-[-0.03em] text-[#F6F1E8] leading-[0.92] [text-shadow:0_5px_14px_rgba(0,0,0,0.45)]">
              Celebrate
              <br />
              Every Moment
              <br />
              In Style
            </h1>
            <p className="mt-5 text-[#E4DBCE] text-sm sm:text-base max-w-[520px] leading-relaxed font-light">
              Explore fine jewelry that reflects your style and celebrates life's special moments.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider">
              <span className="bg-[#0A3F30]/45 border border-[rgba(198,167,94,0.25)] text-[#F6F1E8] px-3 py-1">4,500+ Happy Clients</span>
              <span className="bg-[#0A3F30]/45 border border-[rgba(198,167,94,0.25)] text-[#F6F1E8] px-3 py-1">Free Insured Shipping</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors">
                Shop Collection
              </button>
              <button className="px-5 py-2.5 border border-[#C6A75E] text-[#C6A75E] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C6A75E] hover:text-[#1C1C1C] transition-colors">
                Book Concierge
              </button>
            </div>
          </div>

          <div className="relative bg-[#EFE7DA] text-[#1C1C1C] shadow-[0_8px_24px_rgba(10,63,48,0.12)] overflow-hidden min-h-[300px] sm:min-h-[360px]">
            <div className="p-6 sm:p-8 w-[48%] sm:w-[44%] relative z-10">
              <p className="text-xs font-bold tracking-wide uppercase text-[#1C1C1C]/70">Premium-quality</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black uppercase leading-[0.9]">
                Gold
                <br />
                Plated
                <br />
                Ring
              </h2>
              <p className="mt-6 text-xs text-[#1C1C1C]/60">From</p>
              <p className="text-2xl sm:text-[30px] font-black">$16,250</p>
            </div>

            <div className="absolute right-0 bottom-0 w-[60%] h-[72%] sm:h-[70%] overflow-hidden">
              <img
                src={HERO_IMAGES.HAND_MODEL}
                alt="Gold ring on hand"
                className="w-full h-full object-cover object-center mix-blend-multiply"
              />
            </div>

            <button aria-label="View gold plated ring details" className="absolute right-0 bottom-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#0A3F30] text-[#C6A75E] flex items-center justify-center hover:bg-[#115A46] transition-colors border border-[rgba(198,167,94,0.2)]">
              <ArrowUpRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="relative bg-[#EFE7DA] text-[#1C1C1C] shadow-[0_8px_24px_rgba(10,63,48,0.12)] w-full max-w-[320px] min-h-[138px]">
            <div className="flex items-center p-4 sm:p-5">
              <div className="w-[52%]">
                <span className="text-xs font-bold tracking-wide uppercase leading-none text-[#C6A75E]">Premium</span>
                <h2 className="mt-3 text-base sm:text-[17px] leading-[1.05] uppercase font-bold tracking-tight">
                  Diamond
                  <br />
                  Gold Ring
                </h2>
              </div>

              <div className="w-[48%] p-[4px]">
                <div className="w-full h-[90px] sm:h-[98px] border border-[rgba(198,167,94,0.2)] overflow-hidden">
                  <img
                    src={HERO_IMAGES.RING_DETAIL}
                    alt="Diamond Ring"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <button aria-label="View diamond gold ring details" className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-10 h-10 sm:w-12 sm:h-12 bg-[#0A3F30] text-[#C6A75E] flex items-center justify-center hover:bg-[#115A46] transition-colors border border-[rgba(198,167,94,0.2)]">
              <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="bg-[#EFE7DA] text-[#1C1C1C] shadow-[0_8px_24px_rgba(10,63,48,0.12)] overflow-hidden">
            <div className="relative h-[220px] sm:h-[250px]">
              <div className="absolute left-0 top-0 h-full w-[46%] p-4 sm:p-5 z-10">
                <h3 className="text-base sm:text-lg font-extrabold uppercase leading-none">Exclusive Set</h3>
                <p className="mt-2 text-xs sm:text-sm leading-tight">Forever begins with this jewelry</p>

                <div className="mt-3 sm:mt-4 flex items-start gap-3">
                  <button aria-label="Play exclusive set video" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0A3F30] text-[#C6A75E] flex items-center justify-center border border-[rgba(198,167,94,0.2)]">
                    <Play size={11} className="ml-[1px] sm:w-3 sm:h-3" />
                  </button>
                  <div className="mt-1 h-8 sm:h-9 w-px bg-[rgba(198,167,94,0.2)]" />
                </div>

                <div className="mt-3">
                  <p className="text-xl sm:text-2xl leading-none font-black">18k</p>
                  <p className="text-xs sm:text-sm leading-none text-[#1C1C1C]/70 uppercase">Gold Plated</p>
                </div>
              </div>

              <img
                src={HERO_IMAGES.WOMAN_MODEL}
                alt="Model wearing jewelry"
                className="absolute right-0 bottom-0 h-full w-[58%] object-cover object-center"
              />
            </div>
          </div>

          <div className="h-[88px] border border-[rgba(198,167,94,0.2)] bg-[#0A3F30]/35 backdrop-blur-sm px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-baseline gap-1 text-[#F6F1E8]">
              <span className="text-[52px] sm:text-[62px] leading-none font-semibold">14</span>
              <span className="text-[38px] sm:text-[46px] leading-none font-light">+</span>
            </div>
            <p className="text-xs sm:text-sm leading-tight uppercase tracking-wide text-[#F6F1E8]/90 text-right">
              Innovation Excellence
              <br />
              Celebration
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[rgba(198,167,94,0.2)] pt-10 hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="max-w-[760px] min-h-[280px]">
              <h1 className="font-sans text-5xl md:text-6xl lg:text-[86px] font-black uppercase tracking-[-0.03em] text-[#F6F1E8] leading-[0.88] [text-shadow:0_5px_14px_rgba(0,0,0,0.45)]">
                Celebrate
                <br />
                Every Moment
                <br />
                In Style
              </h1>
              <p className="mt-6 text-[#E4DBCE] text-[22px] max-w-[640px] leading-tight font-light">
                Explore fine jewelry that reflects your style and celebrates life's special moments.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em]">
                <span className="bg-[#0A3F30]/45 border border-[rgba(198,167,94,0.25)] text-[#F6F1E8] px-4 py-2">4,500+ Happy Clients</span>
                <span className="bg-[#0A3F30]/45 border border-[rgba(198,167,94,0.25)] text-[#F6F1E8] px-4 py-2">Lifetime Care Included</span>
                <span className="bg-[#0A3F30]/45 border border-[rgba(198,167,94,0.25)] text-[#F6F1E8] px-4 py-2">Free Insured Shipping</span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <button className="px-7 py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors">
                  Shop Collection
                </button>
                <button className="px-7 py-3 border border-[#C6A75E] text-[#C6A75E] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C6A75E] hover:text-[#1C1C1C] transition-colors">
                  Book Concierge
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="relative w-full lg:max-w-[420px] min-h-[260px]">
              <div className="absolute top-5 right-14 w-full max-w-[300px] h-[138px] bg-[#EFE7DA] text-[#1C1C1C] shadow-[0_8px_24px_rgba(10,63,48,0.12)] border border-[rgba(198,167,94,0.2)] overflow-hidden flex">
                <div className="w-[52%] p-4">
                  <span className="text-xs font-bold tracking-wide uppercase leading-none text-[#C6A75E]">Premium</span>
                <h2 className="mt-6 text-[17px] leading-[1.05] uppercase font-bold tracking-tight">
                    Diamond
                    <br />
                    Gold Ring
                  </h2>
                </div>

                <div className="w-[48%] p-[6px] pr-[8px]">
                  <div className="w-full h-full border border-[rgba(198,167,94,0.2)] overflow-hidden">
                    <img
                      src={HERO_IMAGES.RING_DETAIL}
                      alt="Diamond Ring"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              <button aria-label="View diamond gold ring details" className="absolute top-[158px] right-[-12px] w-[68px] h-[68px] bg-[#0A3F30] text-[#C6A75E] flex items-center justify-center transition-colors hover:bg-[#115A46] border border-[rgba(198,167,94,0.2)]">
                <ArrowUpRight size={28} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-7 items-end">
          <div className="lg:col-span-7 relative min-h-[380px]">
            <div className="absolute left-0 bottom-0 w-full md:w-[calc(100%-96px)] min-h-[210px] bg-[#EFE7DA] text-[#1C1C1C] shadow-[0_8px_24px_rgba(10,63,48,0.12)] p-8 md:p-9 overflow-visible">
              <p className="text-[28px] font-medium tracking-tight text-[#1C1C1C]/80">Premium-quality</p>
              <h2 className="text-[48px] leading-[0.9] font-black uppercase mt-2">
                Gold
                <br />
                Plated Ring
              </h2>
              <p className="mt-5 text-[20px] font-medium text-[#1C1C1C]/70">From</p>
              <p className="text-[44px] font-black leading-tight">$16,250</p>

              <div className="absolute right-5 -top-16 w-[40%] min-w-[220px] h-[280px] bg-[#EFE7DA]/90 border border-[rgba(198,167,94,0.2)] shadow-[0_8px_24px_rgba(10,63,48,0.12)] overflow-hidden">
                <img
                  src={HERO_IMAGES.HAND_MODEL}
                  alt="Gold ring on hand"
                  className="w-full h-full object-cover object-center mix-blend-multiply"
                />
              </div>

              <button aria-label="View gold plated ring details" className="absolute right-6 bottom-6 w-[66px] h-[66px] bg-[#0A3F30] text-[#C6A75E] flex items-center justify-center transition-colors hover:bg-[#115A46] border border-[rgba(198,167,94,0.2)]">
                <ArrowUpRight size={26} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative h-[340px] lg:-mt-14 bg-[#EFE7DA] text-[#1C1C1C] shadow-[0_8px_24px_rgba(10,63,48,0.12)] overflow-hidden border border-[rgba(198,167,94,0.2)]">
              <div className="absolute left-0 top-0 h-full w-[40%] p-4 md:p-5 z-10">
                <h3 className="text-[30px] font-extrabold uppercase leading-none">Exclusive Set</h3>
                <p className="mt-2 text-[18px] leading-[1.1]">Forever begins with this jewelry</p>

                <div className="mt-4 flex items-start gap-4">
                  <button aria-label="Play exclusive set video" className="w-10 h-10 rounded-full bg-[#0A3F30] text-[#C6A75E] flex items-center justify-center shadow-md border border-[rgba(198,167,94,0.2)]">
                    <Play size={14} className="ml-[1px]" />
                  </button>
                  <div className="mt-2 h-20 w-px bg-[rgba(198,167,94,0.2)]" />
                </div>

                <div className="mt-3">
                  <p className="text-[45px] leading-none font-black">18k</p>
                  <p className="text-[30px] leading-none text-[#1C1C1C]/80">Gold Plated</p>
                </div>
              </div>

              <img
                src={HERO_IMAGES.WOMAN_MODEL}
                alt="Model wearing jewelry"
                className="absolute right-0 bottom-0 h-full w-[62%] object-cover object-center"
              />
            </div>

            <div className="h-[92px] border border-[rgba(198,167,94,0.2)] bg-[#0A3F30]/35 backdrop-blur-sm px-6 flex items-center justify-between">
              <div className="flex items-baseline gap-1 text-[#F6F1E8]">
                <span className="text-[68px] leading-none font-semibold">14</span>
                <span className="text-[52px] leading-none font-light">+</span>
              </div>
              <p className="text-[30px] leading-[1.02] uppercase text-[#F6F1E8]/90">Innovation Excellence Celebration</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
