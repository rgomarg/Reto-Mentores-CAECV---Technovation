import Navbar from '../components/Navbar';
import CityMap from '../components/CityMap';
import { useUser } from '../context/UserContext';

export default function Inicio() {
  const { ranking, loading } = useUser();

  // Asegurar siempre tener las 3 filas visibles (coincidiendo con Desktop - 1)
  const displayRanking = [
    {
      pos: 1,
      nombre: ranking?.[0]?.nombre || 'Nombre',
      puntos: ranking?.[0]?.puntuacion ?? 55,
      colorIcon: 'bg-amber-400 text-amber-950',
      iconSvg: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      pos: 2,
      nombre: ranking?.[1]?.nombre || 'Persona',
      puntos: ranking?.[1]?.puntuacion ?? 40,
      colorIcon: 'bg-[#DE6B58] text-white',
      iconSvg: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      pos: 3,
      nombre: ranking?.[2]?.nombre || 'Juanito',
      puntos: ranking?.[2]?.puntuacion ?? 35,
      colorIcon: 'bg-[#558B2F] text-white',
      iconSvg: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8EB] flex flex-col font-sans text-gray-900 antialiased selection:bg-amber-200">
      {/* Navbar Superior */}
      <Navbar activeTab="inicio" />

      {/* Contenido Principal (Desktop - 1) */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Panel Izquierdo: Clasificación "LIGA ORO" */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="w-full max-w-[300px] sm:max-w-[320px] bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col min-h-[380px]">
              {/* Cabecera Dorada Liga Oro */}
              <div className="bg-[#E5AC32] py-2.5 px-4 text-center">
                <h2 className="text-xs sm:text-sm font-black tracking-widest text-[#3B2806] uppercase">
                  LIGA ORO
                </h2>
              </div>

              {/* Lista de Clasificación */}
              <div className="p-4 flex flex-col gap-3.5">
                {displayRanking.map((item) => (
                  <div
                    key={item.pos}
                    className="flex items-center justify-between py-1 text-sm sm:text-base"
                  >
                    {/* Posición + Icono + Nombre */}
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-600 w-3 text-center">
                        {item.pos}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${item.colorIcon} shadow-2xs`}
                      >
                        {item.iconSvg}
                      </div>
                      <span className="font-medium text-gray-800 tracking-tight">
                        {item.nombre}
                      </span>
                    </div>

                    {/* Puntos en color naranja/coral */}
                    <span className="font-extrabold text-[#DE6B58] text-sm sm:text-base">
                      {item.puntos}
                    </span>
                  </div>
                ))}
              </div>

              {/* Indicador discreto si está cargando sincronización con BBDD */}
              {loading && (
                <div className="px-4 py-1 text-right text-[10px] text-gray-400 animate-pulse">
                  Actualizando liga...
                </div>
              )}

              {/* Espacio limpio inferior característico del diseño */}
              <div className="flex-grow bg-white" />
            </div>
          </div>

          {/* Panel Derecho: Mapa de la Ciudad */}
          <div className="md:col-span-8 flex justify-center md:justify-start">
            <CityMap />
          </div>
        </div>
      </main>
    </div>
  );
}