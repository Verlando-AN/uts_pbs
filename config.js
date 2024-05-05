// Meminta pustaka MySQL
const mysql = require('mysql');

// Variabel koneksi database
const db = mysql.createConnection({
  host: 'sql6.freesqldatabase.com', // Host database
  user: 'sql6702751', // Pengguna database
  password: 'ulTfR6Lyi9', // Kata sandi database
  database: 'sql6702751' // Mengasumsikan 'mahasiswa' adalah nama database Anda
});

// Mengekspor variabel koneksi database untuk digunakan di modul lain
module.exports = db;
