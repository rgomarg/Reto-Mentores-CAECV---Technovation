import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface NavbarProps {
  activeTab?: 'inicio' | 'batallas' | 'album';
}

export default function Navbar({ activeTab }: NavbarProps) {
  const { currentUser, currentUserId, setCurrentUserId } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initial = currentUser?.nombre ? currentUser.nombre.charAt(0).toUpperCase() : 'A';

  const userList = [
    { id: 5, nombre: "Alma" },
    { id: 1, nombre: "Raquel" },
    { id: 3, nombre: "Sofia" },
    { id: 2, nombre: "Laura" },
    { id: 4, nombre: "Zoe" },
  ];

  return (
    <header className="w-full bg-[#C7D19E] px-4 md:px-8 py-2.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
      {/* Lado Izquierdo: Logo y Racha */}
      <div className="flex items-center gap-4">
        {/* Logo botánico / sol en verde oscuro */}
        <div 
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center justify-center text-[#1C3B24] hover:opacity-90 transition"
          title="CAECV Reto Mentores"
        >
          <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="8" />
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <rect
                  key={i}
                  x="46.5"
                  y="6"
                  width="7"
                  height="22"
                  rx="3.5"
                  transform={`rotate(${angle} 50 50)`}
                />
              );
            })}
          </svg>
        </div>

        {/* Píldora de Racha / Días */}
        <div className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs text-xs md:text-sm font-semibold text-gray-700 select-none">
          <span className="text-orange-500 text-sm">🔥</span>
          <span>6 días</span>
        </div>
      </div>

      {/* Lado Derecho: Navegación y Avatar de Perfil */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Inicio */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === 'inicio' || (isActive && !activeTab)
                  ? 'bg-[#FAF8EB] text-gray-900 shadow-xs'
                  : 'text-gray-800 hover:bg-white/40 hover:text-black'
              }`
            }
          >
            Inicio
          </NavLink>

          {/* Batallas */}
          <NavLink
            to="/batallas"
            className={({ isActive }) =>
              `px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === 'batallas' || (isActive && !activeTab)
                  ? 'bg-[#FAF8EB] text-gray-900 shadow-xs'
                  : 'text-gray-800 hover:bg-white/40 hover:text-black'
              }`
            }
          >
            Batallas
          </NavLink>

          {/* Álbum */}
          <NavLink
            to="/album"
            className={({ isActive }) =>
              `px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === 'album' || (isActive && !activeTab)
                  ? 'bg-[#FAF8EB] text-gray-900 shadow-xs'
                  : 'text-gray-800 hover:bg-white/40 hover:text-black'
              }`
            }
          >
            Álbum
          </NavLink>
        </nav>

        {/* Avatar de Usuario con Dropdown para cambiar perfil */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#DE6B58] text-white font-bold flex items-center justify-center text-sm shadow-xs hover:opacity-90 hover:scale-105 active:scale-95 transition-all focus:outline-hidden"
            title={`Perfil actual: ${currentUser?.nombre || 'Alma'}`}
          >
            {initial}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <p className="text-xs text-gray-500 font-medium">Conectado como:</p>
                <p className="text-sm font-bold text-gray-900">{currentUser?.nombre || 'Alma'}</p>
                <p className="text-xs text-amber-600 font-semibold mt-0.5">
                  {currentUser?.puntuacionUsuario || 0} puntos
                </p>
              </div>

              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                Cambiar Usuario:
              </p>
              <div className="flex flex-col gap-1">
                {userList.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUserId(u.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition ${
                      currentUserId === u.id
                        ? 'bg-[#DE6B58]/10 text-[#DE6B58]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{u.nombre}</span>
                    {currentUserId === u.id && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-2 pt-2 px-1">
                <button
                  onClick={() => {
                    navigate('/perfiles');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-center text-xs text-gray-500 hover:text-gray-900 py-1 font-medium"
                >
                  Ver todos los perfiles →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
