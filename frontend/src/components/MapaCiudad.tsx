import { useState } from 'react';

export interface PuntoEcologico {
  id: number;
  nombre: string;
  tipo: string;
  direccion: string;
  horario: string;
  x: number; // porcentaje X en el mapa (0-100)
  y: number; // porcentaje Y en el mapa (0-100)
  color: string;
  icono: 'home' | 'p' | 'food' | 'leaf';
}

// Coordenadas y datos de los mercados y puntos ecológicos de la ciudad
const PUNTOS_ECOLOGICOS: PuntoEcologico[] = [
  {
    id: 1,
    nombre: "Mercat Central Ecològic",
    tipo: "Mercado Central • Bio",
    direccion: "Pl. de la Ciutat de Bruges, s/n",
    horario: "07:30 - 15:00",
    x: 54,
    y: 38,
    color: "#8E1960", // Magenta/Púrpura como en el mockup
    icono: 'home'
  },
  {
    id: 2,
    nombre: "Mercat de Russafa Bio",
    tipo: "Punto de Barrio CAECV",
    direccion: "Pl. del Baró de Cortés, s/n",
    horario: "07:30 - 15:00",
    x: 78,
    y: 56,
    color: "#1877BA", // Azul como en el mockup
    icono: 'p'
  },
  {
    id: 3,
    nombre: "Ecomercat de Colón",
    tipo: "Mercado de Productores",
    direccion: "C/ de Jorge Juan, 19",
    horario: "09:00 - 14:00",
    x: 88,
    y: 22,
    color: "#128A88", // Verde azulado/Teal como en el mockup
    icono: 'food'
  },
  {
    id: 4,
    nombre: "Mercat Agroecològic Benimaclet",
    tipo: "Cooperativa Agroecológica",
    direccion: "Pl. de Benimaclet, 6",
    horario: "09:00 - 14:00",
    x: 28,
    y: 28,
    color: "#48810A", // Verde ecológico
    icono: 'leaf'
  }
];

