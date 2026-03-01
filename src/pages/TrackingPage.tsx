import { Link } from 'react-router-dom';

export default function TrackingPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased min-h-screen flex flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border-color bg-surface-light dark:bg-surface-dark px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-4 text-text-main dark:text-white">
            <div className="size-8 text-primary">
              <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Surtimax</h2>
          </Link>
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-color bg-background-light dark:bg-background-dark overflow-hidden">
              <div className="text-text-muted flex items-center justify-center pl-3">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="w-full min-w-0 flex-1 resize-none bg-transparent text-text-main dark:text-white focus:outline-0 px-3 text-sm placeholder:text-text-muted" placeholder="Buscar productos..." />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <nav className="hidden lg:flex items-center gap-6">
            <Link className="text-text-main dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" to="/aisles">Abarrotes</Link>
            <Link className="text-text-main dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" to="/offers">Ofertas</Link>
            <Link className="text-text-main dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" to="/orders">Mis Pedidos</Link>
          </nav>
          <div className="flex gap-3 items-center">
            <Link to="/cart" className="relative flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-primary-content hover:bg-opacity-90 transition-all font-bold text-sm shadow-sm">
              <span className="material-symbols-outlined mr-2 text-[20px]">shopping_cart</span>
              <span className="truncate">Carrito (3)</span>
            </Link>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer" data-alt="User profile picture showing a smiling woman" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5Mcs2-JDSLbDQQyAF-Dvf0b7V2XdNHC6mCN32f5nRZcB5rU3sSIpQx2uUSxPsQzHKJuVtFUvhak3QsCphcwQ4e08L4h05NuH184ggYjKYEoGQjxpVgbFDwzLvJKDlkLFo2ol9QuRyT6t22LWLxEpLa9jEgxh1kfbKHpD4Lak6V_zXUGv13IRDq63pHWYLZzGu054IrdjQ6VsMWK_j7wKd15U5sC7Mh8K7oBljZxEl_z_or2gfWbqxVDtnnGWcjs_Tf_kFkNCFXuU")' }}></div>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 md:px-10 py-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-end gap-4 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-border-color">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-main dark:text-white">Pedido #4829</h1>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">En Camino</span>
              </div>
              <p className="text-text-muted dark:text-gray-400 text-lg">Llegada esperada: <span className="text-text-main dark:text-white font-semibold">10:15 AM - 10:45 AM</span></p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center rounded-lg h-11 px-5 bg-background-light dark:bg-surface-dark border border-border-color hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-text-main dark:text-white font-bold text-sm">
                <span className="material-symbols-outlined mr-2 text-[20px]">call</span>
                Contactar Conductor
              </button>
              <button className="flex items-center justify-center rounded-lg h-11 px-5 bg-background-light dark:bg-surface-dark border border-border-color hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-text-main dark:text-white font-bold text-sm">
                <span className="material-symbols-outlined mr-2 text-[20px]">help</span>
                Ayuda
              </button>
            </div>
          </div>
          <div className="relative w-full aspect-video max-h-[500px] rounded-2xl overflow-hidden shadow-sm border border-border-color group">
            <div className="absolute inset-0 bg-cover bg-center" data-alt="Map view of city streets with route highlighted" data-location="City Map" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQP-YUwTpH3BNOZ95OBuLT_VciWLnS3_nu8upHGwx_s7DorW2ScPyHG4aGiEFjcv9Gs_2BXtFf6jpu_D6n6fZqDnxto-4nSpI8wWxNWxX6A5i_bp3aTEX0M_ei2WaRqRX9jbcqvjOZhSRQACPXNhKWbSnVb-ruvtPnPT9eKmb_FI6SRmN-5Xq6N1aTKjyb52pdzjSO5qHfyTfFWpdPV_MUHh2jzC3QVKq3zoVNQzrN6eG4Kebm7UguAAqNFcO0BI-CGENGwWP0yj4")' }}></div>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-6 left-6 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-lg border border-border-color flex items-center gap-4 max-w-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
              <div className="relative">
                <div className="size-14 rounded-full bg-cover bg-center border-2 border-primary" data-alt="Delivery driver portrait" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxmIRdj0copY1JfXe9YDG1k4h6H5AY2ZJvQM-jddenaWLmGxxbfSBxZwKZBAQqKyoO8QmTEd2ocZcW419BMkqJ6NSyQGA9SIay8taFOPa85SGsPvAdmBqn7Uz715zgsbZ87OPwiEVMQo0Y9k8fPpZR3MNlbIFHER9-6o9B-eXpPgSt7znFzVFeyAVnKMoK91piY8thJxYFGxZQNf3-4EsLyKrSpW_TqHGSrylyxso7aTonRbyuw_kCFkzs0F5qU-RByNqyEMKeu7s")' }}></div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-content rounded-full p-1 border-2 border-white dark:border-surface-dark">
                  <span className="material-symbols-outlined text-[14px] block font-bold">local_shipping</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-text-main dark:text-white">Miguel R.</h3>
                <p className="text-sm text-text-muted">Toyota Proace • <span className="font-mono">AB-123-CD</span></p>
                <div className="flex items-center gap-1 text-xs text-primary font-bold mt-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  <span>4.9 (1,240 entregas)</span>
                </div>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-primary text-primary-content px-4 py-2 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-pulse">
              <span className="material-symbols-outlined">timer</span>
              <span>Llega en 8 mins</span>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-color">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-main dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">ac_unit</span>
                  Monitor de Cadena de Frío
                </h2>
                <p className="text-text-muted mt-1">Datos de sensores IoT en vivo desde el camión.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Sensores Activos
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border-color bg-background-light dark:bg-background-dark p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-text-main dark:text-white">thermometer</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">Temperatura actual</span>
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  </div>
                  <div className="text-4xl font-black text-text-main dark:text-white mb-1">3.2°C</div>
                  <p className="text-sm text-text-muted">Meta: 2°C - 5°C (Óptimo para lácteos)</p>
                  <div className="mt-4 h-12 w-full flex items-end gap-1">
                    <div className="w-full bg-primary/20 h-[60%] rounded-t-sm"></div>
                    <div className="w-full bg-primary/30 h-[50%] rounded-t-sm"></div>
                    <div className="w-full bg-primary/40 h-[70%] rounded-t-sm"></div>
                    <div className="w-full bg-primary/60 h-[65%] rounded-t-sm"></div>
                    <div className="w-full bg-primary h-[80%] rounded-t-sm relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border-color bg-background-light dark:bg-background-dark p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-blue-500">water_drop</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">Humedad</span>
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  </div>
                  <div className="text-4xl font-black text-text-main dark:text-white mb-1">45%</div>
                  <p className="text-sm text-text-muted">Meta: 40% - 50% (Frescura preservada)</p>
                  <div className="mt-4 h-12 w-full flex items-end gap-1">
                    <div className="w-full bg-blue-500/20 h-[40%] rounded-t-sm"></div>
                    <div className="w-full bg-blue-500/30 h-[45%] rounded-t-sm"></div>
                    <div className="w-full bg-blue-500/40 h-[42%] rounded-t-sm"></div>
                    <div className="w-full bg-blue-500/60 h-[48%] rounded-t-sm"></div>
                    <div className="w-full bg-blue-500 h-[45%] rounded-t-sm relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-color opacity-70">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-text-muted text-2xl">signature</span>
              <h3 className="text-lg font-bold text-text-main dark:text-white">Prueba de Entrega</h3>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded uppercase font-bold">Pendiente</span>
            </div>
            <div className="h-32 rounded-xl border-2 border-dashed border-border-color flex items-center justify-center bg-background-light dark:bg-background-dark">
              <p className="text-text-muted text-sm flex items-col items-center gap-2">
                <span className="material-symbols-outlined">image</span>
                Foto y firma aparecerán aquí al completar
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-color h-fit">
            <h3 className="text-xl font-bold mb-6 text-text-main dark:text-white">Rastreo de Pedido en Tiempo Real</h3>
            <div className="relative pl-2">
              <div className="flex gap-4 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center z-10 ring-4 ring-surface-light dark:ring-surface-dark">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <div className="w-0.5 bg-primary/30 h-full absolute top-8 left-4 -translate-x-1/2"></div>
                </div>
                <div>
                  <p className="font-bold text-text-main dark:text-white">Pedido Realizado</p>
                  <p className="text-sm text-text-muted">09:00 AM</p>
                </div>
              </div>
              <div className="flex gap-4 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center z-10 ring-4 ring-surface-light dark:ring-surface-dark">
                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  </div>
                  <div className="w-0.5 bg-primary/30 h-full absolute top-8 left-4 -translate-x-1/2"></div>
                </div>
                <div>
                  <p className="font-bold text-text-main dark:text-white">Recolectado y Empacado</p>
                  <p className="text-sm text-text-muted">09:45 AM</p>
                  <div className="mt-2 text-xs bg-background-light dark:bg-background-dark p-2 rounded border border-border-color text-text-muted">
                    Nota del recolector: Reemplazo de albahaca agotada por albahaca orgánica (sin costo).
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center z-10 shadow-lg ring-4 ring-surface-light dark:ring-surface-dark">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  </div>
                  <div className="w-0.5 bg-border-color h-full absolute top-8 left-4 -translate-x-1/2"></div>
                </div>
                <div>
                  <p className="font-bold text-text-main dark:text-white">En Camino</p>
                  <p className="text-sm text-text-muted">10:05 AM</p>
                  <p className="text-sm text-primary font-medium mt-1">El conductor está cerca</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center z-10 ring-4 ring-surface-light dark:ring-surface-dark">
                    <span className="material-symbols-outlined text-[18px]">home</span>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-400">Entregado</p>
                  <p className="text-sm text-gray-400">Estimado 10:45 AM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-color flex flex-col overflow-hidden flex-1 min-h-[400px]">
            <div className="p-4 border-b border-border-color bg-background-light dark:bg-background-dark flex items-center gap-3">
              <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-main dark:text-white">Asistente Surtimax</h3>
                <p className="text-xs text-text-muted">Pregunta sobre tu pedido</p>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto max-h-[350px]">
              <div className="flex gap-3">
                <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex-shrink-0 flex items-center justify-center text-white text-[10px]">IA</div>
                <div className="bg-background-light dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm text-text-main dark:text-gray-200">
                  ¡Hola! Estoy monitoreando tu entrega. Tu conductor Miguel está a 8 minutos. ¿Tienes alguna pregunta?
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-600 text-[10px]">TÚ</div>
                <div className="bg-primary/20 dark:bg-primary/10 p-3 rounded-2xl rounded-tr-none text-sm text-text-main dark:text-gray-200 border border-primary/20">
                  ¿Están firmes los tomates?
                </div>
              </div>
              <div className="flex gap-3">
                <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex-shrink-0 flex items-center justify-center text-white text-[10px]">IA</div>
                <div className="bg-background-light dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm text-text-main dark:text-gray-200">
                  Verificando notas del empacador... <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse ml-1"></span>
                  <br /><br />
                  ¡Sí! El empacador seleccionó tomates Roma "Extra Firmes" según tus preferencias. Fueron empacados a las 9:35 AM.
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border-color">
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                <button className="whitespace-nowrap px-3 py-1.5 rounded-full border border-border-color text-xs font-medium hover:bg-background-light dark:hover:bg-gray-800 text-text-muted transition-colors">¿Dónde viene mi pedido?</button>
                <button className="whitespace-nowrap px-3 py-1.5 rounded-full border border-border-color text-xs font-medium hover:bg-background-light dark:hover:bg-gray-800 text-text-muted transition-colors">Cambiar instrucciones</button>
              </div>
              <div className="flex items-center gap-2 bg-background-light dark:bg-background-dark rounded-xl px-3 py-2 border border-border-color focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                <input className="flex-1 bg-transparent border-none text-sm focus:ring-0 text-text-main dark:text-white placeholder:text-text-muted p-0" placeholder="Escribe un mensaje..." type="text" />
                <button className="text-primary hover:text-primary/80 transition-colors p-1">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
