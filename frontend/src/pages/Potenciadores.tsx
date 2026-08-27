import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Potenciadores() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [allPotenciadores, setAllPotenciadores] = useState<any[]>([]);
  const [userPotenciadores, setUserPotenciadores] = useState<any[]>(location.state?.potenciadores || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch de todos los potenciadores del catálogo
    fetch('/api/potenciadores')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllPotenciadores(data);
        } else {
          console.error("El backend no devolvió un array:", data);
          setAllPotenciadores([]);
        }
        
        // 2. Si no teníamos los del usuario (ej. refrescar página), los pedimos también
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

  // Preparamos la lista de cartas a dibujar
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
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col font-sans text-black pb-8">
      {/* Header Section */}
      <div className="flex flex-col px-6 pt-12 pb-4">
        <button className='rounded-3xl hover:bg-amber-600 self-start w-fit px-4 py-2 bg-black/10 mb-2'
                onClick={() => navigate(-1)}>
          Volver
        </button>
        <h1 className="text-5xl font-extrabold text-center mb-6 tracking-tight px-2 break-words">Potenciadores</h1>
        <div className="text-right text-lg font-medium pr-2">
          Filtro: Todos
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Grid Content */}
      <div className="p-6 flex-grow flex justify-center">
        {loading ? (
          <p className="text-xl font-bold mt-10">Cargando catálogo...</p>
        ) : allPotenciadores.length === 0 ? (
          <p className="text-xl font-bold mt-10 text-center text-emerald-900">No hay potenciadores disponibles en el juego aún.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 w-full max-w-md items-start">
            {cardsToRender.map(card => {
              return (
                <div 
                  key={card.uniqueKey}
                  className={`aspect-[3/4] border-[2px] flex flex-col items-center justify-center p-2 shadow-sm transition duration-200 relative overflow-hidden
                    ${card.isOwned && !card.isUsado ? 'border-[#3b873e] bg-[#a8e6a3] hover:scale-105 cursor-pointer hover:shadow-md' : ''}
                    ${card.isOwned && card.isUsado ? 'border-blue-500 bg-blue-800 shadow-[0_0_15px_blue] opacity-90 cursor-not-allowed' : ''}
                    ${!card.isOwned ? 'border-[#3b873e] bg-[#a8e6a3] grayscale opacity-60' : ''}`}
                >
                  {card.isUsado && (
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded">
                        <span className="text-white font-black text-lg rotate-[-20deg] border-2 border-white px-2 py-1 uppercase tracking-widest shadow-xl bg-blue-600/80 backdrop-blur-sm">
                           USADO
                        </span>
                     </div>
                  )}
                  <div className="w-full flex-grow bg-white/50 border border-black/20 rounded flex items-center justify-center mb-1 overflow-hidden p-1 relative">
                    <img src={card.potenciador.imagen ? `/${card.potenciador.imagen}` : '/sobre.png'} alt={card.potenciador.nombre} className="w-full h-full object-contain" />
                  </div>
                  <span className={`text-xs font-bold text-center w-full break-words border-t border-black/20 pt-1 leading-tight ${card.isUsado ? 'text-white' : 'text-black'}`}>
                    {card.potenciador.nombre}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
