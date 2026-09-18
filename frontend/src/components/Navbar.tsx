import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado sincronizado del usuario en sesión
  const [loggedUserId, setLoggedUserId] = useState<string>(
    () => localStorage.getItem('loggedUserId') || '1'
  );
  const [loggedUserName, setLoggedUserName] = useState<string>(
    () => localStorage.getItem('loggedUserName') || 'A'
  );

  useEffect(() => {
    const handleUserUpdate = () => {
      const id = localStorage.getItem('loggedUserId') || '1';
      const name = localStorage.getItem('loggedUserName') || 'A';
      setLoggedUserId(id);
      setLoggedUserName(name);
    };

    window.addEventListener('storage', handleUserUpdate);
    window.addEventListener('user-changed', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleUserUpdate);
      window.removeEventListener('user-changed', handleUserUpdate);
    };
  }, []);

  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#user-menu-container')) {
        setMenuAbierto(false);
      }
    };
    if (menuAbierto) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuAbierto]);

  const avatarLetter = (loggedUserName || 'A').charAt(0).toUpperCase();

  // Helper para saber qué pestaña está activa
  const isHomeActive = location.pathname === '/' || location.pathname === '/inicio';
  const isUsuarioActive = location.pathname.startsWith('/usuario');
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <nav className="w-full bg-[#C1C69A] flex items-center justify-between px-4 py-3 md:px-8 shadow-sm text-[#1C201C] relative z-20">
      
      {/* Logo (Flor) -> Navega a Inicio */}
      <div 
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/')}
        title="Inicio - Reto CAECV"
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" fill="#1C201C" />
          <path d="M30 30C45 40 55 40 70 30C60 45 60 55 70 70C55 60 45 60 30 70C40 55 40 45 30 30Z" fill="#1C201C" opacity="0.7" />
        </svg>
      </div>

      {/* Navegación Desktop / Mobile compacta */}
      <div className="flex flex-row items-center gap-1.5 sm:gap-4 md:gap-6 font-medium text-xs sm:text-base md:text-lg">
        <button 
          onClick={() => navigate('/')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isHomeActive ? 'bg-[#FCF5DF] font-bold shadow-sm' : 'hover:bg-black/10'}`}
        >
          Inicio
        </button>
        <button 
          onClick={() => navigate(`/dashboard/${loggedUserId}/batallas`)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isActive('/batallas') ? 'bg-[#FCF5DF] font-bold shadow-sm' : 'hover:bg-black/10'}`}
        >
          Batallas
        </button>
        <button 
          onClick={() => navigate(`/dashboard/${loggedUserId}/album`)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isActive('/album') ? 'bg-[#FCF5DF] font-bold shadow-sm' : 'hover:bg-black/10'}`}
        >
          Album
        </button>
        <button 
          onClick={() => navigate(`/dashboard/${loggedUserId}/potenciadores`)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all ${isActive('/potenciadores') ? 'bg-[#FCF5DF] font-bold shadow-sm' : 'hover:bg-black/10'}`}
        >
          Potenciadores
        </button>
      </div>

      {/* Avatar circular con menú emergente (Popover) */}
      <div id="user-menu-container" className="relative">
        <div 
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-[#DE6D5C] rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer shadow-sm hover:scale-105 transition-all select-none ${
            isUsuarioActive ? 'ring-4 ring-white shadow-md' : 'hover:ring-2 hover:ring-black/20'
          }`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          title={`Menú de usuario (${loggedUserName})`}
        >
          {avatarLetter}
        </div>

        {/* Popover Blanco */}
        {menuAbierto && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in duration-150 text-[#1C201C]">
            <div className="px-4 py-2 border-b border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Sesión iniciada como
              </span>
              <span className="font-extrabold text-sm text-[#1C201C] truncate block">
                {loggedUserName}
              </span>
            </div>

            <div className="p-1.5 flex flex-col gap-1">
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  navigate('/perfiles');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#FCF6DF] transition-colors text-left"
              >
                <span className="text-base">🔄</span>
                <span>Cambiar usuario</span>
              </button>

              <button
                onClick={() => {
                  setMenuAbierto(false);
                  navigate(`/usuario/${loggedUserId}`);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#FCF6DF] transition-colors text-left"
              >
                <span className="text-base">👤</span>
                <span>Ver perfil</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
    </nav>
  );
}

