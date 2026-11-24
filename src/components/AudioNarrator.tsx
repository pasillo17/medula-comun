import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  Sparkles, 
  X, 
  Heart, 
  Check, 
  UserCheck, 
  ShieldCheck, 
  Headphones,
  Maximize2
} from 'lucide-react';

interface AudioNarratorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({ isOpen, onClose, onOpen }) => {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentSectionTitle, setCurrentSectionTitle] = useState<string>('');
  const [rate, setRate] = useState<number>(0.95); // Velocidad ligeramente más pausada y cálida
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Inicializar síntesis de voz y clasificar voces en español
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadAndSortVoices = () => {
        if (!synthRef.current) return;
        const allVoices = synthRef.current.getVoices();
        
        // Filtrar voces en idioma español
        const spanishVoices = allVoices.filter(
          (v) => v.lang.startsWith('es') || v.lang.toLowerCase().includes('es-') || v.lang.toLowerCase().includes('es_')
        );

        // Orden de preferencia para voces más amenas, naturales y cálidas
        const preferredKeywords = [
          'natural',
          'neural',
          'google español',
          'paulina',
          'monica',
          'mónica',
          'luciana',
          'sabina',
          'francisca',
          'soledad',
          'sofia',
          'paloma',
          'elena',
          'jorge',
          'diego'
        ];

        const sorted = [...spanishVoices].sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();

          const aPref = preferredKeywords.some((k) => aName.includes(k));
          const bPref = preferredKeywords.some((k) => bName.includes(k));

          if (aPref && !bPref) return -1;
          if (!aPref && bPref) return 1;

          // Si ambas son preferidas o no, priorizar es-AR o es-419
          const aIsAr = a.lang === 'es-AR' || a.lang === 'es_AR';
          const bIsAr = b.lang === 'es-AR' || b.lang === 'es_AR';
          if (aIsAr && !bIsAr) return -1;
          if (!aIsAr && bIsAr) return 1;

          return a.name.localeCompare(b.name);
        });

        const finalVoices = sorted.length > 0 ? sorted : allVoices;
        setAvailableVoices(finalVoices);

        // Seleccionar la mejor voz por defecto si no hay una elegida
        if (finalVoices.length > 0 && !selectedVoiceURI) {
          setSelectedVoiceURI(finalVoices[0].voiceURI);
        }
      };

      loadAndSortVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadAndSortVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const activeVoice = useMemo(() => {
    return availableVoices.find((v) => v.voiceURI === selectedVoiceURI) || availableVoices[0] || null;
  }, [availableVoices, selectedVoiceURI]);

  // Manejador de teclado para cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const speakText = (title: string, textToRead: string) => {
    if (!synthRef.current || !isSupported) return;

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    if (activeVoice) {
      utterance.voice = activeVoice;
    }
    utterance.lang = activeVoice ? activeVoice.lang : 'es-AR';
    utterance.rate = rate;
    utterance.pitch = 1.03; // Tono sutilmente más cálido y luminoso

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentSectionTitle(title);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSectionTitle('');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSectionTitle('');
    };

    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!synthRef.current) return;
    if (isPlaying && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    } else if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSectionTitle('');
  };

  const changeRate = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && currentUtteranceRef.current && synthRef.current) {
      const text = currentUtteranceRef.current.text;
      const title = currentSectionTitle;
      speakText(title, text);
    }
  };

  // Guiones con redacción amena, afectuosa, clara e inclusiva
  const narrateFullSummary = () => {
    const script = `
      Hola. Qué alegría y qué lindo tenerte acá en Médula Común.
      Te cuento con toda tranquilidad y cariño lo más importante sobre cómo donar médula ósea en Argentina, con información oficial del INCUCAI y bajo la Ley 25.392.
      
      Primero: Salvar a una persona. La persona donante siempre elige con total libertad cómo donar. Para registrarte en la red, no tenés que hacer ningún trámite difícil: solo te acercás a donar una bolsita común de sangre a cualquier centro de hemoterapia.
      
      Segundo: Por qué es tan valioso. El 75 por ciento de las personas que necesitan un trasplante para seguir viviendo no tienen un familiar compatible genéticamente, y dependen de la generosidad de personas voluntarias como vos en todo el país.
      
      Tercero: Los requisitos oficiales. Tener entre 18 y 40 años al momento de anotarte, pesar al menos 50 kilos y gozar de buena salud. Si tenés tatuajes o piercings, con esperar 12 meses ya podés anotarte tranquilamente. Una vez inscripto o inscripta, quedás active en el registro hasta los 60 años.
      
      Cuarto: Si tu grupo sanguíneo es cero negativo, sos donante universal y tu sangre tiene prioridad de guardia inmediata en cualquier hospital.
      
      Quinto: Si algún día salís compatible con una persona enferma, en el 80 por ciento de los casos la donación se hace por aféresis, es decir, por el brazo, sentade en un sillón cómodo por unas horas. No hay internación, no se toca la columna vertebral ni la médula espinal, y ese mismo día volvés a tu casa a hacer vida normal. Tus células se regeneran solitas y completas en tres semanas.
      
      Si querés consultar centros cercanos o llamar gratis al INCUCAI, podés comunicarte al 0800 555 4628.
      Muchas gracias por escuchar y por tu tiempo tan valioso.
    `;
    speakText('Resumen Ameno Completo', script);
  };

  const narrateRequirements = () => {
    const script = `
      Te cuento los cuatro requisitos oficiales con total simpleza:
      Número 1: La edad. Tener entre 18 y 40 años cumplidos al anotarte. Permanecés en el registro hasta los 60 años.
      Número 2: El peso corporal. Pesar al menos 50 kilos para que la donación de sangre inicial sea segura para tu salud.
      Número 3: Tatuajes y cirugías. Dejar pasar 12 meses desde el último procedimiento.
      Número 4: Buen estado general de salud.
      Y un recordatorio especial: las personas de grupo cero negativo tienen prioridad solidaria en todos los bancos de sangre.
    `;
    speakText('Requisitos Oficiales INCUCAI', script);
  };

  const narrateMethods = () => {
    const script = `
      Te contamos cómo se dona para quitarte cualquier miedo o duda:
      La médula ósea no es la médula espinal. No se tocan nervios ni la columna vertebral.
      En el 80 por ciento de las oportunidades se dona por aféresis: una extracción en el brazo sentade en un sillón, escuchando música o mirando una película. Es ambulatorio y te vas a tu casa en el día.
      En el otro 20 por ciento es por punción en la cadera con anestesia, por lo que no sentís nada durante el proceso.
      Tu cuerpo fabrica células madre nuevas en menos de tres semanas.
    `;
    speakText('Cómo se dona (Sin dolor)', script);
  };

  const narrateStories = () => {
    const script = `
      Te compartimos historias reales que nos llenan el corazón:
      Mateo, donante voluntario por aféresis: Me anoté al donar sangre y tres años después me llamaron del INCUCAI. Estuve una mañana en un sillón reclinable mirando una serie y le di una oportunidad de vivir a una nena.
      Valentina, quien superó una leucemia a los 17 años: Ninguno de mis hermanos era compatible. Un voluntario anónimo me regaló mis 20 años. Hoy estudio abogacía y entreno remo.
      Carlos, paciente en tratamiento tras recibir médula por leucemia linfoblástica: Después de meses de quimio y aislamiento, apareció un donante compatible al 100 por ciento. Sigo con controles semanales y mi médula nueva ya fabrica glóbulos blancos y plaquetas.
      Y Sofía, en seguimiento post trasplante por leucemia mieloide: La infusión de células madre fue como una transfusión tranquila y sin dolor. Hoy recupero fuerzas en casa con mi familia gracias a alguien que se anotó sin conocerme.
    `;
    speakText('Historias de Vida y Esperanza', script);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* 1. Barra Flotante Minimalista cuando el panel está cerrado pero hay audio activo */}
      {!isOpen && isPlaying && (
        <aside
          aria-label="Controles de audio en reproducción"
          className="fixed bottom-20 md:bottom-5 right-3 left-3 md:left-auto md:right-5 z-50 max-w-md bg-[#0e1017]/95 border border-rose-500/40 backdrop-blur-xl rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 text-neutral-100 animate-in fade-in slide-in-from-bottom-3 duration-300 ring-1 ring-white/10"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 flex items-center justify-center shrink-0">
              <Volume2 className="w-4 h-4 animate-pulse text-rose-400" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>{isPaused ? 'En Pausa' : 'Escuchando'}</span>
              </div>
              <div className="text-xs font-bold text-white truncate max-w-[170px] sm:max-w-[220px]">
                {currentSectionTitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handlePauseResume}
              aria-label={isPaused ? "Reanudar audio" : "Pausar audio"}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
            </button>
            <button
              onClick={handleStop}
              aria-label="Detener narración"
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 text-neutral-300 hover:text-white transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={onOpen}
              aria-label="Abrir panel completo de audio"
              className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Opciones</span>
            </button>
          </div>
        </aside>
      )}

      {/* 2. Modal Minimalista y Elegante (se abre desde el botón Escuchar de arriba o abajo) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audio-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div 
            className="w-full max-w-lg bg-[#0d0f17] border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden text-neutral-100 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Resplandor decorativo sutil */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Cabecera del reproductor */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-600/25 border border-rose-500/40 text-rose-300 flex items-center justify-center shadow-inner">
                  <Headphones className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h3 id="audio-modal-title" className="text-base sm:text-lg font-black text-white leading-tight">
                    Lector de Voz Ameno
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Diseñado especialmente para personas ciegas o con baja visión
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Cerrar reproductor de audio"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selector de Voz Agradable */}
            {availableVoices.length > 1 && (
              <div className="space-y-1.5 bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                <label htmlFor="voice-select" className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>Elegí la voz que más te guste:</span>
                  </span>
                  <span className="text-[11px] text-rose-300 font-mono">
                    {availableVoices.length} disponibles
                  </span>
                </label>
                <select
                  id="voice-select"
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="w-full bg-[#151824] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-neutral-200 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  {availableVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI} className="bg-[#151824] text-neutral-200">
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Estado de reproducción en vivo */}
            {isPlaying && (
              <div className="flex items-center justify-between gap-2 text-xs font-bold bg-rose-500/15 border border-rose-500/30 text-rose-200 px-3.5 py-2 rounded-xl animate-pulse">
                <div className="flex items-center gap-2 truncate">
                  <Volume2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="truncate">Locución: {currentSectionTitle} {isPaused ? '(Pausada)' : ''}</span>
                </div>
                <span className="text-[10px] bg-rose-600 px-2 py-0.5 rounded text-white shrink-0">En vivo</span>
              </div>
            )}

            {/* Botón Principal: Resumen Completo Cálido */}
            <div className="space-y-2">
              <button
                onClick={isPlaying ? handlePauseResume : narrateFullSummary}
                aria-label={
                  isPlaying
                    ? (isPaused ? "Reanudar resumen en voz alta" : "Pausar resumen en voz alta")
                    : "Escuchar resumen completo ameno de 3 minutos"
                }
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-sm sm:text-base shadow-xl shadow-rose-600/30 transition-all active:scale-[0.98] cursor-pointer min-h-[50px]"
              >
                {isPlaying ? (
                  isPaused ? (
                    <>
                      <Play className="w-5 h-5 fill-white" />
                      <span>Reanudar Escucha</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 fill-white" />
                      <span>Pausar Locución</span>
                    </>
                  )
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    <span>Escuchar Resumen Completo (Ameno)</span>
                  </>
                )}
              </button>

              {isPlaying && (
                <button
                  onClick={handleStop}
                  aria-label="Detener completamente la voz"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer min-h-[38px]"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Detener Narración</span>
                </button>
              )}
            </div>

            {/* Temas rápidos individuales */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                O escuchar por tema específico:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={narrateRequirements}
                  aria-label="Escuchar en voz alta los requisitos oficiales"
                  className="flex items-center sm:flex-col sm:items-start justify-start gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 text-left transition-all cursor-pointer min-h-[44px]"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Requisitos</div>
                    <div className="text-[10px] text-neutral-400">18-40 años, +50kg</div>
                  </div>
                </button>

                <button
                  onClick={narrateMethods}
                  aria-label="Escuchar cómo se dona por el brazo sin dolor"
                  className="flex items-center sm:flex-col sm:items-start justify-start gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 text-left transition-all cursor-pointer min-h-[44px]"
                >
                  <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Métodos</div>
                    <div className="text-[10px] text-neutral-400">Por el brazo 80%</div>
                  </div>
                </button>

                <button
                  onClick={narrateStories}
                  aria-label="Escuchar testimonios e historias de vida"
                  className="flex items-center sm:flex-col sm:items-start justify-start gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 text-left transition-all cursor-pointer min-h-[44px]"
                >
                  <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Historias</div>
                    <div className="text-[10px] text-neutral-400">Testimonios reales</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Selector de velocidad amena */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <span className="text-neutral-400 font-medium">Ritmo de lectura:</span>
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10" role="group" aria-label="Velocidad de voz">
                <button
                  onClick={() => changeRate(0.85)}
                  aria-pressed={rate === 0.85}
                  aria-label="Velocidad pausada"
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    rate === 0.85 ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Pausada
                </button>
                <button
                  onClick={() => changeRate(0.95)}
                  aria-pressed={rate === 0.95}
                  aria-label="Velocidad amena normal"
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    rate === 0.95 ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Cálida (1x)
                </button>
                <button
                  onClick={() => changeRate(1.15)}
                  aria-pressed={rate === 1.15}
                  aria-label="Velocidad más ágil"
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    rate === 1.15 ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Ágil
                </button>
              </div>
            </div>

            {/* Pie de modal */}
            <div className="text-center pt-1">
              <button
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white underline cursor-pointer py-1"
              >
                Ocultar y continuar navegando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
