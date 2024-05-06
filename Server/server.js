const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'izzet2001',
  database: 'book_library'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL verilənlər bazasına qoşularkən problem yarandı: ' + err.stack);
    return;
  }
  console.log('MySQL ə qoşuldu database id: ' + connection.threadId);
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Sorğunun icrası zamanı problem yarandı' + err.stack);
      res.status(500).json({ error: 'Server Error' });
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server 3000 portda işləyir http://localhost:3000');
});
