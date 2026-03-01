import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/supabase';

// Definición del tipo para un elemento del carrito (Producto + Cantidad)
export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el contexto del carrito fácilmente
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

// Proveedor del estado del carrito para envolver la aplicación
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Inicializar estado desde localStorage si existe
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem('surtimax_cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Efecto para guardar en localStorage cada vez que cambia el carrito
    useEffect(() => {
        localStorage.setItem('surtimax_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                // Incrementa si hay stock disponible
                if (existing.quantity >= product.stock) return prev;
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Agregar nuevo producto al carrito con cantidad inicial 1
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    // No permitir exceder el stock máximo
                    const safeQuantity = Math.min(quantity, item.stock);
                    return { ...item, quantity: safeQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
