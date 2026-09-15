import { useState } from 'react';
import type { ExtendedCromoData } from '../data/cardsData';
import { INITIAL_CARDS } from '../data/cardsData';

interface CardVisualProps {
  card?: ExtendedCromoData;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  modifierBoost?: number;
  isConseguida?: boolean;
}

export default function CardVisual({
  card: inputCard,
  size = 'md',
  modifierBoost = 0,
  isConseguida,
}: CardVisualProps) {
  const card = inputCard || INITIAL_CARDS[2];
  const [imgFailed, setImgFailed] = useState(false);
  const owned = isConseguida !== undefined ? isConseguida : (card?.esConseguida ?? true);

  // Colores temáticos según el elemento o id
  const getTheme = () => {
    switch (card?.id) {
      case 3: // Alolan Vulpix V (Hielo / Azul glaciar - igual a Desktop 3)
        return {
          border: 'border-[#4EA8DE]',
          headerBg: 'from-[#64B5F6] via-[#1E88E5] to-[#0D47A1]',
          bgGradient: 'from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9]',
          badgeBg: 'bg-[#0288D1]',
          badgeText: 'text-white',
          typeIcon: '❄️',
          accent: '#1976D2',
        };
      case 1: // Sprigatito / Naranjita (Verde / Cítrico)
        return {
          border: 'border-[#7CB342]',
          headerBg: 'from-[#AED581] via-[#7CB342] to-[#558B2F]',
          bgGradient: 'from-[#F1F8E9] via-[#DCEDC8] to-[#C5E1A5]',
          badgeBg: 'bg-[#558B2F]',
          badgeText: 'text-white',
          typeIcon: '🌿',
          accent: '#689F38',
        };
      case 2: // Lapras / Lácteo (Agua)
        return {
          border: 'border-[#29B6F6]',
          headerBg: 'from-[#81D4FA] via-[#29B6F6] to-[#0288D1]',
          bgGradient: 'from-[#E1F5FE] via-[#B3E5FC] to-[#81D4FA]',
          badgeBg: 'bg-[#0277BD]',
          badgeText: 'text-white',
          typeIcon: '💧',
          accent: '#039BE5',
        };
      case 4: // Decidueye / Mermelada
        return {
          border: 'border-[#689F38]',
          headerBg: 'from-[#9CCC65] via-[#689F38] to-[#33691E]',
          bgGradient: 'from-[#F9FBE7] via-[#F0F4C3] to-[#E6EE9C]',
          badgeBg: 'bg-[#33691E]',
          badgeText: 'text-white',
          typeIcon: '🍃',
          accent: '#558B2F',
        };
      case 5: // Vintage Meowth / Clásico
        return {
          border: 'border-[#BCAAA4]',
          headerBg: 'from-[#D7CCC8] via-[#BCAAA4] to-[#8D6E63]',
          bgGradient: 'from-[#EFEBE9] via-[#D7CCC8] to-[#BCAAA4]',
          badgeBg: 'bg-[#6D4C41]',
          badgeText: 'text-white',
          typeIcon: '🌱',
          accent: '#795548',
        };
      case 6: // Shiny / Pikachu
        return {
          border: 'border-[#424242]',
          headerBg: 'from-[#616161] via-[#212121] to-[#000000]',
          bgGradient: 'from-[#ECEFF1] via-[#CFD8DC] to-[#B0BEC5]',
          badgeBg: 'bg-[#212121]',
          badgeText: 'text-amber-300',
          typeIcon: '⚡',
          accent: '#FBC02D',
        };
      default:
        return {
          border: 'border-amber-400',
          headerBg: 'from-amber-400 to-amber-600',
          bgGradient: 'from-amber-50 to-amber-100',
          badgeBg: 'bg-amber-600',
          badgeText: 'text-white',
          typeIcon: '⭐',
          accent: '#D97706',
        };
    }
  };

  const theme = getTheme();
  const isLarge = size === 'lg';

  // Obtener URL de imagen
  const getImgSrc = () => {
    if (imgFailed) return '/cromo.png';
    if (!card.imagen) return '/cromo.png';
    return card.imagen.startsWith('/') ? card.imagen : `/${card.imagen}`;
  };

  return (
    <div
      className={`relative select-none rounded-2xl overflow-hidden shadow-2xl border-4 ${
        owned ? theme.border : 'border-gray-400'
      } bg-white flex flex-col transition-all duration-300 ${
        !owned ? 'grayscale contrast-90 opacity-75' : ''
      } ${
        isLarge
          ? 'w-[300px] sm:w-[330px] md:w-[360px] aspect-[2.5/3.6]'
          : 'w-full aspect-[2.5/3.6]'
      }`}
    >
      {/* Badge 'NO OBTENIDA' si la carta no la tiene el usuario */}
      {!owned && (
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none flex items-center justify-center">
          <span className="bg-black/75 backdrop-blur-xs text-white text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-lg border border-white/20">
            🔒 No obtenida
          </span>
        </div>
      )}

      {/* Barra superior de la carta (Nombre, Fase, HP y Elemento) */}
      <div
        className={`w-full bg-gradient-to-r ${
          owned ? theme.headerBg : 'from-gray-500 via-gray-600 to-gray-700'
        } px-3 py-1.5 flex items-center justify-between text-white shadow-xs`}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black tracking-wider uppercase drop-shadow-xs">
            {card.id === 3 ? 'Alolan Vulpix V' : card.nombre}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold opacity-80">HP</span>
          <span className="text-sm font-black tracking-tight">
            {(card.hp || 100) + (modifierBoost > 0 ? modifierBoost * 10 : 0)}
          </span>
          <span className="text-xs">{theme.typeIcon}</span>
        </div>
      </div>

      {/* Marco de Ilustración Central */}
      <div className="relative w-full flex-grow p-2.5 bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center justify-center overflow-hidden">
        {/* Fondo decorativo interno con textura */}
        <div
          className={`absolute inset-2 rounded-xl bg-gradient-to-br ${theme.bgGradient} opacity-70 border border-black/10`}
        />

        {/* Imagen del cromo */}
        <div className="relative z-10 w-full h-full max-h-[190px] sm:max-h-[220px] rounded-lg overflow-hidden flex items-center justify-center">
          {card.id === 3 ? (
            /* Ilustración representativa de Alolan Vulpix para que coincida exactamente con Desktop - 3 */
            <div className="w-full h-full bg-gradient-to-b from-[#7ec8f8] via-[#aee0ff] to-[#e1f5fe] flex flex-col items-center justify-center relative p-2">
              <svg className="w-36 h-36 drop-shadow-lg" viewBox="0 0 200 200">
                {/* Orejas de zorro blanco y azul */}
                <polygon points="50,80 30,20 85,50" fill="#E1F5FE" stroke="#4EA8DE" strokeWidth="3" />
                <polygon points="150,80 170,20 115,50" fill="#E1F5FE" stroke="#4EA8DE" strokeWidth="3" />
                <polygon points="52,75 40,32 75,52" fill="#81D4FA" />
                <polygon points="148,75 160,32 125,52" fill="#81D4FA" />

                {/* Mechón esponjoso blanco en la cabeza */}
                <circle cx="100" cy="55" r="32" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                <circle cx="80" cy="50" r="22" fill="#FFFFFF" />
                <circle cx="120" cy="50" r="22" fill="#FFFFFF" />

                {/* Cabeza blanca */}
                <ellipse cx="100" cy="95" rx="46" ry="38" fill="#FFFFFF" stroke="#B3E5FC" strokeWidth="2" />

                {/* Grandes ojos azul brillante */}
                <ellipse cx="80" cy="92" rx="10" ry="14" fill="#0288D1" />
                <ellipse cx="120" cy="92" rx="10" ry="14" fill="#0288D1" />
                <circle cx="78" cy="88" r="4" fill="#FFFFFF" />
                <circle cx="118" cy="88" r="4" fill="#FFFFFF" />
                <ellipse cx="82" cy="96" rx="4" ry="6" fill="#01579B" />
                <ellipse cx="122" cy="96" rx="4" ry="6" fill="#01579B" />

                {/* Pequeña nariz negra y hocico */}
                <polygon points="100,103 97,99 103,99" fill="#212121" />
                <path d="M 96 106 Q 100 110 104 106" stroke="#424242" strokeWidth="2" fill="none" />

                {/* Cuerpo esponjoso de zorro ártico */}
                <ellipse cx="100" cy="148" rx="36" ry="32" fill="#FFFFFF" stroke="#B3E5FC" strokeWidth="2" />

                {/* Cola rizada esponjosa */}
                <circle cx="145" cy="140" r="26" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
                <circle cx="155" cy="125" r="20" fill="#E1F5FE" />
                <circle cx="138" cy="155" r="18" fill="#FFFFFF" />

                {/* Copos de nieve y brillo */}
                <text x="35" y="110" fill="#4EA8DE" fontSize="16" fontWeight="bold">❄</text>
                <text x="160" y="70" fill="#81D4FA" fontSize="18" fontWeight="bold">✦</text>
                <text x="40" y="160" fill="#B3E5FC" fontSize="14" fontWeight="bold">❄</text>
              </svg>
              <span className="absolute bottom-1 right-2 text-[10px] font-extrabold text-[#0277BD]/80">
                ECO-VULPIX
              </span>
            </div>
          ) : (
            <img
              src={getImgSrc()}
              alt={card.nombre}
              onError={() => setImgFailed(true)}
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          )}

          {/* Badge de modificador activo si fue aplicado */}
          {modifierBoost > 0 && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg border border-white flex items-center gap-1 animate-bounce">
              <span>★</span>
              <span>+{modifierBoost} POTENCIADO</span>
            </div>
          )}
        </div>
      </div>

      {/* Sección Inferior de Ataques / Habilidades del Cromo */}
      <div className="w-full bg-white px-3 py-2 border-t border-gray-200 flex flex-col gap-1 text-gray-800">
        {/* Atributo 1 */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{card.ataques?.[0]?.coste || '⚪⚪'}</span>
            <span className="text-xs font-bold text-gray-800">
              {card.ataques?.[0]?.nombre || card.atributos?.[0] || 'Aroma Ecológico'}
            </span>
          </div>
          <span className="text-xs font-black text-gray-900">
            {parseInt(card.ataques?.[0]?.dano || '50') + (modifierBoost > 0 ? modifierBoost * 5 : 0)}
          </span>
        </div>

        {/* Atributo 2 / Habilidad V */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{card.ataques?.[1]?.coste || '❄️❄️'}</span>
            <span className="text-xs font-bold text-gray-800">
              {card.ataques?.[1]?.nombre || card.atributos?.[1] || 'Sello CAECV'}
            </span>
          </div>
          <span className="text-xs font-black text-gray-900">
            {parseInt(card.ataques?.[1]?.dano || '160') + (modifierBoost > 0 ? modifierBoost * 10 : 0)}
          </span>
        </div>

        {/* Footer de rareza y puntos */}
        <div className="mt-1 pt-1 border-t border-gray-100 flex items-center justify-between text-[9px] font-semibold text-gray-400">
          <span>{card.rareza || 'Colección CAECV 2026'}</span>
          <span className="text-amber-600 font-bold">
            {card.puntuacion + modifierBoost} PTS
          </span>
        </div>
      </div>
    </div>
  );
}
