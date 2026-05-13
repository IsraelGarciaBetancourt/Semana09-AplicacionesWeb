"use client"; // Necesario para usar useState en el teclado virtual

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  // Estado para manejar la contraseña ingresada con el teclado virtual
  const [clave, setClave] = useState('');

  // Función para agregar un número a la clave (máximo 6 dígitos)
  const handleKeyClick = (num: string) => {
    if (clave.length < 6) {
      setClave(prev => prev + num);
    }
  };

  // Función para limpiar la clave
  const handleClear = () => {
    setClave('');
  };

  // Teclas basadas en la imagen
  const teclas = ['4', '8', '3', '7', '6', '2', '9', '5', '1'];

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans flex flex-col">
      
      {/* 1. HEADER (Cinta superior) */}
      <header className="bg-white border-t-[6px] border-[#CC0000] shadow-sm">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4">
          {/* Logo Multired Virtual (Izquierda) */}
          <div className="bg-[#CC0000] text-white px-8 py-3 rounded-b-3xl rounded-br-none italic leading-tight shadow-md">
            <h1 className="text-3xl font-extrabold tracking-tighter">
              <span className="text-yellow-400">multi</span>Red
            </h1>
            <p className="text-right text-sm font-medium mr-1">Virtual</p>
          </div>

        {/* Logo Banco de la Nación (Derecha) */}
        <div className="flex items-center gap-2 py-4">
            {/* Imagen del logo real */}
            {/* Cambia los valores dentro de los corchetes para hacerla más grande o pequeña */}
            <div className="relative w-[150px] h-[40px]">
                <Image 
                    src="/images/logos/Logo_BN.jpg" 
                    alt="Logo Banco de la Nación" 
                    fill 
                    className="object-contain"
                />
            </div>
        </div>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-grow flex flex-col items-center pt-8 px-4">
        
        {/* Mensaje de Zona Segura */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* Icono de candado */}
          <div className="bg-gray-400 text-white rounded p-1">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
          <h2 className="text-xl text-gray-700">
            Usted se encuentra en una <span className="text-[#CC0000] font-semibold">zona segura</span>
          </h2>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200 w-full max-w-[750px] p-8 pb-4">
          
          <form className="max-w-[550px] mx-auto">
            {/* Grid para alinear Etiquetas a la izq y Controles a la der */}
            <div className="grid grid-cols-[200px_1fr] gap-y-4 gap-x-4 items-center">
              
              {/* Fila 1: Seleccione */}
              <label className="text-right text-sm text-gray-600">Seleccione:</label>
              <div className="flex">
                <select className="border border-gray-300 rounded text-sm px-2 py-1 w-[220px] bg-white outline-none focus:border-gray-400">
                  <option>Multired Global Débito</option>
                </select>
                {/* Cuadrito rojo con flecha blanca */}
                <div className="bg-[#CC0000] text-white flex items-center justify-center px-2 rounded-r -ml-1 border border-[#CC0000]">
                  ▼
                </div>
              </div>

              {/* Fila 2: Número de tarjeta */}
              <label className="text-right text-sm text-gray-600">Número de tarjeta:</label>
              <div>
                <input 
                  type="text" 
                  defaultValue="4214"
                  className="border border-gray-300 rounded text-sm px-2 py-1 w-[220px] outline-none focus:border-gray-400"
                />
              </div>

              {/* Fila 3: Tipo y N° Documento */}
              <label className="text-right text-sm text-gray-600">Tipo y N° Documento:</label>
              <div className="flex gap-2">
                <div className="flex">
                  <select className="border border-gray-300 rounded text-sm px-2 py-1 w-[120px] bg-white outline-none">
                    <option>Seleccione...</option>
                  </select>
                  <div className="bg-[#CC0000] text-white flex items-center justify-center px-1 rounded-r -ml-1 border border-[#CC0000] text-xs">▼</div>
                </div>
                <input 
                  type="text" 
                  className="border border-gray-300 rounded text-sm px-2 py-1 w-[120px] outline-none"
                />
              </div>

              {/* Fila 4: Teclado Virtual y Clave */}
              <div className="text-right text-sm text-gray-600 self-start mt-2">
                Ingresa tu clave usando <br/> el teclado virtual:
              </div>
              
              <div className="flex items-start gap-6">
                {/* Teclado Virtual */}
                <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded border border-gray-200">
                  {teclas.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleKeyClick(num)}
                      className="bg-gray-200 border border-gray-300 rounded w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('0')}
                    className="bg-gray-200 border border-gray-300 rounded w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 hover:bg-gray-300"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="col-span-2 bg-gray-500 text-white rounded border border-gray-600 text-[10px] font-bold hover:bg-gray-600"
                  >
                    LIMPIAR
                  </button>
                </div>

                {/* Input de Clave y Links */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[#CC0000] text-lg">⚙️</span>
                    <Link href="#" className="text-[#CC0000] text-xs hover:underline">
                      Genera tu Clave de Internet
                    </Link>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    Ingresa tu Clave de <br/> Internet (06 dígitos)
                  </div>
                  <input
                    type="password"
                    value={clave}
                    readOnly
                    className="border border-gray-300 rounded text-center text-sm py-1 w-[100px] bg-gray-50 tracking-widest outline-none"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[#CC0000] text-lg bg-[#CC0000] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">!</span>
                    <Link href="#" className="text-[#CC0000] text-xs hover:underline">
                      Olvidé-mi-clave
                    </Link>
                  </div>
                </div>
              </div>

              {/* Fila 5: CAPTCHA */}
              <div className="text-right text-sm text-gray-600 self-start mt-2">
                Ingresa el texto de la<br/>imagen:
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1 items-center">
                  {/* Imagen simulada de Captcha */}
                  <div className="bg-gray-200 border border-gray-300 w-[100px] h-[35px] flex items-center justify-center font-serif text-lg tracking-widest italic line-through text-gray-600">
                    Q3ANM
                  </div>
                  <button type="button" className="flex items-center gap-1 text-xs text-[#CC0000] hover:underline">
                    <span>↻</span> Cambiar texto
                  </button>
                </div>
                <input 
                  type="text" 
                  className="border border-gray-300 rounded text-sm px-2 py-1 w-[100px] outline-none mt-1"
                />
              </div>

            </div>

            {/* Botón Ingresar */}
            <div className="flex justify-center mt-8 mb-6">
              <button
                type="button"
                className="bg-[#B30000] hover:bg-[#990000] text-white font-bold py-2 px-8 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] border border-[#800000] transition-colors"
              >
                INGRESAR
              </button>
            </div>
          </form>

          {/* Footer de la tarjeta (Links de ayuda) */}
          <div className="border-t border-dotted border-gray-400 mt-2 pt-3 flex flex-col items-center gap-2">
            <Link href="#" className="text-[#205081] text-xs hover:underline">
              Recomendaciones de Seguridad
            </Link>
            <div className="flex gap-4 text-[11px] text-gray-700">
              <span className="flex items-center gap-1 cursor-pointer hover:underline">
                <span className="text-red-500">📄</span> Guía Cuenta de Ahorro
              </span>
              <span className="flex items-center gap-1 cursor-pointer hover:underline">
                <span className="text-red-500">📄</span> Guía Cuentas Corrientes
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* 3. FOOTER GLOBAL */}
      <footer className="text-center pb-8 text-[11px] text-gray-600 space-y-1">
        <p className="font-bold text-gray-800">Banco de la Nación | Ministerio de Economía y Finanzas</p>
        <p>Oficina Principal: Av. Javier Prado Este 2499, San Borja. Central Telefónica: 519 2000.</p>
        <p>Atención en Oficinas Administrativas: Lunes a Viernes de 08:30 a 17:30. Refrigerio de: 13:00-14:00.</p>
        <p>Atención en Oficina de Trámite Documentario: Lunes a Viernes de 8:30 a 16:30 (horario corrido).</p>
      </footer>

    </div>
  );
}