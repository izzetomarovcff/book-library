const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'izzet2001',
  database: 'book_library'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

app.get('/getbooks', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});
app.get('/getcategory', (req, res) => {
  connection.query('SELECT * FROM category', (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});
app.post('/search', (req, res) => {
  const { search } = req.body
  const sql = `SELECT * FROM books WHERE (book_name LIKE '%${search}%') OR (book_author LIKE '%${search}%')`
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results)
  });
});
app.post('/editcategory',(req,res)=>{
  const {id, category_name} = req.body
  const sql = `UPDATE category SET category_name = "${category_name}" WHERE id=${id};`
  connection.query(sql,(err,result)=>{
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result)
  })
})
app.delete("/delcategory", (req, res) => {
  const { id } = req.body
  const sql = `DELETE FROM category WHERE id=${id}`
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results)
  })
})
app.delete("/delbook", (req, res) => {
  const { id } = req.body
  const sql = `DELETE FROM books WHERE id=${id}`
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results)
  })
})
app.post('/newbook', (req, res) => {
  const { book_image_url, book_category, book_name, book_author, book_summary, have_sale, old_price, price } = req.body;
  const sql = 'INSERT INTO books (book_image_url, book_category, book_name, book_author, book_summary, have_sale, old_price, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [book_image_url, book_category, book_name, book_author, book_summary, have_sale, old_price, price];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding book to database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Book added to database:', result);
    res.status(200).json({ message: 'Book added successfully' });
  });
});

app.post('/newcategory', (req, res) => {
  const { category_name } = req.body;
  const sql = 'INSERT INTO category (category_name) VALUES (?)';
  const values = [category_name];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding book to database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Book added to database:', result);
    res.status(200).json({ message: 'Book added successfully' });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001 http://localhost:3001');
});