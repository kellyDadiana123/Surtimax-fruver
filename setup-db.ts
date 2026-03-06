import Database from 'better-sqlite3';

const db = new Database('users.db');

// Crear tabla de usuarios
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Insertar usuarios de prueba si no existen
const insert = db.prepare('INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)');
insert.run('test@example.com', 'password123');
insert.run('kellyDadiana@example.com', 'kelly123');

console.log('Base de datos inicializada con los usuarios:');
console.log('- test@example.com / password123');
console.log('- kellyDadiana@example.com / kelly123');
db.close();
