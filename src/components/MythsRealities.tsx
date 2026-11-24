import React, { useState } from 'react';
import { MYTHS_DATA, MythItem } from '../data/myths';
import { HelpCircle, CheckCircle2, ArrowRight, ShieldCheck, Activity, Dna } from 'lucide-react';

export const MythsRealities: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(MYTHS_DATA[0].id);
  const [activeTab, setActiveTab] = useState<'todos' | 'procedimiento' | 'dolor_recuperacion' | 'requisitos' | 'alcance'>('todos');

  const filteredMyths = activeTab === 'todos' 
    ? MYTHS_DATA 
    : MYTHS_DATA.filter(m => m.category === activeTab);

  const currentMyth = MYTHS_DATA.find(m => m.id === selectedId) || MYTHS_DATA[0];

  return (
    <section id="mitos" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-2">
            <span>Dudas Frecuentes</span>
            <span aria-hidden="true">·</span>
            <span>En 1 Minuto</span>
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
            Mitos vs. Realidad
          </h2>
          <p className="mt-2 text-neutral-600 text-sm">
            La mayoría no dona por miedo a la columna o al dolor. Acá la verdad en pocas palabras:
          </p>
        </div>

        {/* Anatomical Clarifier Spotlight */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Regla de oro médica
            </span>
            <h3 className="text-lg font-bold text-neutral-950">
              Médula Ósea ≠ Médula Espinal
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-snug">
              La médula espinal está en la columna (nervios). La <strong>médula ósea</strong> está dentro de la pelvis y fabrica sangre. <strong>Nunca se toca tu columna vertebral.</strong>
            </p>
          </div>
          <div className="shrink-0 bg-white px-4 py-2 rounded-xl border border-rose-200 text-center">
            <span className="text-xs text-neutral-500 block">El 80% se extrae</span>
            <span className="text-sm font-extrabold text-rose-700">Por el brazo</span>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'todos' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Todos los mitos
          </button>
          <button
            onClick={() => setActiveTab('procedimiento')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'procedimiento' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Procedimiento
          </button>
          <button
            onClick={() => setActiveTab('dolor_recuperacion')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'dolor_recuperacion' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Dolor y recuperación
          </button>
          <button
            onClick={() => setActiveTab('requisitos')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'requisitos' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Tatuajes y requisitos
          </button>
          <button
            onClick={() => setActiveTab('alcance')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'alcance' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Logística y costos
          </button>
        </div>

        {/* Grid of Interactive Myth Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMyths.map((item) => {
            const isSelected = item.id === currentMyth.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg'
                    : 'bg-neutral-50/70 hover:bg-neutral-50 border-neutral-200 text-neutral-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={isSelected ? 'text-rose-400 font-medium' : 'text-rose-700 font-semibold'}>
                      {item.tag}
                    </span>
                    <span className={isSelected ? 'text-neutral-400' : 'text-neutral-400'}>
                      Mito común
                    </span>
                  </div>

                  <h4 className="text-base font-bold leading-snug mb-3">
                    {item.myth}
                  </h4>

                  <div className={`pt-3 border-t ${isSelected ? 'border-neutral-800' : 'border-neutral-200'}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isSelected ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      La Verdad:
                    </p>
                    <p className={`text-sm leading-relaxed ${isSelected ? 'text-neutral-200' : 'text-neutral-700'}`}>
                      {item.reality}
                    </p>
                  </div>
                </div>

                <div className={`mt-5 pt-3 border-t text-xs font-medium ${isSelected ? 'border-neutral-800 text-rose-300' : 'border-neutral-200 text-rose-700'}`}>
                  {item.highlight}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison: Aféresis vs Punción */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-950">
              ¿Cómo se dona realmente si te convocan?
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Existen dos métodos médicos avalados internacionalmente. Vos y el equipo médico eligen la mejor opción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Method 1: Apheresis */}
            <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                  Método Mayoritario (80%)
                </span>
                <span className="text-xs font-medium text-neutral-500">Sin internación</span>
              </div>

              <h4 className="text-xl font-bold text-neutral-950">
                1. Sangre Periférica (Aféresis)
              </h4>

              <p className="text-sm text-neutral-700 leading-relaxed">
                Durante 4 o 5 días previos recibís una pequeña vacuna subcutánea que estimula la salida temporal de células madre hacia el torrente sanguíneo.
              </p>

              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Te sentás en un sillón reclinable confortable durante 3 a 4 horas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Una máquina separa las células madre y te devuelve el resto de tu sangre por el otro brazo.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ese mismo mediodía te vas caminando a tu casa a almorzar.</span>
                </div>
              </div>
            </div>

            {/* Method 2: Bone Marrow Puncture */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-200 px-2.5 py-1 rounded-md">
                  Método Específico (20%)
                </span>
                <span className="text-xs font-medium text-neutral-500">Con anestesia general</span>
              </div>

              <h4 className="text-xl font-bold text-neutral-950">
                2. Punción de Cresta Ilíaca (Pelvis)
              </h4>

              <p className="text-sm text-neutral-700 leading-relaxed">
                Se utiliza principalmente cuando el receptor es un bebé o niño pequeño que requiere células no estimuladas previamente.
              </p>

              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                  <span>Se realiza en quirófano bajo anestesia general: no sentís absolutamente nada.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                  <span>Se extrae de la cresta ilíaca (hueso de la cadera posterior), NUNCA de la columna.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                  <span>Permanecés 1 día en observación y solo sentís una molestia muscular similar a haber entrenado fuerte.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
