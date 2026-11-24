import React, { useState } from 'react';
import { Check, ShieldCheck, Heart, Sparkles, Send, Globe, Users, ArrowRight } from 'lucide-react';

export const DonationJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [familyMatchSim, setFamilyMatchSim] = useState<number>(75);

  const steps = [
    {
      step: 1,
      title: 'La donación de muestra inicial',
      duration: '20 minutos',
      summary: 'Te acercás a cualquier centro de hemoterapia adherido. Donás una unidad de sangre habitual y firmás el consentimiento para CPH.',
      details: 'No requiere ninguna intervención quirúrgica ni preparación compleja. Solo tenés que concurrir con tu DNI habiendo tomado mate, té o jugo sin lácteos.',
      tag: 'En tu hospital local',
    },
    {
      step: 2,
      title: 'Tipificación genética del código HLA',
      duration: 'Laboratorio de alta resolución',
      summary: 'El laboratorio del INCUCAI analiza los Antígenos Leucocitarios Humanos (HLA) presentes en tus glóbulos blancos.',
      details: 'Este código genético es el equivalente biológico a tu huella dactilar celular. Determina con precisión milimétrica la compatibilidad para evitar el rechazo en el receptor.',
      tag: '100% Confidencial y anónimo',
    },
    {
      step: 3,
      title: 'Alta en la Red Mundial Solidaria (BMDW)',
      duration: 'Permanencia activa hasta los 60 años',
      summary: 'Tu código genético entra en la base de datos nacional e internacional junto a más de 40 millones de personas.',
      details: 'Tu vida continúa exactamente igual. Pueden pasar meses, años o nunca ser convocado; pero estás en el radar mundial de esperanza.',
      tag: 'Conexión global',
    },
    {
      step: 4,
      title: 'La llamada de compatibilidad 100%',
      duration: 'Aviso del equipo médico',
      summary: 'Si en Argentina o en el mundo un paciente tiene un HLA idéntico al tuyo, el INCUCAI te contacta de inmediato.',
      details: 'Te explican el estado del caso, te realizan análisis de sangre exhaustivos para corroborar tu salud óptima y volvés a confirmar libremente tu deseo de donar.',
      tag: 'Voluntario y reafirmable',
    },
    {
      step: 5,
      title: 'El día de la donación y la nueva vida',
      duration: '3 a 4 horas en sillón',
      summary: 'Donás las células madre (en el 80% de los casos por aféresis de sangre en el brazo). Un correo médico especializado lleva las células criopreservadas al receptor.',
      details: 'Tus células madre colonizan la médula ósea del paciente, sustituyendo las células enfermas y permitiéndole volver a fabricar sangre sana.',
      tag: 'El milagro biológico',
    },
  ];

  return (
    <section id="proceso" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-2">
            <span>El Recorrido Transparente</span>
            <span aria-hidden="true">·</span>
            <span>De tu brazo al mundo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            ¿Cómo es el camino real de la donación?
          </h2>
          <p className="mt-3 text-neutral-600 text-base">
            Desmitificamos cada instancia para que sepas con absoluta claridad qué pasa desde el momento en que extendés el brazo.
          </p>
        </div>

        {/* Steps Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Steps Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s) => {
              const isCurrent = s.step === activeStep;
              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isCurrent
                      ? 'bg-rose-50 border-rose-600 shadow-sm'
                      : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-bold ${isCurrent ? 'text-rose-700' : 'text-neutral-500'}`}>
                      Paso 0{s.step}
                    </span>
                    <span className="text-neutral-500 text-[11px]">{s.duration}</span>
                  </div>
                  <h4 className={`text-base font-bold ${isCurrent ? 'text-neutral-950' : 'text-neutral-800'}`}>
                    {s.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                    {s.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Step Detail Active Screen */}
          <div className="lg:col-span-7">
            {steps
              .filter((s) => s.step === activeStep)
              .map((s) => (
                <div
                  key={s.step}
                  className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-neutral-800 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl font-extrabold">
                    0{s.step}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                    <span>{s.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>Duración: {s.duration}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
                    {s.title}
                  </h3>

                  <p className="text-base text-neutral-300 leading-relaxed mb-6">
                    {s.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                      <Sparkles className="w-4 h-4" />
                      <span>Detalle técnico fundamental</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {s.details}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs">
                    <span className="text-neutral-400">
                      Paso {s.step} de 5 en el circuito de CPH
                    </span>
                    <div className="flex gap-2">
                      {s.step > 1 && (
                        <button
                          onClick={() => setActiveStep(s.step - 1)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                        >
                          Anterior
                        </button>
                      )}
                      {s.step < 5 && (
                        <button
                          onClick={() => setActiveStep(s.step + 1)}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
                        >
                          Siguiente paso
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Compatibility Genetic Explorer ("Por qué tu registro importa") */}
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                La Matemática de la Vida
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
                El 75% de los pacientes no tiene un donante en su propia familia
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Existe la creencia popular de que los padres o hermanos pueden donar siempre. La realidad genética es que los padres comparten solo el 50% de los antígenos, y entre hermanos la probabilidad de compatibilidad total es de apenas el 25%.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Por eso, <strong>3 de cada 4 personas con leucemia o enfermedades de la sangre dependen 100% de la generosidad de un voluntario no emparentado</strong> en el registro mundial.
              </p>
            </div>

            {/* Visual ratio chart */}
            <div className="lg:col-span-6 bg-white rounded-xl p-6 border border-neutral-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                <span>Distribución de compatibilidad genética</span>
                <span className="text-rose-600 font-bold">75% donante no emparentado</span>
              </div>

              {/* Progress bar visual */}
              <div className="h-6 w-full bg-neutral-100 rounded-lg overflow-hidden flex border border-neutral-200">
                <div
                  className="bg-neutral-300 text-neutral-700 text-[11px] font-bold flex items-center justify-center transition-all duration-500"
                  style={{ width: '25%' }}
                >
                  25% Familiar
                </div>
                <div
                  className="bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center transition-all duration-500"
                  style={{ width: '75%' }}
                >
                  75% Registro Abierto
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/60">
                  <span className="font-bold text-neutral-900 block text-sm">25% Hermanos</span>
                  <span className="text-neutral-500 mt-0.5 block leading-tight">
                    Solo 1 de cada 4 hermanos resulta histocompatible con el paciente.
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-950">
                  <span className="font-bold text-rose-700 block text-sm">75% Desconocidos</span>
                  <span className="text-neutral-600 mt-0.5 block leading-tight">
                    La supervivencia depende de personas como vos inscriptas voluntariamente.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
