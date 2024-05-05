const express = require('express');
const app = express();
const port = 3002;

const bodyParser = require('body-parser');
const db = require('./connection.js');
const response = require('./response.js');

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "welcome to api", "Selamat datang di api service", res);
});

// GET all mahasiswa
app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM tb_mahasiswa";
  db.query(sql, (err, result) => {
    if (err) response(500, "error", err, res);
    response(200, result, "get all data mahasiswa", res);
  });
});

// GET mahasiswa by npm
app.get("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = `SELECT * FROM tb_mahasiswa WHERE npm_mhs='${npm}'`;
  db.query(sql, (err, result) => {
    if (err) response(500, "error", err, res);
    response(200, result, "get data mahasiswa by npm", res);
  });
});

// POST new mahasiswa
app.post("/mahasiswa", (req, res) => {
  const { nama, npm, alamat } = req.body;
  const sql = `INSERT INTO tb_mahasiswa (nama_mhs, npm_mhs, alamat_mhs) VALUES ('${nama}', '${npm}', '${alamat}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "error", err, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data Berhasil Ditambahkan", res);
    }
  });
});

// PUT update mahasiswa by npm
app.put("/mahasiswa/:npm", (req, res) => {
  const { nama, alamat } = req.body;
  const npm = req.params.npm;
  const sql = `UPDATE tb_mahasiswa SET nama_mhs='${nama}', alamat_mhs='${alamat}' WHERE npm_mhs='${npm}'`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "error", err, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: "Data Berhasil Diupdate",
      };
      response(200, data, "Data Berhasil Diupdate", res);
    } else {
      response(404, "not found", "Data tidak ditemukan", res);
    }
  });
});

// DELETE mahasiswa by npm
app.delete("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = `DELETE FROM tb_mahasiswa WHERE npm_mhs ='${npm}'`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "error", err, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: "Data Berhasil Dihapus",
      };
      response(200, data, "Data Berhasil Dihapus", res);
    } else {
      response(404, "not found", "Data tidak ditemukan", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
