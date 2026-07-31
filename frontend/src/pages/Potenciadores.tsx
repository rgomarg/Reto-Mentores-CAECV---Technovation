import React from 'react';

export default function Potenciadores() {
  // Array of 9 items for the 3x3 grid
  const items = Array.from({ length: 9 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col font-sans text-black">
      {/* Header Section */}
      <div className="flex flex-col px-6 pt-12 pb-4">
        <h1 className="text-5xl font-extrabold text-center mb-6 tracking-tight px-2 break-words">Potenciadores</h1>
        <div className="text-right text-lg font-medium pr-2">
          Filtro: Mas recientes
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-black"></div>

      {/* Grid Content */}
      <div className="p-6 flex-grow flex justify-center">
        <div className="grid grid-cols-3 gap-6 w-full max-w-md">
          {items.map((_, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-full border-[2px] border-black bg-transparent hover:bg-black/5 transition duration-200 cursor-pointer"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
