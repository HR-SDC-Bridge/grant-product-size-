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
app.get('/loaderio-d51a07215041ea545bd40a0daacf6cc0.txt', (req, res) => res.sendFile(path.resolve('/public/loaderio-d51a07215041ea545bd40a0daacf6cc0.txt')));
app.get('/loaderio-d51a07215041ea545bd40a0daacf6cc0.txt', express.static(path.resolve('public')));

//Redis

const redis = require('redis');
const REDIS_PORT = 6379;
const redis_client = redis.createClient(REDIS_PORT);
redis_client.on('error', err => {
  console.log('Redis Error ' + err);
});



checkCache = (req, res, next) => {
  const id = req.params.id;

  redis_client.get(id, (err, data) => {
      if (err) {
          console.log(err);
          res.status(500).send(err);
      }
     
      if (data !== null) {
	  let parsed = JSON.parse(data);
          res.send(parsed);
      }
      else {
          next();
      }
   });
};

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

app.get('/api/sizes/:id', checkCache, (req, res) => {
  db.getProductSizeAsync(req.params.id)
    .then((result) => {
      redis_client.setex(req.params.id, 90000, JSON.stringify(result));	    
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
