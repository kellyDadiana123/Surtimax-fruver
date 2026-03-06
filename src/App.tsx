import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ReceiptPage from './pages/ReceiptPage';
import ListsPage from './pages/ListsPage';

/**
 * Componente Principal de la Aplicación (App)
 * 
 * Este es el punto de entrada de la aplicación de Surtimax. 
 * Gestiona el estado de la sesión del usuario, maneja el enrutamiento 
 * de la aplicación utilizando React Router y proporciona componentes 
 * de protección para rutas administrativas.
 */
function App() {
  // Estado para almacenar la sesión actual del usuario (Supabase Auth)
  const [session, setSession] = useState<Session | null>(null);

  // Estado para controlar la carga inicial de la sesión
  const [loading, setLoading] = useState(true);

  // Hook para obtener la ubicación actual del enrutador
  const location = useLocation();

  /**
   * Efecto para inicializar la sesión y escuchar cambios de autenticación.
   * Se ejecuta una sola vez al montar el componente.
   */
  useEffect(() => {
    // --- SESIÓN LOCAL (Prioridad para desarrollo) ---
    // Primero revisamos si hay una sesión guardada en localStorage (de nuestro servidor local)
    const localSession = localStorage.getItem('local-session');
    if (localSession) {
      // Si existe, la cargamos directamente para saltarnos Supabase
      setSession(JSON.parse(localSession));
      setLoading(false);
    } else {
      // Si no hay sesión local, intentamos obtener la sesión normal de Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });
    }

    // Suscribirse a cambios en el estado de autenticación (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
      }
      setLoading(false);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Pantalla de carga animada (Splash Screen)
   * Se muestra mientras se verifica si el usuario tiene una sesión activa.
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10 flex flex-wrap gap-20 p-20 justify-center items-center pointer-events-none">
          {['🍎', '🥦', '🥕', '🍍', '🍉'].map((emoji, i) => (
            <div key={i} className="text-8xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{emoji}</div>
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin shadow-lg shadow-emerald-200"></div>
          <p className="mt-6 text-slate-900 font-display text-xl font-black tracking-tight animate-pulse text-center">
            Preparando la frescura <br />
            <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">Nivel Loco...</span>
          </p>
        </div>
      </div>
    );
  }

  /**
   * Componente Protector de Rutas (Administrador)
   * 
   * Asegura que solo usuarios autenticados con correos de administrador
   * puedan acceder a las rutas envueltas por este componente.
   */
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    // Redirigir al login si no hay sesión activa
    if (!session) {
      return <Navigate to="/login" replace />;
    }

    // Lista de correos con acceso de administrador autorizados al Panel de Control
    const ADMIN_EMAILS = ['santiagobaqueroarenas@gmail.com', 'emanuelcuervourresty@gmail.com'];

    // Verificar si el correo del usuario actual está en la lista de administradores
    if (!session.user.email || !ADMIN_EMAILS.includes(session.user.email)) {
      // Si no es admin, redirigir a la tienda pública
      return <Navigate to="/" replace />;
    }

    // Si todo es correcto, renderizar el contenido de la ruta
    return <>{children}</>;
  };

  return (
    <>
      <Routes>
        {/* Rutas Públicas (Storefront para el Cliente) */}
        <Route path="/" element={<HomePage />} />
        {/* Ruta pública del Carrito - Vista Estándar (Acceso Libre para todos, logueados o no) */}
        <Route path="/cart" element={<CartPage />} />

        {/* Ruta pública de Recibo */}
        <Route path="/receipt" element={<ReceiptPage />} />

        {/* Ruta de Mis Listas (Favoritos) */}
        <Route path="/lists" element={<ListsPage />} />

        {/* Rutas de Autenticación */}
        <Route
          path="/login"
          element={
            session ? (
              // Si ya está logueado, redirigir según su rol
              ['santiagobaqueroarenas@gmail.com', 'emanuelcuervourresty@gmail.com'].includes(session.user.email || '')
                ? <Navigate to="/admin" replace />
                : <Navigate to="/" replace />
            ) : (
              <Auth onAuthSuccess={(user) => {
                const mockSession = { user, access_token: 'local-token' } as any;
                setSession(mockSession);
                localStorage.setItem('local-session', JSON.stringify(mockSession));
              }} />
            )
          }
        />

        {/* Panel de Control (Admin) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {session?.user && <Dashboard user={session.user} onLogout={() => setSession(null)} />}
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto -> Redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Botones de navegación de utilidad rápida para demostración flotantes en la esquina inferior izquierda */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        {location.pathname !== '/' && (
          <Link to="/" className="flex h-12 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-neutral-700 shadow-lg ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors">
            <span className="material-symbols-outlined text-[20px]">store</span>
            Tienda Cliente
          </Link>
        )}
        {location.pathname !== '/admin' && (
          <Link to="/admin" className="flex h-12 items-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Mi Inventario
          </Link>
        )}
      </div>
    </>
  );
}

export default App;
