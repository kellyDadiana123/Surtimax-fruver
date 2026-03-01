import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, Plus, Trash2, Edit2, Search, Bell, PackageOpen, LayoutGrid, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

/**
 * Componente del Panel Principal (Gestión de Inventario)
 * 
 * Interfaz profesional donde el comerciante (usuario autenticado) 
 * puede gestionar su inventario de Surtimax. 
 * Reemplaza el uso de alertas nativas por mensajes Toast integrados.
 */
export default function Dashboard({ user, onLogout }: DashboardProps) {
    // Estado para la lista de productos
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para retroalimentación visual amigable (Toasts)
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Función auxiliar para mostrar un mensaje temporal en pantalla
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000); // Ocultar después de 4 segundos
    };

    // Estados del formulario
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        is_offer: false
    });

    /**
     * Obtiene todos los productos asociados con el usuario conectado.
     * Se ejecuta inicialmente cuando el componente se monta.
     */
    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Gracias a las políticas RLS, los usuarios solo pueden obtener sus propios datos
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error obteniendo productos:', error);
            showToast('Ocurrió un error al cargar tu inventario', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id]);

    /**
     * Cierra la sesión del usuario en Supabase y llama al manejador superior
     */
    const handleLogout = async () => {
        await supabase.auth.signOut();
        onLogout();
    };

    /**
     * Maneja el envío del formulario para Crear o Actualizar un producto
     */
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convertimos los campos numéricos de forma segura
        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            image_url: formData.image_url,
            is_offer: formData.is_offer,
            user_id: user.id // Siempre atribuir al usuario actual
        };

        try {
            if (isEditing) {
                // Modo actualizar producto
                // @ts-ignore
                const { error } = await supabase
                    .from('products')
                    .update(productData as any)
                    .eq('id', isEditing);

                if (error) throw error;
                showToast('Producto actualizado exitosamente');
            } else {
                // Modo crear producto nuevo
                // @ts-ignore
                const { error } = await supabase
                    .from('products')
                    .insert([productData as any]);

                if (error) throw error;
                showToast('Producto añadido a tu inventario');
            }

            // Reiniciar el formulario y recargar la lista
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error guardando el producto:', error);
            showToast('Hubo un error al guardar el producto', 'error');
        }
    };

    /**
     * Eliminar un producto específico, validando primero si el usuario está seguro
     * sin bloquear el hilo principal nativo. Se usa un simple confirm simulando ser menos obstructivo,
     * aunque idealmente sería un modal en una app en producción.
     */
    const handleDelete = async (id: string, nombreProducto: string) => {
        const isConfirm = window.confirm(`¿Seguro que deseas eliminar "${nombreProducto}" de forma permanente?`);
        if (!isConfirm) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Eliminamos el producto del estado local para no recargar toda la tabla
            setProducts(products.filter(p => p.id !== id));
            showToast('Producto eliminado permanentemente');
        } catch (error) {
            console.error('Error al eliminar:', error);
            showToast('No se pudo eliminar el producto', 'error');
        }
    };

    /**
     * Llena el formulario con los datos para editar un producto existente
     */
    const setupEdit = (product: Product) => {
        setIsEditing(product.id);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            stock: product.stock.toString(),
            image_url: product.image_url || '',
            is_offer: product.is_offer || false
        });

        // Desplazamiento suave hacia arriba donde está el formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Limpia los datos del formulario y sale del modo Edición
     */
    const resetForm = () => {
        setIsEditing(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            image_url: '',
            is_offer: false
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-neutral-800 font-sans relative">

            {/* Sistema Integrado de Notificaciones (Toasts) */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full shadow-lg ${toast.type === 'success' ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-red-600 text-white shadow-red-200'
                            }`}
                    >
                        {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 bg-white/20 rounded-full" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-semibold text-sm">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Barra de Navegación Principal estilo Surtimax */}
            <nav className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo y Marca */}
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500 rounded-xl p-2.5">
                                <LayoutGrid className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-extrabold text-neutral-800 tracking-tight">
                                Surtimax
                            </span>
                        </div>

                        {/* Buscador (Decorativo para la UI) */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar en el inventario..."
                                    className="w-full pl-12 pr-4 py-3 bg-neutral-100/80 border-transparent focus:bg-white focus:border-emerald-500 rounded-full text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>
                        </div>

                        {/* Acciones de Usuario */}
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:flex items-center gap-4 border-r border-neutral-200 pr-6">
                                <button className="text-neutral-500 hover:text-emerald-600 transition-colors">
                                    <Bell className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-emerald-200">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden sm:block text-sm">
                                    <p className="font-bold text-neutral-800 leading-none mb-1 text-xs">Administrador</p>
                                    <button onClick={handleLogout} className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors leading-none flex items-center gap-1">
                                        Cerrar sesión <LogOut className="w-3 h-3 ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">

                {/* Encabezado Principal y Resumen */}
                <div className="mb-8 bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                            Gestión de Inventario en Tiempo Real
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                            Del Campo a la <br />Mesa en 24 Horas.
                        </h1>
                        <p className="text-emerald-50 text-lg opacity-90 max-w-lg mb-6">
                            Añade productos frescos a tu tienda y nuestra plataforma los mostrará automáticamente a cientos de compradores locales.
                        </p>
                    </div>

                    {/* Elementos Decorativos del Banner */}
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent z-0 hidden md:block" />
                </div>

                {/* Panel Formulario Superior para Crear / Actualizar */}
                <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-8 mb-10 transition-all">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-neutral-800">
                        {isEditing ? (
                            <><Edit2 className="w-6 h-6 text-emerald-500" /> Editando: {formData.name}</>
                        ) : (
                            <><Plus className="w-6 h-6 text-emerald-500" /> Agregar Nuevo Producto Fresco</>
                        )}
                    </h2>

                    <form onSubmit={handleSubmitForm} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="col-span-1 lg:col-span-1">
                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nombre del Producto</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-neutral-50 focus:bg-white text-sm outline-none font-medium"
                                placeholder="Ej. Fresas Orgánicas"
                            />
                        </div>
                        <div className="col-span-1 lg:col-span-1">
                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Descripción (Origen, Notas)</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-neutral-50 focus:bg-white text-sm outline-none font-medium"
                                placeholder="Ej. Frescas de la finca..."
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Precio ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">$</span>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-neutral-50 focus:bg-white text-sm outline-none font-bold"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Unidades (Stock)</label>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-neutral-50 focus:bg-white text-sm outline-none font-bold"
                                    placeholder="Cantidad"
                                />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex items-center mb-2 mt-4">
                            <label className="relative inline-flex items-center cursor-pointer gap-3">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.is_offer}
                                    onChange={e => setFormData({ ...formData, is_offer: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                <span className="text-sm font-bold text-neutral-700">Marcar como Oferta Especial</span>
                            </label>
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between items-center mt-2 border-t border-neutral-100 pt-6">
                            <div className="text-sm font-medium text-neutral-500 hidden sm:block">
                                {isEditing ? 'Revisa los cambios antes de guardar.' : 'Asegura que los datos reflejen frescura y precisión.'}
                            </div>
                            <div className="flex gap-4 w-full sm:w-auto">
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 sm:flex-none px-6 py-3 font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors text-sm"
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="flex-1 sm:flex-none px-8 py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm"
                                >
                                    {isEditing ? 'Aplicar Cambios' : 'Publicar Producto'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Sección de Listado de Productos como Sugerencias visuales */}
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-extrabold text-neutral-800 flex items-center gap-2">
                            Tus Productos Publicados
                        </h3>
                        <p className="text-neutral-500 font-medium text-sm mt-1">Basado en tus registros, aquí está tu inventario actual.</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
                        {products.length} {products.length === 1 ? 'Artículo Disponible' : 'Artículos Disponibles'}
                    </span>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-neutral-100 min-h-[400px]">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                        <p className="mt-6 text-neutral-600 font-bold">Refrescando catálogo...</p>
                    </div>
                ) : products.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-neutral-100 min-h-[400px] text-center"
                    >
                        <div className="bg-emerald-50 p-6 rounded-full mb-6 relative">
                            <PackageOpen className="w-16 h-16 text-emerald-400" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
                        </div>
                        <h4 className="text-2xl font-extrabold text-neutral-800 mb-2">El estante está vacío</h4>
                        <p className="text-neutral-500 max-w-sm font-medium">
                            Aún no tienes productos a la venta. Empieza añadiendo el primero y llega a más clientes.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {products.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -6 }}
                                    key={product.id}
                                    className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all group flex flex-col"
                                >
                                    {/* Aspecto de imagen simulada profesional (usando degradados como placeholders) */}
                                    <div className={`h-40 w-full relative mb-4 ${product.price > 10 ? 'bg-gradient-to-br from-orange-100 to-amber-50' :
                                        product.price > 5 ? 'bg-gradient-to-br from-emerald-50 to-teal-50' :
                                            'bg-gradient-to-br from-indigo-50 to-blue-50'
                                        }`}>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                            <LayoutGrid className="w-12 h-12 text-black/20" />
                                        </div>
                                        {/* Badge de "Sugerencia" o Estado */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-1">
                                            {product.is_offer && (
                                                <span className="bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
                                                    EN OFERTA
                                                </span>
                                            )}
                                            {product.stock <= 5 && product.stock > 0 ? (
                                                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm border border-orange-200">
                                                    Poco Stock
                                                </span>
                                            ) : product.stock === 0 ? (
                                                <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm border border-red-200">
                                                    Agotado
                                                </span>
                                            ) : (
                                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm border border-emerald-200">
                                                    Recién Cosechado
                                                </span>
                                            )}
                                        </div>

                                        {/* Acciones Rápidas (Editar/Eliminar) al pasar el cursor */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setupEdit(product)}
                                                className="bg-white/90 backdrop-blur text-neutral-600 hover:text-emerald-600 p-2 rounded-lg shadow-sm font-medium transition-colors border border-neutral-200"
                                                title="Editar"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="bg-white/90 backdrop-blur text-neutral-600 hover:text-red-600 p-2 rounded-lg shadow-sm font-medium transition-colors border border-neutral-200"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 flex-1 flex flex-col">
                                        <h4 className="text-[17px] font-extrabold text-neutral-800 mb-1 leading-tight group-hover:text-emerald-600 transition-colors">
                                            {product.name}
                                        </h4>

                                        {product.description ? (
                                            <p className="text-xs text-neutral-500 font-medium mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-neutral-400 italic font-medium mb-4">Sin descripción detallada.</p>
                                        )}

                                        <div className="flex items-end justify-between mt-auto">
                                            <div>
                                                <p className="text-2xl font-extrabold text-neutral-800 tracking-tight">
                                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price)}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mt-0.5">
                                                    {product.stock} unidades disp.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setupEdit(product)}
                                                className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm border border-emerald-100 font-bold"
                                                title="Gestionar Rápido"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
