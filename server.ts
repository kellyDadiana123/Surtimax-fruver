import express from 'express';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001; // Usamos el 3001 para no chocar con Vite (3000)

app.use(express.json());

// CORS básico para permitir pruebas desde el navegador
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const db = new Database('users.db');

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Error en la autenticación.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);

    if (user) {
        res.json({
            message: '¡Autenticación satisfactoria!',
            user: {
                email: (user as any).email,
                id: (user as any).id
            }
        });
    } else {
        res.status(401).json({ message: 'Error en la autenticación.' });
    }
});

app.listen(port, () => {
    console.log(`Servicio de autenticación corriendo en http://localhost:${port}`);
});
