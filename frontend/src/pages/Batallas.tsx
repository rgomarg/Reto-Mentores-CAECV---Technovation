import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Batallas() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C]">
      {/* Menú Global */}
      <Navbar />

      {/* Contenedor Principal de la Batalla */}
      <div className="flex-grow flex items-start sm:items-center justify-center p-4 sm:p-8 mt-12 sm:mt-0">
        
        {/* Banner de la Plaga */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-[#2B5C65] rounded-xl overflow-hidden shadow-2xl">
          
          {/* Imagen (Izquierda) */}
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-black flex items-center justify-center">
            {/* 
              NOTA: Asegúrate de guardar la imagen del escarabajo que pasaste 
              en la carpeta 'public' de tu proyecto con el nombre 'plaga.jpg' 
            */}
            <img 
              src="/plaga.jpeg" 
              alt="Escarabajo de la Plaga" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/600x400/2B5C65/FFFFFF?text=Falta+plaga.jpg+en+/public';
              }}
            />
          </div>

          {/* Contenido (Derecha) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
            
            <div className="flex flex-col">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide uppercase">
                La Plaga
              </h1>
              {/* Opcional: Descripción breve si quieres añadir contexto */}
              <p className="text-white/80 mt-4 text-lg">
                Un enemigo amenaza los cultivos. ¡Prepara tus mejores cartas para defender el ecosistema!
              </p>
            </div>

            <div className="mt-12 flex justify-start">
              <button 
                onClick={() => alert("¡Batalla en construcción! Próximamente.")}
                className="bg-[#C1C69A] hover:bg-[#b0b588] text-[#1C201C] font-semibold text-lg py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Comenzar batalla
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
