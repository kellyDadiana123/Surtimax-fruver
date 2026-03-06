import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import { LayoutGrid, ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

/**
 * Página del Carrito de Compras (CartPage)
 * 
 * Permite al usuario revisar los productos seleccionados, ajustar 
 * cantidades, ver el desglose de costos (envío, descuentos eco) 
 * y proceder al pago final.
 */
export default function CartPage() {
  // --- ESTADO Y UTILIDADES ---
  // Obtener funciones y datos globales del carrito
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  // Hook para navegación entre rutas
  const navigate = useNavigate();

  // --- CÁLCULOS DE COSTOS (LOGICA DE NEGOCIO SIMULADA) ---
  // Costo de envío: Gratis si la compra supera los 100k COP, de lo contrario 12k.
  const shippingCost = totalItems > 0 ? (totalPrice > 100000 ? 0 : 12000) : 0;
  // Descuento ecológico fijo por usar empaques biodegradables.
  const ecoDiscount = items.length > 0 ? 2500 : 0;
  // Cálculo final de la transacción.
  const finalTotal = totalItems > 0 ? totalPrice + shippingCost - ecoDiscount : 0;

  /**
   * Formatea un número como moneda colombiana (COP).
   */
  const formatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  };

  /**
   * Maneja la finalización de la compra.
   * Llama a una función de base de datos (RPC) para descontar stock.
   */
  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      // Intentar procesar la transacción en la base de datos de forma atómica.
      // @ts-ignore
      const { error } = await supabase.rpc('process_checkout', {
        cart_items: items.map(i => ({ id: i.id, quantity: i.quantity }))
      });

      if (error) {
        console.error("Error al procesar el stock:", error);
        alert("Ocurrió un error finalizando tu pedido. Por favor intenta de nuevo.");
        return;
      }

      // Generación de información básica para el recibo digital.
      const orderInfo = {
        orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
        totalItems,
        subtotal: totalPrice,
        shippingCost,
        ecoDiscount,
        finalTotal
      };

      // Limpiar el carrito local tras el éxito.
      clearCart();
      // Redirigir a la vista del recibo enviando la información en el estado de la ruta.
      navigate('/receipt', { state: { orderInfo } });

    } catch (err) {
      console.error(err);
      alert("Error procesando pago.");
    }
  };

  return (
    <div className="bg-neutral-50 font-sans text-neutral-800 min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white/95 backdrop-blur-md px-6 py-4 lg:px-10">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-extrabold tracking-tight">Surtimax</h2>
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 py-8 lg:px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-neutral-900">Tu Carrito</h1>
            <p className="mt-2 text-neutral-500 font-medium">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} listos para pagar • Entrega estimada: <span className="font-bold text-emerald-600">Hoy, 4pm</span>
            </p>
          </div>
          <Link to="/" className="group flex items-center gap-2 justify-center rounded-xl bg-white border border-neutral-200 px-6 py-3 text-sm font-bold shadow-sm transition-all hover:border-emerald-500 hover:text-emerald-700">
            Seguir Comprando
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-neutral-100 mt-8">
            <div className="bg-neutral-50 p-6 rounded-full mb-6">
              <ShoppingCart className="w-16 h-16 text-neutral-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-800 mb-2">Tu carrito está vacío</h2>
            <p className="text-neutral-500 mb-8 max-w-sm text-center">Parece que aún no has añadido productos frescos a tu pedido. ¡Explora nuestro mercado!</p>
            <Link to="/" className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
              Explorar Mercado
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

            {/* Lista de Productos */}
            <div className="xl:col-span-8 flex flex-col gap-6">

              <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-5 flex items-start gap-4">
                <div className="rounded-full bg-emerald-100 p-2.5 text-emerald-600 shadow-inner">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-emerald-800">Rastreador de Sostenibilidad</h3>
                  <p className="text-sm text-emerald-700/80 mt-1 font-medium">Este pedido aporta a los productores locales. Empaque: <span className="font-bold">Biodegradable</span>.</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <div className="divide-y divide-neutral-100">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="group flex flex-col sm:flex-row items-center sm:items-start sm:justify-between p-6 hover:bg-neutral-50 transition-colors gap-6"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 relative group-hover:shadow-md transition-shadow">
                            {item.image_url ? (
                              <img
                                alt={item.name}
                                className="h-full w-full object-cover"
                                src={item.image_url}
                                onError={(e) => {
                                  // Fallback genérico si falla la URL directamente
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300';
                                }}
                              />
                            ) : (
                              <LayoutGrid className="absolute inset-0 m-auto w-8 h-8 text-neutral-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-extrabold text-neutral-800 text-lg line-clamp-1">{item.name}</h4>
                            <p className="text-sm font-medium text-neutral-500 mt-1 line-clamp-1">{item.description}</p>

                            {/* Controladores Mobile */}
                            <div className="flex sm:hidden items-center justify-between mt-4">
                              <span className="font-extrabold text-neutral-800 text-lg">{formatCOP(item.price * item.quantity)}</span>
                              <div className="flex items-center rounded-lg border border-neutral-200 bg-white">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-neutral-500 hover:text-emerald-600 active:bg-neutral-100"><Minus className="w-4 h-4" /></button>
                                <span className="px-2 text-sm font-bold w-6 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="p-2 text-neutral-500 hover:text-emerald-600 active:bg-neutral-100 disabled:opacity-30"><Plus className="w-4 h-4" /></button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Controladores Desktop */}
                        <div className="hidden sm:flex items-center gap-8 md:gap-12">
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center rounded-lg border border-neutral-200 bg-white shadow-sm">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-neutral-500 hover:text-emerald-600 hover:bg-neutral-50 transition-colors"><Minus className="w-4 h-4" /></button>
                              <span className="w-8 text-center text-sm font-extrabold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="p-2 text-neutral-500 hover:text-emerald-600 hover:bg-neutral-50 transition-colors disabled:opacity-30"><Plus className="w-4 h-4" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-3 h-3" /> Eliminar
                            </button>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <p className="font-extrabold text-neutral-800 text-xl">{formatCOP(item.price * item.quantity)}</p>
                            <p className="text-xs font-semibold text-neutral-400 mt-1">{formatCOP(item.price)} c/u</p>
                          </div>
                        </div>

                        {/* Botón Eliminar Mobile Frontal */}
                        <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 sm:hidden text-neutral-300 hover:text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Resumen de Checkout */}
            <div className="xl:col-span-4 space-y-6">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-emerald-900/5 sticky top-24">
                <h3 className="mb-6 text-xl font-extrabold text-neutral-800">Resumen de Compra</h3>

                <div className="space-y-4 font-medium">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal ({totalItems} art.)</span>
                    <span className="font-bold text-neutral-800">{formatCOP(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span className="flex items-center gap-1">
                      Envío
                    </span>
                    <span className="font-bold text-neutral-800">
                      {shippingCost === 0 ? <span className="text-emerald-600">Gratis</span> : formatCOP(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Bono Ecológico</span>
                    <span className="font-bold">-{formatCOP(ecoDiscount)}</span>
                  </div>

                  <div className="my-6 border-t border-dashed border-neutral-200"></div>

                  <div className="flex justify-between items-end">
                    <span className="text-lg font-extrabold text-neutral-800">Total</span>
                    <div className="text-right">
                      <span className="block text-3xl font-black text-emerald-600 leading-none">{formatCOP(finalTotal)}</span>
                      <span className="text-xs font-semibold text-neutral-400 mt-1 block">Incluye impuestos</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-8 w-full rounded-2xl bg-emerald-500 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Confirmar y Pagar
                </button>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-400">
                    <ShieldCheck className="w-4 h-4" /> Pago 100% seguro encriptado
                  </div>
                  {shippingCost > 0 && (
                    <div className="bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100 flex items-start gap-3">
                      <Truck className="w-5 h-5 text-emerald-500 shrink-0" />
                      <p className="text-xs font-medium text-neutral-600">Agrega <strong className="text-neutral-800">{formatCOP(100000 - totalPrice)}</strong> más a tu carrito para obtener <strong className="text-emerald-600">Envío Gratis</strong>.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
