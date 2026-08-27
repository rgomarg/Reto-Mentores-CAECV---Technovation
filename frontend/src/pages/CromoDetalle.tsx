import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function CromoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioCromo = location.state?.usuarioCromo;
  const usuarioId = location.state?.usuarioId;

  const [isFlipped, setIsFlipped] = useState(false);
  const [cromo, setCromo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal y Potenciadores State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPotenciadores, setUserPotenciadores] = useState<any[]>([]);
  const [potenciadorSeleccionado, setPotenciadorSeleccionado] = useState<number | null>(null);
  const [aplicando, setAplicando] = useState(false);

  useEffect(() => {
    fetch(`/api/cromos/${id}`)
      .then(res => res.json())
      .then(data => {
        setCromo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar el cromo:", err);
        setLoading(false);
      });
  }, [id]);

  const openModal = () => {
    if (!usuarioId) return;
    setIsModalOpen(true);
    fetch(`/api/usuarios/${usuarioId}`)
      .then(res => res.json())
      .then(data => {
        // Filtramos solo los que tengan usos disponibles
        setUserPotenciadores(data.usuarioPotenciadores.filter((up: any) => up.cantidad - (up.cantidadUsada || 0) > 0));
      });
  };

  const aplicarPotenciador = () => {
    if (!potenciadorSeleccionado || !usuarioCromo) return;
    setAplicando(true);
    
    fetch(`/api/nfc/cromo/aplicar-potenciador/${usuarioCromo.id}/${potenciadorSeleccionado}`, {
      method: 'POST'
    })
    .then(res => {
      if (res.ok) {
        // Volvemos al album simulando una recarga
        navigate(`/dashboard/${usuarioId}/album`);
      } else {
        alert("Error al aplicar potenciador");
        setAplicando(false);
      }
    })
    .catch(err => {
      console.error(err);
      setAplicando(false);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
        <p className="text-white text-xl">Cargando cromo...</p>
      </div>
    );
  }

  if (!cromo) {
    return (
      <div className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
        <p className="text-white text-xl">Cromo no encontrado</p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-white text-black px-4 py-2 rounded">Volver</button>
      </div>
    );
  }

  const hasPotenciador = usuarioCromo?.potenciadorAplicado != null;
  const cardBorderClass = hasPotenciador ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'border-[#3b873e]';

  return (
    <div className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4 relative font-sans text-black overflow-hidden">
      
      {/* Botón X de cerrar */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-50 text-2xl font-bold"
      >
        ✕
      </button>

      {!isFlipped && (
        <div className="absolute top-4 text-white/50 animate-pulse text-lg font-medium">
          Toca la carta para girarla
        </div>
      )}

      {/* Contenedor de la carta con perspectiva 3D */}
      <div className="w-full max-w-sm aspect-[3/4] perspective-[1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* CARA FRONTAL */}
          <div className={`absolute w-full h-full backface-hidden bg-[#a8e6a3] border-4 rounded-xl flex flex-col p-4 transition-all duration-300 ${cardBorderClass}`}>
            
            {hasPotenciador && (
               <div className="absolute -top-4 -right-4 text-white bg-blue-600 rounded-full p-2 shadow-lg border-2 border-white flex items-center gap-1">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span className="font-bold text-sm">POTENCIADO</span>
               </div>
            )}

            <div className="w-full h-1/2 border-2 border-black flex items-center justify-center bg-white/50 mb-2 overflow-hidden rounded">
              <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-center border-b-2 border-black pb-2 mb-4 drop-shadow-sm">
              {cromo.nombre}
            </h2>
            
            <div className="flex flex-col gap-2 flex-grow justify-center px-2 text-xl font-medium">
              <div className="text-center font-bold text-2xl mb-2 flex flex-col items-center">
                 <span>Puntos Base: {cromo.puntuacion}</span>
                 {hasPotenciador && (
                   <span className="text-blue-700 text-lg">
                     ¡Mejora activa: {usuarioCromo.potenciadorAplicado.nombre}!
                   </span>
                 )}
              </div>
            </div>
          </div>

          {/* CARA TRASERA */}
          <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-[#a8e6a3] border-4 rounded-xl flex flex-col shadow-2xl p-6 ${cardBorderClass}`}>
            <h2 className="text-4xl font-extrabold text-center border-b-2 border-black pb-4 mb-6">
              {cromo.nombre}
            </h2>
            
            <div className="flex-grow flex items-center justify-center text-center text-xl font-medium px-4 text-emerald-950 leading-relaxed overflow-y-auto">
              <p>
                Información extra sobre {cromo.nombre}. Este espacio está pensado para la parte de divulgación que habremos buscado. 
              </p>
            </div>
            
            <div className="text-center text-sm opacity-50 font-bold mt-4">
              Toca para girar
            </div>
          </div>

        </div>
      </div>
      
      {/* Botón de Potenciador (solo si el usuario posee el cromo) */}
      {usuarioCromo && (
        <div className="mt-10 z-10">
          {hasPotenciador ? (
            <button disabled className="bg-gray-500 text-white font-bold py-3 px-8 rounded-full opacity-60 cursor-not-allowed text-lg">
               Potenciador Activo
            </button>
          ) : (
            <button 
               onClick={openModal}
               className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_blue] transition-all text-lg animate-pulse"
            >
               Añadir Potenciador
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white text-black w-full max-w-sm rounded-2xl p-6 flex flex-col shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-black text-xl font-bold"
            >✕</button>
            <h3 className="text-2xl font-bold text-center mb-6">Elige un Potenciador</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6 max-h-[300px] overflow-y-auto p-2">
              {userPotenciadores.length === 0 ? (
                <p className="col-span-2 text-center text-gray-500">No tienes potenciadores disponibles.</p>
              ) : (
                userPotenciadores.map((up: any) => (
                  <div 
                    key={up.potenciador.id} 
                    onClick={() => setPotenciadorSeleccionado(up.potenciador.id)}
                    className={`aspect-square border-4 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer relative transition-all
                      ${potenciadorSeleccionado === up.potenciador.id ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 bg-gray-100 hover:bg-gray-200'}`}
                  >
                     <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                        x{up.cantidad - (up.cantidadUsada || 0)}
                     </span>
                     <img src={up.potenciador.imagen ? `/${up.potenciador.imagen}` : '/sobre.png'} alt={up.potenciador.nombre} className="w-10 h-10 object-contain mb-2" />
                     <span className="text-xs font-bold text-center leading-tight">{up.potenciador.nombre}</span>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={aplicarPotenciador}
              disabled={!potenciadorSeleccionado || aplicando}
              className={`w-full py-3 rounded-xl font-bold text-lg text-white transition-all
                ${potenciadorSeleccionado && !aplicando ? 'bg-blue-600 hover:bg-blue-700 shadow-[0_4px_15px_blue]' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {aplicando ? 'Aplicando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
