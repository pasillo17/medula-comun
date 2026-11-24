import React, { useState } from 'react';
import { Menu, X, HeartHandshake } from 'lucide-react';

interface HeaderProps {
  onStartValidator: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartValidator, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('inicio');
          }}
          className="flex items-center gap-2 text-neutral-950 font-bold tracking-tight text-xl whitespace-nowrap shrink-0 hover:text-rose-600 transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            <HeartHandshake className="w-4 h-4" />
          </span>
          <span>Médula Común</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => handleNavClick('validador')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Elegibilidad
          </button>
          <button
            onClick={() => handleNavClick('centros')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Dónde Donar
          </button>
          <button
            onClick={() => handleNavClick('mitos')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mitos vs Realidad
          </button>
          <button
            onClick={() => handleNavClick('proceso')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Paso a Paso
          </button>
          <button
            onClick={() => handleNavClick('manifiesto')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            El Manifiesto
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onStartValidator}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Comprobar si puedo donar
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => handleNavClick('validador')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-700 hover:text-rose-600"
          >
            Validador de Elegibilidad
          </button>
          <button
            onClick={() => handleNavClick('centros')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-700 hover:text-rose-600"
          >
            Centros de Donación
          </button>
          <button
            onClick={() => handleNavClick('mitos')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-700 hover:text-rose-600"
          >
            Mitos vs Realidad
          </button>
          <button
            onClick={() => handleNavClick('proceso')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-700 hover:text-rose-600"
          >
            El Viaje de las Células
          </button>
          <button
            onClick={() => handleNavClick('manifiesto')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-700 hover:text-rose-600"
          >
            Manifiesto (Éric Sadin)
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartValidator();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
            >
              Comprobar si puedo donar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
