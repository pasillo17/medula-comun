import React, { useState, useMemo } from 'react';
import { DONATION_CENTRES, DonationCenter } from '../data/centers';
import { 
  MapPin, 
  Navigation, 
  MessageCircle, 
  Search, 
  Clock, 
  ExternalLink, 
  Compass,
  Check,
  Building2
} from 'lucide-react';

interface HospitalMapLocatorProps {
  userLocation: { lat: number; lng: number } | null;
  onGetLocation: () => void;
}

export const HospitalMapLocator: React.FC<HospitalMapLocatorProps> = ({
  userLocation,
  onGetLocation
}) => {
  const [selectedCenterId, setSelectedCenterId] = useState<string>('garrahan');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const provinces = useMemo(() => {
    const list = Array.from(new Set(DONATION_CENTRES.map((c) => c.province)));
    return ['todos', ...list];
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const filteredCenters = useMemo(() => {
    let list = DONATION_CENTRES.filter((c) => {
      const matchProv = selectedProvince === 'todos' || c.province === selectedProvince;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.province.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
      return matchProv && matchSearch;
    });

    if (userLocation) {
      list = [...list].sort((a, b) => {
        const dA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const dB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return dA - dB;
      });
    }

    return list;
  }, [searchQuery, selectedProvince, userLocation]);

  const activeCenter = useMemo(() => {
    return DONATION_CENTRES.find((c) => c.id === selectedCenterId) || filteredCenters[0] || DONATION_CENTRES[0];
  }, [selectedCenterId, filteredCenters]);

  // Google Maps embed URL para el centro seleccionado
  const mapEmbedUrl = useMemo(() => {
    return `https://maps.google.com/maps?q=${activeCenter.lat},${activeCenter.lng}&hl=es&z=15&output=embed`;
  }, [activeCenter]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 sm:p-7 lg:p-9 space-y-5 sm:space-y-6">
      {/* Encabezado con letra grande */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Red Oficial INCUCAI · Centros de Hemoterapia</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Puntos Habilitados para Donar
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Ubicación real con mapa interactivo por calles, turnos oficiales y contacto de WhatsApp.
          </p>
        </div>

        {/* Controles de vista & GPS */}
        <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
          <div className="grid grid-cols-2 sm:flex p-1 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm font-semibold flex-1 sm:flex-initial justify-center" role="tablist" aria-label="Modo de visualización de centros">
            <button
              role="tab"
              aria-selected={viewMode === 'map'}
              onClick={() => setViewMode('map')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg transition-all cursor-pointer text-center min-h-[42px] flex items-center justify-center font-bold ${
                viewMode === 'map' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Mapa en vivo
            </button>
            <button
              role="tab"
              aria-selected={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg transition-all cursor-pointer text-center min-h-[42px] flex items-center justify-center font-bold ${
                viewMode === 'list' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Lista ({filteredCenters.length})
            </button>
          </div>

          <button
            onClick={onGetLocation}
            aria-label={userLocation ? "Ubicación GPS activada, centros ordenados por cercanía" : "Calcular mi cercanía a los centros mediante GPS del teléfono"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer active:scale-95 min-h-[42px]"
          >
            <Navigation className="w-4 h-4 text-rose-400" aria-hidden="true" />
            <span>{userLocation ? 'GPS activo' : 'Mi cercanía GPS'}</span>
          </button>
        </div>
      </div>

      {/* Buscador & Selector de Provincia con etiquetas accesibles */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
          <input
            type="text"
            aria-label="Buscar centro de donación por hospital, ciudad o barrio"
            placeholder="Buscar por hospital, ciudad o barrio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 min-h-[46px]"
          />
        </div>

        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          aria-label="Filtrar centros de donación por provincia"
          className="w-full sm:w-auto px-4 py-3 text-sm sm:text-base rounded-xl bg-[#14151D] border border-white/10 text-neutral-100 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/50 min-h-[46px]"
        >
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p === 'todos' ? 'Todas las provincias' : p}
            </option>
          ))}
        </select>
      </div>

      {/* Chips Rápidos de Hospitales con scroll táctil suave */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 -mx-1 px-1 scroll-smooth" role="region" aria-label="Centros sugeridos rápidamente">
        {filteredCenters.map((c) => {
          const isSelected = c.id === activeCenter.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCenterId(c.id)}
              aria-label={`Seleccionar centro: ${c.name} en ${c.city}`}
              className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer text-xs sm:text-sm flex items-center gap-2 shrink-0 min-h-[40px] ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 font-black'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-200'
              }`}
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span>{c.city} - {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>

      {/* Vista Mapa o Lista */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Contenedor del Mapa Real Google Maps Embed */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl bg-[#090A0F] h-[250px] sm:h-[400px] lg:h-[460px]">
            {/* Texto accesible para lectores de pantalla de personas ciegas */}
            <div className="sr-only">
              Mapa interactivo con la ubicación de {activeCenter.name}. Para usuarios de lectores de pantalla, los datos detallados de dirección, horarios y contacto de WhatsApp se detallan en texto accesible a continuación.
            </div>
            <iframe
              title={`Mapa de calles de ${activeCenter.name}`}
              src={mapEmbedUrl}
              className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.95]"
              loading="lazy"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Badge de Centro activo en esquina */}
            <div className="absolute top-2.5 left-2.5 bg-[#090A0F]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-xs text-white shadow-lg pointer-events-none max-w-[85%]">
              <span className="text-[10px] text-rose-400 font-mono font-bold block">CENTRO EN PANTALLA</span>
              <span className="font-bold truncate block text-sm">{activeCenter.name}</span>
            </div>
          </div>

          {/* Panel Inspector de Centro Seleccionado con letra grande */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-rose-500/30 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                    {activeCenter.province} · {activeCenter.city}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 leading-snug">
                    {activeCenter.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                    {activeCenter.institution}
                  </p>
                </div>

                {userLocation && (
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded block">
                      {calculateDistance(userLocation.lat, userLocation.lng, activeCenter.lat, activeCenter.lng)} km
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">distancia</span>
                  </div>
                )}
              </div>

              {/* Ficha técnica con letra legible */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-neutral-400 flex items-center gap-1.5 font-mono text-xs">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                    <span>Dirección exacta</span>
                  </span>
                  <p className="text-neutral-100 font-semibold">{activeCenter.address}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-neutral-400 flex items-center gap-1.5 font-mono text-xs">
                    <Clock className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                    <span>Días y Horarios de atención</span>
                  </span>
                  <p className="text-neutral-100 font-semibold">{activeCenter.hours}</p>
                </div>
              </div>

              {/* Indicaciones para la persona donante */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-100 leading-relaxed">
                <strong className="text-white font-bold">Para tu visita: </strong>
                {activeCenter.notes}
              </div>

              {/* Acciones para celular: botones táctiles cómodos de min-h-[46px] */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2 pt-1">
                {activeCenter.whatsapp && (
                  <a
                    href={`https://wa.me/${activeCenter.whatsapp}?text=${encodeURIComponent(
                      `Hola, quisiera consultar requisitos y turnos para donar sangre e inscribirme como donante de médula ósea en ${activeCenter.name}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Contactar por WhatsApp a ${activeCenter.name} para turnos`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer min-h-[46px] active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {activeCenter.turnosUrl && (
                  <a
                    href={activeCenter.turnosUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Solicitar turno online en ${activeCenter.name} (abre en ventana nueva)`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[46px] active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4 text-rose-400" aria-hidden="true" />
                    <span>Turnos Online</span>
                  </a>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${activeCenter.name}, ${activeCenter.address}, ${activeCenter.city}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Cómo llegar con Google Maps GPS a ${activeCenter.name}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[46px] sm:ml-auto active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-rose-400" aria-hidden="true" />
                  <span>Cómo llegar (GPS)</span>
                </a>
              </div>
            </div>

            {/* Selector de centros rápido accesible */}
            <div className="max-h-[160px] overflow-y-auto pr-1 space-y-1.5 custom-scrollbar" role="region" aria-label="Lista rápida de otros centros de hemoterapia">
              {filteredCenters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCenterId(c.id)}
                  aria-label={`Seleccionar ${c.name} en ${c.city}`}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer border min-h-[38px] ${
                    c.id === activeCenter.id
                      ? 'bg-rose-500/20 border-rose-500 text-white font-bold'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-neutral-300'
                  }`}
                >
                  <span className="truncate mr-2 font-medium">{c.name}</span>
                  <span className="font-mono text-xs text-neutral-400 shrink-0">{c.city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Vista de Lista Rápida Completa con letra grande */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="region" aria-label="Lista completa de centros habilitados">
          {filteredCenters.map((center) => {
            const distanceKm = userLocation
              ? calculateDistance(userLocation.lat, userLocation.lng, center.lat, center.lng)
              : null;

            return (
              <div
                key={center.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-rose-400 uppercase tracking-wider">{center.city}</span>
                    {distanceKm !== null && (
                      <span className="font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md font-mono text-xs">
                        {distanceKm} km
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-base text-white leading-snug">{center.name}</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 line-clamp-1">{center.address}</p>
                  <p className="text-xs text-neutral-400 mt-1 font-mono">Horario: {center.hours}</p>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5 text-xs sm:text-sm">
                  {center.whatsapp && (
                    <a
                      href={`https://wa.me/${center.whatsapp}?text=${encodeURIComponent(
                        `Hola, quisiera consultar requisitos y turnos para donar sangre e inscribirme como donante de médula en ${center.name}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp de ${center.name}`}
                      className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${center.name}, ${center.address}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Cómo llegar con GPS a ${center.name}`}
                    className="inline-flex items-center gap-1 text-neutral-200 hover:text-white font-bold ml-auto"
                  >
                    <MapPin className="w-4 h-4 text-rose-400" aria-hidden="true" />
                    <span>Cómo llegar</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
