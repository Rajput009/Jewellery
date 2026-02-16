import React from 'react';

type NotFoundPageProps = {
  onGoHome?: () => void;
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-10 md:p-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[#0E4F3C] font-semibold">404</p>
      <h1 className="mt-4 text-4xl md:text-5xl font-light">Page Not Found</h1>
      <p className="mt-3 text-sm md:text-base text-[#4D4D4D]">The page you requested does not exist or has moved.</p>
      <button
        type="button"
        onClick={onGoHome}
        className="mt-8 px-8 py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
      >
        Go Home
      </button>
    </section>
  );
};

export default NotFoundPage;
