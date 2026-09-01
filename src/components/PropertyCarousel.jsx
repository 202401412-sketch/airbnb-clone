import React, { useRef, useState, useEffect } from 'react';
import PropertyCard from './PropertyCard.jsx';

const ShowAllCard = ({ count = 0, images = [] }) => {
  const previewImages = images.slice(0, 4);

  return (
    <div className="flex flex-col gap-1.5 group cursor-pointer w-full h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-200 group-hover:border-gray-400 transition-colors p-1.5">
        <div className="grid grid-cols-2 gap-1 w-full h-full rounded-lg overflow-hidden">
          {previewImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-full bg-gray-200 overflow-hidden">
              <img
                src={img}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          ))}
          {Array.from({ length: Math.max(0, 4 - previewImages.length) }).map((_, idx) => (
            <div key={`placeholder-${idx}`} className="bg-gray-200 w-full h-full rounded" />
          ))}
        </div>
      </div>

      <div className="pt-0.5">
        <div className="flex items-center gap-1 text-[14px] font-semibold text-gray-900 group-hover:underline">
          <span>عرض الكل</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 rtl:rotate-180"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
        {count > 0 && (
          <p className="text-gray-500 text-[12.5px] mt-0.5">
            {count}+ مكان إقامة
          </p>
        )}
      </div>
    </div>
  );
};

const CARD_WIDTH = 220;

const PropertyCarousel = ({
  title,
  subtitle,
  properties = [],
  isLoading = false,
  visibleCount,
  totalCount,
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
  }, [properties]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
    const delta = isRTL
      ? (dir === 'next' ? -amount : amount)
      : (dir === 'next' ? amount : -amount);
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  if (!isLoading && properties.length === 0) return null;

  const allImages = properties.flatMap((p) => p?.images?.[0] ? [p.images[0]] : []);
  const displayed = visibleCount ?? (properties.length >= 7 ? 7 : properties.length);
  const total = totalCount ?? (properties.length + 1);

  return (
    <section className="py-5 border-b border-gray-100 last:border-none">
      <div className="flex items-start justify-between mb-3 px-0.5 gap-4">
        <div className="min-w-0">
          <h2 className="text-[19px] sm:text-[21px] font-bold text-gray-900 tracking-tight flex items-center gap-1.5 group cursor-pointer hover:underline leading-snug flex-wrap">
            <span className="truncate">{title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 flex-shrink-0 text-gray-900 transition-transform group-hover:translate-x-[-2px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </h2>

          {!isLoading && (
            <p className="text-[12.5px] text-gray-400 mt-0.5 font-normal">
              {displayed} من أصل {total} عناصر ظاهرة
            </p>
          )}

          {subtitle && (
            <p className="text-[13px] text-gray-500 mt-0.5 font-normal leading-snug">
              {subtitle}
            </p>
          )}
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
        {isLoading
          ? Array.from({ length: 7 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 animate-pulse"
                style={{ width: CARD_WIDTH, scrollSnapAlign: 'start' }}
              >
                <div className="aspect-square w-full rounded-xl bg-gray-200 mb-2" />
                <div className="h-3.5 bg-gray-200 rounded w-3/4 mb-1.5" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1.5" />
                <div className="h-3.5 bg-gray-200 rounded w-1/3" />
              </div>
            ))
          : (
            <>
              {properties.map((property, idx) => (
                <div
                  key={property.id || idx}
                  className="flex-shrink-0"
                  style={{ width: CARD_WIDTH, scrollSnapAlign: 'start' }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}

              <div
                className="flex-shrink-0"
                style={{ width: CARD_WIDTH, scrollSnapAlign: 'start' }}
              >
                <ShowAllCard count={properties.length} images={allImages} />
              </div>
            </>
          )}
      </div>
    </section>
  );
};

export default PropertyCarousel;
