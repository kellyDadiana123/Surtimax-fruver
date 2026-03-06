import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Product } from '../types/supabase';
import { useCart } from '../lib/CartContext';
import { useWishlist } from '../lib/WishlistContext';
import { ShoppingCart, LogIn, LogOut, LayoutGrid, AlertCircle, ShoppingBag, Plus, Heart, Tag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import CrazyButton from '../components/CrazyButton';
import FloatingFruits from '../components/FloatingFruits';

/**
 * Página Principal del Escaparate (HomePage)
 * 
 * Es la cara pública de Surtimax donde se muestran las ofertas, el mercado
 * y se gestiona la interacción principal con el carrito y listas de deseos.
 */
export default function HomePage() {
  // --- ESTADO DE DATOS ---
  // Almacena la lista de productos obtenida de la base de datos
  const [products, setProducts] = useState<Product[]>([]);
  // Indica si la aplicación está en proceso de carga inicial de datos
  const [loading, setLoading] = useState(true);
  // Almacena la sesión actual del usuario autenticado
  const [session, setSession] = useState<Session | null>(null);

  // --- CONTEXTOS GLOBALES ---
  // Acceder a las funciones del carrito (contexto global)
  const { addToCart, totalItems, items } = useCart();
  // Acceder a las funciones de la lista de deseos (contexto global)
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // --- INTERFAZ Y ANIMACIONES ---
  // Estado para controlar la aparición de notificaciones tipo Toast
  const [toast, setToast] = useState<string | null>(null);

  // Utilidades de Framer Motion para efectos de scroll (Parallax)
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);   // Movimiento lento para el fondo
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);  // Movimiento opuesto para elementos decorativos

  // --- LÓGICA DE "FRUTA LOCA" (MYSTERY FRUIT) ---
  // Controla si el sorteo está en curso
  const [isSpinning, setIsSpinning] = useState(false);
  // Almacena el producto seleccionado aleatoriamente
  const [mysteryFruit, setMysteryFruit] = useState<Product | null>(null);

  /**
   * Ejecuta el efecto visual de "tragamonedas" para recomendar una fruta al azar.
   */
  const handleMysteryFruit = () => {
    if (products.length === 0 || isSpinning) return;
    setIsSpinning(true);
    setMysteryFruit(null);

    let count = 0;
    const interval = setInterval(() => {
      // Selección aleatoria temporal para efecto visual
      setMysteryFruit(products[Math.floor(Math.random() * products.length)]);
      count++;

      // Detener después de 20 iteraciones (aprox 2 segundos)
      if (count > 20) {
        clearInterval(interval);
        // Selección final
        const finalFruit = products[Math.floor(Math.random() * products.length)];
        setMysteryFruit(finalFruit);
        setIsSpinning(false);

        // Notificación de la recomendación
        setToast(`¡Tu Fruta Loca es: ${finalFruit.name}!`);
        setTimeout(() => setToast(null), 4000);
      }
    }, 100);
  };

  const showToast = (productName: string) => {
    setToast(`¡${productName} agregado al carrito!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock <= 0) return;
    addToCart(product);
    showToast(product.name);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Obtener productos públicos. RLS fue modificado para permitir lectura pública.
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error cargando los productos del escaparate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Auth Listener
    const localSession = localStorage.getItem('local-session');
    if (localSession) {
      setSession(JSON.parse(localSession));
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session as Session);
      });
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession) {
        setSession(currentSession as Session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 text-slate-900 font-sans antialiased">
      <FloatingFruits />

      {/* Sistema Integrado de Notificaciones (Toasts) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-600 text-white shadow-emerald-200 px-6 py-3 rounded-full shadow-lg`}
          >
            <ShoppingBag className="w-5 h-5 bg-white/20 p-0.5 rounded-full" />
            <span className="font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-neutral-200 bg-white/95 backdrop-blur-md px-6 py-3 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-200">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-800">Surtimax</h2>
        </div>
        <nav className="hidden flex-1 justify-center gap-8 md:flex">
          <Link className="text-sm font-bold text-neutral-800 hover:text-emerald-600 transition-colors" to="/">Mercado</Link>
          <a className="text-sm font-medium text-neutral-500 hover:text-emerald-600 transition-colors" href="#ofertas">Ofertas</a>
          <Link className="text-sm font-medium text-neutral-500 hover:text-emerald-600 transition-colors" to="/lists">Mis Listas</Link>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Bienvenido</span>
                <span className="text-sm font-bold text-neutral-800">{session.user?.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  localStorage.removeItem('local-session');
                  setSession(null);
                  setToast("Sesión cerrada");
                  setTimeout(() => setToast(null), 3000);
                }}
                className="flex h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors gap-2"
              >
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex h-10 items-center justify-center rounded-xl bg-neutral-100 px-4 text-sm font-bold text-neutral-700 hover:bg-neutral-200 transition-colors gap-2">
              <LogIn className="w-4 h-4" /> Ingresar
            </Link>
          )}
          <Link to="/cart" className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-bold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-600 transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full px-4 py-6 md:px-8 lg:px-10">
        <div className="w-full max-w-6xl space-y-10">

          {/* Hero Banner Dinámico "Loco" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-emerald-900/20 h-[450px] flex items-center"
          >
            <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
              <img alt="Vegetales frescos" className="h-[120%] w-full object-cover opacity-60 scale-110" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            </motion.div>

            <div className="relative z-10 flex flex-col justify-center gap-6 p-8 md:p-12 lg:p-20 w-full lg:w-2/3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 backdrop-blur-md px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400 border border-emerald-500/30 w-fit"
              >
                <Sparkles className="w-3 h-3" /> Cosecha del Día Directa
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="font-display text-5xl font-black leading-[1] tracking-tight md:text-6xl lg:text-7xl">
                  Frescura <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Nivel Súper Loco.</span>
                </h1>
                <p className="mt-6 max-w-lg text-lg text-slate-300 font-medium leading-relaxed">
                  No es solo un fruver, es una explosión de sabor directo del campo. ¿Te atreves a probar lo más fresco hoy?
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-4 mt-4">
                <CrazyButton onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}>
                  Ver Ofertas 🔥
                </CrazyButton>
                <CrazyButton variant="ghost" onClick={handleMysteryFruit}>
                  {isSpinning ? 'Girando...' : 'Fruta Loca 🎲'}
                </CrazyButton>
              </div>
            </div>

            {/* Elemento decorativo parallax secundario */}
            <motion.div
              style={{ y: y2 }}
              className="absolute right-10 top-10 z-0 hidden lg:block"
            >
              <div className="text-[180px] filter blur-sm opacity-20 select-none">🥦</div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {mysteryFruit && !isSpinning && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-inner">
                    <img src={mysteryFruit.image_url || ''} alt={mysteryFruit.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-black text-amber-900">¡Tu Fruta del Destino!</h3>
                    <p className="text-amber-700 font-medium">Te recomendamos probar {mysteryFruit.name} hoy mismo.</p>
                  </div>
                  <CrazyButton variant="accent" onClick={(e) => handleAddToCart(mysteryFruit, e as any)}>
                    ¡Me la Llevo!
                  </CrazyButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <section>
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-neutral-200 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center gap-2">
                  <span className="text-emerald-500">❖</span> Sugerencias para ti
                </h2>
                <p className="text-sm font-medium text-neutral-500 mt-1">Los favoritos locales actualizados en tiempo real.</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-neutral-100">
                <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-neutral-500 font-bold">Cargando el mercado fresco...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-neutral-100 text-center">
                <AlertCircle className="w-12 h-12 text-neutral-300 mb-4" />
                <h3 className="text-xl font-bold text-neutral-700">Aún no hay ofertas disponibles</h3>
                <p className="text-neutral-500">Pronto llegarán nuestros productos frescos.</p>
              </div>
            ) : (
              // Contenedor principal para Ofertas y Sugerencias
              <div className="space-y-16">
                {/* 🛒 SECCIÓN: OFERTAS DEL DÍA (Simuladas basadas en stock y precio) */}
                <div id="ofertas" className="scroll-mt-24">
                  <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-red-200 pb-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-red-600 flex items-center gap-2">
                        <Tag className="w-6 h-6" /> Ofertas del Día
                      </h2>
                      <p className="text-sm font-medium text-red-500/80 mt-1">Nuestros productos más frescos al mejor precio.</p>
                    </div>
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  >
                    {/* Mostramos los productos administrados que están marcados como ofertas */}
                    {products.filter(p => p.is_offer).map((product, idx) => {
                      const cartItem = items.find(i => i.id === product.id);
                      const availableStock = product.stock - (cartItem ? cartItem.quantity : 0);
                      const esFavorito = isInWishlist(product.id);

                      // Simular un precio original mayor
                      const precioOriginal = product.price * 1.25;

                      return (
                        <motion.div
                          key={`oferta-${product.id}`}
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            show: { y: 0, opacity: 1 }
                          }}
                          className="group flex flex-col rounded-2xl border border-red-100 bg-white p-3 hover:shadow-xl hover:shadow-red-900/10 transition-all relative"
                        >
                          <button
                            onClick={() => esFavorito ? removeFromWishlist(product.id) : addToWishlist(product)}
                            className={`absolute top-5 right-5 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm transition-transform hover:scale-110 active:scale-95 ${esFavorito ? 'text-red-500' : 'text-neutral-400 hover:text-red-500'}`}
                          >
                            <Heart className={`w-5 h-5 ${esFavorito ? 'fill-current' : ''}`} />
                          </button>

                          <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-50">
                            {product.image_url ? (
                              <img
                                alt={product.name}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={product.image_url}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-emerald-50">
                                <LayoutGrid className="w-10 h-10 text-emerald-200" />
                              </div>
                            )}

                            {/* Etiqueta de Oferta */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              <span className="rounded-md bg-red-500 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap shadow-sm">
                                -25% Dto
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col flex-1 pb-1 px-1">
                            <h3 className="text-[15px] font-extrabold text-neutral-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs font-medium text-neutral-500 mt-1 line-clamp-1 mb-3">
                              {product.description || 'Producto fresco'}
                            </p>

                            <div className="mt-auto flex items-end justify-between">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-neutral-400 line-through">
                                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precioOriginal)}
                                </span>
                                <span className="text-lg font-black tracking-tight text-red-600 leading-none">
                                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price)}
                                </span>
                              </div>

                              <button
                                onClick={(e) => handleAddToCart(product, e)}
                                disabled={availableStock === 0}
                                aria-label="Agregar al carrito"
                                className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-all ${availableStock === 0
                                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                  : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-100 hover:border-transparent active:scale-95'
                                  }`}
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>

                {/* 🌿 SECCIÓN: SUGERENCIAS PARA TI (Resto del catálogo) */}
                <div>
                  <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-neutral-200 pb-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center gap-2">
                        <span className="text-emerald-500">❖</span> Sugerencias para ti
                      </h2>
                      <p className="text-sm font-medium text-neutral-500 mt-1">Los favoritos locales actualizados en tiempo real.</p>
                    </div>
                  </div>
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                    className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  >
                    {products.map((product) => {
                      const cartItem = items.find(i => i.id === product.id);
                      const availableStock = product.stock - (cartItem ? cartItem.quantity : 0);
                      const esFavorito = isInWishlist(product.id);

                      return (
                        <motion.div
                          key={product.id}
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            show: { y: 0, opacity: 1 }
                          }}
                          className="group flex flex-col rounded-2xl border border-neutral-100 bg-white p-3 hover:shadow-xl hover:shadow-emerald-900/5 transition-all relative"
                        >
                          <button
                            onClick={() => esFavorito ? removeFromWishlist(product.id) : addToWishlist(product)}
                            className={`absolute top-5 right-5 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm transition-transform hover:scale-110 active:scale-95 ${esFavorito ? 'text-red-500' : 'text-neutral-400 hover:text-red-500'}`}
                          >
                            <Heart className={`w-5 h-5 ${esFavorito ? 'fill-current' : ''}`} />
                          </button>

                          <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-50">
                            {product.image_url ? (
                              <img
                                alt={product.name}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={product.image_url}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-emerald-50">
                                <LayoutGrid className="w-10 h-10 text-emerald-200" />
                              </div>
                            )}

                            {/* Estado del inventario / Etiquetas */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {availableStock <= 5 && availableStock > 0 && (
                                <span className="rounded-md bg-orange-100 px-2 py-1 text-[9px] font-extrabold uppercase tracking-widest text-orange-700 border border-orange-200 whitespace-nowrap">
                                  Stock Bajo Probable
                                </span>
                              )}
                              {availableStock === 0 && (
                                <span className="rounded-md bg-red-100 px-2 py-1 text-[9px] font-extrabold uppercase tracking-widest text-red-700 border border-red-200 whitespace-nowrap">
                                  Agotado
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col flex-1 pb-1 px-1">
                            <h3 className="text-[15px] font-extrabold text-neutral-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs font-medium text-neutral-500 mt-1 line-clamp-1 mb-3">
                              {product.description || 'Producto fresco'}
                            </p>

                            <div className="mt-auto flex items-end justify-between">
                              <span className="text-lg font-extrabold tracking-tight text-neutral-800">
                                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price)}
                              </span>

                              <button
                                onClick={(e) => handleAddToCart(product, e)}
                                disabled={availableStock === 0}
                                aria-label="Agregar al carrito"
                                className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-all ${availableStock === 0
                                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 hover:border-transparent active:scale-95'
                                  }`}
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </div>
            )}
          </section>

          {/* Botón Flotante para Carrito en Mobile */}
          <div className="fixed bottom-6 right-6 z-40 hidden max-md:flex">
            <Link to="/cart" className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

        </div>
      </main>

      <footer className="mt-12 bg-white border-t border-neutral-200 py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-neutral-800">Surtimax</span>
          </div>
          <p className="text-sm font-medium text-neutral-500">© 2026 Surtimax Inc. Frescura Garantizada.</p>
        </div>
      </footer>
    </div>
  );
}
