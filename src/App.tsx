/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DONATION_CENTRES } from './data/centers';
import { 
  HeartHandshake, 
  Heart,
  Droplets,
  AlertCircle,
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Search, 
  MessageCircle, 
  Navigation, 
  Sparkles, 
  Share2, 
  RotateCcw,
  ArrowUpRight,
  Dna,
  Zap,
  Activity,
  ShieldCheck,
  Check,
  ExternalLink,
  Phone,
  FileCheck2,
  Syringe,
  Volume2,
  CalendarDays,
  Plus,
  X
} from 'lucide-react';
import { HospitalMapLocator } from './components/HospitalMapLocator';
import { LifeStories } from './components/LifeStories';
import { AudioNarrator } from './components/AudioNarrator';
import heroDonorWarmthImg from './assets/images/hero_donor_warmth_1792077092068.jpg';

export default function App() {
  // --- 1. Estado del Validador Oficial (argentina.gob.ar/donar-medula) ---
  const [ageOk, setAgeOk] = useState<boolean | null>(null);
  const [weightOk, setWeightOk] = useState<boolean | null>(null);
  const [tattooOk, setTattooOk] = useState<boolean | null>(null);
  const [healthOk, setHealthOk] = useState<boolean | null>(null);
  const [isBloodZeroNeg, setIsBloodZeroNeg] = useState<boolean | null>(null);

  const isValidatorComplete = ageOk !== null && weightOk !== null && tattooOk !== null && healthOk !== null;
  const isEligible = ageOk && weightOk && tattooOk && healthOk;

  const resetValidator = () => {
    setAgeOk(null);
    setWeightOk(null);
    setTattooOk(null);
    setHealthOk(null);
    setIsBloodZeroNeg(null);
  };

  // --- 2. Pestaña de Método (Aféresis vs Punción) ---
  const [selectedMethod, setSelectedMethod] = useState<'aferesis' | 'puncion'>('aferesis');

  // --- 2.1 Estado del Reproductor de Audio Minimalista ---
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState<boolean>(false);

  // --- 2.2 Jornadas de donación (colectas externas) ---
  interface CommunityDrive {
    id: string;
    dateLabel: string;
    place: string;
    address: string;
    detail: string;
  }

  const [extraDrives, setExtraDrives] = useState<CommunityDrive[]>(() => {
    try {
      const saved = localStorage.getItem('medula_comun_drives');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showAddDrive, setShowAddDrive] = useState(false);
  const [newDrivePlace, setNewDrivePlace] = useState('');
  const [newDriveDate, setNewDriveDate] = useState('');
  const [newDriveAddress, setNewDriveAddress] = useState('');

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrivePlace.trim() || !newDriveDate.trim() || !newDriveAddress.trim()) return;
    const drive: CommunityDrive = {
      id: Date.now().toString(),
      dateLabel: newDriveDate.trim(),
      place: newDrivePlace.trim(),
      address: newDriveAddress.trim(),
      detail: 'Colecta externa · Sangre e inscripción CPH',
    };
    const updated = [drive, ...extraDrives].slice(0, 4);
    setExtraDrives(updated);
    try {
      localStorage.setItem('medula_comun_drives', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    setNewDrivePlace('');
    setNewDriveDate('');
    setNewDriveAddress('');
    setShowAddDrive(false);
  };

  // --- 3. Centros de Donación ---
  const [selectedProvince, setSelectedProvince] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  const filteredCenters = useMemo(() => {
    let list = DONATION_CENTRES.filter((c) => {
      const matchProv = selectedProvince === 'todos' || c.province === selectedProvince;
      const q = searchQuery.toLowerCase();
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
      return matchProv && matchQ;
    });

    if (userLocation) {
      list = [...list].sort((a, b) => {
        const dA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const dB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return dA - dB;
      });
    }

    return list.slice(0, 6);
  }, [selectedProvince, searchQuery, userLocation]);

  const [copiedShare, setCopiedShare] = useState(false);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Médula Común - argentina.gob.ar/donar-medula',
        text: 'Donar médula ósea en Argentina es seguro, por el brazo y salva vidas. Mirá los requisitos oficiales del INCUCAI para todes:',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-neutral-100 font-sans selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Enlaces accesibles para lectores de pantalla de personas ciegas */}
      <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-3 focus-within:left-3 focus-within:z-50 focus-within:flex focus-within:flex-col sm:focus-within:flex-row focus-within:gap-2">
        <button
          type="button"
          onClick={() => setIsAudioPlayerOpen(true)}
          className="px-5 py-3 bg-rose-600 text-white font-black rounded-xl shadow-2xl outline-none ring-4 ring-white text-sm flex items-center gap-2 cursor-pointer text-left"
        >
          <span>🔊 Escuchar la página en voz alta (Abrir lector ameno)</span>
        </button>
        <a
          href="#contenido-principal"
          className="px-5 py-3 bg-neutral-900 text-white font-black rounded-xl shadow-2xl outline-none ring-4 ring-white text-sm border border-white/20"
        >
          Saltar directamente al contenido principal
        </a>
      </div>

      {/* Reproductor de Audio Minimalista (Modal y barra discreta de estado) */}
      <AudioNarrator 
        isOpen={isAudioPlayerOpen} 
        onClose={() => setIsAudioPlayerOpen(false)} 
        onOpen={() => setIsAudioPlayerOpen(true)} 
      />

      {/* Resplandores bioluminiscentes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-rose-600/15 blur-[140px] pointer-events-none -z-10 rounded-full" aria-hidden="true" />
      <div className="absolute top-[900px] right-0 w-[500px] h-[400px] bg-indigo-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-rose-900/15 blur-[150px] pointer-events-none -z-10 rounded-full" aria-hidden="true" />

      {/* 1. Header con sello oficial INCUCAI y botón de Escuchar minimalista */}
      <header role="banner" className="sticky top-0 z-50 bg-[#090A0F]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-0 sm:h-18 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-rose-600/30 ring-1 ring-white/20 shrink-0" aria-hidden="true">
              <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-white text-base sm:text-xl tracking-tight leading-tight whitespace-nowrap">
                  Médula Común
                </span>
                <span className="hidden sm:inline-block text-xs bg-rose-500/15 text-rose-300 font-mono font-bold px-2 py-0.5 rounded border border-rose-500/30 shrink-0">
                  INCUCAI
                </span>
              </div>
              <span className="sm:hidden text-[11px] text-neutral-400 font-mono block truncate mt-0.5">
                INCUCAI · argentina.gob.ar
              </span>
              <span className="hidden sm:block text-xs text-neutral-400 font-mono tracking-wider mt-0.5">
                Datos oficiales: argentina.gob.ar/donar-medula
              </span>
            </div>
          </div>

          <nav aria-label="Navegación principal" className="flex items-center gap-1.5 sm:gap-3 text-sm shrink-0">
            <button
              type="button"
              onClick={() => setIsAudioPlayerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 hover:text-white transition-all font-bold text-xs sm:text-sm active:scale-95 shadow-sm cursor-pointer min-h-[36px] sm:min-h-[38px]"
              aria-label="Abrir lector de voz ameno para escuchar la página"
            >
              <Volume2 className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              <span>Escuchar</span>
            </button>
            <a
              href="https://www.argentina.gob.ar/donar-medula"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors font-medium text-xs sm:text-sm"
              aria-label="Sitio oficial argentina.gob.ar/donar-medula (se abre en pestaña nueva)"
            >
              <span>argentina.gob.ar</span>
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
            </a>
            <a
              href="#validador"
              className="hidden md:inline px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all font-semibold"
            >
              Test Exprés
            </a>
            <a
              href="#metodos"
              className="hidden md:inline px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all font-semibold"
            >
              Cómo se dona
            </a>
            <a
              href="#historias"
              className="hidden sm:inline px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all font-semibold"
            >
              Historias
            </a>
            <a
              href="#centros"
              className="hidden sm:inline px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all font-semibold"
            >
              Centros
            </a>
            <button
              onClick={handleShare}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-sm active:scale-95 text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
              aria-label={copiedShare ? "Enlace copiado al portapapeles" : "Compartir esta página de información sobre donación de médula"}
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" /> : <Share2 className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />}
              <span className="hidden sm:inline">{copiedShare ? 'Copiado' : 'Compartir'}</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="contenido-principal" role="main" tabIndex={-1} className="max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-28 md:pb-12 focus:outline-none">
        {/* 2. Hero con lenguaje inclusivo y letra agrandada */}
        <section aria-labelledby="hero-title" className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent p-4 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md overflow-hidden space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Badge con el corazón en el circulito */}
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl sm:rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-200 text-[11px] sm:text-sm font-semibold tracking-wide shadow-sm shadow-rose-950/40 max-w-full"
                role="status"
                aria-label="Registro Nacional de Donantes CPH bajo Ley 25.392"
              >
                <span className="w-5 h-5 rounded-full bg-rose-600 border border-rose-400 flex items-center justify-center shrink-0 shadow-sm shadow-rose-600/50" aria-hidden="true">
                  <Heart className="w-3 h-3 text-white fill-white animate-pulse" />
                </span>
                <span className="font-bold tracking-tight leading-snug">Registro Nacional de Donantes CPH · Ley 25.392</span>
              </div>

              <h1 id="hero-title" className="text-[1.75rem] sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] text-balance">
                Salvar a una persona. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-200">
                  La persona donante elige cómo donar.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl">
                Fuente oficial del INCUCAI (<strong>argentina.gob.ar/donar-medula</strong>). Para registrarte solo donás una unidad de sangre común. Las células madre se extraen luego en un 80% por el brazo, sin internación ni dolor en la columna. Todes podemos ser el match de alguien.
              </p>

              {/* 3 Métricas en grid optimizado para celular */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-1" role="region" aria-label="Métricas clave del registro oficial">
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm text-center sm:text-left">
                  <div className="text-lg sm:text-3xl lg:text-4xl font-black text-white tabular-nums tracking-tight whitespace-nowrap">18 - 40</div>
                  <div className="text-[11px] sm:text-sm text-neutral-300 font-medium mt-1 leading-tight">Años (hasta 60)</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm text-center sm:text-left">
                  <div className="text-lg sm:text-3xl lg:text-4xl font-black text-rose-400 tabular-nums tracking-tight whitespace-nowrap">80%</div>
                  <div className="text-[11px] sm:text-sm text-neutral-300 font-medium mt-1 leading-tight">Por el brazo</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm text-center sm:text-left">
                  <div className="text-lg sm:text-3xl lg:text-4xl font-black text-emerald-400 tabular-nums tracking-tight whitespace-nowrap">WMDA</div>
                  <div className="text-[11px] sm:text-sm text-neutral-300 font-medium mt-1 leading-tight">Red Mundial</div>
                </div>
              </div>

              {/* Botones de acción adaptados para celular y lectores de pantalla */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#validador"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
                  aria-label="Ir al test exprés de requisitos oficiales de donación"
                >
                  <Zap className="w-5 h-5 fill-white" aria-hidden="true" />
                  <span>Test de Requisitos Oficiales</span>
                </a>
                <a
                  href="#centros"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-100 hover:text-white font-bold text-sm sm:text-base transition-all cursor-pointer min-h-[48px] active:scale-95"
                  aria-label="Ir al mapa y lista de centros de hemoterapia habilitados en Argentina"
                >
                  <MapPin className="w-5 h-5 text-rose-400" aria-hidden="true" />
                  <span>Centros habilitados</span>
                </a>
              </div>
            </div>

            {/* Foto Real */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-[#090A0F]">
                <div className="relative">
                  <img
                    src={heroDonorWarmthImg}
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero_donor_warmth_1792077092068.jpg';
                    }}
                    alt="Persona voluntaria sonriendo en un sillón reclinable de hemoterapia mientras dona células madre por aféresis de forma cómoda y ambulatoria"
                    className="w-full aspect-[16/10] sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/20 to-transparent" aria-hidden="true" />
                </div>

                <div className="relative sm:absolute sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 sm:rounded-xl bg-[#090A0F]/95 sm:bg-[#090A0F]/90 backdrop-blur-md border-t sm:border border-white/10 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                    <FileCheck2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Dato Oficial INCUCAI</span>
                  </div>
                  <p className="text-neutral-100 leading-snug">
                    “Solo el 25% de les pacientes encuentra une donante compatible en su grupo familiar. El 75% restante depende de donantes voluntaries inscriptes en la red.”
                  </p>
                  <p className="text-neutral-400 text-[11px] sm:text-xs mt-1 font-mono">Fuente: argentina.gob.ar/donar-medula</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fila inferior del Hero: Prioridad 0- + Cuadradito de Jornadas de Donación */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            {/* Tarjeta de Prioridad para el Grupo Sanguíneo 0- */}
            <div 
              className="rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/60 via-neutral-900/80 to-black/80 p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 shadow-xl relative overflow-hidden"
              role="region"
              aria-label="Aviso de prioridad para donantes del grupo sanguíneo 0 Negativo"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-400/60 flex items-center justify-center shrink-0 text-rose-300 shadow-md shadow-rose-600/30" aria-hidden="true">
                <Droplets className="w-6 h-6 fill-rose-500 text-white animate-bounce" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-rose-300 bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 rounded">
                    PRIORIDAD SANITARIA EN ARGENTINA
                  </span>
                  <span className="text-xs font-mono text-neutral-300">Menos del 7% de la población</span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                  ¿Pertenecés al grupo sanguíneo 0 Negativo (0-)?
                </h2>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  Sos <strong className="text-white">donante universal de glóbulos rojos</strong>: tu sangre es la única compatible con cualquier persona en situaciones de emergencia crítica o shock en guardias médicas. Al donar tu unidad de sangre para ingresar al Registro de Médula Ósea (CPH), tu aporte salva vidas en el acto mientras quedás disponible en el registro mundial.
                </p>
              </div>
            </div>

            {/* Cuadradito de Jornadas de Donación / Colectas Externas */}
            <div
              className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-neutral-900/80 to-black/80 p-4 sm:p-6 flex flex-col justify-between gap-3.5 shadow-xl relative overflow-hidden"
              role="region"
              aria-label="Dónde hacer jornadas de donación y colectas externas"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300 shadow-md shadow-amber-600/20" aria-hidden="true">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/40 px-2.5 py-0.5 rounded">
                        JORNADAS DE DONACIÓN
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowAddDrive((prev) => !prev)}
                        className="text-xs font-bold text-amber-300 hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {showAddDrive ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{showAddDrive ? 'Cerrar' : 'Sumar jornada'}</span>
                      </button>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-white leading-snug mt-1">
                      ¿Dónde hacer jornadas de donación?
                    </h2>
                  </div>
                </div>

                {/* Jornada destacada: Mañana en Colegio Monseñor Alberti */}
                <div className="p-3 rounded-xl bg-white/[0.05] border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Mañana · Mar 24/11
                      </span>
                      <span className="text-xs font-bold text-white">Colegio Monseñor Alberti</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Av. 19 Nº 1485 (e/ 62 y 63), La Plata · Colecta de sangre e inscripción CPH
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Colegio+Monsenor+Alberti+Av+19+1485+La+Plata"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ver ubicación del Colegio Monseñor Alberti en Google Maps"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs shrink-0 transition-all active:scale-95"
                  >
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ver mapa</span>
                  </a>
                </div>

                {/* Jornadas extra agregadas por la comunidad */}
                {extraDrives.map((d) => (
                  <div key={d.id} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-amber-300 mr-2">{d.dateLabel}</span>
                      <strong className="text-white">{d.place}</strong>
                      <span className="text-neutral-400 block truncate">{d.address}</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.place} ${d.address}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-300 hover:text-white font-bold shrink-0 underline"
                    >
                      Mapa
                    </a>
                  </div>
                ))}

                {/* Formulario rápido para sumar otra jornada */}
                {showAddDrive && (
                  <form onSubmit={handleAddDrive} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={newDrivePlace}
                        onChange={(e) => setNewDrivePlace(e.target.value)}
                        placeholder="Lugar (ej: Club Atenas)"
                        aria-label="Lugar de la jornada de donación"
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <input
                        type="text"
                        required
                        value={newDriveDate}
                        onChange={(e) => setNewDriveDate(e.target.value)}
                        placeholder="Fecha y hora (ej: Vie 27/11 9hs)"
                        aria-label="Fecha y horario de la jornada"
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newDriveAddress}
                        onChange={(e) => setNewDriveAddress(e.target.value)}
                        placeholder="Dirección y ciudad"
                        aria-label="Dirección y ciudad de la jornada"
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs cursor-pointer"
                      >
                        Publicar
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Las colectas externas se hacen en <strong className="text-white">escuelas, facultades, clubes y plazas</strong>. Para ver fechas o armar una en tu institución, llamá al <strong className="text-white">0800 555 4628</strong> (INCUCAI) o consultá el mapa de{' '}
                <a href="#centros" className="text-amber-300 hover:underline font-semibold">
                  centros habilitados
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Requisitos Oficiales INCUCAI con lenguaje inclusivo, letra grande y soporte para lectores de pantalla */}
        <section id="validador" aria-labelledby="validador-title" className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-8 lg:p-10 relative space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
            <div>
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <Dna className="w-4 h-4" aria-hidden="true" />
                <span>Requisitos Oficiales INCUCAI · Ley 25.392</span>
              </span>
              <h2 id="validador-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                ¿Cumplís con los requisitos para anotarte?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Respondé 4 preguntas básicas. Tu respuesta es anónima y no se guardan datos.
              </p>
            </div>

            {isValidatorComplete && (
              <button
                onClick={resetValidator}
                className="text-xs sm:text-sm text-neutral-300 hover:text-white flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer min-h-[44px] font-semibold active:scale-95"
                aria-label="Reiniciar todas las respuestas del test de requisitos"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" aria-hidden="true" />
                <span>Reiniciar test</span>
              </button>
            )}
          </div>

          {/* Región accesible anunciadora para lectores de pantalla (TalkBack / VoiceOver) */}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {!isValidatorComplete
              ? `Progreso del test: ${[ageOk, weightOk, tattooOk, healthOk].filter(v => v !== null).length} de 4 preguntas respondidas.`
              : isEligible
              ? `¡Resultado listo! Cumplís con los requisitos oficiales de INCUCAI para ser donante de médula ósea.${isBloodZeroNeg ? ' Además tenés prioridad sanitaria urgente por ser grupo 0 Negativo.' : ''}`
              : 'Resultado listo: Tenés un requisito temporal o médico pendiente.'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Req 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-white leading-snug">1. Tener entre 18 y 40 años</p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">Permanecés active en el registro hasta los 60 años.</p>
              </div>
              <div className="grid grid-cols-2 sm:flex gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setAgeOk(true)}
                  aria-pressed={ageOk === true}
                  aria-label="Pregunta 1: Sí tengo entre 18 y 40 años"
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] sm:min-w-[56px] ${
                    ageOk === true
                      ? 'bg-emerald-500 text-neutral-950 font-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setAgeOk(false)}
                  aria-pressed={ageOk === false}
                  aria-label="Pregunta 1: No tengo entre 18 y 40 años"
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] sm:min-w-[56px] ${
                    ageOk === false
                      ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Req 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-white leading-snug">2. Pesar 50 kg o más</p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">Requisito médico para la muestra de 450 ml de sangre.</p>
              </div>
              <div className="grid grid-cols-2 sm:flex gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setWeightOk(true)}
                  aria-pressed={weightOk === true}
                  aria-label="Pregunta 2: Sí peso 50 kilos o más"
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] sm:min-w-[56px] ${
                    weightOk === true
                      ? 'bg-emerald-500 text-neutral-950 font-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setWeightOk(false)}
                  aria-pressed={weightOk === false}
                  aria-label="Pregunta 2: No peso 50 kilos o más"
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] sm:min-w-[56px] ${
                    weightOk === false
                      ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Req 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-white leading-snug">3. Tatuajes o cirugías hace +12 meses</p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">Período de ventana oficial de seguridad virológica.</p>
              </div>
              <div className="grid grid-cols-2 sm:flex gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setTattooOk(true)}
                  aria-pressed={tattooOk === true}
                  aria-label="Pregunta 3: Sí pasaron más de 12 meses desde mi último tatuaje o cirugía"
                  className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] whitespace-nowrap ${
                    tattooOk === true
                      ? 'bg-emerald-500 text-neutral-950 font-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  Sí (+1 año)
                </button>
                <button
                  onClick={() => setTattooOk(false)}
                  aria-pressed={tattooOk === false}
                  aria-label="Pregunta 3: No, pasaron menos de 12 meses desde mi último tatuaje o cirugía"
                  className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] whitespace-nowrap ${
                    tattooOk === false
                      ? 'bg-amber-500 text-neutral-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  No (-1 año)
                </button>
              </div>
            </div>

            {/* Req 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-white leading-snug">4. Buena salud general</p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">Sin afecciones cardíacas, hepáticas ni infecciones en sangre.</p>
              </div>
              <div className="grid grid-cols-2 sm:flex gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setHealthOk(true)}
                  aria-pressed={healthOk === true}
                  aria-label="Pregunta 4: Sí gozo de buena salud general"
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] sm:min-w-[56px] ${
                    healthOk === true
                      ? 'bg-emerald-500 text-neutral-950 font-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setHealthOk(false)}
                  aria-pressed={healthOk === false}
                  aria-label="Pregunta 4: No gozo de buena salud general"
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] sm:min-w-[56px] ${
                    healthOk === false
                      ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/20 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Pregunta 5: Prioridad especial para grupo sanguíneo 0- */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                <Droplets className="w-5 h-5 fill-rose-500 text-white" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-rose-400 block uppercase">
                  Pregunta Adicional · Prioridad Comunitaria
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                  5. ¿Tenés grupo sanguíneo 0 Negativo (0-)?
                </p>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Si sos 0-, ¡tu muestra inicial de sangre tiene prioridad de guardia inmediata por ser donante universal!
                </p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsBloodZeroNeg(true)}
                aria-pressed={isBloodZeroNeg === true}
                aria-label="Pregunta 5: Sí soy grupo sanguíneo 0 Negativo"
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                  isBloodZeroNeg === true
                    ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-600/30 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                }`}
              >
                Sí (Soy 0-)
              </button>
              <button
                onClick={() => setIsBloodZeroNeg(false)}
                aria-pressed={isBloodZeroNeg === false}
                aria-label="Pregunta 5: Tengo otro grupo sanguíneo o no lo sé"
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer min-h-[44px] ${
                  isBloodZeroNeg === false
                    ? 'bg-neutral-700 text-white font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400'
                }`}
              >
                Otro / No sé
              </button>
            </div>
          </div>

          {/* Resultado de la validación con letra agrandada */}
          {isValidatorComplete && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isEligible
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              }`}
              role="region"
              aria-label="Resultado del test de elegibilidad"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isEligible ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/30' : 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/30'
                  }`}
                  aria-hidden="true"
                >
                  {isEligible ? <CheckCircle2 className="w-6 h-6 stroke-[2.5]" /> : <XCircle className="w-6 h-6 stroke-[2.5]" />}
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-lg sm:text-xl text-white">
                    {isEligible ? '¡Estás habilitado según la normativa de INCUCAI!' : 'Requisito temporal o médico pendiente.'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-xl">
                    {isEligible
                      ? 'Acercate a cualquier Centro de Donación de Sangre adherido para firmar tu consentimiento y donar una unidad de sangre.'
                      : tattooOk === false
                      ? 'Si te tatuaste recientemente, solo debés esperar a que se cumplan los 12 meses.'
                      : 'Podés colaborar difundiendo la red o como donante voluntarie habitual de sangre.'}
                  </p>

                  {/* Aviso especial si seleccionó 0- */}
                  {isEligible && isBloodZeroNeg === true && (
                    <div className="mt-2.5 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs sm:text-sm text-rose-100 flex items-center gap-2 font-medium">
                      <Droplets className="w-4 h-4 text-rose-300 fill-rose-400 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="text-white">¡Aviso de prioridad!:</strong> Tu grupo 0- abastece urgencias críticas. Al donar tu unidad de sangre para el registro, salvás hasta 3 vidas hoy mismo.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {isEligible && (
                <a
                  href="#centros"
                  className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm sm:text-base shrink-0 transition-transform active:scale-95 shadow-lg shadow-emerald-500/25 min-h-[48px]"
                  aria-label="Ver centros habilitados para inscribirte como donante"
                >
                  Ver centros de inscripción →
                </a>
              )}
            </div>
          )}
        </section>

        {/* Checklist oficial de la persona donante antes de ir (subido justo después del test) */}
        <section aria-labelledby="checklist-title" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-neutral-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h4 id="checklist-title" className="font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
              <span>Antes de donar sangre e inscribirte:</span>
            </h4>

            <div className="text-neutral-400 font-mono text-xs flex items-center gap-2">
              <span>INCUCAI: <strong className="text-white">0800 555 4628</strong></span>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.argentina.gob.ar/donar-medula"
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                aria-label="Sitio oficial argentina.gob.ar/donar-medula (abre en ventana nueva)"
              >
                <span>argentina.gob.ar</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              ☕ <strong>Desayuno sin lácteos:</strong> té, café, mate, frutas o tostadas con mermelada.
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              🪪 <strong>DNI obligatorio:</strong> documento físico con foto para validar identidad.
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              ⚖️ <strong>Pesar +50 kg:</strong> peso mínimo para donar la unidad de sangre inicial.
            </div>
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200">
              🩸 <strong>¿Sos 0 Negativo (0-)?</strong> ¡Tenés prioridad urgente en cualquier guardia del país!
            </div>
          </div>
        </section>

        {/* 4. Los dos métodos oficiales con letra grande */}
        <section id="metodos" aria-labelledby="metodos-title" className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-rose-400">
                Información Oficial argentina.gob.ar/donar-medula
              </span>
              <h3 id="metodos-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                Los dos métodos de donación de CPH
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                La persona donante recibe asesoramiento médico completo y <strong>puede elegir el método que prefiera</strong>.
              </p>
            </div>

            {/* Toggle con botones táctiles adaptados para celular */}
            <div className="grid grid-cols-2 sm:flex p-1 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm font-semibold w-full sm:w-auto" role="tablist" aria-label="Selector de método de donación">
              <button
                role="tab"
                aria-selected={selectedMethod === 'aferesis'}
                onClick={() => setSelectedMethod('aferesis')}
                className={`px-2.5 sm:px-4 py-2.5 rounded-lg transition-all cursor-pointer text-center min-h-[46px] flex items-center justify-center text-xs sm:text-base font-bold leading-tight ${
                  selectedMethod === 'aferesis' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span className="sm:hidden">Aféresis (80%)</span>
                <span className="hidden sm:inline">Aféresis (80% de casos)</span>
              </button>
              <button
                role="tab"
                aria-selected={selectedMethod === 'puncion'}
                onClick={() => setSelectedMethod('puncion')}
                className={`px-2.5 sm:px-4 py-2.5 rounded-lg transition-all cursor-pointer text-center min-h-[46px] flex items-center justify-center text-xs sm:text-base font-bold leading-tight ${
                  selectedMethod === 'puncion' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span className="sm:hidden">Punción (20%)</span>
                <span className="hidden sm:inline">Punción (20% de casos)</span>
              </button>
            </div>
          </div>

          {selectedMethod === 'aferesis' ? (
            <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.03] border border-rose-500/30 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                    Método Ambulatorio
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300">Por sangre periférica</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">1. Por Aféresis (Sangre en el Brazo)</h4>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  Se aplican 5 días previos unas inyecciones subcutáneas para estimular la salida de las CPH (células madre) de la médula hacia la sangre. El día de la donación, te sentás en un sillón reclinable 3 a 4 horas: una máquina separa las células madre de un brazo y te devuelve el resto de la sangre por el otro.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300 pt-1 font-medium">
                  <span>✓ Sin internación</span>
                  <span aria-hidden="true">·</span>
                  <span>✓ Sin anestesia general</span>
                  <span aria-hidden="true">·</span>
                  <span>✓ Retomás tu rutina al toque</span>
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-mono text-rose-400 block font-bold">REGLA OFICIAL CLAVE</span>
                <p className="text-xs sm:text-sm text-neutral-200 leading-snug">
                  La médula ósea <strong>NO es la médula espinal</strong>. No se toca la columna ni los nervios. Es el tejido esponjoso que fabrica sangre dentro de los huesos.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.03] border border-neutral-700 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded">
                    Con Anestesia General
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300">En quirófano</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">2. Por Punción de Cresta Ilíaca</h4>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  Se extraen las células madre directamente de la parte posterior de los huesos de la cadera (crestas ilíacas, <strong>nunca de la columna vertebral</strong>). Se realiza bajo anestesia general: no sentís nada durante el procedimiento y se indica una noche de observación preventiva.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300 pt-1 font-medium">
                  <span>✓ Anestesia total (cero dolor durante el acto)</span>
                  <span aria-hidden="true">·</span>
                  <span>✓ Molestia leve 48 hs (como golpe deportivo)</span>
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-mono text-amber-400 block font-bold">REGENERACIÓN TOTAL</span>
                <p className="text-xs sm:text-sm text-neutral-200 leading-snug">
                  Tu organismo regenera el 100% de las células extraídas en menos de 3 semanas gracias a su capacidad autorrenovable natural.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 5. Historias de Vida - Testimonios de Donantes y Receptores */}
        <LifeStories />

        {/* 6. Centros Habilitados en Argentina - Mapa con Google Maps Embed */}
        <section id="centros" aria-label="Localizador de centros de donación">
          <HospitalMapLocator
            userLocation={userLocation}
            onGetLocation={handleGetLocation}
          />
        </section>
      </main>

      {/* Footer Minimal */}
      <footer role="contentinfo" className="border-t border-white/5 py-8 text-center text-xs sm:text-sm text-neutral-400 pb-24 md:pb-8">
        <p>© {new Date().getFullYear()} Médula Común · Información basada en argentina.gob.ar/donar-medula · INCUCAI · Ley 25.392</p>
      </footer>

      {/* Barra de navegación inferior fija para celular (Thumb navigation) con soporte para lectores de pantalla */}
      <nav aria-label="Barra de acceso rápido para celular" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090A0F]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto text-center">
          <button
            type="button"
            onClick={() => setIsAudioPlayerOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-rose-300 hover:text-white active:bg-rose-500/20 transition-all cursor-pointer min-h-[48px]"
            aria-label="Abrir lector de voz ameno para escuchar la página"
          >
            <Volume2 className="w-5 h-5 text-rose-400 mb-1" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-none">Escuchar</span>
          </button>
          <a
            href="#validador"
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-neutral-300 hover:text-white active:bg-white/10 transition-all cursor-pointer min-h-[48px]"
            aria-label="Ir a la sección de test exprés de requisitos"
          >
            <Zap className="w-5 h-5 text-amber-400 mb-1" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-none">Test</span>
          </a>
          <a
            href="#metodos"
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-neutral-300 hover:text-white active:bg-white/10 transition-all cursor-pointer min-h-[48px]"
            aria-label="Ir a la sección sobre cómo se dona médula ósea"
          >
            <Syringe className="w-5 h-5 text-indigo-400 mb-1" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-none">Métodos</span>
          </a>
          <a
            href="#historias"
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-neutral-300 hover:text-white active:bg-white/10 transition-all cursor-pointer min-h-[48px]"
            aria-label="Ir a testimonios e historias de vida de donantes y receptores"
          >
            <HeartHandshake className="w-5 h-5 text-rose-400 mb-1" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-none">Historias</span>
          </a>
          <a
            href="#centros"
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-neutral-300 hover:text-white active:bg-white/10 transition-all cursor-pointer min-h-[48px]"
            aria-label="Ir al mapa y lista de centros de hemoterapia habilitados"
          >
            <MapPin className="w-5 h-5 text-emerald-400 mb-1" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-none">Centros</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
