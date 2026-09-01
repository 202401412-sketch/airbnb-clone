import React, { useRef, useState, useEffect } from 'react';
import { experienceCategories } from '../data/mockData.js';

const ExperienceCategoryCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const fallbackImg = "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=400";

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    const absScroll = Math.abs(scrollLeft);
    setCanScrollPrev(absScroll > 5 || scrollLeft > 5);
    setCanScrollNext(absScroll < maxScroll - 5);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
    const delta = isRTL
      ? (dir === 'next' ? -amount : amount)
      : (dir === 'next' ? amount : -amount);
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="py-5 border-b border-gray-100">
      <div className="flex items-center justify-between mb-3 px-0.5 gap-4">
        <div>
          <h2 className="text-[19px] sm:text-[21px] font-bold text-gray-900 tracking-tight flex items-center gap-1.5 group cursor-pointer hover:underline leading-snug">
            <span>استكشاف تجارب السفر القريبة منك</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-900 transition-transform group-hover:translate-x-[-2px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </h2>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0" style={{ direction: 'ltr' }}>
          <button
            onClick={() => scroll('prev')}
            disabled={!canScrollPrev}
            aria-label="السابق"
            className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('next')}
            disabled={!canScrollNext}
            aria-label="التالي"
            className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto scroll-smooth no-scrollbar py-1 px-0.5"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {experienceCategories.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 flex flex-col gap-2 group cursor-pointer w-[140px] sm:w-[155px] md:w-[165px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
              <img
                src={item.image}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImg;
                }}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-out"
              />
            </div>
            <p className="font-semibold text-gray-900 text-[13.5px] text-center leading-snug truncate">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceCategoryCarousel;
