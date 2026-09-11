import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardItem from '../components/CardItem';
import { useUser } from '../context/UserContext';
import type { ExtendedCromoData } from '../data/cardsData';
import type { CromoData } from '../context/UserContext';

type FilterType = 'Conseguidas' | 'Convencionales' | 'Ecológicas' | 'Shiny' | 'Todas';

const PLACEHOLDER_CARD_IMAGE = '/cromo.png';

export default function Album() {
  const navigate = useNavigate();
  const { currentUser, loading } = useUser();
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todas');
  const [allCromos, setAllCromos] = useState<CromoData[]>([]);

  const filterTabs: FilterType[] = [
    'Conseguidas',
    'Convencionales',
    'Ecológicas',
    'Shiny',
    'Todas',
  ];

  // Cargar todos los cromos existentes en la BBDD para saber el total
  useEffect(() => {
    fetch('/api/cromos')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Error al cargar cromos');
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setAllCromos(data as CromoData[]);
        }
      })
      .catch(() => {
        // Si falla, dejamos allCromos vacío — el total se mostrará como 0
      });
  }, []);

  // Construir el álbum completo: todos los cromos de la BBDD,
  // marcando cuáles tiene el usuario (esConseguida=true) y cuáles no.
  const cards: ExtendedCromoData[] = useMemo(() => {
    const ownedMap = new Map<number, boolean>();
    if (currentUser?.usuarioCromos && Array.isArray(currentUser.usuarioCromos)) {
      currentUser.usuarioCromos.forEach((uc) => {
        if (uc?.cromo?.id != null) {
          ownedMap.set(uc.cromo.id, true);
        }
      });
    }

    // Si aún no tenemos los cromos de la BBDD, mostrar solo los que tiene el usuario
    if (allCromos.length === 0) {
      return (currentUser?.usuarioCromos ?? []).map((uc): ExtendedCromoData => ({
        id: uc.cromo.id,
        nombre: uc.cromo.nombre,
        imagen: uc.cromo.imagen || PLACEHOLDER_CARD_IMAGE,
        puntuacion: uc.cromo.puntuacion,
        atributos: uc.cromo.atributos ?? [],
        categoria: 'Convencionales',
        esConseguida: true,
      }));
    }

    return allCromos.map((cromo): ExtendedCromoData => ({
      id: cromo.id,
      nombre: cromo.nombre,
      imagen: cromo.imagen || PLACEHOLDER_CARD_IMAGE,
      puntuacion: cromo.puntuacion,
      atributos: cromo.atributos ?? [],
      categoria: 'Convencionales',
      esConseguida: ownedMap.has(cromo.id),
    }));
  }, [allCromos, currentUser]);

  // Filtrado por pestaña activa
  const filteredCards = useMemo(() => {
    if (!cards || !Array.isArray(cards)) return [];
    if (activeFilter === 'Todas') return cards;
    if (activeFilter === 'Conseguidas') return cards.filter((c) => c?.esConseguida);
    return cards.filter((c) => c?.categoria === activeFilter);
  }, [cards, activeFilter]);

  const totalCardsInCollection = allCromos.length > 0 ? allCromos.length : cards.length;
  const ownedCount = cards.filter((c) => c?.esConseguida).length;

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

      {/* Grid de Cartas */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-2">
        {loading && cards.length === 0 ? (
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
                    isConseguida={card?.esConseguida ?? false}
                    onClick={() =>
                      card?.esConseguida
                        ? navigate(`/cromo/${card?.id}`, { state: { card } })
                        : undefined
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Contador Esquina Inferior Derecha */}
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

