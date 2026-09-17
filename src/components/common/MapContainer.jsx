import React, { memo, useMemo } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const iconCache = new Map();

const getPriceIcon = (price) => {
  const formatted = typeof price === 'number' ? price.toLocaleString() : price;
  if (iconCache.has(formatted)) {
    return iconCache.get(formatted);
  }
  const newIcon = L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="
      background-color: #ffffff;
      color: #000000;
      border: 1.5px solid #222222;
      font-weight: 800;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.18);
      white-space: nowrap;
    ">${formatted} EGP</div>`,
    iconSize: [75, 28],
    iconAnchor: [37, 14]
  });
  iconCache.set(formatted, newIcon);
  return newIcon;
};

const MapContainer = memo(({ properties = [], onClose }) => {
  const validProperties = useMemo(() => {
    return properties.map((p) => {
      const lat = p.coordinates?.lat || p.lat;
      const lng = p.coordinates?.lng || p.lng;
      const price = p.pricePerNight || p.price || 2500;
      const img = p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400';
      if (lat && lng) {
        return { ...p, mapLat: lat, mapLng: lng, mapPrice: price, mapImage: img };
      }
      return null;
    }).filter(Boolean);
  }, [properties]);

  const centerPosition = useMemo(() => {
    if (validProperties.length > 0) {
      return [validProperties[0].mapLat, validProperties[0].mapLng];
    }
    return [31.2218, 29.9441]; // Default Alexandria Corniche
  }, [validProperties]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      {onClose && (
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 1000,
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease'
          }}
        >
          ✕ Close Map
        </button>
      )}

      <LeafletMap 
        center={centerPosition} 
        zoom={11} 
        scrollWheelZoom={true} 
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />

        {validProperties.map((prop) => (
          <Marker 
            key={prop.id || `${prop.mapLat}-${prop.mapLng}`} 
            position={[prop.mapLat, prop.mapLng]} 
            icon={getPriceIcon(prop.mapPrice)}
          >
            <Popup>
              <div style={{ padding: '2px', maxWidth: '190px' }}>
                <img 
                  src={prop.mapImage} 
                  alt={prop.title} 
                  style={{ width: '100%', height: '95px', objectFit: 'cover', borderRadius: '10px', marginBottom: '6px' }} 
                />
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#111827' }}>{prop.title}</h4>
                {prop.location && <p style={{ margin: '2px 0', fontSize: '11px', color: '#6b7280' }}>{prop.location}</p>}
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', fontSize: '13px', color: '#FF385C' }}>
                  {prop.mapPrice.toLocaleString()} EGP / night
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
});

export default MapContainer;