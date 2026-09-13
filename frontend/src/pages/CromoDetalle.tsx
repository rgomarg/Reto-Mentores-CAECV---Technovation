import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CromoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioCromo = location.state?.usuarioCromo;
  const usuarioId = location.state?.usuarioId;

  const [isFlipped, setIsFlipped] = useState(false);
  const [cromo, setCromo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal (Panel Lateral) State
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

  const openSidebar = () => {
    if (!usuarioId) return;
    setIsModalOpen(true);
    fetch(`/api/usuarios/${usuarioId}`)
      .then(res => res.json())
      .then(data => {
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
      <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl font-semibold text-[#1C201C]">Cargando cromo...</p>
        </div>
      </div>
    );
  }

  if (!cromo) {
    return (
      <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-xl font-semibold mb-4 text-[#1C201C]">Cromo no encontrado</p>
          <button onClick={() => navigate(-1)} className="bg-[#C1C69A] text-black px-6 py-2 rounded-xl font-medium shadow-sm">Volver</button>
        </div>
      </div>
    );
  }

  const hasPotenciador = usuarioCromo?.potenciadorAplicado != null;

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C] overflow-hidden relative">
      <Navbar />

      {/* Contenido Principal con layout para sidebar */}
      <div className="flex flex-grow relative w-full overflow-hidden">
        
        {/* Contenedor Izquierdo (Cromo) */}
        <div className={`flex-grow flex flex-col items-center py-6 px-4 transition-all duration-300 ${isModalOpen ? 'pr-80' : ''}`}>
          
          {/* Cabecera de Categoría (Flecha + Texto) */}
          <div className="w-full max-w-2xl flex items-center mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l-4 4 4 4" />
                <path d="M16 12H8" />
              </svg>
            </button>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Pokemon ecológico</h2>
          </div>

          {/* Cromo Flotante 3D */}
          <div className="w-full max-w-[280px] sm:max-w-xs aspect-[3/4] perspective-[1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* CARA FRONTAL */}
              <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${hasPotenciador ? 'ring-4 ring-blue-500 shadow-blue-500/50' : ''}`}>
                <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-cover" />
                
                {hasPotenciador && (
                   <div className="absolute top-2 right-2 text-white bg-blue-600 rounded-full p-2 shadow-lg border-2 border-white flex items-center gap-1 z-10">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                   </div>
                )}
              </div>

              {/* CARA TRASERA */}
              <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-[#C1C69A] border-[8px] border-white rounded-xl shadow-2xl flex flex-col p-6 items-center justify-center ${hasPotenciador ? 'ring-4 ring-blue-500 shadow-blue-500/50' : ''}`}>
                <h2 className="text-3xl font-extrabold text-center border-b-2 border-black pb-2 mb-4">
                  {cromo.nombre}
                </h2>
                <div className="text-center font-bold text-xl mb-4">
                   Puntos: {cromo.puntuacion}
                </div>
                <div className="text-center font-medium leading-tight">
                  <p>Información extra o datos curiosos sobre esta carta.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón Añadir modificador */}
          {usuarioCromo && (
            <div className="mt-12">
              {hasPotenciador ? (
                <button disabled className="bg-gray-400 text-white font-semibold py-4 px-8 rounded-xl shadow-inner cursor-not-allowed text-xl transition-all">
                   Modificador Activo
                </button>
              ) : (
                <button 
                   onClick={openSidebar}
                   className="bg-[#C1C69A] hover:bg-[#b0b588] text-[#1C201C] font-semibold py-4 px-10 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:shadow-md transition-all text-xl"
                >
                   Añadir modificador
                </button>
              )}
            </div>
          )}

        </div>

        {/* Overlay oscuro móvil (opcional para enfocar el sidebar) */}
        {isModalOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40" 
            onClick={() => setIsModalOpen(false)}
          ></div>
        )}

        {/* Sidebar Derecho (Potenciadores) */}
        <div 
          className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Header Sidebar */}
          <div className="p-6 border-b flex justify-between items-center bg-[#FCF6DF]">
            <h3 className="text-2xl font-bold">Modificadores</h3>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lista de Potenciadores */}
          <div className="flex-grow overflow-y-auto p-6">
            {userPotenciadores.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">No tienes modificadores disponibles.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {userPotenciadores.map((up: any) => (
                  <div 
                    key={up.potenciador.id} 
                    onClick={() => setPotenciadorSeleccionado(up.potenciador.id)}
                    className={`aspect-[3/4] border-[3px] rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer relative transition-all overflow-hidden shadow-sm
                      ${potenciadorSeleccionado === up.potenciador.id ? 'border-[#DE6D5C] scale-105 shadow-md' : 'border-transparent hover:border-gray-200 bg-gray-50'}`}
                  >
                     <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow z-10">
                        x{up.cantidad - (up.cantidadUsada || 0)}
                     </span>
                     <div className="w-full h-full flex items-center justify-center overflow-hidden">
                       <img src={up.potenciador.imagen ? `/${up.potenciador.imagen}` : '/sobre.png'} alt={up.potenciador.nombre} className="w-full h-full object-contain" />
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sidebar (Botón Confirmar) */}
          <div className="p-6 border-t bg-gray-50 flex justify-center">
            <button 
              onClick={aplicarPotenciador}
              disabled={!potenciadorSeleccionado || aplicando}
              className={`w-full max-w-[200px] py-4 rounded-xl font-bold text-lg text-[#1C201C] transition-all shadow-md
                ${potenciadorSeleccionado && !aplicando ? 'bg-[#C1C69A] hover:bg-[#b0b588]' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
            >
              {aplicando ? 'Aplicando...' : 'AÑADIR'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
