import { useState } from 'react';
import type { UsuarioPotenciadorData } from '../context/types';

interface ModifierItem {
  id: string | number;
  nombre: string;
  tipo: string;
  puntos: number;
  descripcion: string;
  imagen?: string;
  isCustomCard?: 'plus4' | 'vortex';
}

interface ModifierSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyModifier: (modifier: ModifierItem) => void;
  usuarioPotenciadores?: UsuarioPotenciadorData[];
}

export default function ModifierSidebar({
  isOpen,
  onClose,
  onApplyModifier,
  usuarioPotenciadores = [],
}: ModifierSidebarProps) {
  // Lista de modificadores disponibles (incluye la carta +4 del diseño, la carta azul y las de la BBDD)
  const defaultModifiers: ModifierItem[] = [
    {
      id: 'plus4',
      nombre: 'Carta +4 Bonus',
      tipo: 'SUMAR_PUNTOS',
      puntos: 4,
      descripcion: 'Aumenta +4 la puntuación ecológica del cromo',
      isCustomCard: 'plus4',
    },
    {
      id: 'vortex',
      nombre: 'Vórtice Cósmico',
      tipo: 'MULTIPLICADOR',
      puntos: 2,
      descripcion: 'Duplica el efecto de los atributos ecológicos',
      isCustomCard: 'vortex',
    },
  ];

  // Añadir modificadores reales de la BBDD del usuario si los tiene de forma segura
  const dbModifiers: ModifierItem[] = (Array.isArray(usuarioPotenciadores) ? usuarioPotenciadores : [])
    .filter((up) => up && up.potenciador)
    .map((up, idx) => ({
      id: up.id ?? `db-mod-${idx}`,
      nombre: up.potenciador?.nombre || 'Potenciador',
      tipo: up.potenciador?.tipo || 'DUPLICAR',
      puntos: up.potenciador?.tipo === 'TRIPLICAR' ? 3 : 2,
      descripcion: `Potenciador de BBDD: ${up.potenciador?.nombre || ''} (x${up.cantidad || 1})`,
      imagen: up.potenciador?.imagen ? `/${up.potenciador.imagen}` : '/potenciador.png',
    }));

  const allModifiers = [...defaultModifiers, ...dbModifiers];
  const [selectedId, setSelectedId] = useState<string | number>('plus4');

  if (!isOpen) return null;

  const handleApply = () => {
    const selected = allModifiers.find((m) => m?.id === selectedId) || allModifiers[0];
    onApplyModifier(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      {/* Backdrop transparente / difuminado clickeable para cerrar */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-2xs pointer-events-auto transition-opacity duration-300"
      />

      {/* Panel Lateral Derecho (Desktop - 5) */}
      <aside className="relative w-full max-w-[340px] sm:max-w-[380px] h-full bg-white shadow-2xl flex flex-col justify-between p-6 z-10 pointer-events-auto border-l border-gray-100 animate-in slide-in-from-right duration-300">
        <div>
          {/* Cabecera del Panel con botón cerrar */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-800">Modificadores</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition"
              title="Cerrar panel"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-gray-500 font-medium mb-6">
            Selecciona un modificador de tu inventario para potenciar este cromo:
          </p>

          {/* Grid de Modificadores Disponibles (Idéntico a Desktop - 5) */}
          <div className="grid grid-cols-2 gap-4 items-start">
            {/* Carta Modificadora 1: La carta dorada "+4" */}
            <div
              onClick={() => setSelectedId('plus4')}
              className={`cursor-pointer group flex flex-col items-center p-1 rounded-2xl transition-all duration-200 ${
                selectedId === 'plus4'
                  ? 'ring-3 ring-[#E5AC32] scale-102 shadow-lg'
                  : 'hover:scale-102 hover:shadow-md'
              }`}
            >
              <div className="w-full aspect-[3/4.2] rounded-xl bg-gradient-to-b from-[#F2C044] via-[#ECA930] to-[#E39322] p-2 flex flex-col items-center justify-between border-2 border-[#D98218] shadow-inner relative overflow-hidden">
                {/* Patrón de muescas / bordes decorativos estilo carta UNO/TCG */}
                <div className="w-full flex justify-between items-center text-[#B85709] font-black text-xs">
                  <span>★</span>
                  <div className="w-4 h-1.5 bg-[#D98218]/40 rounded-full" />
                  <span>★</span>
                </div>

                {/* Gran "+4" en el centro */}
                <div className="flex items-center justify-center flex-grow">
                  <span className="text-4xl sm:text-5xl font-black text-[#D94818] tracking-tighter drop-shadow-sm group-hover:scale-110 transition-transform">
                    +4
                  </span>
                </div>

                {/* Borde inferior */}
                <div className="w-full flex justify-between items-center text-[#B85709] font-black text-xs">
                  <span>★</span>
                  <div className="w-4 h-1.5 bg-[#D98218]/40 rounded-full" />
                  <span>★</span>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-700 mt-2 text-center">
                Carta +4
              </span>
            </div>

            {/* Carta Modificadora 2: La carta azul / celestial / vortex */}
            <div
              onClick={() => setSelectedId('vortex')}
              className={`cursor-pointer group flex flex-col items-center p-1 rounded-2xl transition-all duration-200 ${
                selectedId === 'vortex'
                  ? 'ring-3 ring-blue-500 scale-102 shadow-lg'
                  : 'hover:scale-102 hover:shadow-md'
              }`}
            >
              <div className="w-full aspect-[3/4.2] rounded-xl bg-gradient-to-b from-[#3A88C8] via-[#245D98] to-[#12396B] p-2 flex flex-col items-center justify-between border-2 border-[#54A0E0] shadow-inner relative overflow-hidden">
                {/* Brillo cósmico */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] animate-pulse" />

                {/* Ilustración de vórtice azul */}
                <div className="relative z-10 w-full flex justify-between text-blue-200 text-xs font-bold">
                  <span>⚡</span>
                  <span>ECO</span>
                </div>

                <div className="relative z-10 flex items-center justify-center flex-grow">
                  <svg
                    className="w-12 h-12 text-white/90 drop-shadow-md group-hover:rotate-45 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                </div>

                <div className="relative z-10 w-full text-center text-[10px] font-bold text-blue-100 tracking-wider">
                  POTENCIADOR
                </div>
              </div>
              <span className="text-xs font-bold text-gray-700 mt-2 text-center">
                Vórtice Eco
              </span>
            </div>
          </div>

          {/* Potenciadores adicionales de BBDD si existen */}
          {dbModifiers.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                De tu Inventario (BBDD):
              </p>
              <div className="flex flex-col gap-2">
                {dbModifiers.map((dbMod, idx) => (
                  <div
                    key={dbMod?.id ?? `mod-${idx}`}
                    onClick={() => setSelectedId(dbMod.id)}
                    className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer border transition ${
                      selectedId === dbMod.id
                        ? 'border-[#E5AC32] bg-[#E5AC32]/10'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={dbMod.imagen}
                      alt={dbMod.nombre}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-gray-800">{dbMod.nombre}</p>
                      <p className="text-[10px] text-gray-500">{dbMod.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botón Inferior: "Añadir" */}
        <div className="pt-6 border-t border-gray-100 flex justify-center">
          <button
            onClick={handleApply}
            className="w-full max-w-[200px] bg-[#CCD5A2] hover:bg-[#BFCA91] active:scale-98 text-gray-800 font-bold py-2.5 px-8 rounded-xl shadow-xs border border-[#BAC58B] transition-all text-sm cursor-pointer"
          >
            Añadir
          </button>
        </div>
      </aside>
    </div>
  );
}
