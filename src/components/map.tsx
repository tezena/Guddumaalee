'use client'

import React, { useEffect, useRef } from 'react';
// global.d.ts
interface Window {
    google: any;
}

const Map = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const google = Window.google;
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 40.712776, lng: -74.005974 }, // Default location (New York City)
                zoom: 12,
            });

            new google.maps.Marker({
                position: { lat: 40.712776, lng: -74.005974 },
                map,
                title: 'Trial Location',
            });
        }
    }, []);

    return <div ref={mapRef} className="h-48 w-full"></div>;
};

export default Map;
