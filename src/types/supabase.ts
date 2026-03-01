/**
 * Definiciones de TypeScript para Supabase generadas automáticamente/manualmente.
 * Esto asegura seguridad de tipos al obtener datos o modificar la base de datos.
 */
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    description: string | null
                    price: number
                    stock: number
                    image_url: string | null
                    is_offer: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    description?: string | null
                    price: number
                    stock?: number
                    image_url?: string | null
                    is_offer?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    description?: string | null
                    price?: number
                    stock?: number
                    image_url?: string | null
                    is_offer?: boolean
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Tipos auxiliares para facilitar su uso a lo largo de los componentes
export type Product = Database['public']['Tables']['products']['Row'];
export type InsertProduct = Database['public']['Tables']['products']['Insert'];
export type UpdateProduct = Database['public']['Tables']['products']['Update'];
