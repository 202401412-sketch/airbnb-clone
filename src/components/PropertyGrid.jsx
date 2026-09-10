import React from 'react';
import PropertyCard from './PropertyCard.jsx';
import PropertyCarousel from './PropertyCarousel.jsx';
import ExperienceCategoryCarousel from './ExperienceCategoryCarousel.jsx';

const SECTIONS_CONFIG = [
  {
    id: "alexandria",
    title: "بيوت رائجة في الإسكندرية",
    match: (p) => p.id?.startsWith("alex-") || p.location?.includes("الإسكندرية") || p.location?.includes("سان ستيفانو") || p.location?.includes("سيدي بشر") || p.location?.includes("فليمنج")
  },
  {
    id: "hotels",
    title: "فنادق رائعة لرحلتك القادمة",
    subtitle: "بالإضافة إلى ذلك، ستحصل على رصيد Airbnb عند الإقامة في فندق مميز.",
    match: (p) => p.id?.startsWith("hotel-") || p.category === "Hotels"
  },
  {
    id: "sheikh_zayed",
    title: "بيوت متاحة في عطلة نهاية هذا الأسبوع في مدينة الشيخ زايد",
    match: (p) => p.id?.startsWith("sz-") || (p.location?.includes("زايد") && !p.id?.startsWith("oct-"))
  },
  {
    id: "new_cairo",
    title: "إقامة في القاهرة الجديدة",
    match: (p) => p.id?.startsWith("nc-") || p.location?.includes("القاهرة الجديدة") || p.location?.includes("التجمع") || p.location?.includes("شريف") || p.location?.includes("شيرتون")
  },
  {
    id: "hurghada",
    title: "بيوت متاحة في عطلة نهاية الأسبوع في الغردقة",
    match: (p) => p.id?.startsWith("hg-") || p.location?.includes("الغردقة") || p.location?.includes("الجونة") || p.location?.includes("سهل حشيش")
  },
  {
    id: "exp_cairo",
    title: "تجارب سفر رائجة في القاهرة",
    match: (p) => p.id?.startsWith("exp-cairo-")
  },
  {
    id: "photo_memories",
    title: "خلِّد ذكرياتك في وجهة قريبة منك",
    match: (p) => p.id?.startsWith("photo-")
  },
  {
    id: "october",
    title: "البيوت في مدينة السادس من أكتوبر",
    match: (p) => p.id?.startsWith("oct-") || p.location?.includes("أكتوبر")
  },
  {
    id: "dubai",
    title: "بيوت متاحة في الشهر القادم في دبي",
    match: (p) => p.id?.startsWith("dubai-") || p.location?.includes("دبي")
  },
  {
    id: "sokhna",
    title: "أماكن الإقامة في العين السخنة",
    match: (p) => p.id?.startsWith("sokhna-") || p.location?.includes("السخنة") || p.location?.includes("السويس") || p.location?.includes("عتاقة")
  },
  {
    id: "riyadh",
    title: "استكشِف البيوت في الرياض",
    match: (p) => p.id?.startsWith("riyadh-") || p.location?.includes("الرياض") || p.location?.includes("الياسمين") || p.location?.includes("النرجس") || p.location?.includes("اليرموك") || p.location?.includes("المونسية") || p.location?.includes("الملقا") || p.location?.includes("غرناطة")
  },
  {
    id: "alamein",
    title: "بيوت رائجة في العلمين",
    match: (p) => p.id?.startsWith("al-") || p.location?.includes("العلمين") || p.location?.includes("الساحل") || p.location?.includes("مراسي")
  },
  {
    id: "istanbul",
    title: "إقامة في إسطنبول",
    match: (p) => p.id?.startsWith("istanbul-") || p.location?.includes("إسطنبول") || p.location?.includes("Fatih") || p.location?.includes("بي أوغلو")
  }
];

const SkeletonGrid = ({ count = 12 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-8 py-6">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="flex flex-col gap-2 animate-pulse w-full">
        <div className="aspect-square w-full rounded-xl bg-gray-200" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mt-1" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3.5 bg-gray-200 rounded w-1/3" />
      </div>
    ))}
  </div>
);

