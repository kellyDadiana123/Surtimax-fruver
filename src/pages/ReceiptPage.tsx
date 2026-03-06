import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Página de Recibo (Confirmación de Pago)
 * 
 * Muestra un resumen visual de la compra exitosa, incluyendo el 
 * número de orden y el desglose de costos.
 */
export default function ReceiptPage() {
    const location = useLocation();

    // Si no hay datos de estado (no viene de una compra real), redirigir
    if (!location.state || !location.state.orderInfo) {
        return <Navigate to="/" replace />;
    }

    const {
        orderNumber,
        totalItems,
        finalTotal,
        ecoDiscount,
        shippingCost,
        subtotal
    } = location.state.orderInfo;

    const formatCOP = (value: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans text-neutral-800">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg"
            >
                {/* Cabecera del Recibo */}
                <div className="bg-emerald-600 rounded-t-3xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShoppingBag className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="bg-white text-emerald-600 rounded-full p-3 shadow-lg shadow-emerald-900/20 mb-4"
                        >
                            <CheckCircle2 className="w-10 h-10" />
                        </motion.div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">¡Pago Exitoso!</h1>
                        <p className="text-emerald-100 font-medium">Gracias por preferir la frescura de Surtimax.</p>
                    </div>
                </div>

                {/* Cuerpo del Recibo */}
                <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-neutral-100 p-8 relative">
                    {/* Borde dentado estilo recibo */}
                    <div className="absolute top-0 left-0 w-full flex justify-between space-x-[2px] -mt-1 overflow-hidden">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-white rounded-full translate-y-[-50%]"></div>
                        ))}
                    </div>

                    <div className="text-center mb-8 pt-4">
                        <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-1">Orden #{orderNumber}</p>
                        <p className="text-xs font-medium text-neutral-400 capitalize">{formattedDate}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-neutral-500">Subtotal ({totalItems} art.)</span>
                            <span className="text-neutral-800 font-bold">{formatCOP(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-neutral-500">Valor de Envío</span>
                            <span className="text-neutral-800 font-bold">
                                {shippingCost === 0 ? 'Gratis' : formatCOP(shippingCost)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-emerald-600">Bono Ecológico</span>
                            <span className="text-emerald-600 font-bold">-{formatCOP(ecoDiscount)}</span>
                        </div>

                        <div className="border-t border-dashed border-neutral-200 mt-6 pt-6"></div>

                        <div className="flex justify-between items-end">
                            <span className="font-extrabold text-neutral-800">Total Pagado</span>
                            <span className="text-3xl font-black text-emerald-600 leading-none">{formatCOP(finalTotal)}</span>
                        </div>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-4 text-center mb-8 border border-emerald-100">
                        <p className="text-sm text-emerald-800 font-medium">Hemos enviado los detalles completos de la orden a tu correo electrónico.</p>
                    </div>

                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-neutral-900/20 hover:bg-neutral-800 transition-colors"
                    >
                        Volver a la Tienda <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
