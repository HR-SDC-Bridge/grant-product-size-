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

app.put('/api/sizes/:id', (req, res) => {
  console.log(req.params.id);
});

//Delete

app.delete('/api/sizes/:id', (req, res) => {
  console.log(req.params.id);
});

module.exports = app;