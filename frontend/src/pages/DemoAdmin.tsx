import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function DemoAdmin() {
  const [correo, setCorreo] = useState('');
  const [estadoEmail, setEstadoEmail] = useState('');
  const [estadoDatos, setEstadoDatos] = useState('');
  const [cargando, setCargando] = useState(false);

  // Llama al backend para enviar el correo en directo
  const enviarCorreo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo) return;

    setCargando(true);
    setEstadoEmail('Enviando...');
    
    try {
      const response = await fetch(`/api/admin/enviar-demo?correo=${encodeURIComponent(correo)}`, {
        method: 'POST'
      });

      if (response.ok) {
        setEstadoEmail('¡Correo enviado con éxito! Dile al jurado que mire el móvil.');
        setCorreo(''); // Limpiamos el campo
      } else {
        const errText = await response.text();
        setEstadoEmail('Error al enviar: ' + errText);
      }
    } catch (error) {
      setEstadoEmail('Error de conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  // Llama al backend para llenar la base de datos de escaneos falsos
  const poblarDatos = async () => {
    setEstadoDatos('Generando escaneos falsos...');
    try {
      const response = await fetch('/api/admin/poblar-datos', {
        method: 'POST'
      });
      const text = await response.text();
      setEstadoDatos(text);
    } catch (error) {
      setEstadoDatos('Error de conexión al poblar datos.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C]">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-[#2B5C65] mb-2">Panel de Control (Demo)</h1>
          <p className="text-gray-600 mb-8 text-sm">
            Pantalla oculta para los organizadores. Desde aquí puedes manejar la presentación en directo.
          </p>

          {/* Formulario para el correo en directo */}
          <form onSubmit={enviarCorreo} className="mb-8">
            <label className="block text-sm font-semibold mb-2">
              Enviar Reporte en Directo al Jurado:
            </label>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="jurado@ejemplo.com"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C1C69A]"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <button 
                type="submit" 
                disabled={cargando}
                className={`bg-[#2B5C65] text-white px-6 rounded-lg font-bold transition-colors ${cargando ? 'opacity-50' : 'hover:bg-[#1a383d]'}`}
              >
                {cargando ? '...' : 'Enviar'}
              </button>
            </div>
            {estadoEmail && (
              <p className={`mt-2 text-sm font-semibold ${estadoEmail.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                {estadoEmail}
              </p>
            )}
          </form>

          <hr className="my-6 border-gray-200" />

          {/* Botón de preparación (Poblar datos) */}
          <div>
            <h2 className="text-sm font-semibold mb-2">Preparación (Hacer antes del pitch):</h2>
            <p className="text-xs text-gray-500 mb-3">
              Haz clic aquí una sola vez antes de empezar a hablar. Esto simulará que muchas familias han escaneado los productos en los últimos 14 días para que el reporte salga lleno de datos.
            </p>
            <button 
              onClick={poblarDatos}
              className="w-full bg-[#C1C69A] hover:bg-[#b0b588] text-[#1C201C] font-semibold py-3 rounded-lg transition-colors"
            >
              Generar Tráfico Simulado
            </button>
            {estadoDatos && (
              <p className="mt-2 text-sm text-blue-600 font-semibold bg-blue-50 p-2 rounded">
                {estadoDatos}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
