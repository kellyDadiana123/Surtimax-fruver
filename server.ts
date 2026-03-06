import express from 'express';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = 3001; // Puerto 3001 para evitar conflictos con el frontend (Vite) que usa el 3000

// Middleware para procesar cuerpos de peticiones en formato JSON
app.use(express.json());

// Configuración de CORS: Permite que el navegador (Frontend) se comunique con este servidor local
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite peticiones desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeceras permitidas
    next();
});

// Conexión a la base de datos local SQLite (archivo users.db)
const db = new Database('users.db');

/**
 * Endpoint de Login: /api/login
 * Recibe: { email, password }
 * Devuelve: Mensaje de éxito/error y datos del usuario si la autenticación es correcta
 */
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Validación básica de que los campos no estén vacíos
    if (!email || !password) {
        return res.status(400).json({ message: 'Error en la autenticación.' });
    }

    // Consulta a la base de datos para buscar un usuario con ese email y contraseña
    const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);

    if (user) {
        // Si el usuario existe, devolvemos éxito y sus datos básicos
        res.json({
            message: '¡Autenticación satisfactoria!',
            user: {
                email: (user as any).email,
                id: (user as any).id
            }
        });
    } else {
        // Si no existe o las credenciales no coinciden, devolvemos error 401 (No autorizado)
        res.status(401).json({ message: 'Error en la autenticación.' });
    }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servicio de autenticación corriendo en http://localhost:${port}`);
});
