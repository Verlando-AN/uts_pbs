const express = require('express');
const app = express();
const port = 3002;

const bodyParser = require('body-parser');
const db = require('./connection.js')
const response = require('./response.js')

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "welcome to api", "Selamat datang di api service", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "Select * from tb_mahasiswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "get all data mahasiswa", res);
  });
});

app.get("/mahasiswa/:npm", (req, res) => {
  url_data = req.params.npm;
  const sql = Select * from tb_mahasiswa where npm_mhs='${npm}';
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "get data mahasiswa by npm", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nama, npm, alamat } = req.body;

  const sql = insert into tb_mahasiswa (nama_mhs,npm_mhs,alamat_mhs) values ('${nama}','${npm}','${alamat}');;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", err, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data Berhasil Ditambahkan", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nama, npm, alamat } = req.body;
  const sql = UPDATE tb_mahasiswa SET nama_mhs='${nama}', npm_mhs='${npm}', alamat_mhs='${alamat}' WHERE npm_mhs='${npm}';

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", error, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };

      response(200, data, "Data Berhasil Diupdate", res);
    } else {
      response(404, "not found", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { npm } = req.body;
  const sql = DELETE FROM tb_mahasiswa where npm_mhs ='${npm}';
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };

      response(200, data, "data Berhasil dihapus", res);
    } else {
      response(404, "not found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(Runing in port ${port});
});
