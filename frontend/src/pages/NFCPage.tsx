import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
      <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl font-semibold text-[#1C201C]">Cargando datos NFC...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col items-center p-4 relative font-sans overflow-hidden text-[#1C201C]">
      
      {/* Añadimos Navbar para ser consistentes con el diseño */}
      <div className="w-full absolute top-0 left-0">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow mt-16 w-full max-w-sm">
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-tight">
          ¡Has encontrado algo!
        </h1>

        {estado === 'sobre' && (
          <div 
            onClick={abrirSobre}
            className="w-64 h-64 cursor-pointer hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center animate-bounce relative"
          >
            <img src="/sobre.png" alt="Sobre Misterioso" className="w-full object-contain drop-shadow-2xl" />
            <div className="absolute -bottom-8 bg-[#C1C69A] text-[#1C201C] px-6 py-2 rounded-full font-bold shadow-md text-center">
              ¡Toca para abrir!
            </div>
          </div>
        )}

        {estado === 'abriendo' && (
          <div className="w-64 h-64 flex flex-col items-center justify-center">
            <img src="/sobre.png" alt="Abriendo..." className="w-full object-contain animate-pulse blur-[2px]" />
            <p className="text-xl font-bold mt-8 animate-pulse text-[#DE6D5C]">Abriendo sobre...</p>
          </div>
        )}

        {estado === 'revelado' && (
          <div className="flex flex-col items-center justify-center animate-[zoomIn_0.5s_ease-out] w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">¡Has conseguido a {cromo.nombre}!</h2>
            
            <div className="w-48 aspect-[3/4] rounded-xl flex flex-col shadow-2xl overflow-hidden mb-8 bg-white border border-gray-100">
              <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-cover" />
            </div>

            <button 
              onClick={guardarCromo}
              disabled={guardando}
              className="w-full max-w-[280px] bg-[#C1C69A] text-[#1C201C] text-xl font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg hover:bg-[#b0b588] transition duration-200 disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Guardar en mi Álbum"}
            </button>
          </div>
        )}

        {estado === 'repetido' && (
          <div className="flex flex-col items-center justify-center animate-[zoomIn_0.5s_ease-out] text-center w-full">
            <h2 className="text-3xl font-extrabold mb-2 text-[#DE6D5C] drop-shadow-sm">¡Repetido!</h2>
            <p className="text-lg font-medium mb-8">
               Te ha tocado <span className="font-bold">{cromo.nombre}</span>, pero ya lo tienes. Busca en más sitios para encontrar otros cromos.
            </p>
            
            <div className="w-48 aspect-[3/4] rounded-xl flex flex-col shadow-md overflow-hidden mb-8 grayscale opacity-70 border border-gray-300">
              <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-cover" />
            </div>

            <button 
              onClick={() => navigate(`/dashboard/${loggedUserId}/album`)}
              className="w-full max-w-[280px] bg-white border-2 border-[#1C201C] text-[#1C201C] text-xl font-bold py-4 px-8 rounded-xl shadow-sm hover:bg-gray-50 transition duration-200"
            >
              Ir a mi Álbum
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
