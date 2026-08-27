import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function NFCPage() {
  const { idCromo } = useParams();
  const navigate = useNavigate();
  const [cromo, setCromo] = useState<any>(null);
  const [estado, setEstado] = useState<'sobre' | 'abriendo' | 'revelado' | 'repetido'>('sobre');
  const [guardando, setGuardando] = useState(false);
  const [isRepetido, setIsRepetido] = useState(false);

  const loggedUserId = localStorage.getItem('loggedUserId');

  useEffect(() => {
    // 1. Verificamos sesión
    if (!loggedUserId) {
      navigate(`/perfiles?redirect=/nfc/cromo/${idCromo}`);
      return;
    }

    // 2. Fetch para saber qué cromo viene en el sobre
    fetch(`/api/cromos/${idCromo}`)
      .then(res => res.json())
      .then(data => setCromo(data))
      .catch(err => console.error("Error al cargar cromo:", err));

    // 3. Comprobar si el usuario ya lo tiene
    fetch(`/api/usuarios/${loggedUserId}`)
      .then(res => res.json())
      .then(userData => {
        const tieneRepetido = userData.usuarioCromos.some((uc: any) => uc.cromo.id === Number(idCromo));
        setIsRepetido(tieneRepetido);
      })
      .catch(err => console.error("Error al comprobar usuario:", err));
  }, [idCromo, loggedUserId, navigate]);

  const abrirSobre = () => {
    if (estado !== 'sobre') return;
    setEstado('abriendo');
    
    // Simulamos el tiempo de animación antes de revelar
    setTimeout(() => {
      if (isRepetido) {
         setEstado('repetido');
      } else {
         setEstado('revelado');
      }
    }, 1500);
  };

  const guardarCromo = () => {
    if (guardando) return;
    setGuardando(true);
    
    fetch('/api/nfc/cromo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUsuario: Number(loggedUserId),
        idCromo: Number(idCromo)
      })
    })
    .then(res => {
      if (res.ok) {
        navigate(`/dashboard/${loggedUserId}/album`, { state: { nuevoCromoDestacado: Number(idCromo) } });
      } else {
        alert("Hubo un error al guardar el cromo");
        setGuardando(false);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Hubo un error de red");
      setGuardando(false);
    });
  };

  if (!cromo) {
    return (
      <div className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
        <p className="text-white text-xl">Cargando datos NFC...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
      
      <h1 className="text-4xl font-extrabold text-center mb-8 drop-shadow-md text-emerald-950">
        ¡Has encontrado algo!
      </h1>

      {estado === 'sobre' && (
        <div 
          onClick={abrirSobre}
          className="w-64 h-64 cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center animate-bounce"
        >
          <img src="/sobre.png" alt="Sobre Misterioso" className="w-full object-contain drop-shadow-2xl" />
          <div className="absolute bg-white/80 text-black px-4 py-2 rounded-full font-bold shadow-lg mt-40 text-center">
            ¡Toca para abrir!
          </div>
        </div>
      )}

      {estado === 'abriendo' && (
        <div className="w-64 h-64 flex flex-col items-center justify-center">
          <img src="/sobre.png" alt="Abriendo..." className="w-full object-contain animate-pulse blur-[2px]" />
          <p className="text-xl font-bold mt-4 text-emerald-900 animate-pulse">Abriendo sobre...</p>
        </div>
      )}

      {estado === 'revelado' && (
        <div className="flex flex-col items-center justify-center animate-[zoomIn_0.5s_ease-out]">
          <h2 className="text-2xl font-bold mb-4 text-emerald-900 text-center">¡Has conseguido a {cromo.nombre}!</h2>
          
          <div className="w-48 aspect-[3/4] bg-[#a8e6a3] border-4 border-[#3b873e] rounded-xl flex flex-col shadow-2xl p-2 mb-8">
            <div className="w-full h-1/2 border-2 border-black flex items-center justify-center bg-white/50 mb-2 overflow-hidden rounded">
              <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <h2 className="text-xl font-extrabold text-center border-b-2 border-black pb-1 mb-2 drop-shadow-sm">
              {cromo.nombre}
            </h2>
          </div>

          <button 
            onClick={guardarCromo}
            disabled={guardando}
            className="bg-black text-white text-xl font-bold py-4 px-8 rounded-full shadow-[0_4px_14px_0_rgb(0,0,0,39%)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:bg-neutral-800 transition duration-200 disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar en mi Álbum"}
          </button>
        </div>
      )}

      {estado === 'repetido' && (
        <div className="flex flex-col items-center justify-center animate-[zoomIn_0.5s_ease-out] px-4 text-center max-w-sm">
          <h2 className="text-3xl font-extrabold mb-2 text-red-700 drop-shadow-sm">¡Repetido!</h2>
          <p className="text-lg text-emerald-950 font-medium mb-6">
             Te ha tocado <span className="font-bold">{cromo.nombre}</span>, pero ya lo tienes. Busca en más sitios para encontrar otros cromos.
          </p>
          
          <div className="w-48 aspect-[3/4] bg-[#a8e6a3] border-4 border-gray-500 rounded-xl flex flex-col shadow-2xl p-2 mb-8 grayscale opacity-70">
            <div className="w-full h-1/2 border-2 border-gray-600 flex items-center justify-center bg-white/50 mb-2 overflow-hidden rounded">
              <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <h2 className="text-xl font-extrabold text-center border-b-2 border-gray-600 pb-1 mb-2 drop-shadow-sm">
              {cromo.nombre}
            </h2>
          </div>

          <button 
            onClick={() => navigate(`/dashboard/${loggedUserId}/album`)}
            className="bg-black text-white text-xl font-bold py-4 px-8 rounded-full shadow-[0_4px_14px_0_rgb(0,0,0,39%)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:bg-neutral-800 transition duration-200"
          >
            Ir a mi Álbum
          </button>
        </div>
      )}

    </div>
  );
}
