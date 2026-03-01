/**
 * Inicialización del Cliente de Supabase
 * 
 * Este archivo crea una instancia única del cliente de Supabase que puede
 * ser importada y utilizada a lo largo de la aplicación para interactuar 
 * con la base de datos y los servicios de autenticación.
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Extraemos las variables de entorno para la conexión con Supabase.
// Estas variables deben estar definidas en el archivo .env en la raíz del proyecto.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validamos que las variables de entorno existan para evitar errores en tiempo de ejecución
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables de entorno de Supabase faltantes. Por favor, revisa tu archivo .env.');
}

/**
 * La instancia del cliente de Supabase.
 * Está tipada con la interfaz Database para proporcionar autocompletado y 
 * seguridad de tipos al consultar la base de datos.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
