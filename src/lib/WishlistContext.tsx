import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types/supabase';

// Cada item en la lista guardará la referencia del producto
export interface WishlistItem extends Product {
    addedAt: number;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

/**
 * Proveedor de Lista de Deseos (WishlistProvider)
 * 
 * Este componente permite gestionar una lista persistente de productos
 * favoritos para el usuario. Utiliza localStorage para que la lista
 * se mantenga guardada aunque se cierre el navegador.
 */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
    // --- ESTADO INICIAL ---
    // Intentar recuperar los favoritos almacenados previamente.
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const saved = localStorage.getItem('surtimax_wishlist');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error leyendo wishlist", e);
                return [];
            }
        }
        return [];
    });

    /**
     * PERSISTENCIA
     * Efecto para guardar automáticamente la lista cada vez que se agrega 
     * o elimina un producto.
     */
    useEffect(() => {
        localStorage.setItem('surtimax_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    /**
     * Agrega un producto a la lista de favoritos si aún no está en ella.
     */
    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            // Evitar que el mismo producto se agregue más de una vez.
            if (prev.some(item => item.id === product.id)) return prev;
            // Guardar junto con la fecha en que fue añadido.
            return [...prev, { ...product, addedAt: Date.now() }];
        });
    };

    /**
     * Remueve un producto de la lista basándose en su ID.
     */
    const removeFromWishlist = (id: string) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    /**
     * Verifica si un producto específico ya forma parte de los favoritos.
     */
    const isInWishlist = (id: string) => {
        return wishlist.some(item => item.id === id);
    };

    /**
     * Limpia completamente la lista de deseos.
     */
    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

// Hook personalizado para consumir el contexto
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist debe ser usado dentro de un WishlistProvider');
    }
    return context;
}
