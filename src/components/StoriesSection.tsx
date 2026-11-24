import React, { useState } from 'react';
import { STORIES_DATA, Story } from '../data/stories';
import { Quote, Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import humanFraternityHandsImg from '../assets/images/human_fraternity_hands_1792077092498.jpg';

export const StoriesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const current = STORIES_DATA[activeIndex];

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % STORIES_DATA.length);
  };

  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + STORIES_DATA.length) % STORIES_DATA.length);
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-100/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-2">
            <span>Historias Reales</span>
            <span aria-hidden="true">·</span>
            <span>Humanizando el Proceso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Detrás de cada muestra hay dos vidas transformadas
          </h2>
          <p className="mt-3 text-neutral-600 text-base">
            Escuchá la voz de quienes ya vivieron la experiencia: donantes que derribaron sus propios prejuicios y personas que hoy están vivas gracias a una coincidencia biológica.
          </p>
        </div>

        {/* Featured Story Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-neutral-200 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Column */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[320px] bg-neutral-100">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <p className="font-bold text-lg">{current.name}</p>
                <p className="text-xs text-neutral-300">{current.location}</p>
              </div>
            </div>

            {/* Story Details Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                      {current.role === 'donante' && 'Testimonio de Donante'}
                      {current.role === 'receptora' && 'Historia de Supervivencia'}
                      {current.role === 'especialista' && 'Visión Médica'}
                    </span>
                    <span className="text-neutral-500 font-medium">{current.timeframe}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug mb-4">
                  {current.headline}
                </h3>

                <blockquote className="text-base text-neutral-700 leading-relaxed italic border-l-2 border-rose-500 pl-4 my-6">
                  “{current.fullQuote}”
                </blockquote>

                <div className="pt-2">
                  <p className="font-bold text-neutral-900 text-base">{current.name}</p>
                  <p className="text-xs text-neutral-500">{current.location} · {current.details}</p>
                </div>
              </div>

              {/* Navigation Arrows & Indicators */}
              <div className="flex items-center justify-between pt-8 mt-6 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  {STORIES_DATA.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeIndex ? 'w-8 bg-rose-600' : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                      }`}
                      aria-label={`Ver historia de ${s.name}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevStory}
                    className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
                    aria-label="Historia anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextStory}
                    className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
                    aria-label="Siguiente historia"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-banner of solidarity image */}
        <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-neutral-100 shadow-sm">
            <img
              src={humanFraternityHandsImg}
              onError={(e) => {
                e.currentTarget.src = './images/human_fraternity_hands_1792077092498.jpg';
              }}
              alt="Manos unidas en gesto de apoyo solidario humano"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-900">
              El match genético es completamente ciego y universal
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
              No importa la condición social, nacionalidad, ideología ni religión del donante o receptor. Solo importa el código genético común de nuestra especie. Al donar, no juzgás a quién ayudás: simplemente salvás a un semejante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
