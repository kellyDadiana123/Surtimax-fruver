import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../lib/WishlistContext';
import { useCart } from '../lib/CartContext';
import { LayoutGrid, Heart, ShoppingCart, ArrowLeft, Trash2, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Página de Mis Listas (Favoritos)
 * 
 * Permite a los usuarios ver y gestionar los productos que han marcado
 * con el corazón en la tienda pública. Los favoritos se guardan localmente.
 */
export default function ListsPage() {
    // --- CONTEXTOS ---
    // Funciones para gestionar la lista de deseos
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    // Función para añadir directamente desde favoritos al carrito
    const { addToCart, items: cartItems } = useCart();

    /**
     * Utilidad para mostrar precios en formato de moneda local.
     */
    const formatCOP = (value: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="bg-neutral-50 font-sans text-neutral-800 min-h-screen flex flex-col">
            {/* Header Mínimo similar a CartPage */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white/95 backdrop-blur-md px-6 py-4 lg:px-10 shadow-sm">
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
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-red-50 p-2 rounded-xl text-red-500">
                                <Heart className="w-6 h-6 fill-current" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-neutral-900">Mis Listas</h1>
                        </div>
                        <p className="mt-2 text-neutral-500 font-medium">
                            {wishlist.length} {wishlist.length === 1 ? 'producto guardado' : 'productos guardados'} para futuras compras.
                        </p>
                    </div>
                    {wishlist.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="text-sm font-bold text-neutral-500 hover:text-red-500 transition-colors"
                        >
                            Limpiar todo
                        </button>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-neutral-100 mt-8 shadow-sm"
                    >
                        <div className="bg-red-50 p-6 rounded-full mb-6">
                            <Heart className="w-16 h-16 text-red-200" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-neutral-800 mb-2">Aún no tienes favoritos</h2>
                        <p className="text-neutral-500 mb-8 max-w-sm text-center">Guarda los productos que más te gustan tocando el corazón en la tienda para comprarlos más tarde.</p>
                        <Link to="/" className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
                            Explorar Ofertas
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <AnimatePresence>
                            {wishlist.map((product) => {
                                // Re-calculamos inventario usando el carrito (Reactividad Local)
                                const cartItem = cartItems.find(i => i.id === product.id);
                                const availableStock = product.stock - (cartItem ? cartItem.quantity : 0);

                                return (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group flex flex-col rounded-2xl border border-neutral-100 bg-white p-3 shadow-sm hover:shadow-xl hover:shadow-red-900/5 transition-all relative"
                                    >
                                        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 focus-within:ring-4 focus-within:ring-emerald-500/20">
                                            {product.image_url ? (
                                                <img
                                                    alt={product.name}
                                                    src={product.image_url}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300';
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <LayoutGrid className="w-8 h-8 text-neutral-300" />
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="absolute top-5 right-5 z-10 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 hover:text-red-700 shadow-sm transition-transform hover:scale-110 active:scale-95 border border-red-100"
                                            title="Quitar de Favoritos"
                                        >
                                            <Heart className="w-5 h-5 fill-current" />
                                        </button>

                                        <div className="flex flex-1 flex-col">
                                            <div className="mb-2">
                                                <h3 className="font-extrabold text-[15px] leading-tight text-neutral-800 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="mt-1 text-xs font-semibold text-neutral-400 line-clamp-1">
                                                    {product.description || 'Producto fresco de granja'}
                                                </p>
                                            </div>

                                            <div className="mt-auto flex items-end justify-between pt-2">
                                                <span className="text-lg font-extrabold tracking-tight text-neutral-800">
                                                    {formatCOP(product.price)}
                                                </span>

                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(product);
                                                    }}
                                                    disabled={availableStock === 0}
                                                    title={availableStock === 0 ? "Agotado" : "Añadir de nuevo al carrito"}
                                                    className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition-all ${availableStock === 0
                                                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-100 hover:border-transparent active:scale-95'
                                                        }`}
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
