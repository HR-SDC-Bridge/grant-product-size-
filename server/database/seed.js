const mongoose = require('mongoose');
const db = require('./database.js');
const models = require('./databaseModels.js');
const productSizes = models.productSizes;
const generateSeedData = require('./generateSeedData.js');
const dbname = process.env.NODE_ENV === 'test' ? 'ikea-test' : 'ikea';
const host = process.env.DB_HOST_ENV === 'docker' ? 'mongo:27017' : 'localhost';
const fs = require('fs');
const writePath = 'server/database/__data__/product-size.json';

const dataGen = () => {
  fs.writeFileSync(writePath, '[');
  let entries = [];
  for (let i = 1; i <= 10000000; i++) {
    var data = JSON.stringify(generateSeedData(i), null, 2);
    entries.push(data);
    if (entries.length === 10000) {
      fs.appendFileSync(writePath, entries);
      console.log(`${i} entries saved`);
      entries = [];
      if (i !== 10000000) {
        fs.appendFileSync(writePath, ',');
      }
    }
  }
  fs.appendFileSync(writePath, ']');
};

dataGen();
