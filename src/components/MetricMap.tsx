// src/components/MetricMap.tsx
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
// note the “/mapbox” import per v8 upgrade guide
import Map from 'react-map-gl/mapbox';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MetricMap: React.FC = () => {
  return (
    <div className="h-[600px] w-full">
      <Map
        // Initial camera position
        initialViewState={{
          longitude: -71.0589,
          latitude: 42.3601,
          zoom: 10
        }}
        // your token from .env
        mapboxAccessToken={MAPBOX_TOKEN}
        // full-container size via inline style
        style={{ width: '100%', height: '100%' }}
        // any Mapbox style you like
        mapStyle="mapbox://styles/mapbox/light-v10"
      />
    </div>
  );
};

export default MetricMap;
