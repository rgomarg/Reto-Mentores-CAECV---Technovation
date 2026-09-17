import { useState } from 'react';

export interface PuntoEcologico {
  id: number;
  nombre: string;
  tipo: string;
  direccion: string;
  horario: string;
  x: number; // porcentaje X en el mapa (0-100)
  y: number; // porcentaje Y en el mapa (0-100)
  destacado?: boolean;
}

// Coordenadas y datos estáticos de los mercados y puntos ecológicos de la ciudad
const PUNTOS_ECOLOGICOS: PuntoEcologico[] = [
  {
    id: 1,
    nombre: "Mercat Central Ecològic",
    tipo: "Mercado Central",
    direccion: "Pl. de la Ciutat de Bruges, s/n",
    horario: "Lunes a Sábado, 07:30 - 15:00",
    x: 46,
    y: 45,
    destacado: true
  },
  {
    id: 2,
    nombre: "Mercat de Russafa Bio",
    tipo: "Mercado de Barrio",
    direccion: "Pl. del Baró de Cortés, s/n",
    horario: "Lunes a Sábado, 07:30 - 15:00",
    x: 56,
    y: 62
  },
  {
    id: 3,
    nombre: "Ecomercat de Colón",
    tipo: "Mercado de Productores",
    direccion: "C/ de Jorge Juan, 19",
    horario: "Viernes y Domingos, 09:00 - 14:00",
    x: 64,
    y: 42,
    destacado: true
  },
  {
    id: 4,
    nombre: "Punt Ecològic del Cabanyal",
    tipo: "Punto de Proximidad",
    direccion: "Carrer de Martí Grajales, 4",
    horario: "Martes a Sábado, 08:00 - 14:30",
    x: 82,
    y: 48
  },
  {
    id: 5,
    nombre: "Mercat Agroecològic Benimaclet",
    tipo: "Cooperativa Agroecológica",
    direccion: "Pl. de Benimaclet, 6",
    horario: "Sábados, 09:00 - 14:00",
    x: 58,
    y: 22
  },
  {
    id: 6,
    nombre: "Mercat Rojas Clemente Bio",
    tipo: "Mercado Municipal",
    direccion: "Pl. de Rojas Clemente, s/n",
    horario: "Lunes a Sábado, 08:00 - 14:00",
    x: 35,
    y: 44
  },
  {
    id: 7,
    nombre: "Horta Viva - EcoPunt Campanar",
    tipo: "Huerta y Fruta de Temporada",
    direccion: "Carrer del Pare Ferris, 28",
    horario: "Miércoles y Sábados, 09:30 - 13:30",
    x: 28,
    y: 26
  }
];

