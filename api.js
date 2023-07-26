const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 2500;

const db = mysql.createConnection({
  host: 'bancomysql.c1rmsxzyhbjb.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Skyfall20#?',
  database: 'Integrador',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

app.get('/remedios', (req, res) => {
  const sql = 'SELECT * FROM Banco';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/remedios/search', (req, res) => {
    const { nome } = req.query;
    const sql = `SELECT * FROM Banco WHERE Principio LIKE ? OR Referencia LIKE ?`;
    db.query(sql, [`%${nome}%`, `%${nome}%`], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
