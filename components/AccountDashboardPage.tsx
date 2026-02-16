import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  User,
  LogOut,
  ArrowRight,
  Crown,
} from 'lucide-react';

const AccountDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F1E8] text-[#1C1C1C]">
      <div className="relative flex min-h-screen w-full overflow-x-hidden">
        <aside className="w-72 border-r border-[rgba(198,167,94,0.2)] bg-white hidden lg:flex flex-col sticky top-0 h-screen">
          <div className="p-8">
            <h2 className="text-[#0E4F3C] text-2xl font-black tracking-widest uppercase mb-12">Eluxee</h2>
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[rgba(198,167,94,0.2)]">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border border-[rgba(198,167,94,0.2)]"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop')" }}
              />
              <div className="flex flex-col">
                <h1 className="text-base font-semibold">Isabella</h1>
                <p className="text-[#C6A75E] text-xs font-medium uppercase tracking-wider">Gold Member</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <a className="flex items-center gap-3 px-4 py-3 rounded bg-[#0E4F3C]/8 text-[#0E4F3C] border-r-2 border-[#0E4F3C]" href="#"><LayoutDashboard size={20} /><p className="text-sm font-semibold tracking-tight">Dashboard</p></a>
              <a className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C]/70 hover:bg-[#0E4F3C]/6 hover:text-[#0E4F3C] transition-all" href="#"><ShoppingBag size={20} /><p className="text-sm font-medium tracking-tight">My Orders</p></a>
              <a className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C]/70 hover:bg-[#0E4F3C]/6 hover:text-[#0E4F3C] transition-all" href="#"><Heart size={20} /><p className="text-sm font-medium tracking-tight">Wishlist</p></a>
              <a className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C]/70 hover:bg-[#0E4F3C]/6 hover:text-[#0E4F3C] transition-all" href="#"><MapPin size={20} /><p className="text-sm font-medium tracking-tight">Addresses</p></a>
              <a className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C]/70 hover:bg-[#0E4F3C]/6 hover:text-[#0E4F3C] transition-all" href="#"><CreditCard size={20} /><p className="text-sm font-medium tracking-tight">Payment Methods</p></a>
              <a className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C]/70 hover:bg-[#0E4F3C]/6 hover:text-[#0E4F3C] transition-all" href="#"><User size={20} /><p className="text-sm font-medium tracking-tight">Account Details</p></a>
            </nav>
          </div>
          <div className="mt-auto p-8 border-t border-[rgba(198,167,94,0.2)]">
            <a className="flex items-center gap-3 px-4 py-2 text-[#1C1C1C]/50 hover:text-[#0E4F3C] transition-colors" href="#"><LogOut size={20} /><p className="text-sm font-medium tracking-tight">Logout</p></a>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-12 lg:px-12">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-serif text-5xl font-light text-[#1C1C1C] mb-2 italic">Welcome back, Isabella</h2>
                <p className="text-[#6F6F6F] text-base font-normal tracking-wide">Managing your curated collection and personal style profile.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center border border-[rgba(198,167,94,0.2)] bg-white px-6 py-3 rounded">
                  <span className="text-xs text-[#6F6F6F] uppercase tracking-widest font-bold">Orders</span>
                  <span className="text-2xl font-black text-[#0E4F3C]">12</span>
                </div>
                <div className="flex flex-col items-center border border-[rgba(198,167,94,0.2)] bg-white px-6 py-3 rounded">
                  <span className="text-xs text-[#6F6F6F] uppercase tracking-widest font-bold">Points</span>
                  <span className="text-2xl font-black text-[#0E4F3C]">4,500</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white border border-[rgba(198,167,94,0.2)] p-8 rounded-sm">
                  <div className="flex justify-between items-center mb-8 border-b border-[rgba(198,167,94,0.2)] pb-4">
                    <h3 className="text-lg font-bold tracking-tight uppercase">Recent Purchase</h3>
                    <a className="text-[#0E4F3C] text-xs font-bold uppercase tracking-widest border-b border-[rgba(198,167,94,0.2)]" href="#">View All Orders</a>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div
                      className="w-full md:w-48 aspect-square bg-center bg-no-repeat bg-cover rounded shadow-sm border border-[rgba(198,167,94,0.15)]"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop')" }}
                    />
                    <div className="flex-1 space-y-3 text-center md:text-left">
                      <div className="inline-block px-3 py-1 bg-[#EFE7DA] text-[#0E4F3C] text-[10px] font-bold uppercase tracking-widest rounded mb-2">Processing</div>
                      <h4 className="text-2xl font-medium font-serif">Vintage Emerald Cut Ring</h4>
                      <p className="text-sm text-[#6F6F6F]">Order #88291 • Placed Oct 24, 2023</p>
                      <p className="text-[#1C1C1C]/70 text-sm leading-relaxed max-w-sm">Crafted in 18k yellow gold with a 2.5ct ethically sourced emerald. Expected delivery: Nov 2-4.</p>
                      <div className="pt-4">
                        <button className="bg-[#0A3F30] text-[#F6F1E8] px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#115A46] transition-all">Track Shipment</button>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold tracking-tight uppercase">Wishlist Highlights</h3>
                    <a className="text-[#0E4F3C] text-xs font-bold uppercase tracking-widest border-b border-[rgba(198,167,94,0.2)]" href="#">Go to Wishlist</a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Classic Diamond Studs', price: '$1,250', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop' },
                      { name: 'Signature Gold Bangle', price: '$3,800', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop' },
                    ].map((item) => (
                      <article key={item.name} className="bg-white border border-[rgba(198,167,94,0.2)] p-4 group">
                        <div className="relative w-full aspect-[4/5] bg-center bg-no-repeat bg-cover mb-4 overflow-hidden" style={{ backgroundImage: `url('${item.image}')` }}>
                          <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full text-[#0E4F3C] hover:bg-white transition-colors"><Heart size={14} /></button>
                        </div>
                        <h5 className="text-sm font-bold mb-1 uppercase tracking-tight">{item.name}</h5>
                        <p className="text-[#0E4F3C] font-semibold text-sm mb-4">{item.price}</p>
                        <button className="w-full border border-[#C6A75E] text-[#C6A75E] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C6A75E] hover:text-[#1C1C1C] transition-all">Add to Bag</button>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="bg-[#0A3F30] text-[#F6F1E8] p-8 rounded-sm relative overflow-hidden">
                  <div className="absolute -right-12 -bottom-12 size-48 border border-[rgba(198,167,94,0.2)] rounded-full"></div>
                  <div className="absolute -right-8 -bottom-8 size-48 border border-[rgba(198,167,94,0.15)] rounded-full"></div>
                  <div className="relative z-10">
                    <Crown className="text-[#E4DBCE]/60 mb-6" size={34} />
                    <h3 className="font-serif text-3xl font-light italic mb-4">VIP Concierge</h3>
                    <p className="text-[#E4DBCE] text-sm leading-relaxed mb-8">
                      Your Personal Stylist, <strong className="text-white">Sofia</strong>, is available to assist with private consultations and custom orders.
                    </p>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="size-12 rounded-full border-2 border-[rgba(198,167,94,0.2)] p-0.5">
                        <div
                          className="size-full bg-center bg-no-repeat bg-cover rounded-full"
                          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop')" }}
                        />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold tracking-widest uppercase">Sofia Rossi</p>
                        <p className="text-[#E4DBCE]/70">Senior Style Advisor</p>
                      </div>
                    </div>
                    <button className="w-full bg-[#F6F1E8] text-[#0A3F30] px-6 py-4 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#EFE7DA] transition-all">Message Sofia</button>
                  </div>
                </section>

                <section className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.2)] p-8 rounded-sm">
                  <h3 className="text-sm font-bold tracking-tight uppercase mb-6 border-b border-[rgba(198,167,94,0.2)] pb-3">Style Profile</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#6F6F6F] mb-2">Preferred Metal</p>
                      <p className="text-sm font-medium">18k Yellow Gold, Platinum</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#6F6F6F] mb-2">Sizing</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-3 py-1 bg-white border border-[rgba(198,167,94,0.2)] text-[11px] font-semibold">Ring: 6</span>
                        <span className="px-3 py-1 bg-white border border-[rgba(198,167,94,0.2)] text-[11px] font-semibold">Bracelet: 17cm</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#6F6F6F] mb-2">Interests</p>
                      <p className="text-sm font-medium leading-relaxed">Art Deco, Vintage-Inspired, High-Clarity Emeralds</p>
                    </div>
                    <button className="text-[#0E4F3C] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-4 hover:gap-3 transition-all">
                      Edit Profile <ArrowRight size={14} />
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountDashboardPage;
