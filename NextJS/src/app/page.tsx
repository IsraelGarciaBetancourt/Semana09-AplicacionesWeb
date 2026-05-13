// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// Componente auxiliar para las tarjetas de producto (sección media)
function ProductCard({ iconName, label }: { iconName: string; label: string }) {
  // En producción, aquí renderizarías un SVG real basado en iconName
  const IconPlaceholder = () => (
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 border-2 border-dashed border-red-300 text-red-700 text-xs text-center p-1">
      [Icono: {iconName}]
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center w-full min-w-[150px] aspect-square group hover:border-red-200 transition-all cursor-pointer hover:shadow-lg">
      <IconPlaceholder />
      <span className="text-sm font-medium text-gray-800 group-hover:text-red-700 transition-colors">
        {label}
      </span>
    </div>
  );
}

// Componente auxiliar para las tarjetas de Beneficios/Inclusión (sección inferior)
function PromoCard({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
          {title}
        </h4>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Paleta de colores principal basada en la imagen:
  // Rojo Principal: #E31D2B (aprox text-red-600 en Tailwind por defecto, ajustado a medida)
  // Gris Fondo: #F3F4F6 (gray-100)
  // Azul/Gris Texto: #1F2937 (gray-800)

  return (
    // Contenedor principal con fondo gris muy claro
    <main className="min-h-screen bg-[#F3F4F6] text-gray-800 font-sans">
      
      {/* 1. TOP BAR (Franja Gris Superior) */}
      <div className="bg-[#EAECEF] text-xs py-2 px-6 border-b border-gray-200 text-gray-600">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              {/* [Icono Escudo Perú] */}
              <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
              República del Perú
            </span>
            <span className="border-l border-gray-300 h-4"></span>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-red-700 font-semibold shadow-inner border border-gray-200">
              {/* [Icono Personas] */}
              Clientes
            </div>
            <span>Ciudadanos</span>
            <span>Entidades del Gobierno</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Portal de Transparencia</span>
            {/* [Logo PTE] */}
            <div className="w-10 h-6 bg-gray-300 rounded text-center text-[8px] text-gray-500 pt-1">PTE</div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Navegación Principal) */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <nav className="max-w-[1600px] mx-auto p-5 flex items-center justify-between">
          {/* Logo */}
          <div className="relative w-48 h-12 flex items-center">
            {/* Reemplaza con el logo real del banco en public/ */}
            {/* <Image src="/logo-bn.png" alt="Banco de la Nación" fill className="object-contain" /> */}
            <div className="text-xl font-extrabold text-[#E31D2B] leading-tight">
              <span className="text-sm font-normal text-gray-500">Banco<br/>de la</span> Nación
            </div>
          </div>

          {/* Menú Central */}
          <div className="flex items-center gap-8 font-medium text-gray-700">
            <span className="flex items-center gap-1 cursor-pointer">Productos y Servicios <span className="text-xs">▼</span></span>
            <span className="flex items-center gap-1 cursor-pointer">Canales Digitales <span className="text-xs">▼</span></span>
            <span className="cursor-pointer">BN Beneficios</span>
          </div>

          {/* Acciones Derecha */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 cursor-pointer p-2 hover:text-red-700">
              {/* [Icono Lupa] */}
              🔍 <span className="text-sm">Buscar</span>
            </div>
            
            {/* Botón Pagalo.pe (Rojo oscuro) */}
            <button className="bg-[#B71C1C] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow hover:bg-red-900 transition-colors">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#B71C1C] text-[8px] font-bold">P</div>
              págalo.pe
            </button>

            {/* Botón Banca por Internet (Rojo BN claro) */}
            <Link 
              href="/login"
              className="bg-[#E31D2B] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow hover:bg-red-700 transition-colors inline-block"
            >
              Banca por Internet
            </Link>
          </div>
        </nav>
      </header>

      {/* 3. HERO SECTION (Banner Rojo con foto) */}
      <section className="bg-[#E31D2B] text-white relative overflow-hidden">
        {/* Usamos un grid para colocar la imagen a la derecha y el texto a la izquierda */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 items-center min-h-[500px]">
          
          {/* Lado Izquierdo: Texto */}
          <div className="col-span-12 md:col-span-7 p-16 z-10">
            <h1 className="text-5xl font-extrabold mb-5 leading-tight tracking-tight">
              Ahora le toca a mamá
            </h1>
            <p className="text-xl font-light text-red-100 max-w-2xl mb-12">
              Préstamo Multired: Impulsa sus sueños con TCEA promocional desde 11.57%
            </p>
            <button className="bg-white text-[#E31D2B] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg text-lg">
              Conoce más
            </button>
          </div>

          {/* Lado Derecho: Imagen de la Sra. */}
          {/* El contenedor de la imagen ocupa todo el alto y se alinea a la derecha */}
          <div className="col-span-12 md:col-span-5 relative h-full flex items-end justify-end">
            <div className="relative h-[110%] w-[110%] -mr-20 -mb-10"> {/* Ligeramente más grande y desbordado para el efecto visual */}
              {/* IMAGEN CLAVE: Reemplaza con la foto real de la campaña en public/ */}
              <Image
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800&auto=format&fit=crop" // Imagen de stock placeholder
                alt="Madre sonriendo en la playa"
                fill
                className="object-cover object-center"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 20%)' }} // Suavizado en el borde izquierdo
              />
            </div>
          </div>
        </div>

        {/* Controles del Carrusel (Flechas y Puntos) */}
        {/* Flechas Laterales */}
        <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white/60 hover:text-white text-4xl cursor-pointer">❮</div>
        <div className="absolute top-1/2 right-6 -translate-y-1/2 text-white/60 hover:text-white text-4xl cursor-pointer">❯</div>
        
        {/* Puntos Inferiores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {[1, 2, 3, 4].map((num) => (
            <div 
              key={num} 
              className={`w-3.5 h-3.5 rounded-full border-2 border-white/70 cursor-pointer ${num === 1 ? 'bg-white' : 'hover:bg-white/40'}`}
            ></div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCTOS SECTION (Tarjetas Blancas) */}
      <section className="max-w-[1400px] mx-auto p-12 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Productos pensados en ti
        </h2>
        
        {/* Grid de 6 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <ProductCard iconName="Préstamo" label="Préstamo BN" />
          <ProductCard iconName="Hogar" label="Crédito Hipotecario" />
          <ProductCard iconName="Tarjetas" label="Tarjeta de crédito" />
          <ProductCard iconName="Escudo" label="Seguro para tarjetas" />
          <ProductCard iconName="Escudo BN" label="Seguro cuota protegida" />
          <ProductCard iconName="Lazo" label="Seguro Oncológico" />
        </div>
      </section>

      {/* 5. SECCIONES DOBLES (Beneficios e Inclusión) */}
      <section className="max-w-[1400px] mx-auto px-12 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Columna 1: Conoce BN Beneficios */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-between">
            Conoce BN Beneficios
            {/* [Opcional: Flechas de control pequeñas aquí si son carruseles individuales] */}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Placeholders de imágenes para las promos */}
            <PromoCard imageUrl="https://via.placeholder.com/400x250/CC0000/FFFFFF?text=Promo+Descuentos" title="Descuentos Exclusivos en Tiendas" />
            <PromoCard imageUrl="https://via.placeholder.com/400x250/CC0000/FFFFFF?text=Promo+Cine" title="Entradas al Cine 2x1" />
          </div>
        </div>

        {/* Columna 2: Inclusión Financiera */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-between">
            Inclusión Financiera
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PromoCard imageUrl="https://via.placeholder.com/400x250/CC0000/FFFFFF?text=Taller+Ahorro" title="Talleres Gratuitos de Ahorro" />
            <PromoCard imageUrl="https://via.placeholder.com/400x250/CC0000/FFFFFF?text=Banca+Celular" title="Usa tu celular para pagar" />
          </div>
        </div>
      </section>

      {/* 6. FLOATING CHAT BUTTON (WhatsApp bottom right) */}
      <button className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all group">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* [Icono WhatsApp real en producción] */}
          💬
          {/* Avatar de la asistente (como en la imagen original) */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
            <Image src="https://via.placeholder.com/30" alt="Asistente" fill className="object-cover" />
          </div>
        </div>
        {/* Tooltip opcional */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
          Hola, ¿en qué te puedo ayudar?
        </span>
      </button>

    </main>
  );
}