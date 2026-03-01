import { Link } from 'react-router-dom';

export default function ProductPage() {
  return (
    <div className="bg-background-light text-text-main antialiased min-h-screen flex flex-col font-display">
      <header className="sticky top-0 z-50 bg-surface-light border-b border-[#f0f4f2] h-[72px] flex items-center justify-between px-6 lg:px-10 shadow-sm">
        <div className="flex items-center gap-8 w-full max-w-[1440px] mx-auto">
          <Link to="/" className="flex items-center gap-3 text-text-main cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined text-[24px]">eco</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Surtimax</h2>
          </Link>
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-background-light text-text-main placeholder-text-muted focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Buscar productos frescos, lácteos, etc..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-text-main">
              <Link className="hover:text-primary transition-colors" to="/fresh">Frescos</Link>
              <Link className="hover:text-primary transition-colors" to="/pantry">Despensa</Link>
              <Link className="hover:text-primary transition-colors" to="/offers">Ofertas</Link>
            </nav>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-background-light transition-colors text-text-main relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-background-light transition-colors text-text-main">
                <span className="material-symbols-outlined">person</span>
              </button>
              <button className="hidden md:flex items-center justify-center h-10 px-5 bg-background-light hover:bg-primary/20 text-text-main text-sm font-bold rounded-xl transition-colors">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto pt-6 pb-12 px-4 md:px-6 gap-6 lg:gap-10">
        <main className="flex-1 min-w-0">
          <nav className="flex items-center gap-2 text-sm font-medium mb-6 text-text-muted">
            <Link className="hover:text-primary" to="/">Inicio</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link className="hover:text-primary" to="/fresh">Frutas Frescas</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-text-main">Bayas</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-sm group">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-text-main shadow-sm border border-gray-100">
                    <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                    Calidad Garantizada
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-xs font-bold text-white shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    Inspección Visual
                  </span>
                </div>
                <img alt="High resolution macro shot of fresh organic strawberries" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="High resolution macro shot of fresh organic strawberries" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKnMLS1P5qdaE_y2WbIj8C2ciFkTK7mVMhQj_bdRKfblXguv5kboZlwIO4ynPbNwZS6qOBZR42k3XwTWRZUUDZxql2JD_QS5Q3jolQLtM1SRH2onZpI5HuNuZRz3Ry6dcYJ9wwmAr_yqEJ0FGfRuoRKV-RJR827ELuhTjPRBmMForz1JoU76T5xWN51_7oQYsEruOqmen5u0bDKqI2noofujqpFXIrc5pq3FXyRlezIklxOQVRbveHRt_gJPf7Vg6j63boxzbMjFY" />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button aria-label="Zoom" className="bg-white/90 hover:bg-white text-text-main p-2 rounded-full shadow-lg backdrop-blur-sm transition-all">
                    <span className="material-symbols-outlined">zoom_in</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <button className="aspect-square rounded-xl overflow-hidden border-2 border-primary ring-2 ring-primary/20">
                  <img alt="Thumbnail" className="w-full h-full object-cover" data-alt="Thumbnail of strawberries" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACjH7xuh99KGP9CBp1hUWkQwiFit_CgxKzy75w2M8OogqwsT3tRwEh3bs2icpl1zqKCZdrJKycdRFsiEL5a0LWxk-TdL1io-WiElZKZq5Wtfohhqhw4yRawwsoTjKcSvYux40BjZFF0ip1kudntoYdzznQB4O3MRZwduFw_IaanS1pHaOVhjVrgL5nfWnQSNTuN-4Vph-ODWzW9QjZgjaqDK2JeT3616e3GDEFSz4uqVZuzP28hJNO207Cxy_CLkzZG2PWs3F_XaM" />
                </button>
                <button className="aspect-square rounded-xl overflow-hidden border border-transparent hover:border-gray-300">
                  <img alt="Thumbnail" className="w-full h-full object-cover" data-alt="Macro detail of strawberry seeds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATIcmvY3I47d6DTWi91EkrFry8gk-D3IpamXilDNPb1_YcIdK618AZip4xH04pVyVNvWstx0NJHa0E1cPRhTtrhUev3H8uN7Tww0CR5ehjNCegmg7c5Lf-1EaQddW8DOTG9-sSqYasILfsKZzYyHBex_7xCBYKzT86XIf8yZ8uOk8-Y33K8_aBnc2FZe0g7CecwkEBOgX9vSmmiCBOhnEjYAHr9e9twrXM4x_6htdbFUAu0GoiEylQyrjngiwY78yg6Doq4_8WaQg" />
                </button>
                <button className="aspect-square rounded-xl overflow-hidden border border-transparent hover:border-gray-300">
                  <img alt="Thumbnail" className="w-full h-full object-cover" data-alt="Strawberries in a bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtUxygb1oPUGtT8t0tw1DLyaa6FOtUUifAmdTQyrO8xDRQl2VjRkGNYomOCirikhebgsT4_FggNLKxiJN7qfz52KP3l6MvsNgh8sKMT_gSgYpCKZC_vRtCg4gJLw8U_ByPE0wbdWOZKplHTfYscWjVdftDpKqg6UedfPnTSxm73sOSWeQhXvtnPSy_Lk0cT3z46rR2IcFRF-ajXDT8kticUGMMqiedjrOafa785eBsK98q2HZpsf4GD3NDOypdVGRZ77vpR5BmGIE" />
                </button>
                <button className="aspect-square rounded-xl overflow-hidden border border-transparent hover:border-gray-300 bg-gray-100 flex items-center justify-center text-text-muted">
                  <span className="text-sm font-semibold">+2</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight mb-2">Fresas Orgánicas</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                    <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                    <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                    <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                    <span className="material-symbols-outlined fill-current text-[18px]">star_half</span>
                  </div>
                  <span className="text-sm font-semibold text-text-muted">(1,204 reseñas)</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-text-main">$5.99</span>
                  <span className="text-lg text-text-muted font-medium">/ 500g</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#e5e9e7] shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                  <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Panel de Confianza</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">dataset_linked</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase">Trazabilidad Blockchain</p>
                      <p className="text-sm font-bold text-text-main">Origen: Granja Santa Elena</p>
                      <p className="text-xs text-text-muted mt-0.5">Cosecha: Hoy 6:00 AM</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">thermostat</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase">Condición de Almacenamiento</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-text-main">34°F (1°C)</p>
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-bold text-primary uppercase">En vivo</span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">Cadena de frío óptima mantenida</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border border-[#e5e9e7] rounded-xl h-14 p-1 shadow-sm w-40">
                    <button className="w-12 h-full flex items-center justify-center text-text-main hover:bg-background-light rounded-lg transition-colors">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input className="w-full h-full text-center border-none focus:ring-0 text-lg font-bold p-0 text-text-main" readOnly type="text" defaultValue="1" />
                    <button className="w-12 h-full flex items-center justify-center text-text-main hover:bg-background-light rounded-lg transition-colors">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <Link to="/cart" className="flex-1 h-14 bg-primary hover:bg-primary-dark text-text-main font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Añadir al carrito
                  </Link>
                </div>
                <p className="text-center text-sm text-text-muted flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Próxima entrega disponible: <span className="font-bold text-text-main">Hoy, 4pm - 6pm</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-xl font-bold text-text-main mb-6">También te podría gustar</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group bg-white rounded-2xl p-4 border border-transparent hover:border-[#e5e9e7] hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-square rounded-xl bg-background-light mb-4 overflow-hidden">
                  <img alt="Cream" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Heavy whipping cream carton" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFo01-tZVh51BzSLdIdGCP9dFLgd9YT3BpFFrsExPaMBsv_ByHvamMzj7uBFosqXpxhI9wBWeOhqw8eW_4Ivef2yeiSuhR5sXCcpAPQ4YR6s_vFScTwPIYc2RWCjh2Xvyq4nGfyYd02paR1SzNqhNXIC_-JfhMHccPLfIXq1yrLIZrI4F7-L3POvg2X6minlzyTdCJwjoidg5qFCKJDT-pf1sixto2kQEHsWO34Xp5VOVBGS8z0o4gf8fS99yo4Va-j81PzXG-aoE" />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <h4 className="font-bold text-text-main leading-tight mb-1">Crema para Batir</h4>
                <p className="text-xs text-text-muted mb-2">Organic Valley • 1pt</p>
                <p className="font-bold text-text-main">$4.29</p>
              </div>
              <div className="group bg-white rounded-2xl p-4 border border-transparent hover:border-[#e5e9e7] hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-square rounded-xl bg-background-light mb-4 overflow-hidden">
                  <img alt="Sugar" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Bag of cane sugar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf3G9XbG4t1BzsEImEX11jrtr591dtfmjZn8uZRb6EA68Q8tJW1Y7Q4BjW_nYLLLF-vKr_qpF2rhCLUxWf8g0oCxDZdoh0Ns2fmBECNskO5WWtZZF4gIhbXJb8mt91TFXCcJHQBQrMCYWBFt24BGoVoCDvLCSX9vjOrF6XhxIm1MfzReInj69cWk0wncoheFSYg29sH32cVbAZPRgNbNGlwwalOSOHvhF-dugzRuJ1hLiZkY4oBN1uM5tE6CZY9R_lLwAF8ye1nHg" />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <h4 className="font-bold text-text-main leading-tight mb-1">Azúcar de Caña Pura</h4>
                <p className="text-xs text-text-muted mb-2">Domino • 2lb</p>
                <p className="font-bold text-text-main">$3.15</p>
              </div>
              <div className="group bg-white rounded-2xl p-4 border border-transparent hover:border-[#e5e9e7] hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-square rounded-xl bg-background-light mb-4 overflow-hidden">
                  <img alt="Blueberries" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Blueberries in a bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9YedJWuH25nTFrEAvCV-_tp1BpSEdxZhHr9P_yMOmPjrnZVh6FXb4TVXryNKWOeHYxaQq66-36IqCoVsQrl8-QipirvsZuhGq3OqWnnZuD4Q5oK3BWBBDzTgrV-DWHS-4OONYsnyMuktVnF62lJxHyNRHbBq_ruUkxqqzf3T8aN6gj9eSxAOv59u9LSL71f3h-v9YWicDF7jJHpgxcQ2ssHkkUvkxnXSWPvCUzL0cgu4BlmyWEeqMPjdG4mlunxIMOR3pH04XKSc" />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <h4 className="font-bold text-text-main leading-tight mb-1">Arándanos Frescos</h4>
                <p className="text-xs text-text-muted mb-2">Driscoll's • 6oz</p>
                <p className="font-bold text-text-main">$4.99</p>
              </div>
              <div className="group bg-white rounded-2xl p-4 border border-transparent hover:border-[#e5e9e7] hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-square rounded-xl bg-background-light mb-4 overflow-hidden">
                  <img alt="Vanilla" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Bottle of vanilla extract" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFMj8UxKrd3kwOFME0xPjR-2mF7353JMvR2oeObnDDOKOHWpiGXu6QwQCsztW3yh9c_VM-GMq86-MWfVRl_AphrNvI6DknxesxGkawHo7BFvN9hTM51ikytum6i95JonTD-8rUnrDfuQsz7ryQDY6mjFv2DbG1_5LBfIUk6JQXlbNUBxMStULDQZ9W3CCWxNanfDuLpS00Y8coV437bM-N7bdtHSOeO4IvwQyca0nI18yUDbOqFy1kPG90pjeqDygyhbrDibg_NhM" />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <h4 className="font-bold text-text-main leading-tight mb-1">Extracto de Vainilla</h4>
                <p className="text-xs text-text-muted mb-2">McCormick • 2oz</p>
                <p className="font-bold text-text-main">$8.49</p>
              </div>
            </div>
          </div>
        </main>
        <aside className="hidden xl:flex w-[380px] flex-col shrink-0">
          <div className="sticky top-24 bg-white rounded-3xl shadow-sm border border-[#f0f4f2] overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
            <div className="p-5 border-b border-[#f0f4f2] flex items-center justify-between bg-white z-10">
              <div>
                <h2 className="font-bold text-lg text-text-main">Resumen de Compra</h2>
                <p className="text-xs text-text-muted">3 artículos en total</p>
              </div>
              <button className="p-2 hover:bg-background-light rounded-full text-text-muted">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
              <div className="flex gap-3 items-center group">
                <div className="w-16 h-16 rounded-xl bg-background-light shrink-0 overflow-hidden">
                  <img alt="Milk" className="w-full h-full object-cover" data-alt="Carton of milk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGnHZzL25D5b2yMzhkqsfB-dHlkPss5Qa-b5KxTus7W1BjUL6XAYxjwbsw2L6s_kcofuITBXoKHc1_gfZLETmHCCZQZ7kEJwzHN2Dnz9HJb4JL6uQI0Fi3VT-zk3Nr1jcSHxbcHZJCDXy1Bx0Nq-foMy6QCvnqI1touI8Ov9W6ioswCIWNgVj0S7RgvjTv2JmnH8UPkIizqMVq_drKhejbS318Ymc5-UsI9FtmCbTItmQhswaLZW8mBBH9CqpQcViIGYHx0ehHuas" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-text-main truncate">Leche Entera</h4>
                  <p className="text-xs text-text-muted">1 gal</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">$3.99</span>
                  <div className="flex items-center gap-2 bg-background-light rounded-lg px-2 py-0.5">
                    <button className="text-[10px] text-text-muted hover:text-text-main"><span className="material-symbols-outlined text-[14px]">remove</span></button>
                    <span className="text-xs font-bold w-3 text-center">1</span>
                    <button className="text-[10px] text-text-muted hover:text-text-main"><span class="material-symbols-outlined text-[14px]">add</span></button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center group">
                <div className="w-16 h-16 rounded-xl bg-background-light shrink-0 overflow-hidden">
                  <img alt="Bread" className="w-full h-full object-cover" data-alt="Loaf of bread" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTH6fbU3VZJ-MMXEqE1Ah6iI-ie_jUKu5SxIiVJRmWHQJ_0mALI7iL63rKBRmTxQ3LHKY1g_ZqTcc-_JiXB_bM0B8oGe4ihrfm97m2Ehp7I2e4G2LvZVdJ9niQeZHafO-P3g09BH51Hr4X-Rr9ypDlYu3OniCpGHD_HP7Th6tIFUETFCLmPmCNCcFVpwg0tid-wX2TUc-tSr3pQcUbNLhpJ4dIKc8oZoytBSOGcP0etDmqhU0_P-jxsY1aN7HdrjNY9frBIlKy04o" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-text-main truncate">Pan de Masa Madre</h4>
                  <p className="text-xs text-text-muted">Rebanado</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">$5.49</span>
                  <div className="flex items-center gap-2 bg-background-light rounded-lg px-2 py-0.5">
                    <button className="text-[10px] text-text-muted hover:text-text-main"><span className="material-symbols-outlined text-[14px]">remove</span></button>
                    <span className="text-xs font-bold w-3 text-center">1</span>
                    <button className="text-[10px] text-text-muted hover:text-text-main"><span className="material-symbols-outlined text-[14px]">add</span></button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center group">
                <div className="w-16 h-16 rounded-xl bg-background-light shrink-0 overflow-hidden">
                  <img alt="Avocados" className="w-full h-full object-cover" data-alt="Green avocados" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuCSWd1nBrL6u72lib8dZh_NDUlWtBicWKy_7JHVY2-GEgYf1Bwo7G12a4WD_62akaUPUfNMB-MJGgpeVqHpGTGDYT52-VKt_H6jtG-fHIJOS-z1GcDx1P6VcJJpbRM-iMe8wh5RIHp-ImMr6DiqSvUwWHOLSh3ZNjOAMTONyHnCo-RWVQljpyx9tMvnffxL_1fchkmzJAwq5yU_hw13KCauLXISzcVdMNe7u40_07WFDRAmDap7yKTwZuRyiqwzWhqQkdcb2HONs" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-text-main truncate">Aguacates Orgánicos</h4>
                  <p className="text-xs text-text-muted">Bolsa 3 pzas</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">$4.99</span>
                  <div className="flex items-center gap-2 bg-background-light rounded-lg px-2 py-0.5">
                    <button className="text-[10px] text-text-muted hover:text-text-main"><span className="material-symbols-outlined text-[14px]">remove</span></button>
                    <span className="text-xs font-bold w-3 text-center">1</span>
                    <button className="text-[10px] text-text-muted hover:text-text-main"><span className="material-symbols-outlined text-[14px]">add</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-background-light border-t border-[#f0f4f2] mt-auto">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Subtotal</span>
                  <span>$14.47</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Envío</span>
                  <span className="text-primary font-bold">Gratis</span>
                </div>
                <div className="flex justify-between text-base font-bold text-text-main pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>$14.47</span>
                </div>
              </div>
              <Link to="/cart" className="w-full h-12 bg-text-main text-white hover:bg-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                Proceder al Pago
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 px-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Acceso Rápido</h3>
            <div className="flex flex-col gap-2">
              <Link className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-text-main" to="/lists">
                <span className="material-symbols-outlined text-text-muted">list_alt</span>
                <span className="text-sm font-medium">Mis Listas</span>
              </Link>
              <Link className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-text-main" to="/favorites">
                <span className="material-symbols-outlined text-text-muted">favorite</span>
                <span className="text-sm font-medium">Favoritos</span>
              </Link>
              <Link className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-text-main" to="/history">
                <span className="material-symbols-outlined text-text-muted">history</span>
                <span className="text-sm font-medium">Pedidos Anteriores</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
