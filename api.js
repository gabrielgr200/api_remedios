const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 2500;

const db = mysql.createConnection({
  host: 'viaduct.proxy.rlwy.net',
  user: 'root',
  port: '35342',
  password: 'ebdcGDAE1-cHa2B-aeCDGffGHhghgFg3',
  database: 'projetoIntegrador',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

app.get('/remedios', (req, res) => {
  const sql = 'SELECT * FROM Integrador';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/remedios/search', (req, res) => {
  const { nome } = req.query;
  const sql = `SELECT * FROM Integrador WHERE Principio LIKE ? OR Referencia LIKE ?`;
  db.query(sql, [`%${nome}%`, `%${nome}%`], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/remedios/distinct/:letter', (req, res) => {
  const { letter } = req.params;
  const sql = 'SELECT DISTINCT Referencia, Principio, Comercial, Registro, Colaterais, Decomposto, Farmacia, Concentracao FROM Integrador WHERE Referencia LIKE ? ORDER BY Referencia';

  db.query(sql, [`${letter}%`], (err, result) => {
    if (err) {
      throw err;
    }

    const formattedResult = result.map(item => ({
      referencia: item.Referencia,
      principio: item.Principio,
      comercial: item.Comercial,
      registro: item.Registro,
      colaterais: item.Colaterais,
      decomposto: item.Decomposto,
      farmacia: item.Farmacia,
      concentracao: item.Concentracao
    }));

    res.json(formattedResult);
  });
});


app.listen(process.env.PORT || port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
