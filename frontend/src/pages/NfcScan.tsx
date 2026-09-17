import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NfcScan() {
  const { id } = useParams(); // Por si quieres usar el id de la pegatina NFC
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isOpened || isAnimating) return;
    
    setIsAnimating(true);
    // Hacemos que el sobre "vibre" o haga algo y luego cambie al cromo
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
    }, 600); // 600ms de animación antes de abrir
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-teal-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Botón de volver */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="absolute top-8 left-6 rounded-3xl text-emerald-900 font-medium hover:bg-black/10 px-4 py-2 bg-black/5 transition-colors"
      >
        Volver
      </button>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">
          ¡Has encontrado un {id || 'nuevo'} lugar!
        </h1>
        <p className="text-emerald-700">Toca el sobre para descubrir tu cromo.</p>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center cursor-pointer perspective-1000" onClick={handleOpen}>
        
        {/* El Sobre */}
        {!isOpened && (
          <img 
            src="/sobre.png" 
            alt="Sobre cerrado" 
            className={`w-full h-auto object-contain drop-shadow-2xl transition-all duration-300 ${isAnimating ? 'scale-95 animate-pulse rotate-3' : 'hover:scale-105 hover:-translate-y-2'}`}
          />
        )}

        {/* El Cromo (aparece tras abrir) */}
        {isOpened && (
          <div className="animate-[fade-in-up_0.6s_ease-out_forwards]">
            <img 
              src="/cromo.png" 
              alt="Cromo de Naranjito" 
              className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl border-4 border-emerald-500 bg-white"
            />
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('/album'); // Te lleva al album tras conseguirlo
              }}
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Guardar en mi Álbum
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
