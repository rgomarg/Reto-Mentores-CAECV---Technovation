import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Usamos el state que se ha pasado desde el Dashboard
  const [userCromos, setUserCromos] = useState<any[]>(location.state?.cromos || []);
  const [loading, setLoading] = useState(!location.state?.cromos);
  const [destacadoId, setDestacadoId] = useState<number | null>(location.state?.nuevoCromoDestacado || null);

  const [allCromos, setAllCromos] = useState<any[]>([]);

  useEffect(() => {
    // Cargar catálogo completo
    fetch('/api/cromos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllCromos(data);
      })
      .catch(err => console.error("Error al cargar catálogo:", err));

    // Solo hacemos fetch si por algún casual se recarga la página, o si venimos de la página de NFC 
    // donde solo pasamos el nuevoCromoDestacado y no la lista entera de cromos
    if (!location.state?.cromos && id) {
      fetch(`/api/usuarios/${id}`)
        .then(res => res.json())
        .then(data => {
          setUserCromos(data.usuarioCromos);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al cargar los cromos del usuario:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, location.state]);

  // Quitar el destacado a los 5 segundos
  useEffect(() => {
    if (destacadoId) {
      const timer = setTimeout(() => {
        setDestacadoId(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [destacadoId]);

  // Buscamos cuál es el último índice de este cromo en la lista para no iluminar repetidos
  const lastIndexDestacado = destacadoId 
    ? userCromos.map(u => u.cromo.id).lastIndexOf(destacadoId) 
    : -1;

  // Calculamos los cromos que NO tiene el usuario
  const ownedCromoIds = new Set(userCromos.map(uc => uc.cromo.id));
  const unownedCromos = allCromos.filter(c => !ownedCromoIds.has(c.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col font-sans text-black pb-8">
      {/* Header Section */}
      <div className="flex flex-col px-6 pt-12 pb-4">
        <button className='rounded-3xl hover:bg-amber-600 self-start w-fit px-4 py-2 bg-black/10'
                onClick={() => navigate(`/dashboard/${id}`)}>
          Volver
        </button>
        <h1 className="text-6xl font-extrabold text-center mb-6 tracking-tight">
          Album
        </h1>
        <div className="text-right text-lg font-medium pr-2">
          Filtro: Mas recientes
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Grid Content */}
      <div className="p-6 flex-grow flex justify-center">
        {loading ? (
          <p className="text-xl font-bold mt-10">Cargando tu colección...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 w-full max-w-md items-start">
            {/* Cromos del usuario */}
            {userCromos.map((uc: any, index: number) => {
              const cromo = uc.cromo;
              const isDestacado = index === lastIndexDestacado;
              const hasPotenciador = uc.potenciadorAplicado != null;
              
              return (
                <div 
                  key={uc.id}
                  onClick={() => navigate(`/cromo/${cromo.id}`, { state: { usuarioCromo: uc, usuarioId: id } })}
                  className={`aspect-[3/4] border-[2px] flex flex-col items-center justify-center p-2 shadow-sm transition duration-200 cursor-pointer relative
                    ${isDestacado 
                      ? 'border-yellow-400 bg-yellow-100 scale-105 shadow-yellow-400/50 shadow-lg animate-pulse z-10' 
                      : hasPotenciador
                        ? 'border-blue-500 bg-blue-50 shadow-[0_0_15px_rgba(59,130,246,0.6)] hover:scale-105'
                        : 'border-[#3b873e] bg-[#a8e6a3] hover:scale-105 hover:shadow-md'
                    }`}
                >
                  {hasPotenciador && (
                     <div className="absolute -top-2 -right-2 text-blue-600 bg-white rounded-full p-1 shadow-md border border-blue-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                     </div>
                  )}
                  <div className="w-full flex-grow bg-white/50 border border-black/20 rounded flex items-center justify-center mb-1 overflow-hidden p-1">
                    <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-center w-full truncate border-t border-black/20 pt-1">
                    {cromo.nombre}
                  </span>
                </div>
              );
            })}
            
            {/* Cromos faltantes */}
            {unownedCromos.map(cromo => (
               <div 
                 key={`unowned-${cromo.id}`}
                 onClick={() => navigate(`/cromo/${cromo.id}`)}
                 className="aspect-[3/4] border-[2px] border-[#3b873e] bg-[#a8e6a3] grayscale opacity-60 flex flex-col items-center justify-center p-2 shadow-sm cursor-pointer hover:opacity-80 transition"
               >
                 <div className="w-full flex-grow bg-white/50 border border-black/20 rounded flex items-center justify-center mb-1 overflow-hidden p-1">
                   <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain" />
                 </div>
                 <span className="text-xs font-bold text-center w-full truncate border-t border-black/20 pt-1">
                   {cromo.nombre}
                 </span>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
