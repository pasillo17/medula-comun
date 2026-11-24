import React from 'react';
import { ArrowRight, MapPin, CheckCircle2, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import heroDonorWarmthImg from '../assets/images/hero_donor_warmth_1792077092068.jpg';

interface HeroProps {
  onStartValidator: () => void;
  onViewCenters: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartValidator, onViewCenters }) => {
  return (
    <section id="inicio" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(244,63,94,0.08),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Column 1: Copy and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Context kicker text */}
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-3">
              <span>Red CPH Argentina</span>
              <span aria-hidden="true">·</span>
              <span>INCUCAI & Registro Mundial</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-5 text-balance">
              Salvar a un desconocido en <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600">
                3 simples pasos.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xl mb-6">
              Sin burocracia ni tecnicismos. El 80% de las donaciones se hace desde el brazo en un sillón, igual que donar sangre. Comprobá en 30 segundos si podés registrarte.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <button
                onClick={onStartValidator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all rounded-xl shadow-md shadow-rose-600/20 cursor-pointer"
              >
                <span>Hacer test rápido (30 seg)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewCenters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Centros cercanos</span>
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-medium pt-2 border-t border-neutral-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gratuito y 100% voluntario</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sin daño a tu sistema inmune</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Regeneración total en 3 semanas</span>
              </div>
            </div>
          </div>

          {/* Column 2: Visual Hero Anchor with human warmth */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white">
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-neutral-100">
                <img
                  src={heroDonorWarmthImg}
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero_donor_warmth_1792077092068.jpg';
                  }}
                  alt="Donante voluntaria en sala de aféresis médica sonriendo serenamente"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold tracking-wider uppercase text-rose-200">Testimonio Real</p>
                  <p className="text-sm font-medium mt-0.5 leading-snug">
                    “Pensé que era doloroso. En realidad estuve 3 horas leyendo en un sillón y a la tarde estaba en casa.”
                  </p>
                  <p className="text-[11px] text-neutral-300 mt-1">Lucía (26) · Donó por aféresis en CABA</p>
                </div>
              </div>

              {/* Informative micro-card below photo */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-900">¿Sabías qué pasa al registrarte?</p>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Solo donás una muestra de sangre común. Quedás anotado y solo te llaman si en el mundo alguien resulta genéticamente idéntico a vos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Proof Strip */}
        <div className="mt-16 pt-10 border-t border-neutral-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tabular-nums">80%</p>
            <p className="text-sm font-semibold text-neutral-800">Por sangre periférica</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              La mayoría se extrae por aféresis en el brazo, igual que donar plaquetas.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tabular-nums">1 en 40.000</p>
            <p className="text-sm font-semibold text-neutral-800">Match genético único</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              La compatibilidad HLA es extraordinaria; tu registro amplía la red de esperanza.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tabular-nums">15 a 21 días</p>
            <p className="text-sm font-semibold text-neutral-800">Regeneración del 100%</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Tus células madre se autorrenuevan naturalmente sin dejar secuela alguna.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tabular-nums">40 Millones</p>
            <p className="text-sm font-semibold text-neutral-800">En la Red Mundial BMDW</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Argentina está conectada internacionalmente para dar y recibir vida sin fronteras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
