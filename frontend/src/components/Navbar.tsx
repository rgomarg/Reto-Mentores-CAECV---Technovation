import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtenemos el ID y Nombre de usuario desde localStorage
  const loggedUserId = localStorage.getItem('loggedUserId') || '1';
  const loggedUserName = localStorage.getItem('loggedUserName') || 'A';
  const avatarLetter = loggedUserName.charAt(0).toUpperCase();

  // Helper para saber qué pestaña está activa
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <nav className="w-full bg-[#C1C69A] flex items-center justify-between px-4 py-3 md:px-8 shadow-sm text-[#1C201C] relative z-20">
      
      {/* Logo (Flor) */}
      <div 
        className="flex items-center justify-center cursor-pointer"
        onClick={() => navigate(`/dashboard/${loggedUserId}`)}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Un diseño abstracto tipo flor inspirado en el mockup */}
          <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" fill="#1C201C" />
          <path d="M30 30C45 40 55 40 70 30C60 45 60 55 70 70C55 60 45 60 30 70C40 55 40 45 30 30Z" fill="#1C201C" opacity="0.7" />
        </svg>
      </div>

      {/* Navegación Desktop / Mobile compacta */}
      <div className="flex flex-row items-center gap-2 sm:gap-6 font-medium text-sm sm:text-base md:text-lg">
        <button 
          onClick={() => navigate(`/dashboard/${loggedUserId}`)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${location.pathname === `/dashboard/${loggedUserId}` ? 'bg-[#FCF5DF]' : 'hover:bg-black/10'}`}
        >
          Inicio
        </button>
        <button 
          onClick={() => alert("Próximamente: Batallas")}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isActive('/batallas') ? 'bg-[#FCF5DF]' : 'hover:bg-black/10'}`}
        >
          Batallas
        </button>
        <button 
          onClick={() => navigate(`/dashboard/${loggedUserId}/album`)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isActive('/album') ? 'bg-[#FCF5DF]' : 'hover:bg-black/10'}`}
        >
          Album
        </button>
        <button 
          onClick={() => navigate(`/dashboard/${loggedUserId}/potenciadores`)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isActive('/potenciadores') ? 'bg-[#FCF5DF]' : 'hover:bg-black/10'}`}
        >
          Potenciadores
        </button>
      </div>

      {/* Avatar circular */}
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DE6D5C] rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer shadow-sm hover:scale-105 transition-transform"
        onClick={() => navigate('/perfiles')}
        title="Cambiar de perfil"
      >
        {avatarLetter}
      </div>
      
    </nav>
  );
}
