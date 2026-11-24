import React, { useState, useMemo } from 'react';
import { DONATION_CENTRES, DonationCenter } from '../data/centers';
import { MapPin, Search, Navigation, Phone, ExternalLink, MessageCircle, Clock, Calendar, Check, AlertCircle } from 'lucide-react';

export const CenterLocator: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [activeCenterId, setActiveCenterId] = useState<string>(DONATION_CENTRES[0].id);

  // Provinces list
  const provinces = useMemo(() => {
    const list = Array.from(new Set(DONATION_CENTRES.map((c) => c.province)));
    return ['todos', ...list];
  }, []);

  // Distance calculation using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización.');
      return;
    }
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setGeoError('No pudimos acceder a tu ubicación. Podés buscar por provincia o ciudad manualmente.');
      }
    );
  };

  // Filtered & sorted centers
  const filteredCenters = useMemo(() => {
    let result = DONATION_CENTRES.filter((c) => {
      const matchProv = selectedProvince === 'todos' || c.province === selectedProvince;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q);
      return matchProv && matchQuery;
    });

    if (userLocation) {
      result = [...result].sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return result;
  }, [selectedProvince, searchQuery, userLocation]);

  const activeCenter = useMemo(() => {
    return DONATION_CENTRES.find((c) => c.id === activeCenterId) || filteredCenters[0] || DONATION_CENTRES[0];
  }, [activeCenterId, filteredCenters]);

  return (
    <section id="centros" className="py-16 md:py-24 bg-neutral-100/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-2">
            <span>Puntos de Inscripción Habilitados</span>
            <span aria-hidden="true">·</span>
            <span>Red Nacional CPH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Encontrá tu Centro Más Cercano
          </h2>
          <p className="mt-3 text-neutral-600 text-base">
            No necesitás ir al INCUCAI central. Podés anotarte en los servicios de hemoterapia de los principales hospitales públicos y privados de todo el país.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por hospital, ciudad o barrio (ej. Garrahan, Rosario, Caballito)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 bg-neutral-50/50"
              />
            </div>

            {/* Geolocation Button */}
            <button
              onClick={handleGetLocation}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-sm font-semibold text-neutral-800 transition-colors shrink-0 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-rose-600" />
              <span>{userLocation ? 'Ubicación activada (ordenado por cercanía)' : 'Ordenar por mi cercanía'}</span>
            </button>
          </div>

          {/* Province Filter Pills / Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
            <span className="font-semibold text-neutral-500 whitespace-nowrap mr-1">Filtrar provincia:</span>
            {provinces.map((prov) => (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedProvince === prov
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                {prov === 'todos' ? 'Todas las provincias' : prov}
              </button>
            ))}
          </div>

          {geoError && (
            <p className="text-xs text-amber-700 flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {geoError}
            </p>
          )}
        </div>

        {/* 2-Column Split: Interactive Map & Directory / Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Centers List */}
          <div className="lg:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-2">
            <div className="flex items-center justify-between text-xs text-neutral-500 px-1 pb-1">
              <span>{filteredCenters.length} centros encontrados</span>
              <span>Hacé clic para ver datos y turnos</span>
            </div>

            {filteredCenters.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-neutral-200">
                <p className="text-sm font-medium text-neutral-800">No encontramos centros con ese criterio.</p>
                <button
                  onClick={() => {
                    setSelectedProvince('todos');
                    setSearchQuery('');
                  }}
                  className="mt-2 text-xs font-semibold text-rose-600 hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              filteredCenters.map((center) => {
                const isSelected = center.id === activeCenter.id;
                const distanceKm = userLocation
                  ? calculateDistance(userLocation.lat, userLocation.lng, center.lat, center.lng)
                  : null;

                return (
                  <div
                    key={center.id}
                    onClick={() => setActiveCenterId(center.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-white border-rose-600 shadow-md ring-1 ring-rose-600/30'
                        : 'bg-white/80 hover:bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-rose-700">{center.city}</span>
                          <span aria-hidden="true" className="text-neutral-300">·</span>
                          <span className="text-xs text-neutral-500">{center.province}</span>
                        </div>
                        <h4 className="text-base font-bold text-neutral-900 mt-0.5 leading-snug">
                          {center.name}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate">{center.address}</span>
                        </p>
                      </div>

                      {distanceKm !== null && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0 tabular-nums">
                          {distanceKm} km
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Column 2: Selected Center Full Detail Card + Argentine Interactive Map Visualizer */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Center Detail Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-rose-700">
                    {activeCenter.province}
                  </span>
                  <h3 className="text-2xl font-extrabold text-neutral-950 mt-1">
                    {activeCenter.name}
                  </h3>
                  <p className="text-sm font-medium text-neutral-600">
                    {activeCenter.institution}
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-sm">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Dirección</span>
                  </div>
                  <p className="text-neutral-900 font-medium">{activeCenter.address}</p>
                  <p className="text-neutral-500 text-xs">{activeCenter.city}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                    <Clock className="w-4 h-4 text-rose-600" />
                    <span>Días y Horarios</span>
                  </div>
                  <p className="text-neutral-900 font-medium">{activeCenter.hours}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                    <Calendar className="w-4 h-4 text-rose-600" />
                    <span>Modalidad de Atención</span>
                  </div>
                  <p className="text-neutral-900 font-medium capitalize">
                    {activeCenter.appointmentType === 'turnos_online' && 'Turno previo online'}
                    {activeCenter.appointmentType === 'orden_llegada' && 'Por orden de llegada'}
                    {activeCenter.appointmentType === 'whatsapp' && 'Coordinación por WhatsApp'}
                    {activeCenter.appointmentType === 'mixto' && 'Turno o demanda espontánea'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                    <Phone className="w-4 h-4 text-rose-600" />
                    <span>Teléfono Directo</span>
                  </div>
                  <p className="text-neutral-900 font-medium">{activeCenter.phone}</p>
                </div>
              </div>

              {/* Center Notes */}
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-rose-950 mb-6">
                <span className="font-bold">Indicaciones para tu visita: </span>
                {activeCenter.notes}
                <span className="block mt-1 text-neutral-600">
                  Recordá concurrir con DNI original y habiendo tomado desayuno liviano (mate, café, té o jugo sin lácteos ni alimentos grasos).
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {activeCenter.whatsapp && (
                  <a
                    href={`https://wa.me/${activeCenter.whatsapp}?text=${encodeURIComponent(
                      `Hola, quisiera consultar turnos y requisitos para donar sangre e inscribirme como donante de médula ósea en ${activeCenter.name}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                )}

                {activeCenter.turnosUrl && (
                  <a
                    href={activeCenter.turnosUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-xl transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Sacar Turno Oficial</span>
                  </a>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${activeCenter.name}, ${activeCenter.address}, ${activeCenter.city}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Cómo llegar (Google Maps)</span>
                </a>
              </div>
            </div>

            {/* Micro FAQ pill on registering */}
            <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 font-bold">
                i
              </div>
              <div>
                <p className="font-semibold text-neutral-900">¿Qué pasa exactamente cuando vas al centro?</p>
                <p className="mt-0.5 leading-relaxed">
                  Completás la ficha de donación de sangre habitual, una profesional te hace una breve entrevista médica privada y te extraen una unidad de sangre. Marcás la casilla de consentimiento para el Registro de CPH y listo. No hay dolor adicional ni trámites extra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
