import React, { useState, memo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useUserSaved } from '../context/UserSavedContext.jsx';

const PropertyCard = memo(({ property, onClick }) => {
  const { formatPrice, t, dir } = useLanguage();
  const { isFavorite, toggleFavorite } = useUserSaved();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const favorited = isFavorite(property?.id || property?.title);

  const fallbackImage = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800";

  const images = property?.images?.length > 0 
    ? property.images 
    : [fallbackImage];

  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(property);
  };

  const isExperience = property?.category === 'Experiences' || property?.id?.startsWith('exp-') || property?.id?.startsWith('photo-');
  const priceVal = property?.pricePerNight || property?.price || 2500;
  const nightsCount = property?.nights || 1;
  const egpBase = isExperience ? priceVal : priceVal * nightsCount;
  const formattedPrice = formatPrice(egpBase);

  // Line 3 Price Formatting (Clean, no duplicate EGP)
  let priceText = '';
  if (property?.priceLabel) {
    priceText = property.priceLabel.replace(/(EGP\s*)+/gi, 'EGP ').trim();
  } else if (isExperience) {
    priceText = `${formattedPrice} / person`;
  } else {
    priceText = `${formattedPrice} ${t('forNights')} ${nightsCount} ${nightsCount === 1 ? t('night') : t('nights')}`;
  }
  priceText = priceText.replace(/(EGP\s*)+/g, 'EGP ');

  // Line 2 Subtitle: Hosted by [Host Name] / Type / Category
  const line2Subtitle = property?.host?.name && !property.host.name.includes('EGP')
    ? `Hosted by ${property.host.name} · ${property?.type || property?.category || 'Stay'}`
    : (property?.type || property?.category || 'Stay');

  // Rating display
  const ratingText = property?.rating ? property.rating.toFixed(2).replace('.00', '.0') : "4.95";

  return (
    <div 
      onClick={() => onClick && onClick(property)} 
      className="flex flex-col gap-1.5 group cursor-pointer w-full"
      dir={dir}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        {property?.badgeText && !property.badgeText.includes('EGP') ? (
          <div className="absolute top-2.5 right-2.5 z-10 bg-gray-900/90 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm text-[11px] font-semibold tracking-tight">
            {property.badgeText}
          </div>
        ) : property?.isGuestFavorite ? (
          <div className="absolute top-2.5 right-2.5 z-10 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm text-[11px] font-semibold text-gray-900 border border-gray-200/60">
            {t('guestFavorite')}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label="Wishlist"
          aria-pressed={favorited}
          className="absolute top-2.5 left-2.5 z-10 p-1 rounded-full hover:scale-110 active:scale-95 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorited ? "#FF385C" : "rgba(0, 0, 0, 0.35)"}
            stroke="white"
            strokeWidth="1.6"
            className="w-5 h-5 transition drop-shadow-sm"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>

        <img
          src={images[currentImageIndex]}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
          alt={property?.title || "Property"}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300 ease-out"
        />

        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ direction: 'ltr' }}>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous Image"
                className="bg-white/90 p-1.5 rounded-full hover:bg-white text-gray-800 shadow-md hover:scale-105 active:scale-95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next Image"
                className="bg-white/90 p-1.5 rounded-full hover:bg-white text-gray-800 shadow-md hover:scale-105 active:scale-95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? "w-3 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Item Details Layout */}
      <div className="pt-0.5 flex flex-col">
        {/* Line 1: Title / Location + Rating */}
        <div className="flex items-center justify-between gap-1">
          <h3 className="font-semibold text-gray-900 text-[14px] truncate leading-snug">
            {property?.title || property?.location}
          </h3>
          <span className="font-medium text-gray-900 text-[13px] flex items-center gap-0.5 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-900 inline">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            ★ {ratingText}
          </span>
        </div>

        {/* Line 2: Hosted by [Host Name] / Category / Type */}
        <p className="text-[13px] text-gray-500 truncate leading-snug">
          {line2Subtitle}
        </p>

        {/* Line 3: Clean Price Formatting */}
        <div className="text-[13px] font-semibold text-gray-900 truncate leading-snug mt-0.5 flex items-center gap-1" dir="ltr">
          <span>{priceText}</span>
        </div>
      </div>
    </div>
  );
});

export default PropertyCard;