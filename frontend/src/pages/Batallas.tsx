import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Batallas() {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8EB] flex flex-col font-sans text-gray-900 antialiased selection:bg-amber-200">
      <Navbar activeTab="batallas" />

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner border border-amber-200">
          ⚔️
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Arena de Batallas Ecológicas
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md leading-relaxed">
          Compite con tus cartas y modificadores ecológicos para sumar puntos y subir de puesto en la <strong className="text-amber-600">LIGA ORO</strong>.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full mb-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase">Tu Puntuación Actual</span>
            <span className="text-lg font-bold text-[#DE6B58]">{currentUser?.puntuacionUsuario || 0} pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase">Cartas Listas</span>
            <span className="text-sm font-bold text-gray-800">{currentUser?.nCromos || 4} cromos</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/album')}
          className="bg-[#CCD5A2] hover:bg-[#BFCA91] active:scale-98 text-gray-800 font-bold px-8 py-3 rounded-xl shadow-xs border border-[#BAC58B] transition-all text-sm cursor-pointer"
        >
          Ver mi Álbum de Cartas →
        </button>
      </main>
    </div>
  );
}
