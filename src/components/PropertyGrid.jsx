import React from 'react';
import PropertyCard from './PropertyCard.jsx';
import PropertyCarousel from './PropertyCarousel.jsx';
import ExperienceCategoryCarousel from './ExperienceCategoryCarousel.jsx';

const SECTIONS_CONFIG = [
  {
    id: "alexandria",
    title: "Popular homes in Alexandria",
    match: (p) => p.id?.startsWith("alex-") || p.location?.includes("Alexandria") || p.location?.includes("San Stefano") || p.location?.includes("Sidi Beshr") || p.location?.includes("Fleming")
  },
  {
    id: "hotels",
    title: "Great hotels for your next trip",
    subtitle: "Plus, earn Airbnb credit when staying at a featured hotel.",
    match: (p) => p.id?.startsWith("hotel-") || p.category === "Hotels"
  },
  {
    id: "sheikh_zayed",
    title: "Available homes for this weekend in Sheikh Zayed",
    match: (p) => p.id?.startsWith("sz-") || (p.location?.includes("Zayed") && !p.id?.startsWith("oct-"))
  },
  {
    id: "new_cairo",
    title: "Stays in New Cairo",
    match: (p) => p.id?.startsWith("nc-") || p.location?.includes("New Cairo") || p.location?.includes("5th Settlement") || p.location?.includes("Tagamoa")
  },
  {
    id: "hurghada",
    title: "Available homes for this weekend in Hurghada",
    match: (p) => p.id?.startsWith("hg-") || p.location?.includes("Hurghada") || p.location?.includes("Gouna") || p.location?.includes("Sahl Hasheesh")
  },
  {
    id: "exp_cairo",
    title: "Popular travel experiences in Cairo",
    match: (p) => p.id?.startsWith("exp-cairo-")
  },
  {
    id: "photo_memories",
    title: "Capture memories in a destination near you",
    match: (p) => p.id?.startsWith("photo-")
  },
  {
    id: "october",
    title: "Homes in 6th of October City",
    match: (p) => p.id?.startsWith("oct-") || p.location?.includes("October")
  },
  {
    id: "dubai",
    title: "Available homes next month in Dubai",
    match: (p) => p.id?.startsWith("dubai-") || p.location?.includes("Dubai")
  },
  {
    id: "sokhna",
    title: "Places to stay in Ain Sokhna",
    match: (p) => p.id?.startsWith("sokhna-") || p.location?.includes("Sokhna")
  },
  {
    id: "riyadh",
    title: "Explore homes in Riyadh",
    match: (p) => p.id?.startsWith("riyadh-") || p.location?.includes("Riyadh")
  },
  {
    id: "alamein",
    title: "Popular homes in El Alamein",
    match: (p) => p.id?.startsWith("al-") || p.location?.includes("Alamein") || p.location?.includes("Marassi")
  },
  {
    id: "istanbul",
    title: "Stays in Istanbul",
    match: (p) => p.id?.startsWith("istanbul-") || p.location?.includes("Istanbul")
  }
];

