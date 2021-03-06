const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database/database.js');
const path = require('path');
const bodyParser = require('body-parser').json();

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.resolve('public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

//Create

app.post('/api/sizes/', bodyParser, (req, res) => {
  db.setProductSizeAsync(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));
});

//Read

app.get('/api/sizes/:id', (req, res) => {
  db.getProductSizeAsync(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));
});

//Update

app.put('/api/sizes/:id', bodyParser, (req, res) => {
  db.updateProductSizeAsync(req.params.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));
});

//Delete

app.delete('/api/sizes/:id', (req, res) => {
  // console.log(req.params.id);
  db.deleteProductSizeAsync(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));
});

module.exports = app;
