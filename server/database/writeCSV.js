const fs = require('fs');
const generateSeedData = require('./generateSeedData.js');
const productsWritePath = 'server/database/__data__/products.csv';
const sizesWritePath = 'server/database/__data__/sizes.csv';

const writeProducts = fs.createWriteStream(productsWritePath);
writeProducts.write('title,id\n', 'utf8');
var sizes = [];

const writeProductsCSV = async (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  const write = function() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      var data = generateSeedData(id);
      if (data.sizes) {
        data.sizes.forEach(size => sizes.push(size));
      }

      var productInfo = `${data.title},${data.id}\n`;

      if (i === 0) {
        writer.write(productInfo, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(productInfo, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

const writeProducts = fs.createWriteStream(productsWritePath);
writeProducts.write('title,id\n', 'utf8');
writeProductsCSV(writeProducts, 'utf-8', () => {
  writeProducts.end();
});

const writeSizesCSV = async (writer, encoding, callback) => {
  const writeProducts = fs.createWriteStream(productsWritePath);
  writeProducts.write('title,id\n', 'utf8');
  await writeProductsCSV(writeProducts, 'utf-8', () => {
    writeProducts.end();
  });

  let i = sizes.length;
  const write = function () {
    let ok = true;
    do {
      i -= 1;
      var size = sizes[i];
      var sizeInfo = `${size.productSizesId},${size.name},${size.unit},${size.size}\n`;
      if (i === 0) {
        writer.write(sizeInfo, encoding, callback);
      } else {
        ok = writer.write(sizeInfo, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }

  };
  write();
};

const writeSizes = fs.createWriteStream(sizesWritePath);
writeSizes.write('productSizesId,name,unit,size\n', 'utf8');

writeSizesCSV(writeSizes, 'utf-8', () => {
  writeSizes.end();
});
