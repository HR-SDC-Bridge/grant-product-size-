require('dotenv').config();
//const newrelic = require('newrelic');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const models = require('./databaseModels');
//const dbname = process.env.NODE_ENV === 'test' ? 'ikea-test' : 'ikea';
//const host = process.env.DB_HOST_ENV === 'docker' ? 'mongo:27017' : 'localhost';
const productSizes = models.productSizes;
const singleSize = models.singleSize;
const host = 'mongo:27017';

//Mongoose Connection--Comment out before running seeding script

//var mongooseConnectionString = 'mongodb://grant:templars@13.52.125.255:27017/ikea';
var mongooseConnectionString = 'mongodb://grant:templars@localhost:27017/ikea';

console.log('Connecting to DB');
//console.log(`Connecting to DB mongodb://${host}/${dbname}`)
//mongoose.connect(`mongodb://${username}:${password}@${host}/${dbname}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connect(mongooseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error.reason));
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => console.log('Connection successful!'));

const db = {

  //CREATE

  setProductSizes: (documents, callback) => {
    productSizes.insertMany(documents, (err, docs) => {
      if (err) { return callback(err); }
      return callback(null, docs);
    });
  },

  //CREATE

  setProductSize: (document, callback) => {
    productSizes.create(document, (err, docs) => {
      if (err) { return callback(err); }
      return callback(null, docs);
    });
  },

  //UPDATE

  updateProductSize: (id, document, callback) => {
    const filter = {id: id};
    // const body = {$set: document};
    productSizes.findOneAndUpdate(filter, document, {new: true}, (err, doc) => {
      console.log(id);
      if (err) { return callback(err); }
      return callback(null, doc);
    });
  },

  //READ

  getProductSizes: (callback) => {
    productSizes.find({}, (err, docs) => {
      if (err) { return callback(err); }
      return callback(null, docs);
    });
  },

  //READ

  getProductSize: (id, callback) => {
    productSizes.findOne({id: id}, (err, docs) => {
      if (err || docs === null) { return callback(err); }
      return callback(null, docs);
    })
  },

  //DELETE

  deleteProductSize: (id, callback) => {
    productSizes.deleteOne({ id: id }, (err, docs) => {
      if (err || docs === null) { return callback(err); }
      return callback(null, docs);
    });
  }
};

const dbAsync = Promise.promisifyAll(db, {suffix: "Async"});

module.exports = {...dbAsync};
