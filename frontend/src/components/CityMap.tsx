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
    <div className="relative w-full aspect-[1.18/1] max-w-[560px] bg-[#E8E2CF] rounded-3xl overflow-hidden shadow-xl border-4 border-[#C7D19E]/60 select-none">
      {/* SVG del Pueblo y Mercados */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 600 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sombra para pines y elementos elevados */}
          <filter id="map-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodOpacity="0.18" />
          </filter>
          <filter id="pin-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" />
          </filter>

          {/* Patrón de huerto de hortalizas */}
          <pattern id="crop-lines" width="16" height="16" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="16" y2="4" stroke="#6C9A43" strokeWidth="2.5" strokeDasharray="3 2" />
            <line x1="0" y1="12" x2="16" y2="12" stroke="#6C9A43" strokeWidth="2.5" strokeDasharray="3 2" />
          </pattern>

          {/* Patrón de huerto cítricos/naranjos */}
          <pattern id="orchard-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="3" fill="#E88728" opacity="0.85" />
            <circle cx="16" cy="16" r="3" fill="#E88728" opacity="0.85" />
            <circle cx="6" cy="6" r="1.5" fill="#4B7728" />
            <circle cx="16" cy="16" r="1.5" fill="#4B7728" />
          </pattern>
        </defs>

        {/* 1. TERRENO BASE: Praderas verdes y tierra del pueblo */}
        <rect width="600" height="500" fill="#DFD8C2" />

        {/* Parcelas de cultivo y praderas ecológicas */}
        {/* Pradera norte y huerto de hortalizas */}
        <path d="M 0 0 L 260 0 L 245 110 L 0 100 Z" fill="#BBDC7A" />
        <path d="M 15 15 L 230 15 L 220 95 L 15 90 Z" fill="url(#crop-lines)" opacity="0.8" />

        {/* Campo de frutales / cítricos nordeste (cerca del Productor Juanito) */}
        <path d="M 390 0 L 600 0 L 600 160 L 460 170 L 380 90 Z" fill="#D3E59B" />
        <path d="M 440 20 L 585 20 L 585 140 L 460 150 Z" fill="url(#orchard-dots)" opacity="0.9" />

        {/* Pradera / Parque central con arboleda bio */}
        <path d="M 140 180 Q 230 150 270 210 Q 300 270 230 290 Q 150 300 130 240 Z" fill="#88C059" opacity="0.9" />

        {/* Pradera suroeste cerca del río */}
        <path d="M 0 240 Q 80 230 120 310 Q 80 390 0 380 Z" fill="#A8D368" />
        <path d="M 10 260 Q 60 255 90 310 Q 60 360 10 350 Z" fill="url(#crop-lines)" opacity="0.6" />

        {/* Huerto ecológico al este */}
        <path d="M 370 230 L 590 210 L 590 320 L 430 350 L 360 280 Z" fill="#C9E08A" />
        <path d="M 400 240 L 570 225 L 570 300 L 440 325 Z" fill="url(#orchard-dots)" opacity="0.85" />

        {/* 2. RÍO NATURAL VIBRANTE Y MEANDRO */}
        <path
          d="M -10 390
             C 80 375, 140 440, 240 435
             C 340 430, 410 385, 520 395
             C 560 400, 580 415, 610 425
             L 610 510 L -10 510 Z"
          fill="#3E91BF"
        />
        {/* Ribera del río en arena suave */}
        <path
          d="M -10 385
             C 80 370, 140 435, 240 430
             C 340 425, 410 380, 520 390
             C 560 395, 580 410, 610 420"
          fill="none"
          stroke="#C8BE9D"
          strokeWidth="6"
        />
        {/* Reflejos de agua en el río */}
        <path d="M 50 430 Q 110 425 160 445" stroke="#79BEE4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M 280 450 Q 340 445 400 420" stroke="#79BEE4" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M 460 430 Q 510 425 560 440" stroke="#79BEE4" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />

        {/* 3. CAMINOS RURALES DEL PUEBLO (Adoquines y senderos en blanco cálido y arena) */}
        {/* Camino principal del pueblo (norte a sur con curva suave) */}
        <path
          d="M 290 -10 C 285 90, 295 140, 270 200 C 240 260, 220 320, 215 440"
          fill="none"
          stroke="#EDE8DC"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M 290 -10 C 285 90, 295 140, 270 200 C 240 260, 220 320, 215 440"
          fill="none"
          stroke="#D8CFBD"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Avenida del mercado este-oeste */}
        <path
          d="M -10 140 C 90 140, 180 160, 280 150 C 370 140, 460 170, 610 160"
          fill="none"
          stroke="#EDE8DC"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Camino secundario que cruza hacia el mercado sur */}
        <path
          d="M 120 150 C 130 230, 220 280, 360 270 C 440 265, 480 340, 490 410"
          fill="none"
          stroke="#EDE8DC"
          strokeWidth="15"
          strokeLinecap="round"
        />

        {/* Camino al Productor Juanito (nordeste) */}
        <path
          d="M 280 150 Q 360 100 480 110 Q 530 115 610 100"
          fill="none"
          stroke="#F3EFE6"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Puentes de piedra rústicos sobre el río */}
        <rect x="200" y="420" width="30" height="22" rx="4" fill="#C5BAA2" filter="url(#map-shadow)" />
        <line x1="200" y1="431" x2="230" y2="431" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="square" />
        <rect x="475" y="380" width="28" height="22" rx="4" fill="#C5BAA2" filter="url(#map-shadow)" />
        <line x1="475" y1="391" x2="503" y2="391" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="square" />

        {/* 4. PLAZA MAYOR DEL PUEBLO (Zona adoquinada circular) */}
        <circle cx="280" cy="155" r="38" fill="#F4EFE3" stroke="#D3C9B2" strokeWidth="3" filter="url(#map-shadow)" />
        <circle cx="280" cy="155" r="28" fill="#E8DFCE" stroke="#D3C9B2" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Fuente de agua o estatua del agricultor en el centro de la plaza */}
        <circle cx="280" cy="155" r="8" fill="#4E99C2" stroke="#FFFFFF" strokeWidth="2" />

        {/* 5. CASETAS Y PUESTOS DE MERCADO (Rayas de colores / toldos rústicos) */}
        {/* Mercado Bio Central (zona pin púrpura, x: 27%, y: 36% -> viewBox 162, 180) */}
        <g transform="translate(130, 155)" filter="url(#map-shadow)">
          {/* Suelo empedrado del mercado */}
          <rect x="-10" y="10" width="70" height="40" rx="8" fill="#E2DAC7" />
          {/* Puesto 1 (Toldo a rayas burdeos y crema) */}
          <rect x="0" y="15" width="24" height="15" rx="3" fill="#893874" />
          <path d="M 0 15 L 6 15 L 6 30 L 0 30 Z M 12 15 L 18 15 L 18 30 L 12 30 Z" fill="#F4EFE3" opacity="0.6" />
          {/* Puesto 2 (Toldo a rayas naranja y crema) */}
          <rect x="28" y="15" width="26" height="15" rx="3" fill="#E07A2B" />
          <path d="M 28 15 L 34 15 L 34 30 L 28 30 Z M 40 15 L 46 15 L 46 30 L 40 30 Z" fill="#F4EFE3" opacity="0.6" />
          {/* Cajas de verdura bio */}
          <rect x="6" y="32" width="12" height="6" rx="1.5" fill="#8A5A36" />
          <circle cx="9" cy="35" r="2" fill="#589632" />
          <circle cx="14" cy="35" r="2" fill="#C43828" />
          <rect x="33" y="32" width="14" height="6" rx="1.5" fill="#8A5A36" />
          <circle cx="36" cy="35" r="2" fill="#E5992B" />
          <circle cx="42" cy="35" r="2" fill="#E5992B" />
        </g>

        {/* Finca / Puesto del Productor Juanito (zona pin teal, x: 82%, y: 24% -> viewBox 492, 120) */}
        <g transform="translate(460, 95)" filter="url(#map-shadow)">
          {/* Masía / Almacén rústico con tejado terracota */}
          <rect x="15" y="12" width="40" height="24" rx="3" fill="#EBE4D5" />
          <polygon points="12,12 35,-2 58,12" fill="#C85A32" />
          {/* Puesto de venta de cítricos bio */}
          <rect x="-12" y="16" width="22" height="14" rx="2" fill="#279A8F" />
          <path d="M -12 16 L -7 16 L -7 30 L -12 30 Z M -2 16 L 3 16 L 3 30 L -2 30 Z" fill="#FAF7EE" opacity="0.6" />
          {/* Cestas de naranjas recién cosechadas */}
          <circle cx="-6" cy="33" r="3.5" fill="#E67E22" />
          <circle cx="0" cy="33" r="3.5" fill="#E67E22" />
          <circle cx="-3" cy="30" r="3" fill="#E67E22" />
        </g>

        {/* Punto de Recogida / Cooperativa Verde (zona pin azul, x: 73%, y: 66% -> viewBox 438, 330) */}
        <g transform="translate(405, 305)" filter="url(#map-shadow)">
          {/* Pérgola comunitaria y caseta bio */}
          <rect x="0" y="8" width="48" height="28" rx="4" fill="#F0EBE0" />
          <polygon points="-3,8 24,-4 51,8" fill="#3B7CB8" />
          {/* Puesto azul y blanco */}
          <rect x="-14" y="18" width="24" height="14" rx="2" fill="#2C7BC4" />
          <path d="M -14 18 L -8 18 L -8 32 L -14 32 Z M -2 18 L 4 18 L 4 32 L -2 32 Z" fill="#FFFFFF" opacity="0.6" />
          {/* Caja de botellas de aceite y miel bio */}
          <rect x="10" y="34" width="18" height="7" rx="1.5" fill="#8C6239" />
          <rect x="13" y="29" width="3" height="6" fill="#A88B2A" />
          <rect x="18" y="28" width="3" height="7" fill="#C49B2F" />
          <rect x="23" y="29" width="3" height="6" fill="#8F9B2C" />
        </g>

        {/* 6. CASITAS DEL PUEBLO CON TEJADOS CÁLIDOS DE TEJA */}
        {/* Manzana norte */}
        <g filter="url(#map-shadow)">
          <rect x="305" y="45" width="22" height="18" rx="2" fill="#EFE8DA" />
          <polygon points="302,45 316,33 330,45" fill="#D2693E" />
          <rect x="335" y="40" width="26" height="20" rx="2" fill="#EBE3D3" />
          <polygon points="332,40 348,27 364,40" fill="#B8542B" />
        </g>

        {/* Casitas cerca de la plaza */}
        <g filter="url(#map-shadow)">
          <rect x="205" y="100" width="24" height="18" rx="2" fill="#EFE9DC" />
          <polygon points="202,100 217,88 232,100" fill="#CC6135" />
          <rect x="340" y="125" width="22" height="18" rx="2" fill="#EAE2D0" />
          <polygon points="337,125 348,114 365,125" fill="#D2693E" />
        </g>

        {/* Molino de viento tradicional en la colina noroeste */}
        <g transform="translate(60, 45)" filter="url(#map-shadow)">
          <polygon points="12,35 15,10 25,10 28,35" fill="#EAE2CF" stroke="#D3C9B2" strokeWidth="1" />
          <circle cx="20" cy="10" r="4" fill="#C25A2E" />
          {/* Aspas del molino */}
          <line x1="20" y1="10" x2="33" y2="0" stroke="#7D5C39" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="10" x2="7" y2="20" stroke="#7D5C39" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="10" x2="10" y2="-3" stroke="#7D5C39" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="10" x2="30" y2="23" stroke="#7D5C39" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 7. ÁRBOLES FRONDOSOS TIPO PUEBLO MEDITERRÁNEO */}
        {/* Árboles en el parque central */}
        <circle cx="170" cy="215" r="14" fill="#6EA440" opacity="0.95" />
        <circle cx="167" cy="212" r="11" fill="#80B849" />
        <circle cx="210" cy="245" r="16" fill="#588D32" opacity="0.95" />
        <circle cx="207" cy="242" r="12" fill="#6EA440" />
        <circle cx="250" cy="225" r="13" fill="#699E39" opacity="0.95" />

        {/* Cipreses y olivos dispersos */}
        <ellipse cx="320" cy="85" rx="5" ry="11" fill="#3D6826" />
        <ellipse cx="330" cy="88" rx="4" ry="9" fill="#4B7C2F" />
        <ellipse cx="445" cy="70" rx="5" ry="12" fill="#3D6826" />
        <ellipse cx="145" cy="120" rx="4" ry="10" fill="#45742B" />

        {/* Barquita de madera en la curva del río */}
        <path d="M 120 445 Q 135 452 150 445 Q 135 440 120 445 Z" fill="#8C5C36" />
        <line x1="135" y1="440" x2="135" y2="433" stroke="#5E3B20" strokeWidth="1.5" />
      </svg>

      {/* PINES INTERACTIVOS ORIGINALES CON DISEÑO PREMIUM */}
      {pins.map((pin) => {
        const isHovered = activePin === pin.id;

        return (
          <div
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group transition-transform duration-200 z-20"
            onMouseEnter={() => setActivePin(pin.id)}
            onMouseLeave={() => setActivePin(null)}
          >
            {/* Marcador / Pin con rebote suave al hover */}
            <div
              className={`relative flex items-center justify-center transition-all duration-200 ${
                isHovered ? 'scale-125 -translate-y-1' : 'hover:scale-110'
              }`}
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' }}
            >
              <svg width="36" height="46" viewBox="0 0 34 44" fill="none">
                {/* Cuerpo del Pin con brillo y borde contrastado */}
                <path
                  d="M17 0C7.611 0 0 7.611 0 17C0 27.5 17 44 17 44C17 44 34 27.5 34 17C34 7.611 26.389 0 17 0Z"
                  fill={pin.color}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                {/* Círculo interior blanco */}
                <circle cx="17" cy="17" r="10.5" fill="white" />
              </svg>

              {/* Contenido dentro del pin */}
              <div
                className="absolute top-[8px] left-1/2 -translate-x-1/2 flex items-center justify-center font-black text-xs"
                style={{ color: pin.color }}
              >
                {pin.type === 'letter' ? (
                  <span>{pin.content}</span>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 0 12 21c7 0 11-8 11-8s-2 1-5 1c-4.42 0-7.39-3.23-7.96-6.68C12.44 6.74 15 7.5 17 8z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Tooltip informativo con estilo mercado de pueblo */}
            {isHovered && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3.5 py-2 bg-gray-900/95 backdrop-blur-xs text-white text-xs rounded-xl shadow-2xl whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150 border border-white/15">
                <p className="font-extrabold text-amber-300 text-xs flex items-center gap-1">
                  <span>🏪</span> {pin.title}
                </p>
                <p className="text-[11px] text-gray-200 font-medium">{pin.label}</p>
                {/* Flecha tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

