import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Product } from '../types/supabase';
import { useCart } from '../lib/CartContext';
import { useWishlist } from '../lib/WishlistContext';
import { ShoppingCart, LogIn, LogOut, LayoutGrid, AlertCircle, ShoppingBag, Plus, Heart, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Usar el contexto global
  const { addToCart, totalItems, items } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Estados para notificación Toast temporal de "producto agregado"
  const [toast, setToast] = useState<string | null>(null);

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession as Session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-neutral-50 text-neutral-800 font-sans antialiased">

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
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setToast("Sesión cerrada");
                setTimeout(() => setToast(null), 3000);
              }}
              className="hidden md:flex h-10 items-center justify-center rounded-xl bg-red-50 px-4 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors gap-2"
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
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

          {/* Hero Banner Minimalista Premium */}
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl shadow-neutral-900/10 group h-[340px] flex items-center">
            <div className="absolute inset-0 z-0">
              <img alt="Vegetales frescos" className="h-full w-full object-cover opacity-80" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/70 to-transparent"></div>
            </div>
            <div className="relative z-10 flex flex-col justify-center gap-5 p-8 md:p-12 lg:p-16 w-full lg:w-2/3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 border border-emerald-500/30 w-fit">
                Nuevos Productos Frescos Del Campo
              </div>
              <div>
                <h1 className="font-sans text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl text-white">
                  Del Campo a tu <br /><span className="text-emerald-400">Mesa en Horas.</span>
                </h1>
                <p className="mt-4 max-w-lg text-lg text-neutral-300 font-medium leading-relaxed">
                  Conectamos la cosecha diaria directamente contigo. Apoyando el talento local mientras disfrutas de la mejor frescura del mercado.
                </p>
              </div>
            </div>
          </div>

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

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {/* Mostramos los productos administrados que están marcados como ofertas */}
                    {products.filter(p => p.is_offer).map((product) => {
                      const cartItem = items.find(i => i.id === product.id);
                      const availableStock = product.stock - (cartItem ? cartItem.quantity : 0);
                      const esFavorito = isInWishlist(product.id);

                      // Simular un precio original mayor
                      const precioOriginal = product.price * 1.25;

                      return (
                        <div key={`oferta-${product.id}`} className="group flex flex-col rounded-2xl border border-red-100 bg-white p-3 hover:shadow-xl hover:shadow-red-900/10 transition-all relative">
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
                        </div>
                      )
                    })}
                  </div>
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
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map((product) => {
                      const cartItem = items.find(i => i.id === product.id);
                      const availableStock = product.stock - (cartItem ? cartItem.quantity : 0);
                      const esFavorito = isInWishlist(product.id);

                      return (
                        <div key={product.id} className="group flex flex-col rounded-2xl border border-neutral-100 bg-white p-3 hover:shadow-xl hover:shadow-emerald-900/5 transition-all relative">
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
                        </div>
                      )
                    })}
                  </div>
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
