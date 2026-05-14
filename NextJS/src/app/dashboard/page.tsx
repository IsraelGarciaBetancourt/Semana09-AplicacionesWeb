"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  
  // Estados
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Verificamos si hay sesión activa al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Si no hay token, lo regresamos al login
      return;
    }
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Aquí podrías hacer una petición a tu endpoint de logout en Laravel
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando tu sesión...</div>;
  }

  // Objeto con las opciones del menú
  const menuOptions = [
    { id: 'dashboard', label: '📊 Dashboard', desc: 'Resumen general' },
    { id: 'ahorros', label: '💰 Módulo de Ahorros', desc: 'Saldos y movimientos' },
    { id: 'creditos', label: '💳 Módulo de Créditos', desc: 'Préstamos y cronogramas' },
    { id: 'transferencias', label: '🔄 Transferencias y Pagos', desc: 'Entre cuentas y servicios' },
    { id: 'perfil', label: '👤 Perfil de Usuario', desc: 'Tus datos personales' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR (Menú Lateral) */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="p-6 bg-[#CC0000] text-white">
          <h1 className="text-2xl font-extrabold tracking-tighter italic">
            <span className="text-yellow-400">multi</span>Red
          </h1>
          <p className="text-sm font-medium opacity-90">Panel Central</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-red-50 text-[#CC0000] font-semibold border-l-4 border-[#CC0000]' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded transition-colors text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8">
        
        {/* Cabecera del área principal */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              ¡Hola, {user?.name || 'Usuario'}! 👋
            </h2>
            <p className="text-gray-500 mt-1">Bienvenido a tu zona segura.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
            <span className="text-xs text-gray-500 block">Documento</span>
            <span className="font-semibold text-gray-700">{user?.tipo_documento} - {user?.num_documento}</span>
          </div>
        </header>

        {/* CONTENEDORES DINÁMICOS SEGÚN LA PESTAÑA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
          
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Resumen de tu cuenta</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-semibold">Saldo Disponible</p>
                  <p className="text-2xl font-bold text-green-900">S/ 5,500.00</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-semibold">Productos Activos</p>
                  <p className="text-2xl font-bold text-blue-900">2</p>
                </div>
              </div>
              {/* Aquí iría la tabla de últimos movimientos */}
              <p className="mt-8 text-gray-500 italic">Cargando últimos movimientos...</p>
            </div>
          )}

          {activeTab === 'ahorros' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Módulo de Ahorros</h3>
              <p className="text-gray-600 mb-4">Consulta tus saldos, depósitos y genera tu estado de cuenta.</p>
              {/* Aquí llamarás a tu endpoint /api/cuentas-resumen */}
            </div>
          )}

          {activeTab === 'creditos' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Módulo de Créditos</h3>
              <p className="text-gray-600 mb-4">Revisa tus préstamos activos, el cronograma de pagos o simula un nuevo crédito.</p>
            </div>
          )}

          {activeTab === 'transferencias' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Transferencias y Pagos</h3>
              <p className="text-gray-600 mb-4">Transfiere dinero entre tus cuentas, a terceros o paga tus servicios.</p>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Perfil de Usuario</h3>
              <div className="space-y-3">
                <p><strong>Nombre:</strong> {user?.name}</p>
                <p><strong>Documento:</strong> {user?.tipo_documento} {user?.num_documento}</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}