const PropertyGrid = ({
  properties = [],
  isLoading = false,
  selectedCategory = 'all',
  onSelectProperty
}) => {
  if (isLoading) {
    if (selectedCategory !== 'all') {
      return (
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4">
          <SkeletonGrid count={10} />
        </div>
      );
    }
    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4 space-y-8">
        <PropertyCarousel title="جاري التحميل..." isLoading={true} />
        <PropertyCarousel title="جاري التحميل..." isLoading={true} />
      </div>
    );
  }

  const isFiltered = selectedCategory !== 'all' && Boolean(selectedCategory);
  
  if (isFiltered) {
    const filteredProperties = properties.filter((p) => {
      if (!p.category) return false;
      return p.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    if (filteredProperties.length === 0) {
      return (
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-[18px] font-bold text-gray-900 mb-2">لا توجد أماكن إقامة متطابقة</h3>
          <p className="text-gray-500 text-[14px]">جرب اختيار فئة أخرى لاستكشاف الممتلكات المتاحة.</p>
        </div>
      );
    }

    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-8">
          {filteredProperties.map((property, idx) => (
            <PropertyCard 
              key={property.id || idx} 
              property={property} 
              onClick={onSelectProperty}
            />
          ))}
        </div>
      </div>
    );
  }

  const assignedPropertyIds = new Set();

  const sectionMap = {};
  SECTIONS_CONFIG.forEach((config) => {
    const items = properties.filter((p) => {
      if (assignedPropertyIds.has(p.id)) return false;
      if (config.match(p)) {
        assignedPropertyIds.add(p.id);
        return true;
      }
      return false;
    });

    sectionMap[config.id] = {
      ...config,
      properties: items
    };
  });

  const unassignedProperties = properties.filter((p) => !assignedPropertyIds.has(p.id));

  return (
    <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4 space-y-4">
      {sectionMap.alexandria?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.alexandria.title}
          subtitle={sectionMap.alexandria.subtitle}
          properties={sectionMap.alexandria.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.hotels?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.hotels.title}
          subtitle={sectionMap.hotels.subtitle}
          properties={sectionMap.hotels.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.sheikh_zayed?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.sheikh_zayed.title}
          subtitle={sectionMap.sheikh_zayed.subtitle}
          properties={sectionMap.sheikh_zayed.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.new_cairo?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.new_cairo.title}
          subtitle={sectionMap.new_cairo.subtitle}
          properties={sectionMap.new_cairo.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.hurghada?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.hurghada.title}
          subtitle={sectionMap.hurghada.subtitle}
          properties={sectionMap.hurghada.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      <ExperienceCategoryCarousel />

      {sectionMap.exp_cairo?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.exp_cairo.title}
          subtitle={sectionMap.exp_cairo.subtitle}
          properties={sectionMap.exp_cairo.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.photo_memories?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.photo_memories.title}
          subtitle={sectionMap.photo_memories.subtitle}
          properties={sectionMap.photo_memories.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.october?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.october.title}
          subtitle={sectionMap.october.subtitle}
          properties={sectionMap.october.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.dubai?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.dubai.title}
          subtitle={sectionMap.dubai.subtitle}
          properties={sectionMap.dubai.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.sokhna?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.sokhna.title}
          subtitle={sectionMap.sokhna.subtitle}
          properties={sectionMap.sokhna.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.riyadh?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.riyadh.title}
          subtitle={sectionMap.riyadh.subtitle}
          properties={sectionMap.riyadh.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.alamein?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.alamein.title}
          subtitle={sectionMap.alamein.subtitle}
          properties={sectionMap.alamein.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {sectionMap.istanbul?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.istanbul.title}
          subtitle={sectionMap.istanbul.subtitle}
          properties={sectionMap.istanbul.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {unassignedProperties.length > 0 && (
        <PropertyCarousel
          title="أماكن إقامة أخرى مقترحة لك"
          subtitle="مختارات إضافية للإقامة في مختلف المدن والمحافظات"
          properties={unassignedProperties}
          onSelectProperty={onSelectProperty}
        />
      )}
    </div>
  );
};

export default PropertyGrid;