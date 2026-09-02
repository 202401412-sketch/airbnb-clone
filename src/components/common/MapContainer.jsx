import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Marker
const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="background-color: white; border: 1px solid #111; font-weight: bold; font-size: 12px; padding: 4px 10px; border-radius: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); color: #111; text-align: center; white-space: nowrap;">${price} EGP</div>`,
    iconSize: [80, 30],
    iconAnchor: [40, 15]
  });
};

const MapContainer = ({ properties = [], onClose, toggleViewButton }) => {
  const defaultCenter = [31.2001, 29.9187];

  const mockProperties = properties.length > 0 ? properties : [
    { id: 1, title: 'شقة في سان ستيفانو', price: 4778, lat: 31.244, lng: 29.965, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500' },
    { id: 2, title: 'شقة في سيدي بشر بحري', price: 4168, lat: 31.258, lng: 29.981, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' },
    { id: 3, title: 'فيلا في الإسكندرية', price: 2974, lat: 31.220, lng: 29.940, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500' }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px', borderRadius: '16px', overflow: 'hidden' }}>
      
      {/* Toggle / Close Buttons */}
      <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 1000, display: 'flex', gap: '10px' }}>
        {toggleViewButton}
        {onClose && (
          <button onClick={onClose} style={{ backgroundColor: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            ✕ Close
          </button>
        )}
      </div>

      <LeafletMap center={defaultCenter} zoom={12} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mockProperties.map((prop) => (
          <Marker key={prop.id} position={[prop.lat || defaultCenter[0], prop.lng || defaultCenter[1]]} icon={createPriceIcon(prop.price)}>
            <Popup>
              <div style={{ padding: '2px', maxWidth: '180px' }}>
                <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '6px' }} />
                <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold' }}>{prop.title}</h4>
                <p style={{ margin: 0, color: '#e11d48', fontWeight: 'bold', fontSize: '12px' }}>{prop.price} EGP / night</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;