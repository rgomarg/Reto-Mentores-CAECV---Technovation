import { useState } from 'react';

interface Pin {
  id: string;
  x: number; // porcentaje %
  y: number; // porcentaje %
  color: string;
  label: string;
  title: string;
  type: 'icon' | 'letter';
  content: string;
}

export default function CityMap() {
  const [activePin, setActivePin] = useState<string | null>(null);

  const pins: Pin[] = [
    {
      id: 'purple',
      x: 27,
      y: 36,
      color: '#893874',
      label: 'Mercado Bio Central',
      title: 'Punto Ecológico CAECV',
      type: 'icon',
      content: 'leaf',
    },
    {
      id: 'teal',
      x: 82,
      y: 24,
      color: '#279A8F',
      label: 'Productor Juanito',
      title: 'Cítricos y Naranjas Bio',
      type: 'letter',
      content: 'J',
    },
    {
      id: 'blue',
      x: 73,
      y: 66,
      color: '#2C7BC4',
      label: 'Punto de Recogida',
      title: 'Punto Verde CAECV',
      type: 'letter',
      content: 'P',
    },
  ];

  return (
    <div className="relative w-full aspect-[1.18/1] max-w-[560px] bg-[#EDE9DA] rounded-3xl overflow-hidden shadow-md border border-black/5 select-none">
      {/* SVG del Mapa Urbano */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 600 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sombra para pines */}
          <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Fondo Base / Calles Menores */}
        <rect width="600" height="500" fill="#ECE8DC" />

        {/* Manzanas Urbanas (Bloques de Edificios en tonos crema) */}
        {/* Fila Superior */}
        <path d="M-10,-10 L150,-10 L140,80 L-10,75 Z" fill="#E2DDD0" />
        <path d="M165,-10 L280,-10 L270,70 L155,75 Z" fill="#E5E0D4" />
        <path d="M295,-10 L440,-10 L430,65 L285,68 Z" fill="#DFD9CB" />
        <path d="M455,-10 L610,-10 L610,70 L445,65 Z" fill="#E2DDD0" />

        {/* Zona Verde Parque 1 (Superior Izquierda) */}
        <path
          d="M 20 95 Q 60 85 110 100 Q 140 120 125 160 Q 90 180 40 165 Q 10 140 20 95 Z"
          fill="#8CC665"
          opacity="0.95"
        />

        {/* Manzanas Zona Central Izquierda */}
        <path d="M 140 95 L 240 85 L 230 150 L 135 155 Z" fill="#E5DFD2" />
        <path d="M 30 180 L 120 175 L 110 240 L 25 235 Z" fill="#DFD8CA" />
        <path d="M 130 170 L 230 165 L 220 235 L 125 240 Z" fill="#E3DDD0" />

        {/* Zona Verde Parque 2 (Central) */}
        <path
          d="M 245 105 L 350 90 L 370 175 L 260 180 Z"
          fill="#8CC665"
          opacity="0.9"
        />

        {/* Manzanas Zona Central Derecha */}
        <path d="M 370 80 L 480 75 L 470 160 L 385 165 Z" fill="#E5DFD2" />
        <path d="M 495 70 L 610 65 L 610 150 L 485 155 Z" fill="#E0D9CB" />
        <path d="M 380 180 L 485 175 L 475 250 L 370 255 Z" fill="#E3DCD0" />
        <path d="M 500 170 L 610 165 L 610 260 L 490 265 Z" fill="#E5DFD4" />

        {/* Manzanas Intermedias */}
        <path d="M 235 200 L 350 195 L 340 270 L 225 275 Z" fill="#DFD8CA" />
        <path d="M 120 260 L 210 255 L 200 320 L 110 315 Z" fill="#E4DED3" />

        {/* Zona Verde Parque 3 (Inferior Izquierda junto al río) */}
        <path
          d="M 20 260 L 95 255 L 85 340 L 15 345 Z"
          fill="#8CC665"
          opacity="0.95"
        />
        <path
          d="M 15 360 Q 60 350 100 365 Q 120 400 90 440 Q 40 450 15 420 Z"
          fill="#83C05C"
        />

        {/* Manzanas Ribera del Río */}
        <path d="M 225 290 L 330 285 L 320 370 L 210 360 Z" fill="#E1DBD0" />
        <path d="M 345 280 L 450 275 L 440 365 L 335 375 Z" fill="#E5E0D5" />
        <path d="M 465 275 L 580 270 L 570 345 L 455 355 Z" fill="#DFD9CD" />

        {/* Red de Carreteras Principales (Blancas con bordes muy suaves) */}
        {/* Avenidas Diagonales */}
        <line x1="-20" y1="85" x2="620" y2="70" stroke="#FFFFFF" strokeWidth="14" />
        <line x1="-20" y1="170" x2="620" y2="165" stroke="#FFFFFF" strokeWidth="12" />
        <line x1="-20" y1="250" x2="620" y2="265" stroke="#FFFFFF" strokeWidth="13" />
        <line x1="-20" y1="330" x2="620" y2="360" stroke="#FFFFFF" strokeWidth="12" />

        {/* Avenidas Verticales / Cruzadas */}
        <line x1="120" y1="-20" x2="105" y2="450" stroke="#FFFFFF" strokeWidth="13" />
        <line x1="235" y1="-20" x2="215" y2="400" stroke="#FFFFFF" strokeWidth="12" />
        <line x1="360" y1="-20" x2="330" y2="420" stroke="#FFFFFF" strokeWidth="14" />
        <line x1="485" y1="-20" x2="445" y2="400" stroke="#FFFFFF" strokeWidth="13" />

        {/* RÍO AZUL VIBRANTE (Curva fluida e idéntica a la del mockup) */}
        <path
          d="M -10 380 
             C 70 380, 130 460, 240 450 
             C 340 440, 420 395, 520 405 
             C 560 410, 580 430, 610 440 
             L 610 510 L -10 510 Z"
          fill="#3183B7"
        />

        {/* Puente / Carretera que cruza el río */}
        <path
          d="M 450 360 L 500 480"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="square"
        />
        <path
          d="M 230 415 L 265 485"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="square"
        />
      </svg>

      {/* PINES INTERACTIVOS */}
      {pins.map((pin) => {
        const isHovered = activePin === pin.id;

        return (
          <div
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group transition-transform duration-200"
            onMouseEnter={() => setActivePin(pin.id)}
            onMouseLeave={() => setActivePin(null)}
          >
            {/* Marcador / Pin */}
            <div
              className={`relative flex items-center justify-center transition-transform duration-200 ${
                isHovered ? 'scale-125' : 'hover:scale-110'
              }`}
              style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))' }}
            >
              <svg width="34" height="44" viewBox="0 0 34 44" fill="none">
                {/* Cuerpo del Pin */}
                <path
                  d="M17 0C7.611 0 0 7.611 0 17C0 27.5 17 44 17 44C17 44 34 27.5 34 17C34 7.611 26.389 0 17 0Z"
                  fill={pin.color}
                />
                {/* Círculo interior blanco */}
                <circle cx="17" cy="17" r="10" fill="white" />
              </svg>

              {/* Contenido dentro del pin */}
              <div
                className="absolute top-[8px] left-1/2 -translate-x-1/2 flex items-center justify-center font-bold text-xs"
                style={{ color: pin.color }}
              >
                {pin.type === 'letter' ? (
                  <span>{pin.content}</span>
                ) : (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Tooltip con información */}
            {isHovered && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                <p className="font-bold">{pin.title}</p>
                <p className="text-[10px] text-gray-300 font-normal">{pin.label}</p>
                {/* Flecha tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
