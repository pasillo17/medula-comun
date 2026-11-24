import React from 'react';
import { HeartHandshake, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenValidator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenValidator }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand & Manifesto summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <span>Médula Común</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              Plataforma ciudadana orientada a transformar el registro de donantes de médula ósea en una experiencia transparente, empática y sin fricciones burocráticas.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
              <p>Inspirado en la necesidad de reconstruir el mundo común frente a la atomización algorítmica.</p>
              <p>En convenio y articulación informativa con los registros públicos de CPH (Ley 25.392).</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">
              Navegación Rápida
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onOpenValidator}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Validador de Elegibilidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('centros')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Buscador de Centros de Donación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mitos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mitos vs Realidad Médica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('proceso')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  El Circuito de las CPH
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('manifiesto')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Manifiesto: Éric Sadin
                </button>
              </li>
            </ul>
          </div>

          {/* Official Resources & Hotlines */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">
              Canales Oficiales del Estado
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-200 font-medium">Línea Gratuita Nacional INCUCAI</p>
                  <p className="text-neutral-400">0800 555 4628 (Atención las 24 hs)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-200 font-medium">Registro de Células Progenitoras (CPH)</p>
                  <p className="text-neutral-400">cph@incucai.gov.ar</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-200 font-medium">Red Mundial de Donantes</p>
                  <p className="text-neutral-400">World Marrow Donor Association (WMDA / BMDW)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} Médula Común. Iniciativa abierta para la promoción de la donación de CPH.</p>
          <div className="flex items-center gap-4">
            <span>Ley Nacional 25.392</span>
            <span aria-hidden="true">·</span>
            <span>Ley 22.990 de Sangre</span>
            <span aria-hidden="true">·</span>
            <span>Acceso libre y público</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
