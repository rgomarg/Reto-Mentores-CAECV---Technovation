import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userCromos, setUserCromos] = useState<any[]>(location.state?.cromos || []);
  const [loading, setLoading] = useState(!location.state?.cromos);
  const [destacadoId, setDestacadoId] = useState<number | null>(location.state?.nuevoCromoDestacado || null);
  const [allCromos, setAllCromos] = useState<any[]>([]);

  // Filtros
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const filtros = ['Conseguidas', 'Convencionales', 'Shiny', 'Todas'];

  useEffect(() => {
    fetch('/api/cromos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllCromos(data);
      })
      .catch(err => console.error("Error al cargar catálogo:", err));

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

  useEffect(() => {
    if (destacadoId) {
      const timer = setTimeout(() => {
        setDestacadoId(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [destacadoId]);

  const lastIndexDestacado = destacadoId 
    ? userCromos.map(u => u.cromo.id).lastIndexOf(destacadoId) 
    : -1;

  const ownedMap = new Map(userCromos.map(uc => [uc.cromo.id, uc]));

  const displayItems = allCromos
    .filter(cromo => {
      if (filtroActivo === 'Shiny') return cromo.nombre.includes('CAECV');
      if (filtroActivo === 'Convencionales') return !cromo.nombre.includes('CAECV');
      if (filtroActivo === 'Conseguidas') return ownedMap.has(cromo.id);
      return true; // Todas
    })
    .sort((a, b) => {
      const aOwned = ownedMap.has(a.id);
      const bOwned = ownedMap.has(b.id);
      if (aOwned && !bOwned) return -1;
      if (!aOwned && bOwned) return 1;
      return a.nombre.localeCompare(b.nombre);
    })
    .map(cromo => ({
      cromo,
      isOwned: ownedMap.has(cromo.id),
      uc: ownedMap.get(cromo.id)
    }));

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C] relative pb-20">
      
      {/* Menú Global */}
      <Navbar />

      {/* Filtros Píldora (Responsive scrollable horizontal en móvil) */}
      <div className="w-full flex justify-start sm:justify-center overflow-x-auto py-6 px-4 gap-2 sm:gap-4 no-scrollbar">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            onClick={() => setFiltroActivo(filtro)}
            className={`whitespace-nowrap px-4 py-2 sm:px-6 sm:py-2 rounded-full font-bold shadow-sm transition-all
              ${filtroActivo === filtro ? 'bg-[#DE6D5C] text-white' : 'bg-white text-gray-800 hover:bg-gray-50'}
            `}
          >
            {filtro}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="px-4 md:px-8 flex-grow flex justify-center w-full">
        {loading ? (
          <p className="text-xl font-bold mt-10">Cargando tu colección...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-6xl items-start">
            
            {/* Cromos unificados y ordenados */}
            {displayItems.map((item) => {
              const { cromo, isOwned, uc } = item;
              const isShiny = cromo.nombre.includes('CAECV');

              if (isOwned) {
                const isDestacado = cromo.id === destacadoId;
                const hasPotenciador = uc.potenciadorAplicado != null;
                
                return (
                  <div 
                    key={uc.id}
                    onClick={() => navigate(`/cromo/${cromo.id}`, { state: { usuarioCromo: uc, usuarioId: id } })}
                    className={`aspect-[3/4] border-[2px] flex flex-col items-center justify-center p-2 shadow-sm transition duration-200 cursor-pointer relative rounded-md
                      ${isDestacado 
                        ? 'border-yellow-400 bg-yellow-100 scale-105 shadow-yellow-400/50 shadow-lg animate-pulse z-10' 
                        : hasPotenciador
                          ? 'border-blue-500 bg-blue-50 shadow-[0_0_15px_rgba(59,130,246,0.6)] hover:scale-105'
                          : 'border-transparent bg-white hover:scale-105 hover:shadow-md'
                      }`}
                  >
                    {isShiny && (
                       <div className="absolute top-1 left-1 bg-yellow-400 text-yellow-900 text-[10px] font-black px-1.5 py-0.5 rounded-sm shadow-sm z-10">
                          ✨ SHINY
                       </div>
                    )}
                    {hasPotenciador && (
                       <div className="absolute -top-2 -right-2 text-blue-600 bg-white rounded-full p-1 shadow-md border border-blue-200 z-10">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                       </div>
                    )}
                    <div className="w-full h-full rounded flex items-center justify-center overflow-hidden relative">
                      <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain" />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div 
                    key={`unowned-${cromo.id}`}
                    onClick={() => navigate(`/cromo/${cromo.id}`)}
                    className="aspect-[3/4] border-[2px] border-transparent bg-white flex flex-col items-center justify-center p-2 shadow-sm cursor-pointer hover:bg-gray-50 transition rounded-md relative"
                  >
                    {isShiny && (
                       <div className="absolute top-1 left-1 bg-yellow-400 text-yellow-900 text-[10px] font-black px-1.5 py-0.5 rounded-sm shadow-sm z-10">
                          ✨ SHINY
                       </div>
                    )}
                    <div className="w-full h-full rounded flex items-center justify-center overflow-hidden relative grayscale opacity-50">
                      <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      {/* Indicador de progreso flotante */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end">
         <div className="bg-white px-6 py-2 rounded-full shadow-md font-extrabold text-lg sm:text-xl border border-gray-100 mb-2">
            {userCromos.length} / {allCromos.length}
         </div>
         {/* Barra de progreso visual */}
         <div className="w-24 h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black rounded-full" 
              style={{ width: `${allCromos.length > 0 ? (userCromos.length / allCromos.length) * 100 : 0}%` }}
            ></div>
         </div>
      </div>

    </div>
  );
}
