// EvictionMap.tsx
// React component to display eviction points on a Mapbox GL JS map of Boston
// Place Evictions_2020_2024.csv in src/data/

import React, { useEffect, useRef } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Papa from 'papaparse';
import type { Feature, Point } from 'geojson';

interface EvictionRow {
  lat: string;
  long: string;
  grade: string;
  case_type: string;
  file_date: string;
  label: string;
}

interface EvictionProperties {
  grade: string;
  case_type: string;
  file_date: string;
  label: string;
}

import evictionCSVUrl from '../../data/evictions_by_zones.csv?url';
mapboxgl.accessToken = "pk.eyJ1IjoiemhlbmdmYW4wMDAwIiwiYSI6ImNtOTY1YWkxMTB0b3QyaW9xeDB2dzdtcjAifQ.Efsxuzjn9FGnLZOoMVUUIA";

const bostonBounds: [ [number, number], [number, number] ] = [
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
          const { data }: { data: EvictionRow[] } = Papa.parse<EvictionRow>(csvText, { header: true, skipEmptyLines: true });
          const features = data
            .map<Feature<Point, EvictionProperties> | null>(d => {
              const lat = parseFloat(d.lat);
              const lng = parseFloat(d.long);
              if (isNaN(lat) || isNaN(lng)) return null;
              return {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [lng, lat] },
                properties: {
                  grade: d.grade,
                  case_type: d.case_type,
                  file_date: d.file_date,
                  label: d.label
                }
              };
            })
            .filter(
              (f): f is Feature<Point, EvictionProperties> =>
                f !== null &&
                Array.isArray(f.geometry.coordinates) &&
                f.geometry.coordinates.length === 2
            )
            // .slice(0, 10); // Only show 10 for speed
          //console.log('Parsed features:', features);
          map.addSource('evictions', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: features as any
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
            if (!e.features || e.features.length === 0) return;
            map.getCanvas().style.cursor = 'pointer';
            const feature = e.features[0] as mapboxgl.MapboxGeoJSONFeature;
            const props = feature.properties as EvictionProperties;
            const { case_type, file_date, label } = props;
            popup
              .setLngLat([
                (feature.geometry as Point).coordinates[0],
                (feature.geometry as Point).coordinates[1]
              ])
              .setHTML(
                `<strong>Case Type:</strong> ${case_type || 'N/A'}<br/>
                 <strong>File Date:</strong> ${file_date || 'N/A'}<br>
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
    <section className="w-screen h-screen flex flex-col">
      <h2 className="sticky top-0 w-full bg-white font-serif font-bold text-3xl md:text-4xl px-6 py-4 z-20">
        Housing Evictions
      </h2>
      <div className="flex flex-1 overflow-hidden">
        <div  className="chart-text overflow-y-auto" style={{
          width: '50%',
          height: '100%',
          padding: '0 2rem 2rem 2rem',
          fontFamily: 'Georgia, serif',
          fontSize: '1.125rem'
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

        <div style={{ position: 'relative', width: '50%', height: '100%', padding: '0 2rem 2rem 2rem' }}>
          <div
            ref={mapContainer}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white bg-opacity-90 p-2 rounded shadow-md max-w-xs overflow-auto text-sm">
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: '#5c8546' }}></span>Grade A
              </div>
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: '#59829c' }}></span>Grade B
              </div>
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: '#dace74' }}></span>Grade C
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 inline-block mr-2" style={{ backgroundColor: '#c0747c' }}></span>Grade D
              </div>
            </div>
        </div>
        </div>
      </div>
    </section>
  );
}