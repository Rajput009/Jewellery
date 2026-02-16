import React from 'react';

const BentoGrid: React.FC = () => {
  return (
    <section className="w-full bg-[#F6F1E8] py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* TOP LEFT: Model Close-up */}
        <section className="relative bg-[#EFE7DA] overflow-hidden flex items-center justify-center min-h-[500px] md:min-h-[600px] md:h-auto group border border-[rgba(198,167,94,0.15)]">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Model wearing Eveangle jewelry" 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnPH3a3XIomMTLU_uYdM-yqrvcumqOAn5FB21HaS8u-a_DXma9i_mVxVSJ5DMPc4CBevxkYkHE3X8nUGkw9ggGhxXb-JKjOH9KFuhx8R4uo0N4ycu1-xq02eIEMxPsDTh9MwGuoIM1NFzyMfLjQfHjbxPhOhhkZo63q4gztlvbgNYFBEpFbzkEdHWRT9MMBlk6keX_beXhDRR_xdCDhbMQXisC8MHULIp68P7M-7NwqoUI5ydLAbP16ncIQzSRAHJhYGrRfjoa9m9o" 
              style={{ clipPath: 'inset(0 0 0 0)' }} 
            />
          </div>
          <div className="absolute bottom-10 left-10 z-10">
            <span className="text-xl font-light tracking-widest text-[#F6F1E8] border-b border-[rgba(198,167,94,0.2)]">[ Since 2017 ]</span>
          </div>
          {/* Decorative white square element */}
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#F6F1E8] z-10 hidden md:block border-l border-t border-[rgba(198,167,94,0.2)]"></div>
        </section>

        {/* TOP RIGHT: Product Catalog Grid */}
        <section className="bg-[#F6F1E8] grid grid-cols-2 gap-2 p-2 border border-[rgba(198,167,94,0.15)]">
          {/* Item 1: New Ring */}
          <div className="bg-white border border-[rgba(198,167,94,0.15)] p-4 relative flex flex-col items-center justify-center min-h-[250px] group overflow-hidden hover:border-[rgba(198,167,94,0.35)] hover:shadow-[0_8px_20px_rgba(10,63,48,0.08)] transition-all">
            <span className="absolute top-4 left-4 text-[#8E6F34] font-semibold text-xs uppercase tracking-tighter z-10">New</span>
            <img 
              alt="Gold quilted ring" 
              className="w-3/4 object-contain transition-transform duration-500 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA27FMuUe6bWLBsIVcwpEORMQ2aCW3UPPP3D9FzMImGLIZRF9gmMHW2tP2nXtDK1ZEMoz_EDAH7-D6acMIKjKVatWw_mnYUqStZwaiQk3X36w67S6s-0rZGTSlUM_16ijsM-Lvo5e7SJvm4m8sEKpDKBmkZLjivlfskV6MZy2LM694rCBFZcJgZSuQVMaYziOEjnzS_86ubBgi2tKEU24dlNjCI43QO4Euh_I07EBb5LlhmM61viDnrgMWgdfEEMi1Lon3LE50WFogj"
            />
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button aria-label="Previous ring image" className="text-[#6F6F6F] hover:text-[#0E4F3C] transition-colors">&lt;</button>
              <button aria-label="Next ring image" className="text-[#6F6F6F] hover:text-[#0E4F3C] transition-colors">&gt;</button>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-1">
              <div className="w-1.5 h-1.5 bg-[#0E4F3C] rotate-45"></div>
              <div className="w-1.5 h-1.5 bg-[#C6A75E]/40 rotate-45"></div>
              <div className="w-1.5 h-1.5 bg-[#C6A75E]/40 rotate-45"></div>
            </div>
          </div>
          
          {/* Item 2: Exclusive Model Shot */}
          <div className="bg-white p-0 relative overflow-hidden group border border-[rgba(198,167,94,0.15)] hover:border-[rgba(198,167,94,0.35)] hover:shadow-[0_8px_20px_rgba(10,63,48,0.08)] transition-all">
            <span className="absolute top-4 left-4 text-[#8E6F34] font-semibold text-xs uppercase tracking-tighter z-10 bg-[#F6F1E8]/90 px-1 py-0.5 backdrop-blur-sm">Exclusive</span>
            <img 
              alt="Model with ring" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1ymQzjN68qIN75s3jZzEtVlHW_Av-lOp_rNEg1xOpiD4q3KLgydmNc9v6D9X_cNN5P8Ity2fBFHxwcQfTPcrcT7nCwwEdWq71fUEFmwpkOPbAVchFrbGJuk5qFl4XKuHAZe9iHB-LA4DSpQBw4WKQGbgYMyX9d3-QKVG3O9RmpH97K6S_ij73PGuaw0kNvyF5dQCTp2lepTPyU8ynIxFWILkya_8dRnPFHftQUBOY0IcVStavDsf8rWsVmWuGujfJr2Kmhj_m-Tf-"
            />
          </div>
          
          {/* Item 3: Exclusive Hand Shot */}
          <div className="bg-white p-0 relative overflow-hidden group border border-[rgba(198,167,94,0.15)] hover:border-[rgba(198,167,94,0.35)] hover:shadow-[0_8px_20px_rgba(10,63,48,0.08)] transition-all">
            <span className="absolute top-4 left-4 text-[#8E6F34] font-semibold text-xs uppercase tracking-tighter z-10 bg-[#F6F1E8]/90 px-1 py-0.5 backdrop-blur-sm">Exclusive</span>
            <img 
              alt="Model hands" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2kbgaZBjK06LXzQWMRpZAWKVfbGN_za4EmcwaMnmRcOkGt7NrcxAhzgDAxwZMrzuVkSI-27wvSTbZLuq23hBm8A4AP_zuEiup1XO4duy1LSVAkSLBEfw5pDiG70sjy8Lgd2ksvOOnxVOCUILnTHfynXE9A7zqZpZ0dfjWXtaVFGwMPw6nYXZwf-_GRkdID-wi9XXufW7SM6L9GjhmdJlcpa8_PxeEuRZg-iVCbvuTklGYskTpExZ5BT-21IUldZgd9GC3TzWGlqLl"
            />
          </div>
          
          {/* Item 4: New Earrings */}
          <div className="bg-white border border-[rgba(198,167,94,0.15)] p-4 relative flex flex-col items-center justify-center min-h-[250px] group overflow-hidden hover:border-[rgba(198,167,94,0.35)] hover:shadow-[0_8px_20px_rgba(10,63,48,0.08)] transition-all">
            <span className="absolute top-4 left-4 text-[#8E6F34] font-semibold text-xs uppercase tracking-tighter z-10">New</span>
            <img 
              alt="Gold earrings" 
              className="w-3/4 object-contain grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1UzPD1y6H7VP5oQYd0qp9HhVTluGl1eYBV8DJROBxLOitCmHTE_fZgwAytV52Vpm-sxQDemPHuUMqDTqhwYbKGHJBuFTd5_eJ-eBsfwTepoKkkkO63XKaj649K4EMoa7xfHC8wtsDOoElV5P0zNezmqrr0pPtL4SIBhhf7k5zW2AHD1CdldLlYdihnDpdE0CQiiFOBUWdxDlgXboJw5uJPKs3Ph-jdE8_CC3gTqTYeKp7NITKLiJbBLcRTyuvoNwc_9lhWmI8qeZQ"
            />
             <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button aria-label="Previous earrings image" className="text-[#6F6F6F] hover:text-[#0E4F3C] transition-colors">&lt;</button>
              <button aria-label="Next earrings image" className="text-[#6F6F6F] hover:text-[#0E4F3C] transition-colors">&gt;</button>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default BentoGrid;
