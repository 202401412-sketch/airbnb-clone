import React, { useRef, useState, useEffect } from 'react';
import { categories } from '../data/mockData.js';

const CategoryIcon = ({ iconName, className = "w-6 h-6" }) => {
  switch (iconName) {
    case 'homes':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      );
    case 'mansions':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5" />
        </svg>
      );
    case 'hotels':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5" />
        </svg>
      );
    case 'beachfront':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      );
    case 'beach':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l9 6-9 6M3 16.5c1.5 0 2.25-.75 3.75-.75s2.25.75 3.75.75 2.25-.75 3.75-.75 2.25.75 3.75.75" />
        </svg>
      );
    case 'trending':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 3.974 3.974 0 01-1.07-2.73 3.75 3.75 0 002.5 6.651z" />
        </svg>
      );
    case 'experiences':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5v-9z" />
        </svg>
      );
    case 'pools':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5c1.5 0 2.25-.75 3.75-.75s2.25.75 3.75.75 2.25-.75 3.75-.75 2.25.75 3.75.75M3 18c1.5 0 2.25-.75 3.75-.75s2.25.75 3.75.75 2.25-.75 3.75-.75 2.25.75 3.75.75M16.5 4.5l-3 4.5h6l-3-4.5z" />
        </svg>
      );
    case 'cabins':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l9.75-9.75 9.75 9.75M4.5 10.5V21h15V10.5M9.75 21v-4.5h4.5V21" />
        </svg>
      );
    case 'countryside':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V3m0 0L8.25 6.75M12 3l3.75 3.75" />
        </svg>
      );
    case 'cities':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5v13.5M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />
        </svg>
      );
    case 'islands':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21" />
        </svg>
      );
    case 'design':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      );
    case 'all':
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5" />
        </svg>
      );
  }
};

const CategoryBar = ({
  selectedCategory = 'all',
  onSelectCategory = () => {},
  isLoading = false
}) => {
  const scrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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
    const amount = 300;
    const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
    const delta = isRTL
      ? (dir === 'next' ? -amount : amount)
      : (dir === 'next' ? amount : -amount);
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs py-3 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1760px] mx-auto flex items-center gap-8 overflow-hidden">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 animate-pulse min-w-[64px]">
              <div className="w-6 h-6 rounded-full bg-gray-200" />
              <div className="w-12 h-3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center group/bar">
        {canScrollPrev && (
          <div className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:block" style={{ direction: 'ltr' }}>
            <button
              onClick={() => scroll('prev')}
              aria-label="السابق"
              className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-800 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex items-center gap-8 sm:gap-10 overflow-x-auto no-scrollbar py-4 scroll-smooth w-full"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-2 pb-2 min-w-[56px] cursor-pointer transition-all border-b-2 whitespace-nowrap group focus:outline-none ${
                  isActive
                    ? "border-gray-900 text-gray-900 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <CategoryIcon
                  iconName={cat.icon}
                  className={`w-6 h-6 transition-transform group-hover:scale-105 ${
                    isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
                  }`}
                />
                <span className="text-[12px] sm:text-[13px] tracking-tight">
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {canScrollNext && (
          <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:block" style={{ direction: 'ltr' }}>
            <button
              onClick={() => scroll('next')}
              aria-label="التالي"
              className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-800 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
