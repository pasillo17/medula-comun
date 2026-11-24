import React, { useState } from 'react';
import { Quote, HeartHandshake, ShieldAlert, Cpu, Users, Share2, Check } from 'lucide-react';

export const PhilosophicalManifesto: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pillars = [
    {
      title: 'De TripAdvisor a Uber: La tiranía del juicio',
      desc: 'Sadin advierte cómo la tecnología reemplazó la empatía por calificaciones recíprocas. Todo vínculo se volvió transaccional y utilitario.',
      icon: Cpu,
    },
    {
      title: 'Tinder y el swipe: El prójimo como descarte',
      desc: 'El intercambio humano se redujo a un gesto táctil de milisegundos. El otro queda degradado a una foto filtrada por conveniencia individual.',
      icon: ShieldAlert,
    },
    {
      title: 'La sociedad de mónadas aisladas',
      desc: 'Individuos solos pegados a sus pantallas, desconfiando de lo colectivo. El resultado: el colapso del mundo común y compartido.',
      icon: Users,
    },
    {
      title: 'El Antídoto: Donar Médula Ósea',
      desc: 'Cero algoritmos. Cero estrellas. No elegís la cara ni la ideología del receptor: donás vida a un desconocido por pura fraternidad biológica.',
      icon: HeartHandshake,
      isAntidote: true,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Manifiesto: Frente a la monadización, donar médula',
        text: '¿Por qué donar médula ósea es el contra-modelo a la sociedad del swipe de Éric Sadin?',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="manifiesto" className="py-14 md:py-20 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-400 tracking-wide uppercase mb-2">
            <span>Éric Sadin & El Rescate del Lazo Humano</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Más allá del swipe y las 5 estrellas
          </h2>
          <p className="mt-2 text-neutral-400 text-sm sm:text-base">
            El acto más radical frente al aislamiento y la mercantilización de los vínculos.
          </p>
        </div>

        {/* Big Compact Quote */}
        <div className="bg-neutral-800/70 border border-neutral-700/80 rounded-2xl p-5 sm:p-7 mb-8 relative">
          <Quote className="w-8 h-8 text-rose-500/30 absolute top-4 right-4 pointer-events-none" />
          <p className="text-base sm:text-lg font-medium text-neutral-200 italic leading-snug">
            «La sociedad se desmorona en individuos aislados que solo cuentan con sus aparatos técnicos. Se avecina el colapso definitivo de nuestro mundo común.»
          </p>
          <p className="mt-2 text-xs text-rose-400 font-medium">
            — Éric Sadin, filósofo de la tecnología
          </p>
        </div>

        {/* 4 Crisp Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  p.isAntidote
                    ? 'bg-rose-950/40 border-rose-500/80 ring-1 ring-rose-500/30'
                    : 'bg-neutral-800/40 border-neutral-700/60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    p.isAntidote ? 'bg-rose-600 text-white' : 'bg-neutral-700 text-neutral-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold mb-1.5 ${p.isAntidote ? 'text-rose-200' : 'text-white'}`}>
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer of section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
          <span>La donación de médula es el lazo biológico más puro: 100% gratuito, anónimo y ciego.</span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-rose-400" />}
            <span>{copied ? '¡Copiado!' : 'Compartir reflexión'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