export default function MapaCiudad() {
  const [hoveredPunto, setHoveredPunto] = useState<PuntoEcologico | null>(null);
  const [puntoActivo, setPuntoActivo] = useState<PuntoEcologico | null>(null);

  const displayPunto = hoveredPunto || puntoActivo;

  const renderIcono = (tipo: PuntoEcologico['icono'], color: string) => {
    switch (tipo) {
      case 'home':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={color}>
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case 'p':
        return (
          <span className="font-black text-xs leading-none" style={{ color }}>
            P
          </span>
        );
      case 'food':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={color}>
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
          </svg>
        );
      case 'leaf':
      default:
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={color}>
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 0 12 20c7 0 11-8 11-8s-2-8-10-8c-4.42 0-8 3.58-8 8 0 1.25.3 2.43.83 3.48L7.6 17.5A6 6 0 0 1 6 12c0-3.31 2.69-6 6-6 4.97 0 7.84 4.54 8.7 6.47C18.3 14.8 15.2 18 12 18a7.48 7.48 0 0 1-3.6-.92C9.4 14.8 11.8 11 17 8z" />
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-[1/1] max-w-lg lg:max-w-none mx-auto bg-[#E5E8E1] rounded-2xl overflow-hidden shadow-md select-none">
      
      {/* Ilustración del mapa estilo ciudad (vectorial SVG fiel a la maqueta) */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 800 800" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fondo base de la ciudad */}
        <rect width="800" height="800" fill="#E8ECE5" />

        {/* Manzanas y edificios en tono beige suave */}
        <g fill="#D8D2C5">
          {/* Bloques cuadrante superior izquierdo */}
          <rect x="30" y="40" width="100" height="70" rx="6" />
          <path d="M 160 40 L 250 40 L 220 110 L 150 90 Z" />
          <path d="M 30 140 L 130 130 L 110 210 L 20 190 Z" />
          <path d="M 150 120 L 280 110 L 260 220 L 140 200 Z" />
          <path d="M 300 40 L 420 40 L 410 130 L 310 120 Z" />
          <path d="M 450 40 L 580 40 L 570 120 L 450 110 Z" />

          {/* Bloques zona central */}
          <path d="M 300 150 L 430 160 L 420 250 L 280 240 Z" />
          <path d="M 460 140 L 590 150 L 580 240 L 450 230 Z" />
          <path d="M 270 270 L 390 280 L 380 370 L 250 350 Z" />
          <path d="M 420 270 L 560 280 L 540 380 L 410 360 Z" />
          
          {/* Bloque cerca del pin central */}
          <path d="M 380 400 L 490 410 L 470 470 L 360 460 Z" />
          <path d="M 520 390 L 630 400 L 610 470 L 510 460 Z" />

          {/* Bloques cuadrante inferior izquierdo */}
          <path d="M 30 380 L 140 370 L 120 490 L 20 470 Z" />
          <path d="M 160 360 L 250 350 L 230 470 L 140 460 Z" />
          <path d="M 20 520 L 130 510 L 120 600 L 20 600 Z" />
          <path d="M 150 500 L 280 490 L 250 600 L 140 590 Z" />

          {/* Bloques cuadrante inferior derecho (alrededor del río) */}
          <path d="M 580 480 L 690 470 L 660 560 L 560 550 Z" />
          <path d="M 700 370 L 780 360 L 780 460 L 680 460 Z" />
          <path d="M 710 490 L 780 480 L 780 580 L 690 570 Z" />
          <path d="M 660 670 L 770 660 L 750 760 L 650 750 Z" />
          <path d="M 520 680 L 630 680 L 620 770 L 510 760 Z" />
          <path d="M 320 680 L 470 680 L 460 780 L 310 770 Z" />
        </g>

        {/* Zonas Verdes / Parques vivos */}
        <g fill="#7BC422">
          {/* Gran parque curvado */}
          <path d="M 530 180 C 520 220, 500 270, 480 310 L 510 330 C 530 280, 550 230, 560 190 Z" />
          {/* Parque central */}
          <path d="M 400 480 L 440 510 L 420 530 L 380 500 Z" rx="3" />
          {/* Parque diagonal alargado a la derecha */}
          <path d="M 640 100 L 680 250 L 665 255 L 630 110 Z" />
          {/* Parque en la orilla del río */}
          <path d="M 650 580 C 670 565, 700 560, 720 570 L 690 610 Z" />
          {/* Parque inferior */}
          <path d="M 680 720 L 740 700 L 730 750 Z" />
          <path d="M 20 630 L 80 610 L 70 670 Z" />
        </g>

        {/* Red de Carreteras y Calles en Blanco */}
        <g stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas principales anchas */}
          <path d="M 0 100 Q 250 120, 500 110 T 800 120" strokeWidth="18" fill="none" />
          <path d="M 0 320 Q 300 300, 500 330 T 800 340" strokeWidth="20" fill="none" />
          <path d="M 0 490 Q 280 470, 460 520 T 800 500" strokeWidth="18" fill="none" />

          {/* Ejes verticales y diagonales */}
          <path d="M 135 0 Q 150 300, 130 650" strokeWidth="16" fill="none" />
          <path d="M 285 0 Q 270 350, 310 800" strokeWidth="18" fill="none" />
          <path d="M 440 0 Q 430 280, 500 800" strokeWidth="20" fill="none" />
          <path d="M 610 0 Q 590 320, 660 800" strokeWidth="18" fill="none" />

          {/* Conexiones diagonales curvas */}
          <path d="M 50 50 Q 300 250, 750 650" strokeWidth="14" fill="none" opacity="0.9" />
          <path d="M 750 80 Q 500 350, 200 750" strokeWidth="14" fill="none" opacity="0.85" />
          <path d="M 320 220 Q 450 290, 680 320" strokeWidth="12" fill="none" />
          <path d="M 360 440 Q 520 480, 720 450" strokeWidth="14" fill="none" />
          <path d="M 450 520 Q 550 580, 620 640" strokeWidth="12" fill="none" />
        </g>

        {/* Pequeños nodos/rotondas en las calles */}
        <circle cx="500" cy="600" r="10" fill="#7BC422" />
        <circle cx="620" cy="200" r="8" fill="#7BC422" />

        {/* El Río Azul Curvado en la parte inferior */}
        <path 
          d="M 0 630 C 250 630, 400 680, 800 560 L 800 620 C 400 740, 250 690, 0 690 Z" 
          fill="#3196B7" 
        />
        {/* Puente sobre el río */}
        <rect x="490" y="640" width="22" height="60" fill="#FFFFFF" rx="2" transform="rotate(10 500 670)" />
      </svg>

      {/* PINES INTERACTIVOS CON SOMBRA EXACTA A LA IMAGEN */}
      {PUNTOS_ECOLOGICOS.map((punto) => {
        const isHovered = displayPunto?.id === punto.id;

        return (
          <div
            key={punto.id}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer z-10 group"
            style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
            onMouseEnter={() => setHoveredPunto(punto)}
            onMouseLeave={() => setHoveredPunto(null)}
            onClick={() => setPuntoActivo(puntoActivo?.id === punto.id ? null : punto)}
          >
            {/* Sombra proyectada hacia la derecha exactamente como en el mockup */}
            <div 
              className="absolute left-1/2 bottom-0 w-8 h-10 -translate-x-1/4 pointer-events-none opacity-30"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)',
                transform: 'skewX(-35deg) scaleY(0.6) translateY(2px)',
                transformOrigin: 'bottom left'
              }}
            />

            {/* Chincheta teardrop */}
            <div 
              className={`relative flex flex-col items-center transition-transform duration-200 ease-out ${
                isHovered ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              {/* Cuerpo del Pin */}
              <div 
                className="w-8 h-10 sm:w-9 sm:h-11 rounded-t-full flex items-start justify-center pt-1.5 shadow-md relative"
                style={{
                  backgroundColor: punto.color,
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 65%, 50% 100%, 0% 65%)',
                  borderTopLeftRadius: '50% 40%',
                  borderTopRightRadius: '50% 40%',
                }}
              >
                {/* Cara circular interior blanca */}
                <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-white flex items-center justify-center shadow-inner">
                  {renderIcono(punto.icono, punto.color)}
                </div>
              </div>
            </div>

            {/* Tooltip indicador con información del mercado ecológico */}
            {isHovered && (
              <div 
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-40 transition-all duration-150 animate-in fade-in zoom-in-95"
                style={{ minWidth: '170px', maxWidth: '230px' }}
              >
                <div className="bg-[#1C201C] text-white text-xs rounded-xl py-2 px-3 shadow-xl flex flex-col gap-0.5 border border-white/15">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-extrabold text-xs sm:text-sm text-[#FCF6DF] leading-tight">
                      {punto.nombre}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[11px]">
                    {punto.tipo}
                  </span>
                  <span className="text-gray-300 text-[10px] flex items-center gap-1 mt-0.5">
                    📍 {punto.direccion}
                  </span>
                  <span className="text-gray-400 text-[10px]">
                    🕒 {punto.horario}
                  </span>
                  <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[9px] bg-emerald-900/80 text-emerald-200 px-1.5 py-0.5 rounded font-medium">
                      Certificado CAECV
                    </span>
                    <span className="text-[9px] text-amber-300 font-semibold">Punto Bio</span>
                  </div>
                </div>
                {/* Flechita del tooltip */}
                <div className="w-2 h-2 bg-[#1C201C] rotate-45 mx-auto -mt-1 border-r border-b border-white/15"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
