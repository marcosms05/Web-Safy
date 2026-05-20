import { useState, useRef, useEffect } from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl';

const MADRID_CENTER: [number, number] = [-3.7038, 40.4168];
const DARK_STYLE = 'mapbox://styles/marcosms05/cmpblvuoc000y01s85dx24oz9';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function HowItWorks() {
  const [lat, setLat] = useState(40.4168);
  const [lon, setLon] = useState(-3.7038);
  const [score, setScore] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: DARK_STYLE,
      center: [lon, lat],
      zoom: 13,
      attributionControl: false,
    });
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lon, lat])
      .addTo(map)
      .on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLat(Number(lngLat.lat.toFixed(5)));
        setLon(Number(lngLat.lng.toFixed(5)));
      });
    markerRef.current = marker;
    map.on('click', (e) => {
      setLat(Number(e.lngLat.lat.toFixed(5)));
      setLon(Number(e.lngLat.lng.toFixed(5)));
    });
    mapRef.current = map;
    return () => {
      marker.remove();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if(mapRef.current && markerRef.current){
      mapRef.current.setCenter([lon, lat]);
      markerRef.current.setLngLat([lon, lat]);
    }
  }, [lat, lon]);

  async function fetchScore() {
    setLoading(true); setScore(null); setError("");
    try {
      // Aquí simulamos una respuesta plausible, ya que no hay backend conectado:  
      await new Promise(r => setTimeout(r, 750));
      let lighting = Math.random();
      let commerce = Math.random();
      let s = Math.round((lighting * 0.5 + commerce * 0.5) * 100) / 100;
      setScore(s);
    } catch(e) {
      setError("Error al calcular el score.");
    }
    setLoading(false);
  }

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto bg-charcoal rounded-card text-fog mt-16 mb-16">
      <h1 className="text-heading-lg font-bold text-white mb-4 text-center">¿Cómo calcula SAFY la seguridad?</h1>
      <p className="text-subheading mb-8 text-center max-w-xl mx-auto">
        SAFY analiza los tramos de tu trayecto combinando datos públicos reales:
        <br/>
        <span className="font-semibold text-map-green">· Farolas públicas</span> (más luz, más seguro)<br/>
        <span className="font-semibold text-map-green">· Comercios y actividad comercial</span> (más tránsito y vigilancia)<br/>
        <br/>
        Ambos factores se ponderan al 50% y dan una puntuación de seguridad de 0 (zona menos recomendada) a 1 (zona óptima).<br/>
      </p>

      {/* Mini mapa interactivo con modo selección */}
      <div className="w-full mb-6 rounded-card overflow-hidden relative" style={{ height: 330, minHeight: 220, padding: 0, border: 0 }}>
        {/* Icono modo selección fuera del ref del mapa para evitar offset */}
        <div style={{position:'absolute',top:16,right:16,zIndex:10,display:'flex',flexDirection:'row',alignItems:'center',gap:8,pointerEvents:'none'}}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-signal/20 border border-signal text-signal font-medium text-body-sm select-none">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="inline" style={{marginRight:2}}><path d="M3.5 3.5l13 13M12.5 3.5v3a2 2 0 01-2 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            Selecciona un punto en el mapa
          </span>
        </div>
        {/* SOLO el canvas mapbox va aquí, sin overlays */}
        <div ref={mapContainer} style={{ width: '100%', height: '100%', padding: 0, border: 0 }} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-end mb-8">
        <div>
          <label className="block text-body text-fog mb-2">Latitud</label>
          <input
            type="number"
            step="0.00001"
            className="input bg-black border border-fog rounded-card text-white mb-2 w-36 px-4 py-2"
            value={lat}
            onChange={e => setLat(Number(e.target.value))}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-body text-fog mb-2">Longitud</label>
          <input
            type="number"
            step="0.00001"
            className="input bg-black border border-fog rounded-card text-white mb-2 w-36 px-4 py-2"
            value={lon}
            onChange={e => setLon(Number(e.target.value))}
            disabled={loading}
          />
        </div>
        <div className="mt-4 md:mt-0 flex flex-col gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={fetchScore}
            disabled={loading}
          >{loading ? "Calculando..." : "Probar cálculo"}</Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setLat(Number(pos.coords.latitude.toFixed(5)));
                  setLon(Number(pos.coords.longitude.toFixed(5)));
                });
              } else {
                alert('La geolocalización no está soportada en tu navegador.');
              }
            }}
            disabled={loading}
          >Usar mi ubicación</Button>
        </div>
      </div>

      {score !== null && (
        <div className="text-center mt-2">
          <span className="text-body-lg font-bold text-map-green">Score de seguridad: {score}</span>
          <div className="h-2 bg-void rounded-full mt-3 w-full max-w-xs mx-auto overflow-hidden">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.floor(score * 100)}%`,
                background: score >= 0.7 ? '#42d392' : score >= 0.4 ? '#f5d97e' : '#f76e5c',
                transition: 'width .4s cubic-bezier(.4,1.6,.6,1)',
              }}
            />
          </div>
        </div>
      )}
      {error && <div className="text-center text-red-400 mt-2">{error}</div>}


      <div className="flex flex-wrap place-content-center gap-5 mt-10">
        <Link to="/map">
          <Button variant="outline" size="md">Probar mapa</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="md">Volver a inicio</Button>
        </Link>
      </div>
    </section>
  );
}
