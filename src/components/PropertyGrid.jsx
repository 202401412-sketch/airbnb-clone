import React from 'react';
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

const PropertyGrid = ({ properties = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <PropertyCarousel title="جاري التحميل..." isLoading={true} />
        <PropertyCarousel title="جاري التحميل..." isLoading={true} />
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
        />
      )}

      {sectionMap.hotels?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.hotels.title}
          subtitle={sectionMap.hotels.subtitle}
          properties={sectionMap.hotels.properties}
        />
      )}

      {sectionMap.sheikh_zayed?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.sheikh_zayed.title}
          subtitle={sectionMap.sheikh_zayed.subtitle}
          properties={sectionMap.sheikh_zayed.properties}
        />
      )}

      {sectionMap.new_cairo?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.new_cairo.title}
          subtitle={sectionMap.new_cairo.subtitle}
          properties={sectionMap.new_cairo.properties}
        />
      )}

      {sectionMap.hurghada?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.hurghada.title}
          subtitle={sectionMap.hurghada.subtitle}
          properties={sectionMap.hurghada.properties}
        />
      )}

      <ExperienceCategoryCarousel />

      {sectionMap.exp_cairo?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.exp_cairo.title}
          subtitle={sectionMap.exp_cairo.subtitle}
          properties={sectionMap.exp_cairo.properties}
        />
      )}

      {sectionMap.photo_memories?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.photo_memories.title}
          subtitle={sectionMap.photo_memories.subtitle}
          properties={sectionMap.photo_memories.properties}
        />
      )}

      {sectionMap.october?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.october.title}
          subtitle={sectionMap.october.subtitle}
          properties={sectionMap.october.properties}
        />
      )}

      {sectionMap.dubai?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.dubai.title}
          subtitle={sectionMap.dubai.subtitle}
          properties={sectionMap.dubai.properties}
        />
      )}

      {sectionMap.sokhna?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.sokhna.title}
          subtitle={sectionMap.sokhna.subtitle}
          properties={sectionMap.sokhna.properties}
        />
      )}

      {sectionMap.riyadh?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.riyadh.title}
          subtitle={sectionMap.riyadh.subtitle}
          properties={sectionMap.riyadh.properties}
        />
      )}

      {sectionMap.alamein?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.alamein.title}
          subtitle={sectionMap.alamein.subtitle}
          properties={sectionMap.alamein.properties}
        />
      )}

      {sectionMap.istanbul?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.istanbul.title}
          subtitle={sectionMap.istanbul.subtitle}
          properties={sectionMap.istanbul.properties}
        />
      )}

      {unassignedProperties.length > 0 && (
        <PropertyCarousel
          title="أماكن إقامة أخرى مقترحة لك"
          subtitle="مختارات إضافية للإقامة في مختلف المدن والمحافظات"
          properties={unassignedProperties}
        />
      )}
    </div>
  );
};

export default PropertyGrid;