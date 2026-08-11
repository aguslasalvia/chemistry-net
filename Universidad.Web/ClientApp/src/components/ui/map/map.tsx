import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

const FQ_ADDRESS: [number, number] = [-34.8886131, -56.1855536];

const fqMarker = L.divIcon({
    className: 'fq-marker',
    html: `
        <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 0C9 0 0 9 0 20c0 15 20 32 20 32s20-17 20-32C40 9 31 0 20 0Z" fill="#FF3B01" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="20" cy="19" r="8" fill="#FFFFFF"/>
        </svg>`,
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -44],
});

interface MapProps {
    center?: [number, number];
    zoom?: number;
    className?: string;
}

/** Leaflet map of the faculty. Themed with the FQ design system via Map.css
 *  (Leaflet injects its own DOM, so it can't be styled with Tailwind classes). */
const Map: React.FC<MapProps> = ({ center = FQ_ADDRESS, zoom = 16, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
            center,
            zoom,
            scrollWheelZoom: false,
            attributionControl: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20,
        }).addTo(map);

        L.marker(center, { icon: fqMarker, title: 'Facultad de Química — UdelaR' })
            .addTo(map)
            .bindPopup(
                `<div class="fq-popup">
                    <strong>Facultad de Química — UdelaR</strong>
                    <span>Av. Gral. Flores 2124, Montevideo</span>
                </div>`,
            );

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [center, zoom]);

    return (
        <div
            ref={containerRef}
            role="region"
            aria-label="Mapa de ubicación de la Facultad de Química"
            className={`z-0 aspect-[4/3] w-full overflow-hidden rounded-fq-lg ${className}`}
        />
    );
};

export default Map;
