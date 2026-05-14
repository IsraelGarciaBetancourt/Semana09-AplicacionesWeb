"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // 1. ESTADOS PARA LOS CAMPOS DEL FORMULARIO
  const [tipoCuenta, setTipoCuenta] = useState('ahorro');
  const [numCuenta, setNumCuenta] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('DNI');
  const [numDocumento, setNumDocumento] = useState('');
  const [clave, setClave] = useState('');
  
  // Estados para manejar la UI durante la petición
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  // 2. FUNCIÓN QUE CONECTA CON LA API DE LARAVEL
  const handleLogin = async () => {
    // Limpiamos errores previos y activamos estado de carga
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Fundamental para que Laravel devuelva JSON
        },
        body: JSON.stringify({
          tipo_cuenta: tipoCuenta,
          num_cuenta: numCuenta,
          tipo_documento: tipoDocumento,
          num_documento: numDocumento,
          password: clave
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Login exitoso: Guardamos el token en localStorage
        localStorage.setItem('token', data.data.token);
        // Opcional: Guardar datos del usuario
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        router.push('/dashboard');
      } else {
        // Mostramos el mensaje de error de tu backend
        setError(data.message || 'Error en las credenciales');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

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
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl text-gray-700">
            Usted se encuentra en una <span className="text-[#CC0000] font-semibold">zona segura</span>
          </h2>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200 w-full max-w-[750px] p-8 pb-4">

          {/* Mostramos el mensaje de error si existe */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center">
              {error}
            </div>
          )}

          <form className="max-w-[550px] mx-auto">
            <div className="grid grid-cols-[200px_1fr] gap-y-4 gap-x-4 items-center">

              {/* Fila 1: Seleccione (Actualizado para coincidir con tu BD) */}
              <label className="text-right text-sm text-gray-600">Seleccione:</label>
              <div className="flex">
                <select 
                  value={tipoCuenta}
                  onChange={(e) => setTipoCuenta(e.target.value)}
                  className="border border-gray-300 text-black rounded text-sm px-2 py-1 w-[220px] bg-white outline-none focus:border-gray-400"
                >
                  <option value="ahorro">Cuenta de Ahorro</option>
                  <option value="corriente">Cuenta Corriente</option>
                </select>
                <div className="bg-[#CC0000] text-white flex items-center justify-center px-2 rounded-r -ml-1 border border-[#CC0000]">▼</div>
              </div>

              {/* Fila 2: Número de tarjeta/cuenta */}
              <label className="text-right text-sm text-gray-600">Número de cuenta:</label>
              <div>
                <input
                  type="text"
                  value={numCuenta}
                  onChange={(e) => setNumCuenta(e.target.value)}
                  placeholder="Ej: 019-5521384"
                  className="border border-gray-300 text-black rounded text-sm px-2 py-1 w-[220px] outline-none focus:border-gray-400"
                />
              </div>

              {/* Fila 3: Tipo y N° Documento */}
              <label className="text-right text-sm text-gray-600">Tipo y N° Documento:</label>
              <div className="flex gap-2">
                <div className="flex">
                  <select 
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value)}
                    className="border border-gray-300 text-black rounded text-sm px-2 py-1 w-[120px] bg-white outline-none"
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">CE</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                  <div className="bg-[#CC0000] text-white flex items-center justify-center px-1 rounded-r -ml-1 border border-[#CC0000] text-xs">▼</div>
                </div>
                <input
                  type="text"
                  value={numDocumento}
                  onChange={(e) => setNumDocumento(e.target.value)}
                  className="border border-gray-300 text-black rounded text-sm px-2 py-1 w-[120px] outline-none"
                />
              </div>

              {/* Fila 4: Teclado Virtual y Clave */}
              <div className="text-right text-sm text-gray-600 self-start mt-2">
                Ingresa tu clave usando <br /> el teclado virtual:
              </div>
              <div className="flex items-start gap-6">
                <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded border border-gray-200">
                  {teclas.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleKeyClick(num)}
                      className="bg-gray-200 border border-gray-300 text-black rounded w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                  <button type="button" onClick={() => handleKeyClick('0')} className="bg-gray-200 border border-gray-300 rounded w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 hover:bg-gray-300">0</button>
                  <button type="button" onClick={handleClear} className="col-span-2 bg-gray-500 text-white rounded border border-gray-600 text-[10px] font-bold hover:bg-gray-600">LIMPIAR</button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[10px] text-gray-500 mt-1">Ingresa tu Clave de <br /> Internet (06 dígitos)</div>
                  <input
                    type="password"
                    value={clave}
                    readOnly
                    className="border border-gray-300 text-black rounded text-center text-sm py-1 w-[100px] bg-gray-50 tracking-widest outline-none"
                  />
                </div>
              </div>

            </div>

            {/* 3. BOTÓN INGRESAR (Vinculado a handleLogin) */}
            <div className="flex justify-center mt-8 mb-6">
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className={`${loading ? 'bg-gray-500' : 'bg-[#B30000] hover:bg-[#990000]'} text-white font-bold py-2 px-8 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] border border-[#800000] transition-colors`}
              >
                {loading ? 'CARGANDO...' : 'INGRESAR'}
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