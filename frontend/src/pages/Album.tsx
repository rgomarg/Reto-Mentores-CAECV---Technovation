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

  useEffect(() => {
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
        ) : userCromos.length === 0 ? (
          <p className="text-xl font-bold mt-10 text-center text-emerald-900">Aún no tienes ningún cromo en tu álbum.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 w-full max-w-md items-start">
            {userCromos.map((uc: any, index: number) => {
              const cromo = uc.cromo;
              const isDestacado = index === lastIndexDestacado;
              
              return (
                <div 
                  key={uc.id}
                  onClick={() => navigate(`/cromo/${cromo.id}`)}
                  className={`aspect-[3/4] border-[2px] flex flex-col items-center justify-center p-2 shadow-sm transition duration-200 cursor-pointer 
                    ${isDestacado 
                      ? 'border-yellow-400 bg-yellow-100 scale-105 shadow-yellow-400/50 shadow-lg animate-pulse z-10' 
                      : 'border-[#3b873e] bg-[#a8e6a3] hover:scale-105 hover:shadow-md'
                    }`}
                >
                  <div className="w-full flex-grow bg-white/50 border border-black/20 rounded flex items-center justify-center mb-1 overflow-hidden p-1">
                    <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-center w-full truncate border-t border-black/20 pt-1">
                    {cromo.nombre}
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
