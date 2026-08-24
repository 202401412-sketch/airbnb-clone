export const mockProperties = [
  {
    id: "1",
    title: "Apartment in New Cairo",
    location: "New Cairo, Egypt",
    category: "Homes",
    type: "Entire apartment",
    pricePerNight: 2811,
    rating: 5.0,
    reviewsCount: 24,
    isGuestFavorite: true,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800"
    ],
    host: {
      name: "Ahmed",
      isSuperhost: true,
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    specs: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 1
    },
    amenities: ["Wifi", "Air conditioning", "Pool", "Free parking", "Kitchen"],
    coordinates: {
      lat: 30.0279,
      lng: 31.4913
    },
    description: "Beautiful modern apartment in the heart of New Cairo. Close to restaurants and shopping malls."
  },
  {
    id: "2",
    title: "Chalet in Dahab",
    location: "Dahab, South Sinai",
    category: "Beach",
    type: "Private Chalet",
    pricePerNight: 1305,
    rating: 4.88,
    reviewsCount: 52,
    isGuestFavorite: false,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
    ],
    host: {
      name: "Mariam",
      isSuperhost: true,
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    specs: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      baths: 1
    },
    amenities: ["Wifi", "Sea view", "Air conditioning", "Beach access"],
    coordinates: {
      lat: 28.5097,
      lng: 34.5136
    },
    description: "Relaxing chalet directly on the beach in Dahab with stunning sea view."
  },
  {
    id: "3",
    title: "Villa in Sheikh Zayed",
    location: "Sheikh Zayed City, Giza",
    category: "Luxury",
    type: "Entire villa",
    pricePerNight: 5522,
    rating: 4.95,
    reviewsCount: 18,
    isGuestFavorite: true,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800"
    ],
    host: {
      name: "Omar",
      isSuperhost: false,
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    specs: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      baths: 3
    },
    amenities: ["Wifi", "Private pool", "Garden", "Air conditioning", "BBQ grill"],
    coordinates: {
      lat: 30.0444,
      lng: 30.9833
    },
    description: "Luxury villa with a private swimming pool and a big garden for family getaways."
  }
];

export const mockCategories = [
  { id: "1", name: "Homes", icon: "home" },
  { id: "2", name: "Beachfront", icon: "beach" },
  { id: "3", name: "Cabins", icon: "cabin" },
  { id: "4", name: "Mansions", icon: "mansion" },
  { id: "5", name: "Trending", icon: "fire" }
];