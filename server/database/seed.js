const mongoose = require('mongoose');
const db = require('./database.js');
const models = require('./databaseModels.js');
const productSizes = models.productSizes;
const singleSize = models.singleSize;
const generateSeedData = require('./generateSeedData.js');
//For Mongo

const dbname = process.env.NODE_ENV === 'test' ? 'ikea-test' : 'ikea';
const host = process.env.DB_HOST_ENV === 'docker' ? 'mongo:27017' : 'localhost';

const fs = require('fs');
// var csvWriter = require('csv-write-stream');
// var writer = csvWriter({ headers: ["title", "id"] });
const writePath = 'server/database/__data__/product-size.json';
// const productsWritePath = 'server/database/__data__/products.csv';
// const sizesWritePath = 'server/database/__data__/sizes.csv';

//JSON Version

const dataGen = () => {
  console.log('sample', generateSeedData(1));
  fs.writeFileSync(writePath, '[');
  let entries = [];
  for (let i = 1; i <= 10000000; i++) {
    var data = JSON.stringify(generateSeedData(i), null, 2);
    entries.push(data);
    if (entries.length === 100000) {
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

//CSV Version

// const dataGen = () => {
//   // fs.writeFileSync(productsWritePath, "title,id\n");
//   writer.pipe(fs.createWriteStream(productsWritePath));
//   // fs.writeFileSync(sizesWritePath, "productSizesId,name,unit,size\n");
//   let products = [];
//   let sizes = [];

//   for (let i = 1; i <= 10; i++) {
//     var data = generateSeedData(i);
//     var sizeData = data.sizes;
//     var productInfo = {};
//     productInfo.title = data.title;
//     productInfo.id = data.id;
//     products.push(productInfo);
//     sizes.concat(sizeData);
//     if (products.length === 10) {
//       // fs.appendFileSync(productsWritePath, products);
//       writer.write(products);
//       console.log(`${i} entries saved`);
//       proudcts = [];
//       writer.end();
//       // if (i !== 10) {
//       //   fs.appendFileSync(writePath, ',');
//       // }
//     }

//     // if (sizes.length === 10) {
//     //   fs.appendFileSync(sizesWritePath, sizes);
//     //   console.log(`${i} entries saved`);
//     //   sizes = [];
//     // }
//   }

// };

dataGen();