const SkeletonGrid = ({ count = 12 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-8 py-6" dir="ltr">
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

const SERVICES = [
  {
    id: 'chef',
    title: 'Personal Chef Service',
    description: 'Enjoy custom gourmet meals prepared in your rental by top local chefs.',
    priceLabel: 'From EGP 1,200 / meal',
    numericPrice: 1200,
    unitLabel: 'meal',
    rating: '4.98 (124 reviews)',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'transfer',
    title: 'Airport Transfer & Private Chauffeur',
    description: 'Seamless airport pickup and drop-off in premium luxury vehicles with professional drivers.',
    priceLabel: 'From EGP 600 / trip',
    numericPrice: 600,
    unitLabel: 'trip',
    rating: '4.95 (88 reviews)',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'spa',
    title: 'In-House Spa & Wellness Treatments',
    description: 'Relaxing massages, facials, and spa treatments delivered directly to your doorstep.',
    priceLabel: 'From EGP 850 / session',
    numericPrice: 850,
    unitLabel: 'session',
    rating: '4.99 (210 reviews)',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'photo',
    title: 'Private Destination Photography',
    description: 'Capture unforgettable memories during your travel with a professional photographer.',
    priceLabel: 'From EGP 950 / hour',
    numericPrice: 950,
    unitLabel: 'hour',
    rating: '4.97 (156 reviews)',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'
  }
];

const PropertyGrid = ({
  properties = [],
  isLoading = false,
  selectedCategory = 'all',
  onSelectProperty,
  activeMainTab = 'All',
  onNavigate
}) => {

  const handleBookService = (service) => {
    // إرسال البيانات بأسلوب الخدمة المخصص
    const servicePayload = {
      isService: true,
      itemType: 'service',
      service: {
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.numericPrice,
        priceLabel: service.priceLabel,
        unitLabel: service.unitLabel,
        image: service.image,
        rating: service.rating
      }
    };

    if (onNavigate) {
      onNavigate('checkout', servicePayload);
    }
  };

  if (isLoading) {
    if (selectedCategory !== 'all') {
      return (
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4" dir="ltr">
          <SkeletonGrid count={10} />
        </div>
      );
    }
    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4 space-y-8" dir="ltr">
        <PropertyCarousel title="Loading..." isLoading={true} />
        <PropertyCarousel title="Loading..." isLoading={true} />
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
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-16 text-center" dir="ltr">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-[18px] font-bold text-gray-900 mb-2">No matching stays found</h3>
          <p className="text-gray-500 text-[14px]">Try selecting another category to explore available properties.</p>
        </div>
      );
    }

    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-6" dir="ltr">
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

  // Services View
  if (activeMainTab === 'Services') {
    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6" dir="ltr">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Curated Services for Your Stay</h2>
          <p className="text-gray-500 text-sm mt-1">Enhance your trip with trusted local service providers and premium experiences.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              onClick={() => handleBookService(service)}
              className="group border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition bg-white flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full text-gray-900 shadow-sm">
                    ★ {service.rating}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{service.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{service.description}</p>
                  <span className="text-sm font-semibold text-gray-900">{service.priceLabel}</span>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookService(service);
                  }}
                  className="w-full py-2.5 border border-black rounded-xl text-xs font-bold hover:bg-black hover:text-white transition cursor-pointer"
                >
                  Book service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Experiences View
  if (activeMainTab === 'Experiences') {
    return (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4 space-y-4" dir="ltr">
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
      </div>
    );
  }

  const showHomes = activeMainTab === 'All' || activeMainTab === 'Homes';
  const showExp = activeMainTab === 'All';

  return (
    <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4 space-y-4" dir="ltr">
      {showHomes && sectionMap.alexandria?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.alexandria.title}
          subtitle={sectionMap.alexandria.subtitle}
          properties={sectionMap.alexandria.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.hotels?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.hotels.title}
          subtitle={sectionMap.hotels.subtitle}
          properties={sectionMap.hotels.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.sheikh_zayed?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.sheikh_zayed.title}
          subtitle={sectionMap.sheikh_zayed.subtitle}
          properties={sectionMap.sheikh_zayed.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.new_cairo?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.new_cairo.title}
          subtitle={sectionMap.new_cairo.subtitle}
          properties={sectionMap.new_cairo.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.hurghada?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.hurghada.title}
          subtitle={sectionMap.hurghada.subtitle}
          properties={sectionMap.hurghada.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showExp && <ExperienceCategoryCarousel />}

      {showExp && sectionMap.exp_cairo?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.exp_cairo.title}
          subtitle={sectionMap.exp_cairo.subtitle}
          properties={sectionMap.exp_cairo.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showExp && sectionMap.photo_memories?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.photo_memories.title}
          subtitle={sectionMap.photo_memories.subtitle}
          properties={sectionMap.photo_memories.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.october?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.october.title}
          subtitle={sectionMap.october.subtitle}
          properties={sectionMap.october.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.dubai?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.dubai.title}
          subtitle={sectionMap.dubai.subtitle}
          properties={sectionMap.dubai.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.sokhna?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.sokhna.title}
          subtitle={sectionMap.sokhna.subtitle}
          properties={sectionMap.sokhna.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.riyadh?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.riyadh.title}
          subtitle={sectionMap.riyadh.subtitle}
          properties={sectionMap.riyadh.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.alamein?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.alamein.title}
          subtitle={sectionMap.alamein.subtitle}
          properties={sectionMap.alamein.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && sectionMap.istanbul?.properties?.length > 0 && (
        <PropertyCarousel
          title={sectionMap.istanbul.title}
          subtitle={sectionMap.istanbul.subtitle}
          properties={sectionMap.istanbul.properties}
          onSelectProperty={onSelectProperty}
        />
      )}

      {showHomes && unassignedProperties.length > 0 && (
        <PropertyCarousel
          title="Other suggested stays for you"
          subtitle="Additional recommendations across popular destinations"
          properties={unassignedProperties}
          onSelectProperty={onSelectProperty}
        />
      )}
    </div>
  );
};

export default PropertyGrid;