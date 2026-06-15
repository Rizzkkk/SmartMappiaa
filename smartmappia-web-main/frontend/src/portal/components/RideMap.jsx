// ---------------------------------------------------------------------
// Leaflet + OpenStreetMap map (free, no API key).
//
// Pass an array of markers; the map auto-fits to show them all. Custom
// emoji pins avoid Leaflet's broken default-icon asset paths under Vite.
// ---------------------------------------------------------------------
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RIYADH_CENTER } from '../lib/constants';

function pin(color = '#FF7E21', glyph = '') {
  return L.divIcon({
    className: 'sm-pin',
    html: `<div style="
      width:32px;height:32px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 3px 8px rgba(0,0,0,.3);border:2px solid #fff;">
      <span style="transform:rotate(45deg);font-size:11px;font-weight:800;color:#fff;line-height:1;">${glyph}</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    const valid = points.filter((p) => p && p.lat != null && p.lng != null);
    if (valid.length === 0) return;
    if (valid.length === 1) {
      map.setView([valid[0].lat, valid[0].lng], 14, { animate: true });
    } else {
      map.fitBounds(valid.map((p) => [p.lat, p.lng]), { padding: [45, 45], maxZoom: 15 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(points.map((p) => [p?.lat, p?.lng]))]);
  return null;
}

export default function RideMap({ markers = [], line = null, height = 320, className = '' }) {
  const valid = markers.filter((m) => m && m.lat != null && m.lng != null);
  const center = valid[0] ? [valid[0].lat, valid[0].lng] : [RIYADH_CENTER.lat, RIYADH_CENTER.lng];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      style={{ height, width: '100%' }}
      className={`rounded-2xl overflow-hidden ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {line && line.length >= 2 && (
        <Polyline positions={line.map((p) => [p.lat, p.lng])} pathOptions={{ color: '#FF7E21', weight: 4, opacity: 0.6, dashArray: '8 8' }} />
      )}
      {valid.map((m, i) => (
        <Marker key={m.key || i} position={[m.lat, m.lng]} icon={pin(m.color, m.glyph)}>
          {m.label && <Popup>{m.label}</Popup>}
        </Marker>
      ))}
      <FitBounds points={valid} />
    </MapContainer>
  );
}
