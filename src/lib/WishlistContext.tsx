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

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        // Intentar recuperar las listas guardadas desde localStorage
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

    // Efecto para persistir las listas en localStorage cada que cambia
    useEffect(() => {
        localStorage.setItem('surtimax_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            // Evitar duplicados
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, { ...product, addedAt: Date.now() }];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const isInWishlist = (id: string) => {
        return wishlist.some(item => item.id === id);
    };

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