export default function MapaCiudad() {
  const [puntoActivo, setPuntoActivo] = useState<PuntoEcologico | null>(null);
  const [hoveredPunto, setHoveredPunto] = useState<PuntoEcologico | null>(null);

  const displayPunto = hoveredPunto || puntoActivo;

  return (
    <div className="w-full flex flex-col bg-white rounded-3xl p-5 shadow-sm border border-[#C1C69A]/30">
      {/* Cabecera del Mapa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C201C] tracking-tight">
              Mapa de Puntos Ecológicos
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Pasa el cursor por las chinchetas para descubrir mercados y tiendas certificadas
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF6DF] border border-[#C1C69A]/50 text-xs font-semibold text-[#1C201C]">
          <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{PUNTOS_ECOLOGICOS.length} ubicaciones</span>
        </div>
      </div>

      {/* Contenedor del Mapa Interactivo */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#F4F6F0] rounded-2xl overflow-hidden border border-[#b0b588]/40 select-none">
        
        {/* Representación vectorial urbana / Plano de fondo */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1000 700" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fondo de tierra / manzanas */}
          <rect width="1000" height="700" fill="#F3F5ED" />

          {/* Manzanas urbanas / distritos */}
          <g fill="#E6EBDD" stroke="#D7DEC9" strokeWidth="1.5">
            <rect x="50" y="60" width="160" height="110" rx="10" />
            <rect x="230" y="50" width="180" height="130" rx="12" />
            <rect x="430" y="40" width="220" height="100" rx="14" />
            <rect x="670" y="60" width="260" height="120" rx="12" />

            <rect x="60" y="200" width="180" height="140" rx="12" />
            <rect x="260" y="210" width="160" height="150" rx="12" />
            <rect x="440" y="170" width="240" height="160" rx="14" />
            <rect x="700" y="210" width="230" height="150" rx="12" />

            <rect x="70" y="370" width="190" height="150" rx="12" />
            <rect x="280" y="390" width="150" height="160" rx="12" />
            <rect x="450" y="360" width="210" height="180" rx="14" />
            <rect x="680" y="380" width="250" height="160" rx="12" />

            <rect x="60" y="550" width="220" height="110" rx="12" />
            <rect x="300" y="570" width="170" height="100" rx="12" />
            <rect x="490" y="560" width="210" height="110" rx="12" />
            <rect x="720" y="560" width="220" height="100" rx="12" />
          </g>

          {/* Jardín o Parque / Río Verde (estilo Jardín del Turia) */}
          <path 
            d="M 0 160 C 250 140, 350 250, 480 300 C 620 360, 750 280, 1000 320 L 1000 370 C 750 330, 620 410, 480 350 C 350 300, 250 190, 0 210 Z" 
            fill="#CADBB7" 
            opacity="0.85" 
          />

          {/* Mar / Costa derecha */}
          <path 
            d="M 940 0 L 1000 0 L 1000 700 L 920 700 C 950 500, 910 250, 940 0 Z" 
            fill="#D5E8EB" 
            opacity="0.75" 
          />

          {/* Calles y Avenidas principales */}
          <g stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
            {/* Ejes horizontales */}
            <line x1="0" y1="185" x2="1000" y2="185" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="0" y1="360" x2="1000" y2="360" stroke="#FFFFFF" strokeWidth="9" />
            <line x1="0" y1="540" x2="1000" y2="540" stroke="#FFFFFF" strokeWidth="7" />
            
            {/* Ejes verticales */}
            <line x1="240" y1="0" x2="240" y2="700" stroke="#FFFFFF" strokeWidth="7" />
            <line x1="440" y1="0" x2="440" y2="700" stroke="#FFFFFF" strokeWidth="9" />
            <line x1="680" y1="0" x2="680" y2="700" stroke="#FFFFFF" strokeWidth="8" />

            {/* Gran diagonal de conexión */}
            <line x1="80" y1="80" x2="900" y2="620" stroke="#FFFFFF" strokeWidth="6" opacity="0.8" />
          </g>

          {/* Zonas de huerta / agricultura protegida */}
          <g fill="#B8D49E" opacity="0.6">
            <circle cx="120" cy="110" r="30" />
            <circle cx="150" cy="90" r="25" />
            <circle cx="560" cy="80" r="35" />
            <circle cx="600" cy="100" r="25" />
            <circle cx="150" cy="610" r="35" />
          </g>

          {/* Rotulaciones urbanas sutiles */}
          <text x="30" y="35" fill="#889874" fontSize="14" fontWeight="bold" letterSpacing="2">ZONA HUERTA NORTE</text>
          <text x="760" y="35" fill="#889874" fontSize="14" fontWeight="bold" letterSpacing="2">POBLATS MARÍTIMS</text>
          <text x="470" y="325" fill="#587440" fontSize="13" fontWeight="bold" letterSpacing="1.5">JARDÍ DEL TÚRIA</text>
          <text x="30" y="680" fill="#889874" fontSize="14" fontWeight="bold" letterSpacing="2">ZONA HUERTA SUR</text>
        </svg>

        {/* Pines / Chinchetas interactivos */}
        {PUNTOS_ECOLOGICOS.map((punto) => {
          const isSelected = displayPunto?.id === punto.id;

          return (
            <div
              key={punto.id}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer z-10 group"
              style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
              onMouseEnter={() => setHoveredPunto(punto)}
              onMouseLeave={() => setHoveredPunto(null)}
              onClick={() => setPuntoActivo(puntoActivo?.id === punto.id ? null : punto)}
            >
              {/* Animación de pulso cuando está hovered o destacado */}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all ${
                  isSelected ? 'bg-[#DE6D5C]/40 animate-ping' : punto.destacado ? 'bg-emerald-500/25 animate-pulse' : 'hidden'
                }`}
              />

              {/* Chincheta visual */}
              <div 
                className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                }`}
              >
                <div className={`p-1.5 rounded-full shadow-lg border-2 transition-colors ${
                  isSelected
                    ? 'bg-[#DE6D5C] border-white text-white'
                    : punto.destacado 
                      ? 'bg-emerald-600 border-white text-white' 
                      : 'bg-[#C1C69A] border-white text-[#1C201C]'
                }`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Punta de chincheta */}
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 ${
                  isSelected ? 'bg-[#DE6D5C]' : punto.destacado ? 'bg-emerald-600' : 'bg-[#C1C69A]'
                }`} />
              </div>

              {/* Tooltip flotante inmediato al hacer hover */}
              {isSelected && (
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-30 transition-all duration-150"
                  style={{ minWidth: '180px', maxWidth: '240px' }}
                >
                  <div className="bg-[#1C201C] text-white text-xs rounded-xl py-2 px-3 shadow-xl flex flex-col gap-0.5 border border-white/10">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-sm text-[#FCF6DF] leading-tight">
                        {punto.nombre}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      {punto.tipo}
                    </span>
                    <span className="text-gray-300 text-[10px] mt-0.5 flex items-center gap-1">
                      📍 {punto.direccion}
                    </span>
                    <span className="text-gray-400 text-[10px]">
                      🕒 {punto.horario}
                    </span>
                    <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[9px] bg-emerald-900/80 text-emerald-200 px-1.5 py-0.5 rounded font-medium">
                        Certificado CAECV
                      </span>
                      <span className="text-[9px] text-[#FCF6DF]">Punto Bio</span>
                    </div>
                  </div>
                  {/* Flechita del tooltip */}
                  <div className="w-2 h-2 bg-[#1C201C] rotate-45 mx-auto -mt-1 border-r border-b border-white/10"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Detalle del Punto Seleccionado */}
      <div className="mt-4 p-3.5 bg-[#FCF6DF]/80 rounded-2xl border border-[#C1C69A]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {displayPunto ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DE6D5C] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-[#1C201C] text-sm sm:text-base leading-tight">
                {displayPunto.nombre}
              </h4>
              <p className="text-xs text-gray-700">
                {displayPunto.tipo} • <span className="text-emerald-700 font-medium">{displayPunto.direccion}</span>
              </p>
              <p className="text-[11px] text-gray-500">
                Horario: {displayPunto.horario}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
            <span className="text-lg">🗺️</span>
            <span>Haz clic o posa el ratón sobre cualquier chincheta para ver los detalles del mercado o punto ecológico.</span>
          </div>
        )}

        <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
          <span className="text-[11px] px-2.5 py-1 bg-white rounded-full border border-[#C1C69A] font-semibold text-emerald-800">
            🌱 Red CAECV
          </span>
        </div>
      </div>
    </div>
  );
}
