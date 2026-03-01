import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, AlertCircle, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthProps {
  onAuthSuccess: () => void;
}

/**
 * Componente de Autenticación (Iniciar Sesión y Registro)
 * 
 * Proporciona una interfaz para que los usuarios inicien sesión en una cuenta existente
 * o registren una nueva. Utiliza el servicio de autenticación de Supabase.
 * 
 * Incluye validación de formulario, estados de carga y manejo de errores.
 */
export default function Auth({ onAuthSuccess }: AuthProps) {
  // Estado para alternar entre el modo 'login' (iniciar sesión) y 'register' (registro)
  const [isLogin, setIsLogin] = useState(true);
  
  // Estados para los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de la interfaz de usuario para carga y retroalimentación interactiva
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  /**
   * Maneja el envío del formulario tanto para Iniciar Sesión como para Registro.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Validación básica del lado del cliente
    if (!email || !password) {
      setError('Por favor, completa todos los campos requeridos.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Iniciar sesión del usuario usando Supabase
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        
        // Llamamos al callback de éxito proporcionado por el componente padre (App)
        onAuthSuccess();
      } else {
        // Registrar un nuevo usuario usando Supabase
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        
        // Mensaje final profesional de éxito al registrarse en lugar de una alerta del navegador
        setSuccessMsg('¡Cuenta creada exitosamente! Puede que sea necesario confirmar tu correo electrónico.');
        setIsLogin(true); // Cambiar automáticamente al inicio de sesión
        setPassword(''); // Limpiar contraseña por seguridad
      }
      
    } catch (err: any) {
      // Capturar y mostrar cualquier error de autenticación con un lenguaje amigable
      let mensajeError = 'Ocurrió un error inesperado durante el proceso.';
      if (err.message.includes('Invalid login credentials')) {
        mensajeError = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
      } else if (err.message.includes('User already registered')) {
        mensajeError = 'Este correo electrónico ya está registrado.';
      } else if (err.message.includes('Password should be')) {
        mensajeError = 'La contraseña debe tener al menos 6 caracteres.';
      }
      setError(mensajeError);
    } finally {
      // Siempre restablecer el estado de carga independientemente del resultado
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200"
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-emerald-500 p-3.5 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center text-neutral-800 mb-2 tracking-tight">
            Surtimax
          </h2>
          <p className="text-center text-neutral-500 mb-8 font-medium">
            {isLogin ? 'Bienvenido de nuevo a tu tienda' : 'Únete a la frescura garantizada'}
          </p>

          <AnimatePresence mode="popLayout">
            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
            
            {successMsg && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border border-emerald-100"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{successMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-neutral-50 focus:bg-white text-neutral-800 placeholder-neutral-400"
                placeholder="tu@correo.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-neutral-50 focus:bg-white text-neutral-800 placeholder-neutral-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-emerald-200"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Crear Cuenta
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-neutral-500">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccessMsg(null);
              }}
              className="ml-2 font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia Sesión aquí'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
