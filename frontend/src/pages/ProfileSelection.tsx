import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProfileSelection() {
  const navigate = useNavigate();
  const { setCurrentUserId } = useUser();

  const perfiles = [
    {id: 1, nombre: "Raquel"},
    {id: 2, nombre: "Laura"},
    {id: 3, nombre: "Sofia"},
    {id: 4, nombre: "Zoe"},
    {id: 5, nombre: "Alma"},
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col items-center py-20 px-4 font-sans text-emerald-950">
      <button className='rounded-3xl hover:bg-amber-600 self-start w-fit px-4 py-2 bg-black/10'
                onClick={() => navigate('/')}>
          Volver
        </button>
      <h1 className="text-5xl font-extrabold mb-16 tracking-tight text-black drop-shadow-sm">
        Nombre App
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {perfiles.map((perfil) => (
          <button
            key={perfil.nombre}
            onClick={() => {
              setCurrentUserId(perfil.id);
              navigate(`/dashboard/${perfil.id}`);
            }}
            className="bg-[#1b5e20] hover:bg-[#124116] text-white py-4 px-8 text-xl font-semibold rounded-none shadow-[0_4px_14px_0_rgba(27,94,32,0.39)] hover:shadow-[0_6px_20px_rgba(27,94,32,0.23)] hover:-translate-y-1 transition duration-200 ease-in-out w-full cursor-pointer"
          >
            {perfil.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
