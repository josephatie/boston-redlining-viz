// EvictionMap.tsx
// React component to display eviction points on a Mapbox GL JS map of Boston
// Place Evictions_2020_2024.csv in src/data/

import React, { useEffect, useRef } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Papa from 'papaparse';
import evictionCSVUrl from '../../data/evictions_by_zones.csv?url';
mapboxgl.accessToken = "pk.eyJ1IjoiemhlbmdmYW4wMDAwIiwiYSI6ImNtOTY1YWkxMTB0b3QyaW9xeDB2dzdtcjAifQ.Efsxuzjn9FGnLZOoMVUUIA";

const bostonBounds = [
  [-71.1912, 42.2279], // Southwest corner (lng, lat)
  [-70.9860, 42.3967]  // Northeast corner (lng, lat)
];

export default function TestMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11'
    });

    map.on('load', () => {
      map.fitBounds(bostonBounds, { padding: 20, duration: 0 });
      fetch(evictionCSVUrl)
        .then(res => res.text())
        .then(csvText => {
          const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
          const features = data
            .map(d => {
              const lat = parseFloat(d.lat);
              const lng = parseFloat(d.long);
              if (isNaN(lat) || isNaN(lng)) return null;
              return {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [lng, lat] },
                properties: {
                  grade: d.grade,
                  case_type: d.case_type,
                  file_time: d.file_date,
                  label: d.label
                }
              };
            })
            .filter(f => f !== null)
            // .slice(0, 10); // Only show 10 for speed
          //console.log('Parsed features:', features);
          map.addSource('evictions', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features
            }
          });
          map.addLayer({
            id: 'evictions-layer',
            type: 'circle',
            source: 'evictions',
            paint: {
              'circle-radius': 3,
              'circle-color': [
                'match',
                ['get', 'grade'],
                'A', '#5c8546',
                'B', '#59829c',
                'C', '#dace74',
                'D', '#c0747c',
                /* other */ '#888'
              ],
              'circle-opacity': 1
            }
          });

          // Tooltip logic
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
          });

          map.on('mouseenter', 'evictions-layer', (e) => {
            map.getCanvas().style.cursor = 'pointer';
            const feature = e.features[0];
            const { case_type, file_time, label } = feature.properties;
            popup
              .setLngLat(feature.geometry.coordinates)
              .setHTML(
                `<strong>Case Type:</strong> ${case_type || 'N/A'}<br/>
                 <strong>File Date:</strong> ${file_time || 'N/A'}<br>
                 <strong>Zone:</strong> ${label || 'N/A'}`
              )
              .addTo(map);
          });

          map.on('mouseleave', 'evictions-layer', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
        });
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', padding: '2rem' }}>
      
      
      
      <div  className="chart-text" style={{
        width: '50%',
        height: '100%',
        padding: '2rem',
        overflowY: 'auto',
        fontFamily: 'Georgia, serif'
      }}>

        <p>
        Housing isn’t just a building—it’s a <strong>foundation for stability</strong>.​
        </p>
        <p>
        Our data shows that eviction rates are disproportionately high in areas historically graded C and D. These are neighborhoods where <strong>financial vulnerability remains deeply embedded</strong> in local systems.​
        </p>
        <p>
        Evictions aren’t always about unpaid rent. They often reflect broader dynamics:​
        </p><p>
        Rising rents in long-undervalued properties.​
        </p><p>
        Neglect from absentee landlords.​
        </p><p>
        And communities treated as if they’re expendable.​
        </p>
        <p>
        While we can’t attribute this solely to redlining, the patterns suggest that the housing market has long <strong>prioritized profit over protection</strong>—and not all neighborhoods have been given the same chance to thrive.​
        </p>
        
      </div>

      <div
        ref={mapContainer}
        style={{
          width: '50%',
          height: '100%',
          minHeight: 400
        }}
      />
    </div>
  );
}