import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Potenciadores() {
  const { id } = useParams();
  
  const location = useLocation();
  
  const [allPotenciadores, setAllPotenciadores] = useState<any[]>([]);
  const [userPotenciadores, setUserPotenciadores] = useState<any[]>(location.state?.potenciadores || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/potenciadores')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllPotenciadores(data);
        } else {
          setAllPotenciadores([]);
        }
        
        if (!location.state?.potenciadores && id) {
          return fetch(`/api/usuarios/${id}`)
            .then(res => res.json())
            .then(userData => {
              setUserPotenciadores(userData.usuarioPotenciadores);
            });
        }
      })
      .catch(err => console.error("Error cargando potenciadores:", err))
      .finally(() => setLoading(false));
  }, [id, location.state]);

  const cardsToRender: { potenciador: any; isOwned: boolean; isUsado: boolean; uniqueKey: string }[] = [];

  allPotenciadores.forEach(potenciador => {
     const up = userPotenciadores.find((u: any) => u.potenciador.id === potenciador.id);
     if (up && up.cantidad > 0) {
        for (let i = 0; i < up.cantidadUsada; i++) {
           cardsToRender.push({ potenciador, isOwned: true, isUsado: true, uniqueKey: `${potenciador.id}-used-${i}` });
        }
        for (let i = 0; i < (up.cantidad - (up.cantidadUsada || 0)); i++) {
           cardsToRender.push({ potenciador, isOwned: true, isUsado: false, uniqueKey: `${potenciador.id}-avail-${i}` });
        }
     } else {
        cardsToRender.push({ potenciador, isOwned: false, isUsado: false, uniqueKey: `${potenciador.id}-unowned` });
     }
  });

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C] pb-8">
      
      {/* Menú Global */}
      <Navbar />

      {/* Cabecera de Sección */}
      <div className="flex flex-col px-4 md:px-8 pt-8 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight px-2 break-words text-center md:text-left">
          Modificadores
        </h1>
      </div>

      {/* Grid Content */}
      <div className="px-4 md:px-8 flex-grow flex justify-center w-full">
        {loading ? (
          <p className="text-xl font-bold mt-10">Cargando catálogo...</p>
        ) : allPotenciadores.length === 0 ? (
          <p className="text-xl font-medium mt-10 text-center">No hay modificadores disponibles en el juego aún.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-6xl items-start">
            {cardsToRender.map(card => {
              return (
                <div 
                  key={card.uniqueKey}
                  className={`aspect-[3/4] border-[2px] flex flex-col items-center justify-center p-2 shadow-sm transition duration-200 relative overflow-hidden rounded-md
                    ${card.isOwned && !card.isUsado ? 'border-[#C1C69A] bg-[#C1C69A]/10 hover:scale-105 cursor-pointer hover:shadow-md' : ''}
                    ${card.isOwned && card.isUsado ? 'border-gray-500 bg-gray-200 shadow-none opacity-80 cursor-not-allowed grayscale-[50%]' : ''}
                    ${!card.isOwned ? 'border-transparent bg-white grayscale opacity-50' : ''}`}
                >
                  {card.isUsado && (
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded">
                        <span className="text-white font-black text-sm md:text-base rotate-[-20deg] border-2 border-white px-2 py-1 uppercase tracking-widest shadow-lg bg-gray-800/80 backdrop-blur-sm">
                           USADO
                        </span>
                     </div>
                  )}
                  <div className="w-full h-full rounded flex items-center justify-center overflow-hidden relative">
                    <img src={card.potenciador.imagen ? `/${card.potenciador.imagen}` : '/sobre.png'} alt={card.potenciador.nombre} className="w-full h-full object-contain" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
