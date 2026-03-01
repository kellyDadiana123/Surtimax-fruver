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
 * Componente Principal de la Aplicación con Enrutamiento React Router
 */
function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-500 font-medium animate-pulse">Cargando frescura de Surtimax...</p>
        </div>
      </div>
    );
  }

  // Componente protector para rutas que requieren inicio de sesión (Administrador)
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }

    // Rol básico: solo el correo del administrador tiene acceso al Panel de Control
    const ADMIN_EMAIL = 'santiagobaqueroarenas@gmail.com';
    if (session.user.email !== ADMIN_EMAIL) {
      return <Navigate to="/" replace />;
    }

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
              session.user.email === 'santiagobaqueroarenas@gmail.com'
                ? <Navigate to="/admin" replace />
                : <Navigate to="/" replace />
            ) : (
              <Auth onAuthSuccess={() => { }} />
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
