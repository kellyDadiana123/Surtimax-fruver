import Database from 'better-sqlite3';

// Crea o abre el archivo de la base de datos local 'users.db'
const db = new Database('users.db');

// Crea la tabla de usuarios si no existe todavía
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Prepara la sentencia SQL para insertar usuarios. 
// Use 'INSERT OR IGNORE' para evitar errores si el usuario ya existe (por el campo email UNIQUE)
const insert = db.prepare('INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)');

// Insertamos los usuarios de prueba solicitados por el usuario
insert.run('test@example.com', 'password123');
insert.run('kellyDadiana@example.com', 'kelly123');

console.log('Base de datos inicializada con los usuarios:');
console.log('- test@example.com / password123');
console.log('- kellyDadiana@example.com / kelly123');

// Cierra la conexión a la base de datos una vez terminada la configuración
db.close();
