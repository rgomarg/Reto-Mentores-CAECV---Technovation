import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardVisual from '../components/CardVisual';
import ModifierSidebar from '../components/ModifierSidebar';
import { useUser } from '../context/UserContext';
import { INITIAL_CARDS, type ExtendedCromoData } from '../data/cardsData';

export default function CromoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useUser();

  // Estado del cromo con fallback robusto garantizado
  const [cromo, setCromo] = useState<ExtendedCromoData>(() => {
    if (location.state?.card) {
      return location.state.card;
    }
    const targetId = id ? parseInt(id, 10) : 3;
    const found = INITIAL_CARDS.find((c) => c?.id === targetId);
    return found || INITIAL_CARDS[2]; // Default a Alolan Vulpix (ID 3, igual a Desktop - 3)
  });

  // Estado del panel de modificadores (Desktop - 5)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modifierBoost, setModifierBoost] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cargar datos de la API de forma segura si no los teníamos por state
  useEffect(() => {
    if (!location.state?.card && id) {
      fetch(`/api/cromos/${id}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('No encontrado');
        })
        .then((data) => {
          if (data && typeof data === 'object') {
            setCromo((prev) => ({
              ...prev,
              id: parseInt(id, 10),
              nombre: data.nombre || prev?.nombre || 'Cromo',
              imagen: data.imagen || prev?.imagen,
              puntuacion: data.puntuacion ?? prev?.puntuacion ?? 15,
              atributos: Array.isArray(data.atributos) && data.atributos.length ? data.atributos : prev?.atributos,
            }));
          }
        })
        .catch(() => {
          // Mantener el cromo por defecto
        });
    }
  }, [id, location.state]);

  const handleApplyModifier = (modifier: { nombre?: string; puntos?: number }) => {
    setModifierBoost((prev) => prev + (modifier?.puntos ?? 4));
    setIsSidebarOpen(false);
    setToastMessage(`¡Modificador "${modifier?.nombre || 'Bonus'}" aplicado con éxito!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8EB] flex flex-col font-sans text-gray-900 antialiased selection:bg-amber-200 relative pb-12">
      {/* Navbar Superior */}
      <Navbar activeTab="album" />

      {/* Subheader: Botón Volver + Título "Pokemon ecológico" (Desktop - 3) */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-6 pb-2 flex items-center gap-3">
        <button
          onClick={() => navigate('/album')}
          className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black/10 active:scale-95 transition cursor-pointer"
          title="Volver al Álbum"
        >
          <span className="text-sm font-bold">←</span>
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-black tracking-tight">
          {cromo?.nombre || 'Detalle de Carta'}
        </h1>
      </section>

      {/* Centro: Carta Ampliada + Botón "Añadir modificador" */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-4 sm:py-6">
        {/* Contenedor de la carta ampliada */}
        <div className="relative transform hover:scale-[1.01] transition-transform duration-300">
          <CardVisual card={cromo} size="lg" modifierBoost={modifierBoost} />
        </div>

        {/* Botón Inferior: "Añadir modificador" */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-[#CCD5A2] hover:bg-[#BFCA91] active:scale-98 text-gray-800 font-semibold px-8 py-2.5 rounded-xl shadow-xs border border-[#BAC58B] transition-all text-sm sm:text-base cursor-pointer"
          >
            Añadir modificador
          </button>
        </div>
      </main>

      {/* Mensaje Toast de éxito al aplicar modificador */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-xs text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-amber-400">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Panel Lateral de Modificadores (Desktop - 5) */}
      <ModifierSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onApplyModifier={handleApplyModifier}
        usuarioPotenciadores={currentUser?.usuarioPotenciadores || []}
      />
    </div>
  );
}
