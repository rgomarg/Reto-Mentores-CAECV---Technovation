import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardItem from '../components/CardItem';
import { useUser } from '../context/UserContext';
import { INITIAL_CARDS, type ExtendedCromoData } from '../data/cardsData';

type FilterType = 'Conseguidas' | 'Convencionales' | 'Ecológicas' | 'Shiny' | 'Todas';

export default function Album() {
  const navigate = useNavigate();
  const { currentUser, loading } = useUser();
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todas');

  const filterTabs: FilterType[] = [
    'Conseguidas',
    'Convencionales',
    'Ecológicas',
    'Shiny',
    'Todas',
  ];

  // Combinar los cromos del usuario con los 6 cromos del diseño
  const cards: ExtendedCromoData[] = useMemo(() => {
    const baseCards = [...INITIAL_CARDS];

    // Si el usuario tiene cromos de BBDD en su perfil, actualizar de forma segura con optional chaining
    if (currentUser?.usuarioCromos && Array.isArray(currentUser.usuarioCromos)) {
      currentUser.usuarioCromos.forEach((uc) => {
        if (!uc?.cromo?.id) return;
        const matchingIndex = baseCards.findIndex((b) => b?.id === uc.cromo.id);
        if (matchingIndex !== -1) {
          baseCards[matchingIndex] = {
            ...baseCards[matchingIndex],
            nombre: uc.cromo.nombre || baseCards[matchingIndex].nombre,
            imagen: uc.cromo.imagen || baseCards[matchingIndex].imagen,
            puntuacion: uc.cromo.puntuacion ?? baseCards[matchingIndex].puntuacion,
            atributos: uc.cromo.atributos?.length ? uc.cromo.atributos : baseCards[matchingIndex].atributos,
            esConseguida: true,
          };
        }
      });
    }

    return baseCards;
  }, [currentUser]);

  // Filtrado según la pestaña activa con encadenamiento opcional
  const filteredCards = useMemo(() => {
    if (!cards || !Array.isArray(cards)) return [];
    if (activeFilter === 'Todas') return cards;
    if (activeFilter === 'Conseguidas') return cards.filter((c) => c?.esConseguida);
    return cards.filter((c) => c?.categoria === activeFilter);
  }, [cards, activeFilter]);

  const totalCardsInCollection = 20;
  const ownedCount = cards?.filter((c) => c?.esConseguida)?.length ?? 4;

  return (
    <div className="min-h-screen bg-[#FAF8EB] flex flex-col font-sans text-gray-900 antialiased selection:bg-amber-200 relative pb-16">
      {/* Navbar Superior */}
      <Navbar activeTab="album" />

      {/* Pestañas de Filtrado Superiores (Desktop - 2) */}
      <section className="w-full pt-6 pb-6 px-4 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-[#DE6B58] text-white shadow-sm scale-102'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid de Cartas (Desktop - 2: Fila superior 4 cartas, Fila inferior 2 cartas) */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-2">
        {loading && (!cards || cards.length === 0) ? (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium animate-pulse">Cargando colección...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">No hay cartas en esta categoría todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 justify-center">
            {filteredCards.map((card, idx) => (
              <div key={card?.id ?? `card-${idx}`} className="flex justify-center">
                <div className="w-full max-w-[180px]">
                  <CardItem
                    cromo={card}
                    isConseguida={card?.esConseguida ?? true}
                    onClick={() => navigate(`/cromo/${card?.id || 3}`, { state: { card } })}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Contador Esquina Inferior Derecha ("4 / 20" + barra indicadora) */}
      <div className="fixed bottom-6 right-6 md:right-10 flex flex-col items-center select-none z-20 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xs px-3.5 py-1 rounded-md shadow-sm border border-gray-100 text-xs font-bold text-gray-800">
          <span>{ownedCount} / {totalCardsInCollection}</span>
        </div>
        {/* Barra oscura indicadora debajo del contador */}
        <div className="w-12 h-1 bg-black/80 rounded-full mt-1" />
      </div>
    </div>
  );
}
