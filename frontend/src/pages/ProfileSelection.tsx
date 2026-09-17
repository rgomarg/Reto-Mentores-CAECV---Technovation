import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerTodosUsuarios, type UsuarioDTO } from '../services/usuarioService';

export default function ProfileSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [perfiles, setPerfiles] = useState<UsuarioDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    obtenerTodosUsuarios()
      .then(users => {
        setPerfiles(users);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar perfiles:", err);
        setCargando(false);
      });
  }, []);

  const handleSelectProfile = (id: number, nombre: string) => {
    localStorage.setItem('loggedUserId', id.toString());
    localStorage.setItem('loggedUserName', nombre);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('user-changed', { detail: { id: id.toString(), nombre } }));
    
    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get('redirect');
    
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate(`/usuario/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col items-center py-20 px-4 font-sans text-[#1C201C]">
      <button className='rounded-xl hover:bg-black/10 self-start w-fit px-6 py-2 bg-black/5 font-semibold text-lg transition-colors'
                onClick={() => navigate('/')}>
          Volver
      </button>
      
      <div className="flex-grow flex flex-col items-center w-full justify-center mt-8">
        {/* Un círculo que imita la flor del Navbar */}
        <div className="mb-8">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" fill="#C1C69A" />
            <path d="M30 30C45 40 55 40 70 30C60 45 60 55 70 70C55 60 45 60 30 70C40 55 40 45 30 30Z" fill="#DE6D5C" opacity="0.9" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 tracking-tight text-center">
          ¿Quién eres?
        </h1>

        {cargando ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-8 h-8 border-4 border-[#DE6D5C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium text-sm">Cargando perfiles...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {perfiles.map((perfil) => (
              <button
                key={perfil.id}
                onClick={() => handleSelectProfile(perfil.id, perfil.nombre)}
                className="bg-white hover:bg-[#C1C69A] hover:text-[#1C201C] text-[#1C201C] py-4 px-8 text-xl font-bold rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out w-full border-2 border-transparent hover:border-[#b0b588] flex items-center justify-between"
              >
                <div className="flex flex-col text-left">
                  <span>{perfil.nombre}</span>
                  <span className="text-xs text-gray-500 font-normal">{perfil.puntuacionUsuario} puntos</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#DE6D5C] text-white flex items-center justify-center text-sm font-bold">
                  {perfil.nombre.charAt(0)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
