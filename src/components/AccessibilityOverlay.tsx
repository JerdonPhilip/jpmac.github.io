'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Use a simpler approach - set the icon URL manually
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function AccessibilityOverlay() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize Leaflet map (invisible, for accessibility)
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      zoom: 2,
      center: [0, 0],
    });

    // Add a placeholder tile layer (optional)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.01, // Almost invisible
    }).addTo(map);

    // Add project markers (these will be clickable for screen readers)
    const marker = L.marker([0, 0], {
      title: 'Forest of Adventure',
      alt: 'Forest of Adventure - RPG Map Project',
    }).addTo(map);

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full pointer-events-none" />;
}