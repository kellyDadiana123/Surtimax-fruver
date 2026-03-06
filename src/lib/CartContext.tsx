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

/**
 * Contexto de Gestión del Carrito (CartContext)
 * 
 * Centraliza toda la lógica de compra de la aplicación, permitiendo
 * agregar, eliminar y actualizar productos desde cualquier componente.
 * Implementa persistencia automática en el almacenamiento local (localStorage).
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // --- ESTADO INICIAL ---
    // Se intenta recuperar el carrito previamente guardado en el navegador.
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem('surtimax_cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            // Si hay error en el parseo, devolver un carrito vacío.
            return [];
        }
    });

    /**
     * EFECTO DE PERSISTENCIA
     * Cada vez que el estado del carrito cambie, se actualiza el localStorage.
     */
    useEffect(() => {
        localStorage.setItem('surtimax_cart', JSON.stringify(items));
    }, [items]);

    /**
     * Agrega un nuevo producto al carrito o incrementa su cantidad.
     * @param product El objeto producto a añadir.
     */
    const addToCart = (product: Product) => {
        setItems((prev) => {
            // Verificar si el producto ya está en el carrito
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                // Validación de stock: No permitir agregar más si se alcanza el límite.
                if (existing.quantity >= product.stock) return prev;

                // Mapear los items e incrementar la cantidad del producto encontrado.
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Si no existe, agregarlo como un nuevo elemento con cantidad 1.
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    /**
     * Elimina completamente un producto del carrito.
     * @param productId ID único del producto a remover.
     */
    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    /**
     * Actualiza manualmente la cantidad de un producto.
     * @param productId ID del producto.
     * @param quantity Nueva cantidad deseada.
     */
    const updateQuantity = (productId: string, quantity: number) => {
        // Si la cantidad es 0 o menor, el producto se elimina automáticamente.
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    // Verificación de stock para evitar exceder la disponibilidad física.
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
