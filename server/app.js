const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database/database.js');
const path = require('path');

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.resolve('public')));
app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// app.get('/api/sizes/:id', (req, res) => {
//   db.getProductSizeAsync(req.params.id)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.error(err));
// });

//Create

app.post('/api/sizes/:id', (req, res) => {
  console.log('req', req, 'res', res);
});

//Read

app.get('/api/sizes/:id', (req, res) => {
  db.getProductSize(req.params.id, (data) => {
    res.send(() => {
      console.log('data', data);
    });
  });
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