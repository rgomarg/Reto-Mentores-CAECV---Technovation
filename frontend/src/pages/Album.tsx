import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Album() {
  // Array of 9 items for the 3x3 grid
  const items = Array.from({ length: 9 });
  const {id} = useParams();
  const navigate= useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col font-sans text-black">
      {/* Header Section */}
      <div className="flex flex-col px-6 pt-12 pb-4">
        <button className='rounded-3xl hover:bg-amber-600 self-start w-fit px-4 py-2 bg-black/10'
                onClick={() => navigate(-1)}>
          Volver
        </button>
        <h1 className="text-6xl font-extrabold text-center mb-6 tracking-tight">
          Album
        </h1>
        <div className="text-right text-lg font-medium pr-2">
          Filtro: Mas recientes
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Grid Content */}
      <div className="p-6 flex-grow flex justify-center">
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {items.map((_, index) => (
            <div 
              key={index} 
              className="aspect-square border-[2px] border-[#3b873e] bg-transparent hover:bg-black/5 transition duration-200 cursor-pointer"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
