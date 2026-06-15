// ---------------------------------------------------------------------
// Geo helpers + a browser geolocation hook.
// ---------------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';

const EARTH_RADIUS_KM = 6371;
const toRad = (d) => (d * Math.PI) / 180;

export function haversineKm(a, b) {
  if (!a || !b || a.lat == null || a.lng == null || b.lat == null || b.lng == null) return null;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function etaMinutes(distanceKm, avgSpeedKmh = 30) {
  if (distanceKm == null) return null;
  return Math.max(1, Math.round((distanceKm / avgSpeedKmh) * 60));
}

// Watch (or one-shot) the device location.
//   useGeolocation({ watch: true, enabled: isOnline })
export function useGeolocation({ watch = false, enabled = true } = {}) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const idRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setError('Geolocation is not available in this browser.');
      return undefined;
    }
    const onOk = (pos) =>
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
    const onErr = (e) => setError(e.message || 'Could not get your location.');
    const opts = { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 };

    if (watch) {
      idRef.current = navigator.geolocation.watchPosition(onOk, onErr, opts);
    } else {
      navigator.geolocation.getCurrentPosition(onOk, onErr, opts);
    }
    return () => {
      if (idRef.current != null) navigator.geolocation.clearWatch(idRef.current);
    };
  }, [watch, enabled]);

  return { coords, error };
}
