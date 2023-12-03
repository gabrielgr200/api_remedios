const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 2500;

const db = mysql.createConnection({
  host: 'containers-us-west-37.railway.app',
  user: 'root',
  port: '5699',
  password: '2F3UfdCTUbleiDyyydVt',
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
  
  app.get('/remedios/distinct/:letter', (req, res) => {
    const { letter } = req.params;
    const sql = 'SELECT DISTINCT Referencia FROM Banco WHERE Referencia LIKE ? ORDER BY Referencia';
    db.query(sql, [`${letter}%`], (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
  
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
