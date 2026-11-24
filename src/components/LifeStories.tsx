import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Quote, 
  UserCheck, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight,
  HeartHandshake
} from 'lucide-react';

import heroDonorWarmthImg from '../assets/images/hero_donor_warmth_1792077092068.jpg';
import recipientGratitudeImg from '../assets/images/recipient_gratitude_1792077092380.jpg';
import humanFraternityHandsImg from '../assets/images/human_fraternity_hands_1792077092498.jpg';
import donorProcessComfortImg from '../assets/images/donor_process_comfort_1792077093693.jpg';
import leukemiaPatientCarlosImg from '../assets/images/leukemia_patient_carlos_1795463096744.jpg';
import leukemiaPatientSofiaImg from '../assets/images/leukemia_patient_sofia_1795463098210.jpg';

interface Story {
  id: string;
  name: string;
  age?: number;
  location: string;
  roleType: 'donante' | 'receptore' | 'medicina';
  roleLabel: string;
  badgeColor: string;
  headline: string;
  quote: string;
  highlightFact: string;
  image: string;
  fallbackImage: string;
}

export const LifeStories: React.FC = () => {
  const [filterRole, setFilterRole] = useState<'todos' | 'donante' | 'receptore'>('todos');

  const stories: Story[] = [
    {
      id: 'mateo',
      name: 'Mateo Benítez',
      age: 25,
      location: 'Caballito, CABA',
      roleType: 'donante',
      roleLabel: 'Donante por aféresis de sangre',
      badgeColor: 'rose',
      headline: '“Estuve una mañana en un sillón y le di una oportunidad de vivir a una nena en Francia”',
      quote: 'Me anoté a los 22 cuando fui a donar sangre al Garrahan. Tres años después me llamaron del INCUCAI: había compatibilidad 10/10 con une paciente en el exterior. Doné un martes en un sillón reclinable mientras miraba una serie en la tablet con un té y galletitas. Al mediodía volví a almorzar a mi casa. Saber que alguien vive gracias a tus células madre te cambia la vida para siempre.',
      highlightFact: 'Donación ambulatoria por sangre periférica · Regeneración celular en 14 días',
      image: heroDonorWarmthImg,
      fallbackImage: './images/hero_donor_warmth_1792077092068.jpg'
    },
    {
      id: 'valentina',
      name: 'Valentina Rossi',
      age: 20,
      location: 'Rosario, Santa Fe',
      roleType: 'receptore',
      roleLabel: 'Receptora recuperada · Leucemia',
      badgeColor: 'emerald',
      headline: '“En mi familia nadie era compatible. Un voluntario anónimo me regaló mis 20 años”',
      quote: 'A los 17 me diagnosticaron leucemia y mis hermanos no tenían el mismo código genético. Mi única esperanza era encontrar un match en el registro mundial. El 14 de marzo llegó la bolsa con las células madre donadas y mi cuerpo volvió a fabricar sangre sana. Hoy estudio abogacía en la facultad y entreno remo. Donar médula es darle a une desconocida el derecho a tener un futuro.',
      highlightFact: 'Trasplante no emparentado exitoso · 3 años en remisión total y vida plena',
      image: recipientGratitudeImg,
      fallbackImage: './images/recipient_gratitude_1792077092380.jpg'
    },
    {
      id: 'carlos',
      name: 'Carlos Méndez',
      age: 36,
      location: 'Mendoza Capital',
      roleType: 'receptore',
      roleLabel: 'Paciente en tratamiento · Trasplante por leucemia',
      badgeColor: 'emerald',
      headline: '“En medio de la quimio y el aislamiento, esa bolsa de células fue mi nuevo cumpleaños”',
      quote: 'Me diagnosticaron leucemia linfoblástica aguda y después de varios ciclos de quimioterapia necesitaba sí o sí un trasplante de médula ósea. El INCUCAI encontró una persona compatible al 100% en el registro internacional. Hoy sigo en tratamiento y con controles hematológicos cada semana, pero mi médula nueva ya está fabricando glóbulos blancos y plaquetas. Cada día me siento más fuerte.',
      highlightFact: 'Leucemia Linfoblástica Aguda · Día +95 post-trasplante en recuperación activa',
      image: leukemiaPatientCarlosImg,
      fallbackImage: './images/leukemia_patient_carlos_1795463096744.jpg'
    },
    {
      id: 'sofia',
      name: 'Sofía Pereyra',
      age: 29,
      location: 'La Plata, Buenos Aires',
      roleType: 'receptore',
      roleLabel: 'Paciente en seguimiento · Leucemia Mieloide',
      badgeColor: 'emerald',
      headline: '“Cuando recibí la infusión de médula sentí que alguien del otro lado me prestaba vida”',
      quote: 'Pasé semanas en habitación aislada tras la quimioterapia de acondicionamiento para tratar una leucemia mieloide aguda. La infusión de las células madre donadas fue como una transfusión tranquila, sin dolor. Ahora continúo en seguimiento post-trasplante cuidando mis defensas y recuperando energía paso a paso. Que alguien haya donado un poco de sangre hace años hoy me mantiene acá con mi familia.',
      highlightFact: 'Leucemia Mieloide Aguda · En seguimiento médico con injerto celular exitoso',
      image: leukemiaPatientSofiaImg,
      fallbackImage: './images/leukemia_patient_sofia_1795463098210.jpg'
    },
    {
      id: 'lucas',
      name: 'Lucas y Camila',
      age: 28,
      location: 'Córdoba Capital',
      roleType: 'donante',
      roleLabel: 'El lazo solidario más puro',
      badgeColor: 'rose',
      headline: '“No sabés a quién le donás ni de qué país es: solo sabés que salvaste a un semejante”',
      quote: 'Lo más hermoso de la donación de médula es que es ciega, gratuita y universal. No hay billeteras, ni algoritmos, ni ideologías de por medio: son dos seres humanos conectados por el código de la vida. Cuando me dijeron que había alguien esperando, no dudé ni un segundo. Es el trámite más humano y simple que hice en mi vida.',
      highlightFact: 'Red Mundial WMDA · Donación voluntaria, anónima y 100% gratuita',
      image: humanFraternityHandsImg,
      fallbackImage: './images/human_fraternity_hands_1792077092498.jpg'
    },
    {
      id: 'mariana',
      name: 'Dra. Mariana Gómez',
      location: 'Servicio de Hemoterapia y Trasplante CPH',
      roleType: 'medicina',
      roleLabel: 'Especialista en Hemoterapia',
      badgeColor: 'sky',
      headline: '“El 90% no dona por miedo a la columna. Cuando ven la verdad, dicen que sí al instante”',
      quote: 'El gran obstáculo siempre fue la desinformación médica y la frialdad de los trámites. Cuando a una persona joven le mostrás que registrarse es solo un tubito de sangre y que el 80% de las donaciones se hace desde el brazo sin anestesia ni cirugía, el compromiso es inmediato. Cada donante inscripto es una vida que puede salvarse.',
      highlightFact: '15 años coordinando colectas públicas de CPH en Argentina',
      image: donorProcessComfortImg,
      fallbackImage: './images/donor_process_comfort_1792077093693.jpg'
    }
  ];

  const filteredStories = stories.filter((s) => {
    if (filterRole === 'todos') return true;
    return s.roleType === filterRole;
  });

  return (
    <section id="historias" aria-labelledby="historias-title" className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 relative overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-600/10 blur-[120px] pointer-events-none -z-10 rounded-full" aria-hidden="true" />

      {/* Encabezado de la Sección con letra grande */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3.5 sm:gap-4">
        <div>
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Heart className="w-4 h-4 fill-rose-400" aria-hidden="true" />
            <span>Historias de Vida · El Lazo Humano</span>
          </span>
          <h2 id="historias-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Detrás de cada muestra hay dos vidas transformadas
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
            Testimonios reales de donantes que superaron sus temores y de pacientes en tratamiento por leucemia que recibieron un trasplante de médula ósea.
          </p>
        </div>

        {/* Filtros de Testimonios adaptados para celular */}
        <div className="grid grid-cols-3 sm:flex p-1 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm font-semibold w-full sm:w-auto shrink-0 gap-1 sm:gap-0" role="tablist" aria-label="Filtrar testimonios por rol">
          <button
            role="tab"
            aria-selected={filterRole === 'todos'}
            onClick={() => setFilterRole('todos')}
            className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all cursor-pointer min-h-[42px] text-center font-bold flex items-center justify-center leading-tight ${
              filterRole === 'todos' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Todes
          </button>
          <button
            role="tab"
            aria-selected={filterRole === 'donante'}
            onClick={() => setFilterRole('donante')}
            className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all cursor-pointer min-h-[42px] text-center font-bold flex items-center justify-center leading-tight ${
              filterRole === 'donante' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Donantes
          </button>
          <button
            role="tab"
            aria-selected={filterRole === 'receptore'}
            onClick={() => setFilterRole('receptore')}
            className={`px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all cursor-pointer min-h-[42px] text-center font-bold flex items-center justify-center leading-tight ${
              filterRole === 'receptore' ? 'bg-rose-600 text-white shadow font-black' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="sm:hidden">Pacientes</span>
            <span className="hidden sm:inline">Pacientes y Receptores</span>
          </button>
        </div>
      </div>

      {/* Grid de Tarjetas Visuales con letra agrandada */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" role="region" aria-label="Testimonios seleccionados">
        {filteredStories.map((story) => (
          <article
            key={story.id}
            className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 p-5 sm:p-7 flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            {/* Cabecera de la tarjeta con imagen y datos */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-white/20 shadow-lg shrink-0 relative bg-neutral-800">
                  <img
                    src={story.image}
                    alt={`Foto de ${story.name}, ${story.roleLabel}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (story.fallbackImage && e.currentTarget.src !== story.fallbackImage) {
                        e.currentTarget.src = story.fallbackImage;
                      }
                    }}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" aria-hidden="true" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg text-white tracking-tight">
                      {story.name}
                    </h3>
                    {story.age && (
                      <span className="text-xs sm:text-sm font-mono text-neutral-400">({story.age} años)</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-0.5">{story.location}</p>
                  <span
                    className={`inline-block text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded mt-1 ${
                      story.roleType === 'donante'
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        : story.roleType === 'receptore'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {story.roleLabel}
                  </span>
                </div>
              </div>

              {/* Titular del testimonio */}
              <h4 className="text-base sm:text-lg font-bold text-neutral-100 leading-snug mb-3 group-hover:text-rose-200 transition-colors">
                {story.headline}
              </h4>

              {/* Cita breve y empática con letra más grande */}
              <blockquote className="text-sm sm:text-base text-neutral-200 leading-relaxed italic border-l-2 border-rose-500/60 pl-4 my-3">
                “{story.quote}”
              </blockquote>
            </div>

            {/* Pie de la tarjeta con dato clave oficial */}
            <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs sm:text-sm text-neutral-300 font-mono">
              <span className="flex items-center gap-2 text-neutral-200">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                <span>{story.highlightFact}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Banner de Cierre Empático y Fraternidad con letra agrandada */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-neutral-900/70 to-black p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0" aria-hidden="true">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-white">¿Querés que tu historia sea la próxima?</h4>
            <p className="text-xs sm:text-sm text-neutral-200 mt-1 leading-relaxed">
              Registrarte toma 15 minutos en cualquier banco de sangre de Argentina. Tu código genético puede ser el único match para alguien.
            </p>
          </div>
        </div>

        <a
          href="#validador"
          className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-600/30 transition-all active:scale-95 shrink-0 min-h-[48px]"
          aria-label="Ir al test de elegibilidad de donantes"
        >
          Hacer test de elegibilidad →
        </a>
      </div>
    </section>
  );
};
