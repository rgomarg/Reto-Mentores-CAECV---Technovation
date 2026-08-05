import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CromoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [cromo, setCromo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4 relative font-sans text-black overflow-hidden">
      
      {/* Botón X de cerrar */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-50 text-2xl font-bold"
      >
        ✕
      </button>

      {/* Contenedor de la carta con perspectiva 3D */}
      <div className="w-full max-w-sm aspect-[3/4] perspective-[1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        
        {/* Elemento que rota */}
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* CARA FRONTAL */}
          <div className="absolute w-full h-full backface-hidden bg-[#a8e6a3] border-4 border-[#3b873e] rounded-xl flex flex-col shadow-2xl p-4">
            {/* Imagen del cromo */}
            <div className="w-full h-1/2 border-2 border-black flex items-center justify-center bg-white/50 mb-2 overflow-hidden rounded">
              <img src={`/${cromo.imagen}`} alt={cromo.nombre} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            
            {/* Nombre */}
            <h2 className="text-3xl font-extrabold text-center border-b-2 border-black pb-2 mb-4 drop-shadow-sm">
              {cromo.nombre}
            </h2>
            
            {/* Propiedades */}
            <div className="flex flex-col gap-2 flex-grow justify-center px-2 text-xl font-medium">
              {cromo.atributos && cromo.atributos.map((attr: string, index: number) => (
                <div key={index}>Propiedad {index + 1}: <span className="font-normal text-emerald-900">{attr}</span></div>
              ))}
              {(!cromo.atributos || cromo.atributos.length === 0) && (
                <div className="text-center text-sm opacity-60">Sin propiedades</div>
              )}
            </div>
          </div>

          {/* CARA TRASERA */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#a8e6a3] border-4 border-[#3b873e] rounded-xl flex flex-col shadow-2xl p-6">
            <h2 className="text-4xl font-extrabold text-center border-b-2 border-black pb-4 mb-6">
              {cromo.nombre}
            </h2>
            
            <div className="flex-grow flex items-center justify-center text-center text-xl font-medium px-4 text-emerald-950 leading-relaxed overflow-y-auto">
              <p>
                {/* Asumimos que podemos poner una descripción aquí más adelante, por ahora texto de divulgación fijo o basado en el nombre */}
                Información extra sobre {cromo.nombre}. Este espacio está pensado para la parte de divulgación que habremos buscado. 
              </p>
            </div>
            
            <div className="text-center text-sm opacity-50 font-bold mt-4">
              Toca para girar
            </div>
          </div>

        </div>
      </div>
      
      {!isFlipped && (
        <div className="absolute bottom-10 text-white/50 animate-pulse text-lg font-medium">
          Toca la carta para girarla
        </div>
      )}

    </div>
  );
}
