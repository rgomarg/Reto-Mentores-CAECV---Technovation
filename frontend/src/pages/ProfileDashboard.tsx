import { useNavigate } from 'react-router-dom';

export default function ProfileDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col font-sans text-black">
      {/* Header Section */}
      <div className="flex justify-between items-center px-8 py-10">
        <button className='rounded-3xl hover:bg-amber-600 self-start w-fit px-4 py-2 bg-black/10'
                onClick={() => navigate('/perfiles')}>
          Volver
        </button>
        {/* Avatar Placeholder */}
        <div className="w-32 h-32 rounded-full border-[6px] border-black flex items-center justify-center bg-transparent shrink-0">
          <svg className="w-20 h-20 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 12c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" />
          </svg>
        </div>

        {/* Stats */}
        <div className="text-right text-lg font-medium flex flex-col gap-1">
          <div className="flex justify-end gap-2">
            <span>Puntos:</span>
            <span className="w-8 text-right">30</span>
          </div>
          <div className="flex justify-end gap-2">
            <span>Nº Cromos:</span>
            <span className="w-8 text-right">4</span>
          </div>
          <div className="flex justify-end gap-2">
            <span>Nº Potenciadores:</span>
            <span className="w-8 text-right">5</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Action Cards */}
      <div className="flex flex-row justify-center gap-6 p-6 flex-grow">
        
        {/* Album Card */}
        <button 
          onClick={() => navigate('/album')}
          className="flex-1 max-w-[200px] aspect-[1/1.5] border-[3px] border-black bg-transparent hover:bg-black/5 transition duration-300 flex flex-col items-center pt-8"
        >
          <span className="text-3xl font-bold mb-16">Album</span>
          {/* Album Icon (Stacked Cards/Folder) */}
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10Z" />
            <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>

        {/* Potenciadores Card */}
        <button 
          onClick={() => navigate('/potenciadores')}
          className="flex-1 max-w-[200px] aspect-[1/1.5] border-[3px] border-black bg-transparent hover:bg-black/5 transition duration-300 flex flex-col items-center pt-8"
        >
          <span className="text-2xl font-bold mb-16 px-2 text-center break-words">Potenciadores</span>
          {/* Arrow Icon */}
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </button>

      </div>
    </div>
  );
}
