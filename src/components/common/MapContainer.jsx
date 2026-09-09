import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// إصلاح أيقونة Leaflet الافتراضية
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Price Marker
const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="
      background-color: #ffffff;
      color: #000000;
      border: 1px solid #222222;
      font-weight: bold;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      white-space: nowrap;
    ">${price} EGP</div>`,
    iconSize: [75, 28],
    iconAnchor: [37, 14]
  });
};

const MapContainer = ({ properties = [], onClose }) => {
  // موقع سنتر الخريطة يغطي الإسكندرية والساحل الشمالي مع زوم 10 لضمان ظهور الـ 6 شقق
  const centerPosition = [31.150, 29.800];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd' }}>
      {onClose && (
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 1000,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          ✕ Close Map
        </button>
      )}

      <LeafletMap 
        center={centerPosition} 
        zoom={10} 
        scrollWheelZoom={true} 
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />

        {properties.map((prop) => (
          <Marker 
            key={prop.id} 
            position={[prop.lat, prop.lng]} 
            icon={createPriceIcon(prop.price)}
          >
            <Popup>
              <div style={{ padding: '4px', maxWidth: '180px' }}>
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '6px' }} 
                />
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{prop.title}</h4>
                <p style={{ margin: '2px 0', fontSize: '11px', color: '#666' }}>{prop.location}</p>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '12px', color: '#e11d48' }}>{prop.price} EGP / night</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;